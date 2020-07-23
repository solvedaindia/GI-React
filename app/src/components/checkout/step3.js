import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import '../../../public/styles/checkout.scss';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import axios from 'axios';
import appCookie from '../../utils/cookie';
import Link from 'react-router-dom/Link';
import { isMobile } from '../../utils/utilityManager';
import {
  storeId,
  accessToken,
  accessTokenCookie,
  BankListAPI,
  paymentMethods
} from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';
import {
  getReleventReduxState
} from '../../utils/utilityManager';
import {PAY_BY,MOBILE_EMAIL, CHANGE, SHIP_TO, CHOOSE_A_PAYMENT_METHOD, CREDIT_CARD, DEBIT_CARD, NET_BANKING,EMI, WALLETS} from '../../constants/app/checkoutConstants';
import { triggerPaymentOptionGTEvent } from '../../utils/gtm';
import { WALLETS_MAPPING } from '../../constants/app/checkoutConstants';

export class Step3Component extends React.Component {
  constructor(props) {
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
      debitCheck: false,
      UPICheck: false,
      walletCheck: false,
      netBankCheck: false,
      selectedBank: 'Select a Bank',
      selectedWallet: 'Select a Wallet',
      paymentMethods: [],
      checkedPaymentID: '',
      CODAmount: null,
    }
  }

  componentDidMount() {
    triggerPaymentOptionGTEvent();
    this.fetchPaymentMethods();
  }

  componentDidUpdate() {
    triggerPaymentOptionGTEvent();
  }

  fetchPaymentMethods() {
    apiManager.get(paymentMethods)
    .then(response => {
      var banks = [];
      var wallets = [];
      response.data.data.paymentMethods && response.data.data.paymentMethods.forEach(data => {
        if (data.paymentMethodName === 'NET_BANKING') {
          data.childPaymentMethods.forEach(childData => {
            banks.push(childData)
          })
        }
        else if (data.paymentMethodName === 'WALLETS') {
          data.childPaymentMethods.forEach(childData => {
            wallets.push(childData);
          })
        }
      })

      this.setState({
        banks: banks,
        wallets: wallets,
        paymentMethods : response.data.data.paymentMethods && response.data.data.paymentMethods,
        CODAmount: response.data.data.CODAmount
      })
    })
    .catch(error => {
     
    });
  }

  handleHasPass = () => {
    if (this.state.has_pass == false) {
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
    if (this.state.same_bill == false) {
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
    if (this.state.showBanks) {
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
      paymentMode: 'NET_BANKING',
      paymentId: 'NET_BANKING'
    }
    this.props.enalblePay(data);
    this.setState({
      selectedBank: bank.bankName,
    })
  }

  renderBanks = () => {
    if (this.state.checkedPaymentID === 'NET_BANKING') {
      var menuItems = [];
      this.state.banks.forEach((item, index) => {
        menuItems.push(<MenuItem key={index} onClick={this.checkBanks.bind(this, index)} eventKey={index + 1}>{item.bankName}</MenuItem>
        )
      })
      return <DropdownButton bsSize="large" title={this.state.selectedBank} id="dropdown-size-large" >
        {menuItems}
      </DropdownButton>
    }
  }

  showWallets = () => {
    if (this.state.showWallets) {
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

  handleOptionChange(event,paymentMethod) {
    this.setState({
      checkedPaymentID: event.target.id,
    })

    if (event.target.id === 'NET_BANKING' || event.target.id === 'WALLETS') {
      this.props.disablePay();
    }
    else {
      this.props.enalblePay({ paymentMode: paymentMethod.paymentMethodName, paymentId: paymentMethod.paymentMethodName});
    }
  }

  renderWallets = () => {
    if (this.state.checkedPaymentID === 'WALLETS') {
      var menuItems = [];
      this.state.wallets.forEach((item, index) => {
        menuItems.push(<MenuItem eventKey={index + 1} key={index} onClick={this.checkWallet.bind(this, index)}>{item.bankName}</MenuItem>)
      })
      return <DropdownButton bsSize="large" title={this.state.selectedWallet} id="dropdown-size-large"                   >
        {menuItems}
      </DropdownButton>
    }
  }

  checkWallet(index) {
    var wallet = this.state.wallets[index];
    var paymentId = WALLETS_MAPPING[wallet.bankName];
    var data = {
      BankID: wallet.bankID,
      paymentMode: paymentId,
      paymentId: paymentId
    };
    this.props.enalblePay(data);
    this.setState({
      selectedWallet: wallet.bankName,
    })

  }
  showGiftCard = () => {
    if (this.state.showGift == true) {
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
      <>
        {isMobile() && <div className='checkout-title'>{PAY_BY}</div>}
        <div className="col-md-8 checkout_wrapper">
          <div className='listRow clearfix'>
            <div className='stepActive'>
              <div className='checkmark'></div>
            </div>
            {!isMobile() ? <div className="labeltext-box">
              <h4 className="heading-label">{MOBILE_EMAIL}</h4>
            </div> : ''}

            <div className="email-box">
              <h4 className='heading-label'>{this.props.logonBy}</h4>
            </div>

            {!this.props.isLoggedIn && !isMobile() ? <div className="action-button">
              <button onClick={this.handleChangeMobile} className="btn-block btn-blackbg">{CHANGE}</button>
            </div> : ''}
          </div>

          <div className='listRow bgfullflex clearfix'>
            <div className='stepActive'>
              <div className='checkmark'></div>
            </div>
            {!isMobile() ? <div className="labeltext-box shiptoBg">
              <div className="bgGrey">
                <h4 className="heading-label">{SHIP_TO}</h4>
              </div>
            </div> : ''}

            <div className="email-box">
              <h4 className='heading-label'>{this.props.address.address1} {this.props.address.address2}, {this.props.address.city}, {this.props.address.state}, {this.props.address.pincode}</h4>
            </div>

            {!isMobile() && <div className="action-button">
              <button onClick={this.handleChange} className="btn-block btn-blackbg">{CHANGE}</button>
            </div>}
          </div>


          <div className='listRow clearfix'>
            <div className='stepActive'>
              <div className='stepBg'>3</div>
            </div>
            <div>
              {!isMobile() ? <div className="labeltext-box">
                <h4 className='heading-label'>{PAY_BY}</h4>
              </div> : ''}

              <div className="paybytext">
               

             

              <div className='paymentMethod customradio'>
                  <h4 className='heading'>{CHOOSE_A_PAYMENT_METHOD}</h4>
                  {this.state.paymentMethods.length > 0 && this.state.paymentMethods.map(item => {
                    //This line is use enable/disable cod payment method
                    if (item.paymentMethodName === 'COD' && this.props.netAmount > this.state.CODAmount) {
                      return null
                    }
                    // if (item.paymentMethodName === 'COD') {
                    //   return null
                    // }
                    return (
                      <>
                        <div className="pay_radio">
                          <div className="inputBox">
                            <input className='inputRadio input' id={item.paymentMethodName} checked={this.state.checkedPaymentID === item.paymentMethodName} type='radio' name={item.paymentMethodName} onChange={(event)=>this.handleOptionChange(event,item)} />
                            <label className='labelchecked' htmlFor={item.paymentMethodName}></label>
                          </div>
                          <label className='form-label' htmlFor={item.paymentMethodName}>{item.description}</label>
                        </div>
                        {item.paymentMethodName === "NET_BANKING" ? this.renderBanks() : null }
                        {item.paymentMethodName === "WALLETS" ? this.renderWallets() : null }
                      </>
                    )
                  })}
                </div>

                {/* <div className='paymentMethod customradio'>
                  <h4 className='heading'>{CHOOSE_A_PAYMENT_METHOD}</h4>
                  <div className="pay_radio">
                    <div className="inputBox">
                      <input className='inputRadio input' id='credit' type='radio' name="credit" checked={this.state.creditCheck} onChange={this.handleOptionChange.bind(this)} />
                      <label className='labelchecked' htmlFor='credit'></label>
                    </div>
                    <label className='form-label' htmlFor='credit'>{CREDIT_CARD}</label>
                  </div>

                  <div className="pay_radio">
                    <div className="inputBox">
                      <input className='inputRadio input' id='debit' type='radio' name="debit" checked={this.state.debitCheck} onChange={this.handleOptionChange.bind(this)} />
                      <label className='labelchecked' htmlFor='debit'></label>
                    </div>
                    <label className='form-label' htmlFor='debit'>{DEBIT_CARD}</label>
                  </div>

                  <div className="pay_radio">
                    <div className="inputBox">
                      <input className='inputRadio input' type="radio" id="netBank" name="netBank" checked={this.state.netBankCheck} onChange={this.handleOptionChange.bind(this)} />
                      <label className='labelchecked' htmlFor='netBank'></label>
                    </div>
                    <label htmlFor='netBank' className='form-label'>{NET_BANKING}</label>
                  </div>

                  {this.renderBanks()}

              

                  <div className="pay_radio">
                    <div className="inputBox">
                      <input className='inputRadio input' id='emi' type="radio" name="EMI" checked={this.state.EMICheck} onChange={this.handleOptionChange.bind(this)} />
                      <label className='labelchecked' htmlFor='emi'></label>
                    </div>
                    <label htmlFor='emi' className='form-label'>{EMI}</label>
                  </div>

                  <div className="pay_radio">
                    <div className="inputBox">
                      <input className='inputRadio input' id='wallet' type="radio" name="wallet" checked={this.state.walletCheck} onChange={this.handleOptionChange.bind(this)} />
                      <label className='labelchecked' htmlFor='wallet'></label>
                    </div>
                    <label htmlFor='wallet' className='form-label'>{WALLETS}</label>
                  </div>
                  {this.renderWallets()}

                </div> */}

              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}