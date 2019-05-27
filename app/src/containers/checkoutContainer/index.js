import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import axios from 'axios';
import Link from 'react-router-dom/Link';
import {
    getReleventReduxState
  } from '../../utils/utilityManager';

export class CheckoutContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          has_pass: false,
          step: 1
        }
    }

    handleHasPass = () => {
      if(this.state.has_pass == false) {
        this.setState({
          has_pass: true
        })
      } else {
        this.setState({
          has_pass: false
        })
      }
    }

    handleProceed = () => {
      if(this.state.step == 1) {
        console.log("step is 1")
        this.setState({
          step: 2
        })
      } else if(this.state.step == 2) {
        this.setState({
          step: 3
        })
      }
    }

    render() {
      return (
        <div className="container">
          <div className="row">
            <h2 style={{fontWeight: "bold"}}>Checkout</h2>
            {this.state.step == 1 ? <div className="col-md-8">
              <div className="row" style={{display: "table"}}>
                <div style={{display: "table-row"}}>
                <hr style={{marginBottom: "0px"}} />
                <div style={{background:"#eeeded", display: "table-cell", float: "none"}} className="col-md-4">
                  <h4 style={{fontWeight: "bold"}}>Mobile or Email</h4>
                </div>
                <div className="col-md-8" style={{display: "table-cell", float: "none"}}>
                  <p>Your Shipping and payment details will be assocaited with this number</p>
                  <label htmlFor="mobile">Mobile Number/Email Address</label>
                  <input type="text" name="mobile" />
                  {this.state.has_pass ? <input type="text" name="pass" /> : ''}
                  <input type="checkbox" name="has_pass" onChange={this.handleHasPass} />
                  <button onClick={this.handleProceed}>Proceed to checkout</button>
                </div>
              </div>
             </div> 
              <hr />
              <div className="row">
                <div className="col-md-4">
                  <h4>Ship To</h4>
                </div>
                <div className="col-md-8">
                  <h5>
                    Add your shipping address
                  </h5>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-4">
                  <h4>Pay By</h4>
                </div>
                <div className="col-md-8">
                  <h5>Choose a payment method</h5>
                </div>
              </div>
              <hr />
            </div> : ''}
            {this.state.step == 2 ? <div className="col-md-8">
              <div className="row">
                <hr />
                <div className="col-md-4">
                  <h4>Mobile or Email</h4>
                </div>
                <div className="col-md-8">
                  <h4>783-347-3248</h4>
                  <button>Change</button>
                </div>  
              </div>
              <div className="row" style={{display: "table", width: '100%'}}>
                <hr />
                <div style={{display: "table-row"}}>
                  <div className="col-md-4" style={{display: "table-cell", float: "none"}}>
                    <h4>Ship To</h4>
                  </div>
                  <div className="col-md-8" style={{display: "table-cell", float: "none"}}>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" name="name" />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="text" name="phone" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="pin">Pin Code</label>
                        <input type="number" name="pin" />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <label htmlFor="address">Address</label>
                        <textarea type="text" name="address" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="city">City/District</label>
                        <input type="number" name="city" />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="state">State</label>
                        <input type="text" name="state" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> : ''}
            <div className="col-md-4">
              <h4>Right column</h4>
            </div>
          </div>
        </div>
      )
    }
}

const mapDispatchToProps = dispatch => ({
  removeProduct: id => dispatch(actionCreators.RemoveProduct(id))
});

const withConnect = connect(
    mapDispatchToProps
  );
  
//   const withReducer = injectReducer({ key: 'plpContainer', reducer });
//   const withSaga = injectSaga({ key: 'plpContainer', saga });
  
  export default compose(
    withConnect,
  )(CheckoutContainer);