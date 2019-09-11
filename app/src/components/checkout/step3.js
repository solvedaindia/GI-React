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
  BankListAPI
} from '../../../public/constants/constants';
import {
  getReleventReduxState
} from '../../utils/utilityManager';
import {PAY_BY,MOBILE_EMAIL, CHANGE, SHIP_TO, CHOOSE_A_PAYMENT_METHOD, CREDIT_CARD, DEBIT_CARD, NET_BANKING,EMI, WALLETS} from '../../constants/app/checkoutConstants';

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
      var bankdata = response.data.data.bankList;
      var banks = [];
      var wallets = [];
      bankdata.forEach((elem) => {
        if (elem.Type == "Bank") {
          banks.push(elem)
        }
        if (elem.Type == "Wallet") {
          wallets.push(elem);
        }
      })

      this.setState({
        banks: banks,
        wallets: wallets
      })
    }).catch((err) => {
    })
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
    if (this.state.netBankCheck) {
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

  handleOptionChange(event) {
    this.setState({
      CODCheck: false,
      EMICheck: false,
      creditCheck: false,
      debitCheck: false,
      UPICheck: false,
      walletCheck: false,
      netBankCheck: false
    })
  
    if (event.target.name == "credit") {
      this.props.enalblePay({ paymentMode: 'CREDIT_CARD', paymentId: 'CREDIT_CARD' });
      return this.setState({
        showBanks: false,
        showWallets: false,
        paymentModeId: 'CREDIT_CARD',
        creditCheck: true
      })
    }
    if (event.target.name == "debit") {
      this.props.enalblePay({ paymentMode: 'DEBIT_CARD', paymentId: 'DEBIT_CARD' });
      return this.setState({
        showBanks: false,
        showWallets: false,
        paymentModeId: 'DEBIT_CARD',
        debitCheck: true
      })
    }
    if (event.target.name == "netBank") {
      this.props.disablePay();
      return this.setState({
        showBanks: false,
        showWallets: false,
        paymentModeId: 'NET_BANKING',
        netBankCheck: true
      })
    }
    if (event.target.name == 'COD') {
      this.props.disablePay();
      return this.setState({
        showBanks: false,
        showWallets: false,
        paymentModeId: 'COD',
        CODCheck: true
      })
    }
    if (event.target.name == 'UPI') {
      this.props.enalblePay({ paymentMode: 'UPI', paymentId: 'UPI' });
      return this.setState({
        showBanks: false,
        showWallets: false,
        paymentModeId: 'UPI',
        UPICheck: true
      })
    }
    if (event.target.name == 'EMI') {
      this.props.enalblePay({ paymentMode: 'CC_EMI', paymentId: 'CC_EMI' });
      return this.setState({
        showBanks: false,
        showWallets: false,
        paymentModeId: 'CC_EMI',
        EMICheck: true
      })
    }
    if (event.target.name == 'wallet') {
      this.props.disablePay();
      return this.setState({
        showBanks: false,
        showWallets: false,
        paymentModeId: 'WALLET',
        walletCheck: true
      })
    }
  }

  renderWallets = () => {
    if (this.state.walletCheck) {
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
    var paymentId;
    if (wallet.bankName.includes('PhonePe')) {
      paymentId = 'PHONEPE';
    }
    else if (wallet.bankName.includes('Mobikwik')) {
      paymentId = 'MOBIKWIK';
    }
    else if (wallet.bankName.includes('PayTM')) {
      paymentId = 'PAYTM';
    }
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
              <h4 className='heading-label'>{this.props.address.address}, {this.props.address.city}, {this.props.address.state}, {this.props.address.pincode}</h4>
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
                    <label className='form-label' htmlFor='credit'>{DEBIT_CARD}</label>
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

                </div>

              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}