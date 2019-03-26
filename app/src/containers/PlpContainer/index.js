/**
 *
 * PlpContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import makeSelectPlpContainer from './selectors';
import reducer from './reducer';
import saga from '../../saga/plpContainer/saga';
import PlpComponent from '../../components/PlpComponent/index';
import { getReleventReduxState } from '../../utils/utilityManager';
import '../../../public/styles/plpContainer/plpContainer.scss';

import SubCategories from '../../components/GlobalComponents/productSubcategories/subCategories';
import ProductItem from '../../components/GlobalComponents/productItem/productItem';
import Filter from '../../components/PlpComponent/Filter/filter';
import MarketingTextBanner from '../../components/PlpComponent/MarketingeTextBanner/marketingTextBanner'
import DescriptionBanner from '../../components/PlpComponent/DescriptionBanner/descriptionBanner'

import * as actionCreators from './actions';
import axios from 'axios';
import { plpSubCatAPI, plpAPI, espotAPI, storeId, accessToken } from '../../../public/constants/constants';

const categoryId = '10001';
export class PlpContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plpSubCatData: null,
      marketingTextBannerData: null,
      plpData: null,
    };
  }

  componentDidMount() {
    this.fetchSubCategoryData();
    this.fetchMarketingTextBannerData();
    this.fetchPLPProductsData();
  }

  fetchSubCategoryData() {
    axios.get(plpSubCatAPI + categoryId, { 'headers': { 'store_id': storeId, 'access_token': accessToken } }).then(response => {
      this.setState({ plpSubCatData: response.data.data })
    }).catch(error => {
      console.log('PLPSUBError---', error);
    });
  }

  fetchMarketingTextBannerData() {
    axios.get(espotAPI + categoryId, { 'headers': { 'store_id': storeId, 'access_token': accessToken } }).then(response => {
      console.log('DataMArketing---',response.data);
      this.setState({ marketingTextBannerData: response.data.data })
    }).catch(error => {
      console.log('PLPBannerrror---', error);
    });
  }

  fetchPLPProductsData() {
    /**
       * TODO: Node is not accepting any categoryId, this is a static response from Node side
       */
    axios.get(plpAPI, { 'headers': { 'store_id': storeId, 'access_token': accessToken } }).then(response => {
      this.setState({ plpData: response.data.data })
    }).catch(error => {
      console.log('PLPBannerrror---', error);
    });
  }


  render() {
    let marketingBanner;
    if (this.state.marketingTextBannerData != null) {
      /**
       * TODO: "GI_HERO_BANNER_10001_CONTENT" this is static key, needs to correct from Node side
       */
      marketingBanner = <MarketingTextBanner bannerDataPro={this.state.marketingTextBannerData.GI_HERO_BANNER_10001_CONTENT.content} />
    }

    let subCategories;
    if (this.state.plpSubCatData != null) {
      subCategories = <SubCategories subCategoryData={this.state.plpSubCatData} />
    }

    let plpProducts;
    if (this.state.plpData != null) {
      plpProducts = <PlpComponent plpDataPro={this.state.plpData.productList} />
    }

    return <>
      {marketingBanner}
      {subCategories}
      {plpProducts}
      <DescriptionBanner />
    </>;
  }


}


/* ----------------------------------------   REDUX HANDLERS   -------------------------------------  */
const mapStateToProps = state => {
  const stateObj = getReleventReduxState(state, 'plpContainer');
  return {
    ctr: stateObj.counter,
    updatedFilter: stateObj.updateFilter,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrementCounter: () => dispatch(actionCreators.increment()),
  }
};

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
