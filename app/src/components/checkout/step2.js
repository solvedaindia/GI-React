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
import PinChangePopup from './pinChangeModal'
import { Button, Modal } from 'react-bootstrap';
import Input from '../Primitives/input'
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
          phone: '',
          email: '',
          same_bill: true,
          step: 1,
          showGift: false,
          addressList: null,
          saved_add: 'active_add',
          new_add: null,
          pin: '',
          city: '',
          state: '',
          pinPop: false
        }
    }

    componentDidMount() {
      if(this.props.isLoggedIn) {
        this.callAddressAPI()
          .then((data) => {
            if(data.length > 0) {
              this.setState({
                addressList: data
              })
            }
          })
      }
      if(this.props.logonBy && this.props.logonBy.includes('@')) {
        this.setState({
          email: this.props.logonBy
        })
      } else {
        this.setState({
          phone: this.props.logonBy
        })
      }
    }

    callAddressAPI = () => {
      return new Promise((resolve, reject) => {
        let token = appCookie.get('accessToken')
        axios.get(addressListAPI, {
          headers: { store_id: storeId, access_token: token }
        }).then(response => {
          console.log(response.data.data, "address list reponse")
          resolve(response.data.data.addressList);
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
    if(this.state.addressList) {
      this.setState({
        saved_add: 'active_add',
        new_add: null
      })
    }  
    }

    callPinApi = (val) => {
      let token = appCookie.get('accessToken')
      let defPin = appCookie.get('pincode');
      console.log(defPin, "this is defpin")
      if(val == defPin) {
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
      } else {
        console.log("in else  statement")
        this.setState({
          pinPop: true
        })
      }
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

      cancelPinPop = () => {
        this.setState({
          pinPop: false
        })
      }

      phoneChange = (e) => {
        this.setState({
          phone: e.target.value
        })
      }

      mailChange = (e) => {
        this.setState({
          email: e.target.value
        })
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

    renderAddressList = () => {
      if(this.state.addressList && this.state.addressList.length > 0) {
        var list = [];
        this.state.addressList.forEach((add) => {
          list.push(
            <div className="col-md-12">
              <ul class="saveAddress">
                <li className='list'>
                  <div className='inputBox'>
                     <input type="radio" name="optradio"  checked />
                  </div>
                 
                  <div className='addressText'>{`${add.address}, ${add.city}, ${add.state}, ${add.pincode}`}</div>
                </li>
              </ul>
            </div>
            )
        });
        return <div className="row">{list}</div>;
      }
    }

    handleProceed = () => {
      this.props.proceed();
    }

    render() {
      return (
          
            <div className="col-md-8 checkout_wrapper">
              {this.state.pinPop ? <PinChangePopup cancel={this.cancelPinPop} /> :'' }
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

              <div className="listRow bgfullflex clearfix">
                <div className='stepActive'>
                  <div className='stepBg'>2</div>
                </div>
                <div className="leftBox bgGrey">
                  <div className="heading-label">Ship To</div>
                  {this.props.isLoggedIn ? <div className='verticalTab'>
                    <div className={`add_tab ${this.state.saved_add}`} onClick={this.savedAddActive}>
                      <div style={!this.state.addressList ? {color: 'grey'} : {color:'black'} }>Saved Address</div>
                    </div>
                    <div className={`add_tab ${this.state.new_add}`} onClick={this.newAddActive}>
                      <div>New Address</div>
                    </div>
                  </div> : ''}
                </div>
                <div className="rightBox">
                  {!this.props.isLoggedIn || this.state.new_add ? <div>
                    <div className="row">
                      <div className="col-md-6 colpaddingRight">
                        <div className="form-div clearfix div-error">
                          <Input inputType="text" title="Full Name" id="name" name="name" />                        
                        </div>
                        {/* <label className="from-label" htmlFor="name">Full Name</label>
                        <input type="text" name="name" className="form-control" /> */}
                      </div> 
                      <div className="col-md-6">
                        {/* <label className="from-label" htmlFor="phone">Phone Number</label>
                        <input type="text" name="phone" className="form-control" value={this.state.phone} onChange={e=>
                        this.phoneChange(e)} /> */}

                        <div className="form-div clearfix div-error">
                          <Input inputType="text" title="Phone Number"  name="phone" value={this.state.phone} onChange={e=> this.phoneChange(e)} />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 colpaddingRight">
                        {/* <label className='form-label' htmlFor="pin">Pin Code</label>
                        <input type="number" name="pin" className="form-control" value={this.state.pin} onChange={e=>
                        this.pinChange(e)} /> */}
                        <div className="form-div clearfix div-error">
                          <Input inputType="number" title="Pin Code" name="pin" value={this.state.pin} onChange={e=> this.pinChange(e)}/>
                        </div>
                      </div>
                      <div className="col-md-6">
                        {/* <label className="from-label" htmlFor="email">Email</label>
                        <input type="text" name="email" className="form-control" value={this.state.email} onChange={e=>
                        this.mailChange(e)} /> */}
                        <div className="form-div clearfix div-error">
                          <Input inputType="text" title="Email" id="email" name="Email" value={this.state.email} onChange={e=> this.mailChange(e)} />    
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        {/* <label className="from-label" htmlFor="address">Address</label>
                        <textarea type="text" name="address" className="form-control" /> */}
                         <div className="form-div clearfix div-error">
                            <Input inputType="text" title="Address" id="address" name="address" />
                         </div>
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 colpaddingRight">
                        {/* <label  className="from-label" htmlFor="city">City/District</label>
                        <input type="text" name="city" className="form-control" value={this.state.city} /> */}
                         <div className="form-div clearfix div-error">
                           <Input inputType="text" title="City/District" id="city" name="city" value={this.state.city} />
                         </div>
                      </div>
                      <div className="col-md-6">
                        {/* <label  className="from-label" htmlFor="state">State</label>
                        <input type="text" name="state" className="form-control" value={this.state.state} /> */}
                         <div className="form-div clearfix div-error">
                           <Input inputType="text" title="State" id="state" name="state" value={this.state.state} />
                         </div>
                      </div>
                    </div>
                    </div> : this.renderAddressList()}
                    <div className="row">
                      <div className="col-md-12">
                        <div className='bill-address customCheckbox clearfix'>
                        <div className='input_box'>
                          <input className='checkbox inputCheck' id="checkbox" type="checkbox" name="billing" defaultChecked={this.state.same_bill} onChange={this.handleSameBill} />
                          <label className="lblCheck" htmlFor="checkbox"></label>
                         </div>
                          <label className='label-billing defaultlbl' htmlFor="billing">Billing address same as shipping address</label>
                        </div>
                      </div>
                    </div>
                    {!this.state.same_bill ? <div className="bill_div">
                    <div className="row">
                      <div className="col-md-12"><h4>Enter a billing address</h4></div>
                    </div>
                    <div className="row">
                    <div className="col-md-6 colpaddingRight">
                      {/* <label htmlFor="fullname">Full Name</label>
                      <input type="text" name="fullname" className="form-control" /> */}
                        <div className="form-div clearfix div-error">
                           <Input inputType="text" title="Full Name" id="fullname" name="fullname"/>
                         </div>
                    </div>
                    <div className="col-md-6">
                      {/* <label htmlFor="phone">Phone Number</label>
                      <input type="text" name="phone" className="form-control" /> */}
                       <div className="form-div clearfix div-error">
                         <Input inputType="text" title="Phone Number" id="phone" name="phone"/>
                       </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6 colpaddingRight">
                      {/* <label htmlFor="pin">Pin Code</label>
                      <input type="text" name="pin" className="form-control" /> */}
                       <div className="form-div clearfix div-error">
                         <Input inputType="text" title="Pin Code" id="pin" name="pincode"/>
                       </div>
                    </div>
                    <div className="col-md-6">
                      {/* <label htmlFor="email">Email</label>
                      <input type="text" name="email" className="form-control" /> */}
                      <div className="form-div clearfix div-error">
                         <Input inputType="text" title="Email" id="email" name="email"/>
                       </div>
                    </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                         <div className="form-div clearfix div-error">
                           <div className="form-group">                           
                           <textarea type="text" name="address" className="form-control" />
                           <label className="form-label" htmlFor="address">Address</label>
                           </div>
                          </div>
                        
                        </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 colpaddingRight">
                        {/* <label htmlFor="city">City/District</label>
                        <input type="text" name="city" className="form-control" /> */}
                        <div className="form-div clearfix div-error">
                         <Input inputType="text" title="City/District" name="city"/>
                       </div>
                      </div>
                      <div className="col-md-6">
                        {/* <label htmlFor="state">State</label>
                        <input type="text" name="state" className="form-control" /> */}
                        <div className="form-div clearfix div-error">
                         <Input inputType="text" title="State" name="city"/>
                       </div>
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
                      <div className="col-md-12">
                        {/* <label htmlFor="gst">GSTIN (Optional)</label>
                        <input type="text" name="gst" className="form-control" />                         */}
                        <div className="form-div clearfix div-error">
                         <Input inputType="text" title="GSTIN (Optional)" name="city"/>
                       </div>
                      </div>
                    </div>

                    <div className='row'>
                     <div className='col-md-12 form-group'>
                     <button className="btn-blackbg btn-block continueMargin" onClick={this.handleProceed}>Continue</button>
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