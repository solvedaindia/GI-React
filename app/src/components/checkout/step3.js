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

export class Step3Component extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          showGift: false
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
      this.props.back();
    }

    handleChangeMobile = () => {
      this.props.backtoMobile();
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

    showGiftCard = () => {
        if(this.state.showGift == true) {
          this.setState({
            showGift: false
          })  
        } else {
          this.setState({
            showGift: true
          })
        }
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
                    <div style={{background: '#f7f8f8', padding: '12px', marginBottom: "20px"}}>
                      <input type="checkbox" name="redeem" />
                      <label htmlFor="redeem">Godrej Credit <br/><span>500 Credit used in this order</span></label>
                    </div>
                    <div style={{background: '#f7f8f8', padding: '12px'}}>
                      <input type="checkbox" name="redeem" onChange={this.showGiftCard}/>
                      <label htmlFor="redeem">Redeem Gift Card</label>
                      {this.state.showGift ? <div className="row">
                        <div className="col-md-7 from-group">
                        <input type="text" placeholder="Gift Card Number" className="form-control" />
                        </div>
                        <div className="col-md-5">
                        <button className="btn btn-large">Apply</button>
                        </div>
                      </div> : ''}
                    </div>
                    <h4 style={{fontWeight: "bold", marginTop: "20px"}}>Select Payment Method</h4>
                    <div className="radios">
                      <div className="radio">
                        <label className='pay_radio'><input type="radio" name="optradio" />Credit Card/Debit Card</label>
                      </div>
                      <div className="radio">
                        <label className='pay_radio'><input type="radio" name="optradio" />Netbanking</label>
                      </div>
                      <div className="radio">
                        <label className='pay_radio'><input type="radio" name="optradio" />Cash on Delivery</label>
                      </div>
                      <div className="radio">
                        <label className='pay_radio'><input type="radio" name="optradio" />UPI Payment</label>
                      </div>
                      <div className="radio">
                        <label className='pay_radio'><input type="radio" name="optradio" />EMI</label>
                      </div>
                      <div className="radio">
                        <label className='pay_radio'><input type="radio" name="optradio" />Paytm</label>
                      </div>
                      <div className="radio">
                        <label className='pay_radio'><input type="radio" name="optradio" />Mobikwik</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      )
    }
}