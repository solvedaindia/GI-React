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
import {
    getReleventReduxState
  } from '../../utils/utilityManager';

export class CheckoutContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          has_pass: false,
          same_bill: true,
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

    handleChange = () => {
      if(this.state.step == 2) {
        this.setState({
          step: 1
        })
      } else {
        this.setState({
          step: 2
        })
      }
    }

    handleSameBill = () => {
      if(this.state.same_bill == false) {
        this.setState({
          same_bill: true
        })
      } else {
        this.setState({
          same_bill: false
        })
      }
    }

    handleProceed = () => {
      if(this.state.step == 1) {
        console.log("step is 1")
        this.setState({
          step: 2,
          has_pass: false
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
              <div className="row">
                <hr style={{marginBottom: "0px"}} className="hr_line" />
              </div>
              <div className="row" style={{display: "table", width: '100%'}}>
                <div style={{display: "table-row"}}>
                  <div style={{background:"#eeeded", display: "table-cell", float: "none"}} className="col-md-3">
                    <h4 style={{marginTop: "30px", fontWeight: "bold"}}>Mobile or Email</h4>
                  </div>
                  <div className="col-md-9" style={{display: "table-cell", float: "none", paddingBottom: "20px"}}>
                    <p>Your Shipping and payment details will be assocaited with this number</p>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                        <label htmlFor="mobile">Mobile Number/Email Address</label>
                        <input type="text" name="mobile" className="form-control" />
                        </div>
                        {this.state.has_pass ?<div className='form-group'><label htmlFor="pass">Password</label> <input type="text" name="pass" className="form-control"
                          style={{marginTop: "10px"}} /></div> : ''}
                        <div style={{marginTop: '10px'}}>
                          <input type="checkbox" name="has_pass" onChange={this.handleHasPass} />
                          <label htmlFor="has_pass" style={{marginLeft: "10px"}}>I have a password</label>
                        </div>
                      </div>
                    </div>

                    <button
                      style={{width: '100%', background: 'black', color: 'white', fontWeight: 'bold', padding: '10px'}}
                      className="btn btn-large" onClick={this.handleProceed}>Proceed to checkout</button>
                  </div>
                </div>
              </div>
              <div className="row">
                <hr style={{marginTop: "0px"}} className="hr_line" />
              </div>
              <div className="row">
                <div className="col-md-3">
                  <h4>Ship To</h4>
                </div>
                <div className="col-md-9">
                  <h5>
                    Add your shipping address
                  </h5>
                </div>
              </div>
              <div className="row">
                <hr className="hr_line" />
              </div>
              <div className="row">
                <div className="col-md-3">
                  <h4>Pay By</h4>
                </div>
                <div className="col-md-9">
                  <h5>Choose a payment method</h5>
                </div>
              </div>
              <div className="row">
                <hr className="hr_line" />
              </div>
            </div> : ''}
            {this.state.step == 2 ? <div className="col-md-8">
              <hr />
              <div className="row" style={{display: "table", width: '100%'}}>
                <div style={{display: "table-row"}}>

                  <div className="col-md-3" style={{display: "table-cell", float: "none"}}>
                    <h4 style={{fontWeight: "bold"}}>Mobile or Email</h4>
                  </div>
                  <div className="col-md-9" style={{display: "table-cell", float: "none"}}>
                    <div className="row">
                      <div className="col-md-7">
                        <h4 style={{fontWeight: "bold"}}>783-347-3248</h4>
                      </div>
                      <div className="col-md-5">
                        <button onClick={this.handleChange} className="btn btn-large"
                          style={{width: '100%', background: 'black', color: 'white', fontWeight: 'bold', padding: '10px'}}>Change</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <hr style={{marginBottom: '0px'}} />
              </div>
              <div className="row" style={{display: "table", width: '100%'}}>
                <div style={{display: "table-row"}}>
                  <div className="col-md-3" style={{display: "table-cell", float: "none", background:"#eeeded"}}>
                    <h4 style={{marginTop: "30px", fontWeight: "bold"}}>Ship To</h4>
                  </div>
                  <div className="col-md-9" style={{display: "table-cell", float: "none", padding: '20px'}}>
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" name="name" className="form-control" />
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="text" name="phone" className="form-control" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <label htmlFor="pin">Pin Code</label>
                        <input type="number" name="pin" className="form-control" />
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" className="form-control" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 form-group">
                        <label htmlFor="address">Address</label>
                        <textarea type="text" name="address" className="form-control" />
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <label htmlFor="city">City/District</label>
                        <input type="text" name="city" className="form-control" />
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="state">State</label>
                        <input type="text" name="state" className="form-control" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <input type="checkbox" name="billing" defaultChecked={this.state.same_bill} onChange={this.handleSameBill} />
                        <label htmlFor="billing" style={{marginLeft: "10px"}}>Billing address same as shipping address</label>
                      </div>
                    </div>
                    {!this.state.same_bill ? <div className="bill_div">
                    <div className="row">
                      <div className="col-md-12"><h4 style={{fontWeight: "bold"}}>Enter a billing address</h4></div>
                    </div>
                    <div className="row">
                    <div className="col-md-6 form-group">
                      <label htmlFor="fullname">Full Name</label>
                      <input type="text" name="fullname" className="form-control" />
                    </div>
                    <div className="col-md-6 form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input type="text" name="phone" className="form-control" />
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6 form-group">
                      <label htmlFor="pin">Pin Code</label>
                      <input type="text" name="pin" className="form-control" />
                    </div>
                    <div className="col-md-6 form-group">
                      <label htmlFor="email">Email</label>
                      <input type="text" name="email" className="form-control" />
                    </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 form-group">
                        <label htmlFor="address">Address</label>
                        <textarea type="text" name="address" className="form-control" />
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <label htmlFor="city">City/District</label>
                        <input type="text" name="city" className="form-control" />
                      </div>
                      <div className="col-md-6 form-group">
                        <label htmlFor="state">State</label>
                        <input type="text" name="state" className="form-control" />
                      </div>
                    </div>
                    </div> : ''}
                    <div className="row">
                      <div className="col-md-12 form-group">
                        <hr />
                        <h5 style={{fontWeight: "bold"}}>Buying it for your business.</h5>
                        <p><span style={{fontWeight: "bold"}}>Note</span>:GSTIN cannot be changed after placing order. Registration state must match either billing or shipping state.</p>
                        <label htmlFor="gst">GSTIN (Optional)</label>
                        <input type="text" name="gst" className="form-control" />
                        <button className="btn btn-large" onClick={this.handleProceed} style={{width: '100%', background: 'black', color: 'white', fontWeight: 'bold', padding: '10px', marginTop: "20px"}}>Continue</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <hr style={{marginTop: '0px'}} />
              </div>
              <div className="row">
                <div className="col-md-3">
                  <h4 style={{fontWeight: "bold"}}>Pay By</h4>
                </div>
                <div className="col-md-9">
                <h4 style={{fontWeight: "bold"}}>Choose a payment method</h4>
                </div>
              </div>
              <div className="row">
                <hr style={{marginTop: '0px'}} />
              </div>
            </div> : ''}
            {this.state.step == 3 ? <div className="col-md-8">
            <hr />
              <div className="row" style={{display: "table", width: '100%'}}>
                <div style={{display: "table-row"}}>

                  <div className="col-md-3" style={{display: "table-cell", float: "none"}}>
                    <h4 style={{fontWeight: "bold"}}>Mobile or Email</h4>
                  </div>
                  <div className="col-md-9" style={{display: "table-cell", float: "none"}}>
                    <div className="row">
                      <div className="col-md-7">
                        <h4 style={{fontWeight: "bold"}}>783-347-3248</h4>
                      </div>
                      <div className="col-md-5">
                        <button onClick={this.handleChange} className="btn btn-large"
                          style={{width: '100%', background: 'black', color: 'white', fontWeight: 'bold', padding: '10px'}}>Change</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <hr style={{marginBottom: '0px'}} />
              </div>
              <div className="row" style={{display: "table", width: '100%'}}>
                <div style={{display: "table-row"}}>
                  <div className="col-md-3" style={{display: "table-cell", float: "none", background:"#eeeded"}}>
                    <h4 style={{fontWeight: "bold"}}>Ship to</h4>
                  </div>
                  <div className="col-md-9" style={{display: "table-cell", float: "none", paddingTop:"25px"}}>
                    <div className="row">
                      <div className="col-md-7">
                        <h4 style={{fontWeight: "bold"}}>#321, Oceanus freesia enclave, E block, 7th cross, Bellandur Bangalore, 560099</h4>
                      </div>
                      <div className="col-md-5">
                        <button onClick={this.handleChange} className="btn btn-large"
                          style={{width: '100%', background: 'black', color: 'white', fontWeight: 'bold', padding: '10px'}}>Change</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <hr style={{margin: '0px'}} />
              </div>
              <div className="row" style={{display: "table", width: '100%'}}>
                <div style={{display: "table-row"}}>
                  <div className="col-md-3" style={{display: "table-cell", float: "none"}} >
                    <h4 style={{fontWeight: "bold"}}>Pay by</h4>
                  </div>
                  <div className="col-md-9" style={{display: "table-cell", float: "none", padding: '20px'}} >
                    <div style={{background: '#f7f8f8', padding: '12px'}}>
                      <input type="checkbox" name="redeem" />
                      <label htmlFor="redeem">Redeem Gift Card</label>
                    </div>
                    <h4 style={{fontWeight: "bold", marginTop: "20px"}}>Select Payment Method</h4>
                    <div className="radios">
                      <div class="radio">
                        <label className='pay_radio'><input type="radio" name="optradio" />Credit Card/Debit Card</label>
                      </div>
                      <div class="radio">
                        <label className='pay_radio'><input type="radio" name="optradio" />Netbanking</label>
                      </div>
                      <div class="radio">
                        <label className='pay_radio'><input type="radio" name="optradio" />Cash on Delivery</label>
                      </div>
                      <div class="radio">
                        <label className='pay_radio'><input type="radio" name="optradio" />UPI Payment</label>
                      </div>
                      <div class="radio">
                        <label className='pay_radio'><input type="radio" name="optradio" />EMI</label>
                      </div>
                      <div class="radio">
                        <label className='pay_radio'><input type="radio" name="optradio" />Paytm</label>
                      </div>
                      <div class="radio">
                        <label className='pay_radio'><input type="radio" name="optradio" />Mobikwik</label>
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