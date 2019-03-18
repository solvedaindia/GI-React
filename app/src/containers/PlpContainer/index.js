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
import makeSelectPlpContainer from '../../selectors/plpContainer/selectors';
import reducer from '../../reducers/plpContainer/reducer';
import saga from '../../saga/plpContainer/saga';
import PlpComponent from '../../components/PlpComponent/index';
import '../../../public/styles/plpContainer/plpContainer.scss';

import SubCategories from '../../components/GlobalComponents/productSubcategories/subCategories';
import ProductItem from '../../components/GlobalComponents/productItem/productItem';
import Filter from '../../components/PlpComponent/filter';
import { getReleventReduxState } from '../../utils/utilityManager';
import * as actionCreators from '../../actions/plpContainer/actions';

/* eslint-disable react/prefer-stateless-function */
export class PlpContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return <>
      {/* Need to remove image from Css and put in JSX */}
      {/* <img src={require('../../public/images/product-slider.jpg')} alt='slider' /> */}
      <div className='plp-slider'>
        <div className='container'>
          <div className='row'>
            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12'>
              <div className='explore-range'>
                <h3 className='heading'>Explore the range of {this.props.ctr}  <br />Table</h3>
                <a onClick={this.props.onIncrementCounter} href='#' className='btn-bg'>Shop now </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className='tablecarousel'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12 text-center'>
              <div className='headingText'>
                <Filter />
                <h3 className='heading'>Table - {this.props.updatedFilter}</h3>
                <p className='total-products'>(38 Product)</p>
              </div>
            </div>
          </div>
          <SubCategories />
        </div>
      </section>

      <section className='plpCategories'>
        <div className='container'>
          <div className='row'>
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
          </div>
        </div>
      </section>

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
