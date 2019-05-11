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
import {
  getReleventReduxState,
  resolveTheFilter,
} from '../../utils/utilityManager';
import '../../../public/styles/plpContainer/plpContainer.scss';

import SubCategories from '../../components/GlobalComponents/productSubcategories/subCategories';
// import ProductItem from '../../components/GlobalComponents/productItem/productItem';
import FilterMain from '../../components/PlpComponent/Filter/filterMain';
import MarketingTextBanner from '../../components/PlpComponent/MarketingeTextBanner/marketingTextBanner';
import DescriptionBanner from '../../components/PlpComponent/DescriptionBanner/descriptionBanner';
import Sort from '../../components/PlpComponent/Sorting/sort';

import * as actionCreators from './actions';
import apiManager from '../../utils/apiManager';
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
      filterData: [],
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
    const path = String(this.props.location.pathname);
    const idStr = path.split('/')[2];
    if (idStr != undefined && idStr !== categoryId) {
      categoryId = idStr;
      // this.setState({
      // 	filterData: [],
      // 	plpData: [],
      // 	isCatDetails: true,
      // })
      // this.fetchPLPProductsData();
    }

    addEventListener('scroll', this.onscroll);
    console.log('componentDidMount');
    this.fetchSubCategoryData();
    this.fetchMarketingTextBannerData();
    this.fetchPLPProductsData();
    this.fetchDescriptionData();
  }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps', nextProps.location.pathname, this.props.location.pathname);
    // if (nextProps.location.pathname !== this.props.location.pathname) {
    // console.log('In the locationpath');

    const path = String(nextProps.location.pathname);
    const idStr = path.split('/')[2];
    if (idStr != undefined && idStr !== categoryId) {
      // this.props.plpReduxStateReset();
      // categoryId = idStr;
      // this.setState({
      // 	pageNumber: 1,
      // 	filterData: [],
      // 	plpData: [],
      // 	isCatDetails: true,
      // })
      // this.fetchSubCategoryData();
      // this.fetchPLPProductsData();
    }

    // }
    // else {
    // 	this.props.history.push('/cat')
    // }

    if (nextProps.sortingValue !== this.props.sortingValue) {
      console.log('In the Sorrting');
      this.setState({
        plpData: [],
        pageNumber: 1,
      });
      this.fetchPLPProductsData();
    }
    if (nextProps.updatedFilter !== this.props.updatedFilter) {
      console.log('In the Filter');
      console.log('Filter Changed ---- ', nextProps.updatedFilter);
      this.setState({
        plpData: [],
        filterData: [],
        pageNumber: 1,
      });
      this.fetchPLPProductsData();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('PLP---- componentDidUpdate PrevProps--', prevProps + 'This Props', this.props);
    if (prevProps.specificProperty !== this.props.specificProperty) {
      // Do whatever you want
    }
  }

  fetchAdBannerData() {
    apiManager
      .get(`${espotAPI}GI_Plp_Sample_AD_Banner`)
      .then(response => {
        this.props.onAdBannerIndexUpdate(response.data.data);
        this.setState({ adBannerData: response.data.data });
      })
      .catch(error => {});
  }

  fetchSubCategoryData() {
    apiManager
      .get(plpSubCatAPI + categoryId, {
        headers: { store_id: '10801' },
      })
      .then(response => {
        console.log('Subcat Data', response.data);
        this.setState({ plpSubCatData: response.data.data });
      })
      .catch(error => {});
  }

  fetchMarketingTextBannerData() {
    apiManager
      .get(`${espotAPI}GI_Plp_Sample_Hero_Banner`)
      .then(response => {
        this.setState({
          marketingTextBannerData: response.data.data.bannerList[0].content,
        });
      })
      .catch(error => {});
  }

  fetchPLPProductsData() {
    this.setState({ isLoading: true }, () => {
      /**
       * TODO: Category ID is static from Node side.
       */

      const plpURL =
        `${plpAPI + categoryId}?` +
        `pagenumber=${this.state.pageNumber}&` +
        `pagesize=${this.state.pageSize}&` +
        `orderby=${this.props.sortingValue}&${this.props.updatedFilter}`;
      console.log('PLPURL---', plpURL);
      console.log('categorId---', categoryId);
      let newStoreId = '';
      if (categoryId === '12540') {
        newStoreId = '10151';
      } else {
        newStoreId = '10801';
      }
      console.log('categorId---', categoryId, newStoreId);
      apiManager
        .get(plpURL, {
          headers: {
            store_id: newStoreId,
            cat_details: this.state.isCatDetails,
            catalog_id: '10601',
          },
        })
        .then(response => {
          console.log('PLP Response----', response.data);
          if (this.state.isCatDetails) {
            this.fetchAdBannerData();
            const coloumnValue = response.data.data.categoryDetails.columns;
            this.props.initialValuesUpdate(coloumnValue);
            this.setState({
              categoryDetail: response.data.data.categoryDetails,
            });
          }

          this.setState({
            plpData: [...this.state.plpData, ...response.data.data.productList],
            productCount: response.data.data.productCount,
            hasMore:
              this.state.plpData.length <
              Number(response.data.data.productCount),
            filterData: response.data.data.facetData,
            isLoading: false,
            isCatDetails: false,
          });
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
    apiManager
      .get(`${espotAPI}GI_Plp_Description`)
      .then(response => {
        // console.log('DescriptionsData---', response.data.data.GI_PLP_Sample_Description_Content);
        this.setState({ plpDescriptionData: response.data.data });
      })
      .catch(error => {
        // console.log('PLPBannerrror---', error);s
      });
  }

  onscroll = () => {
    const {
      state: { error, isLoading, hasMore },
    } = this;

    if (error || isLoading || !hasMore) return;
    const adjustedHeight = 600;
    const windowHeight =
      window.innerHeight + document.documentElement.scrollTop;
    const windowOffsetHeight =
      document.documentElement.offsetHeight - adjustedHeight;

    if (
      windowHeight >= windowOffsetHeight &&
      windowHeight - 300 <= windowOffsetHeight
    ) {
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
      filterData,
    } = this.state;

    let marketingBanner;
    if (marketingTextBannerData != null) {
      /**
       * TODO: "GI_HERO_BANNER_10001_CONTENT" this is static key, needs to correct from Node side
       */
      marketingBanner = (
        <MarketingTextBanner bannerDataPro={marketingTextBannerData} />
      );
    }

    let subCategories;
    if (plpSubCatData != null) {
      console.log('the subc Ategor ---', plpSubCatData);
      subCategories = (
        <SubCategories subCategoryData={this.state.plpSubCatData} />
      );
    }

    let plpProducts;
    if (plpData.length != 0 && adBannerData.length != 0) {
      plpProducts = (
        <PlpComponent
          plpDataPro={this.state.plpData}
          adBannerDataPro={adBannerData}
        />
      );
    }

    let filterItem;
    if (filterData.length != 0) {
      // filterData.push(filterData[0])
      // filterData.push(filterData[1])
      // filterData.push(filterData[2])
      // filterData.push(filterData[3])
      // console.log('FilterData---', filterData);

      filterItem = <FilterMain filterDataPro={filterData} />;
    }

    let descriptionItem;
    if (this.state.plpDescriptionData != null) {
      descriptionItem = (
        <DescriptionBanner
          descriptionDataPro={this.state.plpDescriptionData}
          ref={divElement => (this.divElement = divElement)}
        />
      );
    }

    let titleItem = null;
    if (this.state.categoryDetail !== null) {
      titleItem = (
        <h3 className="headingTitle">
          {this.state.categoryDetail.categoryName}
        </h3>
      );
    }

    let productCountItem = null;
    if (this.state.productCount !== null) {
      productCountItem = (
        <div className="headingSubTitle">
          (Produts {this.state.productCount})
        </div>
      );
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
            </div>
            <div className="row no-padding">
              <div className="filterWrapper clearfix">
                <div className="filter">{filterItem}</div>
                <div className="sort">
                  {this.state.isCatDetails ? null : <Sort />}
                </div>
              </div>
            </div>
          </div>
          <div className="container2">{plpProducts}</div>
        </section>

        {error && <div style={{ color: '#900' }}>{error}</div>}
        {isLoading && (
          <div className="lazyloading-Indicator">
            <img
              id="me"
              className="loadingImg"
              src={require('../../../public/images/plpAssests/lazyloadingIndicator.svg')}
            />
          </div>
        )}
        {!hasMore && <div className="noProductFound">No Products Found</div>}
        {descriptionItem}
        <CompContainer />
      </>
    );
  }
}

/* ----------------------------------------   REDUX HANDLERS   -------------------------------------  */
const mapStateToProps = state => {
  const stateObj = getReleventReduxState(state, 'plpContainer');
  return {
    ctr: stateObj.counter,
    updatedFilter: resolveTheFilter(stateObj.updateFilter),
    sortingValue: stateObj.sortingValue,
    reduxTrigger: true,
  };
};

const mapDispatchToProps = dispatch => ({
  initialValuesUpdate: coloumn =>
    dispatch(actionCreators.updateInitialValues(coloumn)),
  onIncrementCounter: () => dispatch(actionCreators.increment()),
  onAdBannerIndexUpdate: adBannerData =>
    dispatch(actionCreators.adBannerDataAction(adBannerData)),
  plpReduxStateReset: () => dispatch(actionCreators.resetPLPReduxState()),
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
