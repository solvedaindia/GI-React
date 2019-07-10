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
import appCookie from '../../utils/cookie';
import Link from 'react-router-dom/Link';
import {
  storeId,
  accessToken,
  accessTokenCookie,
  BankListAPI
} from '../../../public/constants/constants';
import {
    getReleventReduxState
  } from '../../utils/utilityManager';

export class Step3Component extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          showGift: false,
          showBanks: false,
          showWallets: false,
          banks: '',
          wallets: '',
          bankId: '',
          paymentModeId: '',
          CODCheck: false,
          EMICheck: false,
          creditCheck: false,
          UPICheck: false,
          walletCheck: false,
          netBankCheck: false
        }
    }

    componentDidMount() {
      this.callBankDataAPI();
    }

    callBankDataAPI = () => {
      let token = appCookie.get('accessToken');
        axios.get(BankListAPI, {
          headers: {
            store_id: storeId,
            access_token: token
          }
        }).then((response) => {
          console.log(response, "this is bank list response")
          var bankdata = response.data.data.bankList;
          var banks = [];
          var wallets = [];
          bankdata.forEach((elem) => {
            if(elem.Type == "Bank") {
              banks.push(elem)
            }
            if(elem.Type == "Wallet") {
              wallets.push(elem);
            }
          })

          this.setState({
            banks: banks,
            wallets: wallets
          })
        }).catch((err) => {
          console.log(err);
        })
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
          showBanks: true,
          showWallets: false
        })
      }
    }

    checkBanks(index) {
      var bank = this.state.banks[index]
      var data = {
        BankID: bank.bankID,
        paymentMode: 'NET_BANKING'
      }
      this.props.enalblePay(data);
    }
    renderBanks = () => {
      if(this.state.netBankCheck) {
        var menuItems = [];
        this.state.banks.forEach((item, index) => {
          menuItems.push(<div><MenuItem key={index} onClick={this.checkBanks.bind(this, index)} eventKey={index+1}>{item.bankName}</MenuItem>
          <MenuItem divider /></div>)
        })
        return <DropdownButton
                  bsSize="large"
                  title="Select a Bank"
                  id="dropdown-size-large"
                >
                  {menuItems}
                </DropdownButton>
      }
    }

    showWallets = () => {
      console.log("show walledts call")
      if(this.state.showWallets) {
        this.setState({
          showWallets: false
        })
      } else {
        this.setState({
          showWallets: true,
          showBanks: false
        })
      }
    }

    handleOptionChange(event) {
      this.setState({
        CODCheck: false,
        EMICheck: false,
        creditCheck: false,
        UPICheck: false,
        walletCheck: false,
        netBankCheck: false
      })
      // if(event.target.name == "credit" || event.target.name == "UPI" || event.target.name == "EMI") {
      //   this.props.enalblePay();
      // } else {
      //   this.props.disablePay();
      // }
      if(event.target.name == "credit") {
        this.props.enalblePay({paymentMode: 'CREDIT_CARD'});
        return this.setState({
          showBanks: false,
          showWallets: false,
          paymentModeId: 'CREDIT_CARD',
          creditCheck: true
        })
      }
      if(event.target.name == "netBank") {
        this.props.disablePay();
        return this.setState({
          showBanks: false,
          showWallets: false,
          paymentModeId: 'NET_BANKING',
          netBankCheck: true
        })
      }
      if(event.target.name == 'COD') {
        this.props.disablePay();
        return this.setState({
          showBanks: false,
          showWallets: false,
          paymentModeId: 'COD',
          CODCheck: true
        })
      }
      if(event.target.name == 'UPI') {
        this.props.enalblePay({paymentMode: 'UPI'});
        return this.setState({
          showBanks: false,
          showWallets: false,
          paymentModeId: 'UPI',
          UPICheck: true
        })
      }
      if(event.target.name == 'EMI') {
        this.props.enalblePay({paymentMode: 'CC_EMI'});
        return this.setState({
          showBanks: false,
          showWallets: false,
          paymentModeId: 'CC_EMI',
          EMICheck: true
        })
      }
      if(event.target.name == 'wallet') {
        this.props.disablePay();
        return this.setState({
          showBanks: false,
          showWallets: false,
          paymentModeId: 'EMI',
          walletCheck: true
        })
      }
    }

    renderWallets = () => {
      if(this.state.walletCheck) {
        console.log("rendering show wallets")
        var menuItems = [];
        this.state.wallets.forEach((item, index) => {
          menuItems.push(<div><MenuItem eventKey={index+1} key={index} onClick={this.checkWallet.bind(this, index)}>{item.bankName}</MenuItem>
            <MenuItem divider /></div>)
        })
        return <DropdownButton
                  bsSize="large"
                  title="Select a Wallet"
                  id="dropdown-size-large"
                >
                  {menuItems}
                </DropdownButton>
      }
    }
    
    checkWallet(index) {
      var wallet = this.state.wallets[index];
      var data = {
        BankID: wallet.bankID,
        paymentMode: ''
      }
      console.log(wallet, "this is selected wallet");

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
                     <h4 className='heading-label'>{this.props.logonBy}</h4>                     
                  </div>   

                  {!this.props.isLoggedIn ? <div className="action-button">
                     <button onClick={this.handleChangeMobile} className="btn-block btn-blackbg">Change</button>
                    </div>: ''}         
              </div>

              <div className='listRow bgfullflex clearfix'>
                  <div className='stepActive'>
                    <div className='checkmark'></div>    
                  </div> 
                  <div className="labeltext-box leftBox shiptoBg">
                    <div className="bgGrey">
                      <h4 className="heading-label">Ship to</h4>
                    </div>
                  </div>

                  <div className="email-box"> 
                    <h4 className='heading-label'>{this.props.address.address}, {this.props.address.city}, {this.props.address.state}, {this.props.address.pincode}</h4>
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
                    <div className='labelInput-greybg customCheckbox clearfix'>
                    <div class="input_box">
                      <input className='inputCheck' type="checkbox" id="checkbox" name="redeem" />
                      <label class="lblCheck defaultlbl" htmlFor="checkbox"></label>
                    </div>
                     
                    <label className='form-label' htmlFor="redeem">Godrej Credit <div className="clearfix"></div><span className='pricetext'>500 Credit used in this order</span></label>
                    </div>

                    <div className='labelInput-greybg customCheckbox clearfix'>
                    <div class="input_box">                      
                      <input className='inputCheck' id="checkboxRedeem" type="checkbox" name="redeem" onChange={this.showGiftCard}/>
                      <label class="lblCheck defaultlbl" htmlFor="checkboxRedeem"></label>
                    </div>
                      
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
                        <input className='inputRadio' type="radio" name="credit" checked={this.state.creditCheck} onChange={this.handleOptionChange.bind(this)} />
                        <label className='form-label'>Credit Card/Debit Card</label>
                      </div>

                      <div className="pay_radio">                        
                        <input className='inputRadio' type="radio" name="netBank" checked={this.state.netBankCheck} onChange={this.handleOptionChange.bind(this)} />
                        <label className='form-label'>Netbanking</label>
                      </div>

                      {this.renderBanks()}

                      <div className="pay_radio">                        
                        <input name="cod" className='inputRadio' type="radio" name="COD" checked={this.state.CODCheck} onChange={this.handleOptionChange.bind(this)} />
                        <label className='form-label'>Cash on Delivery</label>
                      </div>

                      <div className="pay_radio">                        
                        <input className='inputRadio' type="radio" name="UPI" checked={this.state.UPICheck} onChange={this.handleOptionChange.bind(this)} />
                        <label className='form-label'>UPI Payment</label>
                      </div>

                      <div className="pay_radio">                        
                        <input className='inputRadio' type="radio" name="EMI" checked={this.state.EMICheck} onChange={this.handleOptionChange.bind(this)} />
                        <label className='form-label'>EMI</label>
                      </div>

                      <div className="pay_radio">                        
                        <input className='inputRadio' type="radio" name="wallet" checked={this.state.walletCheck} onChange={this.handleOptionChange.bind(this)} />
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