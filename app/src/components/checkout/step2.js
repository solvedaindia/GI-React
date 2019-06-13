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
import appCookie from '../../utils/cookie';
import {
  storeId,
  accessToken,
  accessTokenCookie,
  userLoginAPI,
  addressListAPI,
  userDataAPI,
  PinToCityAPI
} from '../../../public/constants/constants';
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
          showGift: false,
          addressList: null,
          saved_add: 'active_add',
          new_add: null,
          pin: '',
          city: '',
          state: ''
        }
    }

    componentDidMount() {
      if(this.props.isLoggedIn) {
        this.callAddressAPI()
          .then((data) => {
            this.setState({
              addressList: data
            })
          })
      }
    }

    callAddressAPI = () => {
      return new Promise((resolve, reject) => {
        let token = appCookie.get('accessToken')
        axios.get(addressListAPI, {
          headers: { store_id: storeId, access_token: token }
        }).then(response => {
          resolve(response.data.data);
        }).catch(error => {
          reject(error);
        })
      })
    }

    handleChangeMobile = () => {
      this.props.back();
    }

    getUserAddress = () => {
      
    }

    newAddActive = () => {
      this.setState({
        saved_add: null,
        new_add: 'active_add'
      })
    }

    savedAddActive = () => {
      this.setState({
        saved_add: 'active_add',
        new_add: null
      })
    }

    callPinApi = (val) => {
      let token = appCookie.get('accessToken')
        axios.get(`${PinToCityAPI}${val}`, {
          headers: { store_id: storeId, access_token: token }
        }).then(response => {
          console.log(response.data.data, "pin response");
          this.setState({
            city: response.data.data.city,
            state: response.data.data.state
          })
        }).catch(error => {
          throw new Error(error);
        })
    }

    pinChange = (e) => {
      console.log(e.target.value, 'pin obj')
      if (e.target.value.length > 6) {
        return false;
      } else {
        if (e.target.value.length === 6) {
          this.callPinApi(e.target.value)
        }
        this.setState({
          pin: e.target.value
        });
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
      this.props.proceed();
    }

    render() {
      return (
            <div className="col-md-8 checkout_wrapper">
             
              <div className='listRow clearfix'> 
                <div className='stepActive'>
                  <div className='checkmark'></div>    
                </div> 

                  <div className="labeltext-box">
                    <h4 className="heading-label">Mobile or Email</h4>
                  </div>

                  <div className="email-box">
                    <h4 className='heading-label'>{this.props.logonBy}</h4>
                  </div>

                  <div className="action-button"> 
                      {!this.props.isLoggedIn ? 
                        <button onClick={this.handleChangeMobile} className="btn-block btn-blackbg">Change</button>
                      : '' }                    
                  </div>
               
              </div>
              
              <div className="listRow clearfix"> 
                 <div className='stepActive'>
                  <div className='stepBg'>2</div>
                 </div>           
                  <div className="leftBox bgGrey">
                    <div class="heading-label">Ship To</div>
                    {this.props.isLoggedIn ? <div className='verticalTab'>
                      <div className={`add_tab ${this.state.saved_add}`} onClick={this.savedAddActive}>
                        <div>Saved Address</div>
                      </div>
                      <div className={`add_tab ${this.state.new_add}`} onClick={this.newAddActive}>
                        <div>New Address</div>
                      </div>
                    </div> : ''}
                  </div>
                  <div className="rightBox">
                    {!this.props.isLoggedIn || this.state.new_add ? <div>
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <label className="from-label" htmlFor="name">Full Name</label>
                        <input type="text" name="name" className="form-control" />
                      </div>
                      <div className="col-md-6 form-group">
                        <label className="from-label" htmlFor="phone">Phone Number</label>
                        <input type="text" name="phone" className="form-control" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <label className='form-label' htmlFor="pin">Pin Code</label>
                        <input type="number" name="pin" className="form-control" value={this.state.pin} onChange={e => this.pinChange(e)} />
                      </div>
                      <div className="col-md-6 form-group">
                        <label  className="from-label" htmlFor="email">Email</label>
                        <input type="text" name="email" className="form-control" />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 form-group">
                        <label className="from-label" htmlFor="address">Address</label>
                        <textarea type="text" name="address" className="form-control" />
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 form-group">
                        <label  className="from-label" htmlFor="city">City/District</label>
                        <input type="text" name="city" className="form-control" value={this.state.city} />
                      </div>
                      <div className="col-md-6 form-group">
                        <label  className="from-label" htmlFor="state">State</label>
                        <input type="text" name="state" className="form-control" value={this.state.state} />
                      </div>
                    </div>
                    </div> : ''}
                    <div className="row">
                      <div className="col-md-12">
                        <div className='bill-address clearfix'>
                          <input className='checkbox' type="checkbox" name="billing" defaultChecked={this.state.same_bill} onChange={this.handleSameBill} />
                          <label className='label-billing' htmlFor="billing">Billing address same as shipping address</label>
                        </div>
                      </div>
                    </div>
                    {!this.state.same_bill ? <div className="bill_div">
                    <div className="row">
                      <div className="col-md-12"><h4>Enter a billing address</h4></div>
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

                    <div className='row'>
                     <div className='col-md-12 bussinessNote'>                    
                        <h5 className='buying'>Buying it for your business.</h5>
                        <div className='noteGstin'><span className='bold'>Note</span>
                        :GSTIN cannot be changed after placing order. Registration state must match either billing or shipping state.</div>
                     </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 form-group">
                        <label htmlFor="gst">GSTIN (Optional)</label>
                        <input type="text" name="gst" className="form-control" />                        
                      </div>
                    </div>

                    <div className='row'>
                     <div className='col-md-12 form-group'>
                     <button className="btn-blackbg btn-block" onClick={this.handleProceed}>Continue</button>
                     </div>                    
                    </div>

                    
                  </div>
                
              </div>
              
              <div className="listRow clearfix">
                 <div className='stepActive'>
                  <div className='stepbgNone'>3</div>
                 </div>
                <div className="leftBox">
                <div className='heading-label'>Pay By</div>
                </div>
                <div className="rightBox">
                <div className='heading-label'>Choose a payment method</div>
                </div>
              </div>
              
            </div>
      )
    }
}