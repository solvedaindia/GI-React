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
import saga from './saga';
import PlpComponent from '../../components/PlpComponent/index';
import { getReleventReduxState } from '../../utils/utilityManager';
import '../../../public/styles/plpContainer/plpContainer.scss';

import SubCategories from '../../components/GlobalComponents/productSubcategories/subCategories';
// import ProductItem from '../../components/GlobalComponents/productItem/productItem';
import Filter from '../../components/PlpComponent/Filter/filter';
import MarketingTextBanner from '../../components/PlpComponent/MarketingeTextBanner/marketingTextBanner';
import DescriptionBanner from '../../components/PlpComponent/DescriptionBanner/descriptionBanner';
import Sort from '../../components/PlpComponent/Sorting/sort';

import * as actionCreators from './actions';
import axios from 'axios';
import {
	plpSubCatAPI,
	plpAPI,
	espotAPI,
	storeId,
	accessToken,
} from '../../../public/constants/constants';

let categoryId = '13503';
export class PlpContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			plpSubCatData: null,
			marketingTextBannerData: null,
			plpDescriptionData: null,
			plpData: [],
			adBannerData: [],
			error: false,
			hasMore: true,
			isLoading: false,
			pageNumber: 1,
			pageSize: 18,
			categoryDetail: true,
			sortValue: this.props.sortingValue,
			isCatDetails: true,
			categoyDetails: null,
			productCount: null,
		};
		this.myRef = React.createRef();
		this.onscroll = this.onscroll.bind(this);
	}

	componentWillUnmount() {
		removeEventListener('scroll', this.onscroll);
	}

	componentDidMount() {
		let path = String(this.props.location.pathname);
		var idStr = path.split('/')[2];
		if (idStr != undefined) {
			categoryId = idStr;
			console.log('PLP Main------', idStr);
		}

		addEventListener('scroll', this.onscroll);

		this.fetchSubCategoryData();
		this.fetchMarketingTextBannerData();
		this.fetchPLPProductsData();
		this.fetchDescriptionData();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.sortingValue !== this.props.sortingValue) {
			this.setState({ plpData: [] })
			this.fetchPLPProductsData();
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		//console.log('PLP---- componentDidUpdate PrevProps--', prevProps + 'This Props', this.props);
		if (prevProps.specificProperty !== this.props.specificProperty) {
			// Do whatever you want
		}
	}

	fetchAdBannerData() {
		axios
			.get(espotAPI + 'GI_Plp_Sample_AD_Banner', {
				headers: { store_id: storeId, access_token: accessToken },
			})
			.then(response => {
				this.props.onAdBannerIndexUpdate(response.data.data.GI_PLP_Sample_AD_Banner_Content);
				this.setState({ adBannerData: response.data.data.GI_PLP_Sample_AD_Banner_Content });
			})
			.catch(error => {
			});
	}

	fetchSubCategoryData() {
		axios
			.get(plpSubCatAPI + categoryId, {
				headers: { store_id: '10801', access_token: accessToken },
			})
			.then(response => {
				console.log('Subcat Data');
				this.setState({ plpSubCatData: response.data.data });
			})
			.catch(error => {
			});
	}

	fetchMarketingTextBannerData() {
		axios
			.get(espotAPI + 'GI_Plp_Sample_Hero_Banner', {
				headers: { store_id: storeId, access_token: accessToken },
			})
			.then(response => {
				this.setState({ marketingTextBannerData: response.data.data.GI_PLP_Sample_HeroBanner_Content.bannerList[0].content });
			})
			.catch(error => {
			});
	}

	fetchPLPProductsData() {
		this.setState({ isLoading: true }, () => {
			/**
		 * TODO: Category ID is static from Node side.
		 */

			var plpURL = plpAPI + categoryId + '?' + 'pagenumber=' + this.state.pageNumber + '&' + 'pagesize=' + this.state.pageSize + '&' + 'orderby=' + this.props.sortingValue + '&'
			console.log('PLPURL---', plpURL);
			axios
				.get(plpURL, {
					headers: { store_id: '10801', access_token: accessToken, 'cat_details': this.state.isCatDetails },
				})
				.then(response => {

					if (this.state.isCatDetails) {
						this.fetchAdBannerData();
						this.setState({
							categoryDetail: response.data.data.categoryDetails,
							productCount: response.data.data.productCount,
						})
					}

					this.setState({
						plpData: [...this.state.plpData, ...response.data.data.productList],
						hasMore: (this.state.plpData.length < Number(response.data.data.productCount)),
						isLoading: false,
						isCatDetails: false,
					});
				})
				.catch(error => {
					//console.log('PLPBannerrror---', error);
					this.setState({
						error: error.message,
						isLoading: false,
					});
				});
		});
	}

	fetchDescriptionData() {
		axios
			.get(espotAPI + 'GI_Plp_Description', {
				headers: { store_id: storeId, access_token: accessToken },
			})
			.then(response => {
				// console.log('DescriptionsData---', response.data.data.GI_PLP_Sample_Description_Content);
				this.setState({ plpDescriptionData: response.data.data.GI_PLP_Sample_Description_Content });
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
		const adjustedHeight = 600
		const windowHeight = window.innerHeight + document.documentElement.scrollTop;
		const windowOffsetHeight = document.documentElement.offsetHeight - adjustedHeight

		if (windowHeight >= windowOffsetHeight && windowHeight - 300 <= windowOffsetHeight) {
			console.log('Its the End');
			this.setState({ pageNumber: this.state.pageNumber + 1 });
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
			adBannerData,
		} = this.state;

		let marketingBanner;
		if (marketingTextBannerData != null) {
			/**
			 * TODO: "GI_HERO_BANNER_10001_CONTENT" this is static key, needs to correct from Node side
			 */
			marketingBanner = (
				<MarketingTextBanner
					bannerDataPro={marketingTextBannerData}
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
		if (plpData.length != 0 && adBannerData.length != 0) {
			plpProducts = (
				<PlpComponent plpDataPro={this.state.plpData} adBannerDataPro={adBannerData} />
			);
		}

		let descriptionItem;
		if (this.state.plpDescriptionData != null) {
			descriptionItem = (
				<DescriptionBanner descriptionDataPro={this.state.plpDescriptionData} ref={(divElement) => this.divElement = divElement} />
			);
		}

		let titleItem = null;
		if (this.state.categoryDetail !== null) {
			titleItem = (
				<h3 className="headingTitle">{this.state.categoryDetail.categoryName}</h3>
			)
		}

		let productCountItem = null;
		if (this.state.productCount !== null) {
			productCountItem = (
				<div className="headingSubTitle">(Produts {this.state.productCount})</div>
			)
		}

		return (
			<>
				{marketingBanner}
				{subCategories}
				<section className="plpCategories">
					<div className="container">
						<div className="row">
							{titleItem}
							{productCountItem}
							{this.state.isCatDetails ? null : <Sort />}
							<Filter />
						</div>
						{plpProducts}
					</div>
				</section>

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
		sortingValue: stateObj.sortingValue,
		reduxTrigger: true,
	};
};

const mapDispatchToProps = dispatch => ({
	onIncrementCounter: () => dispatch(actionCreators.increment()),
	onAdBannerIndexUpdate: (adBannerData) => dispatch(actionCreators.adBannerDataAction(adBannerData)),
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
