import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import '../../../public/styles/checkout.scss';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import axios from 'axios';
import Link from 'react-router-dom/Link';
import {
    getReleventReduxState
  } from '../../utils/utilityManager';

export class Step3Component extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          showGift: false,
          showBanks: false,
          showWallets: false
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

    // callGodrejCreditAPI = () => {
    //   axios.get()
    // }

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

    showBanks = () => {
      if(this.state.showBanks) {
        this.setState({
          showBanks: false
        })
      } else {
        this.setState({
          showBanks: true
        })
      }
    }
    renderBanks = () => {
      if(this.state.showBanks) {
        return <DropdownButton
                  bsSize="large"
                  title="Select a Bank"
                  id="dropdown-size-large"
                >
                  <MenuItem eventKey="1">State Bank of India</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="2">ICICI Bank</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="3">Catholic Syrian Bank</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="4">Bank of Baroda</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="5">HDFC Bank</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="6">Kotak Bank</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="7">Syndicate Bank</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="8">Allahbad Bank</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="9">Punjab National Bank</MenuItem>
                </DropdownButton>
      }
    }

    renderWallets = () => {
      if(this.state.showWallets) {
        return <DropdownButton
                  bsSize="large"
                  title="Select a Bank"
                  id="dropdown-size-large"
                >
                  <MenuItem eventKey="1">State Bank of India</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="2">ICICI Bank</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="3">Catholic Syrian Bank</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="4">Bank of Baroda</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="5">HDFC Bank</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="6">Kotak Bank</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="7">Syndicate Bank</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="8">Allahbad Bank</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="9">Punjab National Bank</MenuItem>
                </DropdownButton>
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
           <div className="col-md-8 checkout_wrapper">           
              <div className='listRow clearfix'>
                  <div className='stepActive'>
                    <div className='checkmark'></div>    
                  </div> 
                  <div className="labeltext-box">
                    <h4 className="heading-label">Mobile or Email</h4>
                  </div>

                  <div className="email-box">                  
                     <h4 className='heading-label'>783-347-3248</h4>                     
                  </div>   

                  <div className="action-button">
                     <button onClick={this.handleChangeMobile} className="btn-block btn-blackbg">Change</button>
                  </div>         
              </div>

              <div className='listRow clearfix'>
                  <div className='stepActive'>
                    <div className='checkmark'></div>    
                  </div> 
                  <div className="labeltext-box">
                    <h4 className="heading-label">Ship to</h4>
                  </div>

                  <div className="email-box"> 
                    <h4 className='heading-label'>#321, Oceanus freesia enclave, E block, 7th cross, Bellandur Bangalore, 560099</h4>
                  </div>

                  <div className="action-button">
                        <button onClick={this.handleChange} className="btn-block btn-blackbg">Change</button>
                  </div>
              </div>

             
              <div className='listRow clearfix'>
                 <div className='stepActive'>
                  <div className='stepBg'>3</div>
                 </div>
                <div>
                  <div className="labeltext-box">
                    <h4 className='heading-label'>Pay by</h4>
                  </div>

                  <div className="paybytext">
                    <div className='labelInput-greybg clearfix'>
                      <input className='inputCheck' type="checkbox" name="redeem" />
                      <label className='form-label' htmlFor="redeem">Godrej Credit <br/><span className='pricetext'>500 Credit used in this order</span></label>
                    </div>

                    <div className='labelInput-greybg clearfix'>
                      <input className='inputCheck' type="checkbox" name="redeem" onChange={this.showGiftCard}/>
                      <label className='form-label' htmlFor="redeem">Redeem Gift Card</label>
                      <div className='clearfix'></div>
                      {this.state.showGift ? <div className="giftCard">
                        <div className="giftcard-input">
                          <input type="text" placeholder="Gift Card Number" className="form-control" />
                        </div>
                        <div className="applybtn">
                           <button className="btn-block btn-blackbg">Apply</button>
                        </div>
                      </div> : ''}
                    </div>
 
                   <div className='paymentMethod'>
                    <h4 className='heading'>Select Payment Method</h4>                    
                      <div className="pay_radio">                        
                        <input className='inputRadio' type="radio" name="optradio" />
                        <label className='form-label'>Credit Card/Debit Card</label>
                      </div>

                      <div className="pay_radio">                        
                        <input className='inputRadio' type="radio" name="optradio" onChange={this.showBanks} />
                        <label className='form-label'>Netbanking</label>
                      </div>

                      {this.renderBanks()}

                      <div className="pay_radio">                        
                        <input className='inputRadio' type="radio" name="optradio" />
                        <label className='form-label'>Cash on Delivery</label>
                      </div>

                      <div className="pay_radio">                        
                        <input className='inputRadio' type="radio" name="optradio" />
                        <label className='form-label'>UPI Payment</label>
                      </div>

                      <div className="pay_radio">                        
                        <input className='inputRadio' type="radio" name="optradio" />
                        <label className='form-label'>EMI</label>
                      </div>

                      <div className="pay_radio">                        
                        <input className='inputRadio' type="radio" name="optradio" />
                        <label className='form-label'>Wallets</label>
                      </div>
                      {this.renderWallets()}
                    
                    </div>

                  </div>
                </div>
              </div>
            </div>
      )
    }
}