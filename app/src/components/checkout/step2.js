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

export class Step2Component extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          has_pass: false,
          same_bill: true,
          step: 1,
          showGift: false
        }
    }

    handleChangeMobile = () => {
      this.props.back();
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
      this.props.proceed();
    }

    render() {
      return (
            <div className="col-md-8">
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
                        <button onClick={this.handleChangeMobile} className="btn btn-large"
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
            </div>
      )
    }
}