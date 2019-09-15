import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import '../../../public/styles/checkout.scss';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import axios from 'axios';
import Link from 'react-router-dom/Link';
import {Helmet} from "react-helmet";

import {
    getReleventReduxState
  } from '../../utils/utilityManager';
import  { CheckoutComponent } from '../../components/checkout/index'
import ContentEspot from '../../components/Primitives/staticContent';

export class CheckoutContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          
        }
    }

    render() {
      return (
        <>
         <ContentEspot espotName = { 'GI_PIXEL_CHECKOUT_BODY_START' } />
         <div>
         <Helmet>
					<ContentEspot espotName= {'GI_PIXEL_CHECKOUT_META'}/>
				</Helmet>
          <CheckoutComponent />
        </div>
        <ContentEspot espotName = { 'GI_PIXEL_CHECKOUT_BODY_END' } />
        </>
      )
    }
}

const mapDispatchToProps = dispatch => ({
  removeProduct: id => dispatch(actionCreators.RemoveProduct(id))
});

const withConnect = connect(
    mapDispatchToProps
  );
  

  
  export default compose(
    withConnect,
  )(CheckoutContainer);