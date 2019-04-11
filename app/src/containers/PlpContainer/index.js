/**
 *
 * PlpContainer
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
// import makeSelectPlpContainer from './selectors';
import reducer from './reducer';
import saga from '../../saga/plpContainer/saga';
import PlpComponent from '../../components/PlpComponent/index';
import { getReleventReduxState } from '../../utils/utilityManager';
import '../../../public/styles/plpContainer/plpContainer.scss';

import SubCategories from '../../components/GlobalComponents/productSubcategories/subCategories';
// import ProductItem from '../../components/GlobalComponents/productItem/productItem';
import Filter from '../../components/PlpComponent/Filter/filter';
import MarketingTextBanner from '../../components/PlpComponent/MarketingeTextBanner/marketingTextBanner';
import DescriptionBanner from '../../components/PlpComponent/DescriptionBanner/descriptionBanner';

import * as actionCreators from './actions';
import axios from 'axios';
import {
	plpSubCatAPI,
	plpAPI,
	espotAPI,
	storeId,
	accessToken,
} from '../../../public/constants/constants';

const categoryId = '10001';
export class PlpContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			plpSubCatData: null,
			marketingTextBannerData: null,
			plpDescriptionData: null,
			plpData: [],
			error: false,
			hasMore: true,
			isLoading: false,
		};

		this.onscroll = this.onscroll.bind(this);
	}


	componentWillUnmount() {
		removeEventListener('scroll', this.onscroll);
	}

	componentDidMount() {
		addEventListener('scroll', this.onscroll);

		this.fetchSubCategoryData();
		this.fetchMarketingTextBannerData();
		this.fetchPLPProductsData();
		this.fetchDescriptionData();
	}

	fetchSubCategoryData() {
		axios
			.get(plpSubCatAPI + categoryId, {
				headers: { store_id: storeId, access_token: accessToken },
			})
			.then(response => {
				this.setState({ plpSubCatData: response.data.data });
			})
			.catch(error => {
				// console.log('PLPSUBError---', error);
			});
	}

	fetchMarketingTextBannerData() {
		axios
			.get(espotAPI + 'GI_HERO_BANNER_' + categoryId, {
				headers: { store_id: storeId, access_token: accessToken },
			})
			.then(response => {
				// console.log('DataMArketing---', response.data);
				this.setState({ marketingTextBannerData: response.data.data });
			})
			.catch(error => {
				// console.log('PLPBannerrror---', error);s
			});
	}

	fetchPLPProductsData() {
		this.setState({ isLoading: true }, () => {
			/**
		 * TODO: Node is not accepting any categoryId, this is a static response from Node side
		 */
			axios
				.get(plpAPI, {
					headers: { store_id: storeId, access_token: accessToken },
				})
				.then(response => {
					setTimeout(() => {
						this.setState({ //Just to test the delay
							plpData: [...response.data.data.productList, ...this.state.plpData],
							hasMore: (this.state.plpData.length < 60),
							isLoading: false,
						})
					}, 1500);
					// this.setState({
					// 	plpData: [...response.data.data.productList, ...this.state.plpData],
					// 	hasMore: (this.state.plpData.length < 60),
					// 	isLoading: false,
					// });
				})
				.catch(error => {
					// console.log('PLPBannerrror---', error);
					this.setState({
						error: error.message,
						isLoading: false,
					});
				});
		});
	}

	fetchDescriptionData() {
		axios
			.get(espotAPI + 'GI_PLP_TABLE_DESCRIPTION', {
				headers: { store_id: storeId, access_token: accessToken },
			})
			.then(response => {
				// console.log('DescriptionsData---', response.data.data.GI_PLP_TABLE_DESCRIPTION_CONTENT);
				this.setState({ plpDescriptionData: response.data.data.GI_PLP_TABLE_DESCRIPTION_CONTENT });
			})
			.catch(error => {
				// console.log('PLPBannerrror---', error);s
			});
	}

	onscroll = () => {
		const {
			state: {
				error,
				isLoading,
				hasMore,
			},
		} = this;

		if (error || isLoading || !hasMore) return;
		const adjustedHeight = 500
		if (
			window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - adjustedHeight
		) {
			console.log('Its the End');
			this.fetchPLPProductsData();
		}
	};

	render() {
		const {
			error,
			hasMore,
			isLoading,
			plpData,
			marketingTextBannerData,
			plpSubCatData,
		} = this.state;

		let marketingBanner;
		if (marketingTextBannerData != null) {
			/**
			 * TODO: "GI_HERO_BANNER_10001_CONTENT" this is static key, needs to correct from Node side
			 */
			marketingBanner = (
				<MarketingTextBanner
					bannerDataPro={
						this.state.marketingTextBannerData.GI_HERO_BANNER_10001_CONTENT
							.content
					}
				/>
			);
		}

		let subCategories;
		if (plpSubCatData != null) {
			subCategories = (
				<SubCategories subCategoryData={this.state.plpSubCatData} />
			);
		}

		let plpProducts;
		if (plpData.length != 0) {
			plpProducts = (
				<PlpComponent plpDataPro={this.state.plpData} />
			);
		}

		let descriptionItem;
		if (this.state.plpDescriptionData != null) {
			descriptionItem = (
				<DescriptionBanner descriptionDataPro={this.state.plpDescriptionData} />
			);
		}

		return (
			<>
				{marketingBanner}
				{subCategories}
				{plpProducts}
				<hr />
				{error &&
					<div style={{ color: '#900' }}>
						{error}
					</div>
				}
				{isLoading &&
					<div>Loading...</div>
				}
				{!hasMore &&
					<div>No Data Left!</div>
				}
				{descriptionItem}
			</>
		);
	}
}

/* ----------------------------------------   REDUX HANDLERS   -------------------------------------  */
const mapStateToProps = state => {
	const stateObj = getReleventReduxState(state, 'plpContainer');
	return {
		ctr: stateObj.counter,
		updatedFilter: stateObj.updateFilter,
	};
};

const mapDispatchToProps = dispatch => ({
	onIncrementCounter: () => dispatch(actionCreators.increment()),
});

const withConnect = connect(
	mapStateToProps,
	mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'plpContainer', reducer });
const withSaga = injectSaga({ key: 'plpContainer', saga });

export default compose(
	withReducer,
	withSaga,
	withConnect,
)(PlpContainer);
