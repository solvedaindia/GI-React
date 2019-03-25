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
import '../../../public/styles/plpContainer/plpContainer.scss';

import SubCategories from '../../components/GlobalComponents/productSubcategories/subCategories';
import ProductItem from '../../components/GlobalComponents/productItem/productItem';
import Filter from '../../components/PlpComponent/Filter/filter';
import MarketingTextBanner from '../../components/PlpComponent/MarketingeTextBanner/marketingTextBanner'
import { getReleventReduxState } from '../../utils/utilityManager';
import * as actionCreators from './actions';
import axios from 'axios';
import { plpSubCatAPI, storeId, accessToken } from '../../../public/constants/constants';

/* eslint-disable react/prefer-stateless-function */
export class PlpContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plpSubCatData:null,
    };
  }

  componentDidMount() {
    this.fetchSubCategoryData();
  }

  fetchSubCategoryData() {
    axios.get(plpSubCatAPI, { 'headers': { 'store_id': storeId, 'access_token': accessToken } }).then(response => {
      this.setState({plpSubCatData:response.data.data})
      
    }).catch(error => {
      console.log('PLPSUBError---', error);
    });
  }


  render() {
    return <>
      <MarketingTextBanner />
      <SubCategories subCategoryData={this.state.plpSubCatData}/>
    </>;
  }
}

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
