import React from 'react';
import '../../../public/styles/checkout.scss';
import axios from 'axios';
import { Step1Component } from './step1';
import { Step2Component } from './step2';
import { Step3Component } from './step3';
import { OrderSummaryComponent } from './orderSummary'
import appCookie from '../../utils/cookie';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';
import { isMobile } from '../../utils/utilityManager';
import MWebLogo from '../../components/SVGs/mWebLogo';
import {CHECKOUT, WALLETS_MAPPING } from '../../constants/app/checkoutConstants';

import {
  storeId,
  accessToken,
  accessTokenCookie,
  userLoginAPI,
  userDataAPI,
  UserVerifyAPI,
  OrderSummaryAPI,
  CreateCheckSumAPI,
  host,
  secureHttp,
  port2,
  shipModeAPI,
} from '../../../public/constants/constants';
import FailPop from './failPop';

export class CheckoutComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      has_pass: false,
      same_bill: true,
      step: 1,
      logon_by: '',
      loggedIn: false,
      loginStatus: 'Login/Register',
      userType: 'Hello Guest!',
      showGift: false,
      loggedIn: false,
      addressList: null,
      orderSummaryData: '',
      ship_add: '',
      pay: false,
      BankID: '',
      paymentMode: '',
      paymentId: '',
      failPop: false,
      redirect: false,
      shipMode: null,
      isCheckSumAPIFail: false,
    }
  }

  componentDidMount() {
    var parsed = queryString.parse(location.search);
    if (parsed && parsed.status == "fail") {
      this.setState({
        failPop: true
      })
    }
    var coke = appCookie.get('isLoggedIn');
    this.callOrderSummaryAPI();
    this.fetchShipModeAPI();
    if (coke == 'true') {
      this.callprofileAPI()
        .then((data) => {
          this.setState({
            step: 2,
            loggedIn: true,
            logon_by: data.logonID
          })
        }).catch(error => {
          throw new Error(error);
        })
    }
  }

  callprofileAPI = () => {
    return new Promise((resolve, reject) => {
      let token = appCookie.get('accessToken')
      axios.get(userDataAPI, {
        headers: { store_id: storeId, access_token: token }
      }).then(response => {
        resolve(response.data.data);
      }).catch(error => {
        reject(error);
      })
    })
  }

  fetchShipModeAPI() {
    axios
      .get(shipModeAPI, {
        headers: { store_id: storeId, access_token: accessToken },
      })
      .then(response => {
        this.setState({
          shipMode: response.data.data.shipModes[0].shipModeId,
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


  handleUserLogin(data) {

    this.checkUserExist(data)
      .then(this.CallLoginApi)
      .catch((err) => {
      })
  }

  checkUserExist = (data) => {
    return new Promise((resolve, reject) => {
      var obj = {
        logon_id: data.user_id
      }
      axios.get(`${UserVerifyAPI}${data.user_id}`, {
        headers: { store_id: storeId, access_token: accessToken },
      }).then(response => {

        resolve(data);
      }).catch(error => {
        this.setState({
          message: 'user verify err',
        });
        reject(error);
      })
    })
  }

  CallLoginApi = (data) => {
    this.setState({ message: null });
    axios
      .post(userLoginAPI, data, {
        headers: { store_id: storeId, access_token: accessToken },
      })
      .then(response => {
        window.location.reload();
        appCookie.set('isLoggedIn', true, 365 * 24 * 60 * 60 * 1000);
        document.cookie = `${accessTokenCookie}=${
          response.data.data.access_token
          };path=/;expires=''`;
		 document.cookie = `userID=${
          response.data.data.userID
          };path=/;expires=''`;
        this.setState({
          loginStatus: 'Logout',
          userType: 'Hello User!',
          show: false
        });

      })
      .catch(error => {
        const errorData = error.response.data;
        const errorMessage = errorData.error.error_message;
        this.setState({
          message: `Password entered is incorrect. Please try again or uncheck the above box to proceed.`,
        });
      });
  }

  handleChange = () => {
    if (this.state.step == 2) {
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

  showGiftCard = () => {

  }

  handleChangeMobile = () => {
    this.setState({
      step: 1
    })
  }

  callOrderSummaryAPI = () => {
    let token = appCookie.get('accessToken');
    axios.get(OrderSummaryAPI, {
      headers: { store_id: storeId, access_token: token }
    }).then(response => {
      if (!response.data.data.orderSummary.netAmount) {
        this.setState({
          redirect: true
        })
        return;
      }
      this.setState({
        orderSummaryData: response.data.data.orderSummary
      })
    }).catch(error => {
    })
  }

  handleAddress = (address) => {
    this.setState({
      ship_add: address
    })
  }

  initialBdpayment = (data) => {
    var body = {
      orderId: this.state.ship_add.orderId,
      email: this.state.logon_by.includes('@') ? this.state.logon_by : null,
      mobile: !this.state.logon_by.includes('@') ? this.state.logon_by : null,
      payMethodId: this.state.paymentId,
      amount: this.state.orderSummaryData.netAmount,
      billing_address_id: this.state.ship_add.billAddId,
      callbackUrl: `${secureHttp}://${host}:${port2}/api/v1/secure/payment/handlePayment`,
      BankID: this.state.BankID,
      paymentMode: this.state.paymentMode
    };
    var payCategoryId;
    if (this.state.paymentMode === 'DEBIT_CARD') {
      payCategoryId = 'DEBIT';
    }
    else if (this.state.paymentMode === 'CC_EMI') {
      payCategoryId = 'EMI';
    }
    else if (this.state.paymentMode === 'UPI') {
      payCategoryId = 'UPI';
    }
    else { //CREDIT_CARD case
      payCategoryId = 'CREDIT';
    }

    let token = appCookie.get("accessToken");
    axios
      .post(CreateCheckSumAPI, body, {
        headers: { store_id: storeId, access_token: token }
      })
      .then(response => {
        var res = response.data.data.response;
        if (this.state.paymentMode === "COD") {
          window.location.assign(
            `${window.location.origin}/check/payment/${
              response.data.data.orderId
            }`
          );
          ///order/confirm/:orderId
          return;
        }

        var url = `${res.transactionUrl}?msg=${
          res.msg
        }&txtPayCategory=${payCategoryId}`;
        if (
          this.state.paymentMode == "NET_BANKING" ||
          this.state.paymentMode == "WALLET" ||
          Object.values(WALLETS_MAPPING).includes(this.state.paymentMode)
        ) {
          url = `${res.transactionUrl}&msg=${res.msg}`;
        }
        window.location.assign(url);
      })
      .catch(err => {
        if (this.state.paymentMode === "COD") {
          window.location.assign(
            `${window.location.origin}/checkout?status=fail`
          );
        }
        this.setState({
          isCheckSumAPIFail: true
        });
      });
  }

  enalblePay = (data) => {
    this.setState({
      pay: true,
      BankID: data.BankID,
      paymentMode: data.paymentMode,
      paymentId: data.paymentId
    })
  }

  disablePay = () => {
    this.setState({
      pay: false
    })
  }

  handleStep = () => {
    if (this.state.step == 3) {
      return <Step3Component
        back={this.handleChange}
        backtoMobile={this.handleChangeMobile}
        address={this.state.ship_add}
        logonBy={this.state.logon_by}
        isLoggedIn={this.state.loggedIn}
        initialBdpayment={this.initialBdpayment}
        enalblePay={this.enalblePay}
        disablePay={this.disablePay}
        netAmount={this.state.orderSummaryData.netAmount} />

    } else if (this.state.step == 2) {
      return <Step2Component
        proceed={this.handleProceed}
        back={this.handleChange}
        isLoggedIn={this.state.loggedIn}
        logonBy={this.state.logon_by}
        handleAddress={this.handleAddress}
        netAmount={this.state.orderSummaryData.netAmount}
        shipModePro={this.state.shipMode} />

    } else {
      return <Step1Component
        proceed={this.handleProceed}
        login={this.handleUserLogin.bind(this)}
        proceedToSecond={this.proceedToSecond}
        logonBy={this.state.logon_by}
        msg={this.state.message}
        netAmount={this.state.orderSummaryData.netAmount} />
    }
  }

  proceedToSecond = (uid) => {
    this.setState({
      logon_by: uid,
      step: 2
    })
  }

  cancelFail = () => {
    this.setState({
      failPop: false
    })
  }

  handleProceed = () => {
    if (this.state.step == 1) {
      this.setState({
        step: 2,
        has_pass: false
      })
    } else if (this.state.step == 2) {
      this.setState({
        step: 3
      })
    }
  }

  handleBack = () => {
    if(this.state.step == 1){
      this.setState({
        redirect: true
      })
    }
    if (this.state.loggedIn && this.state.step == 2) {
      this.setState({
        redirect: true
      })
    } else {
      this.setState({
        step: this.state.step - 1
      })
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/cart' />;
    }
    return (
      <div className='checkout'>
        {isMobile() && <div className='mob-checkout-steps'>
          <a onClick={this.handleBack} className="backBtn">
		  <img src={require('../../../public/images/LeftArrowWhite.svg')} alt='Left'/></a>
          <a href="/" className='mob-header-logo'><MWebLogo width="24" height="24" /></a>
          <h2 className='title'> Checkout (Step {this.state.step}/3) </h2>
        </div>}
        <div className="container">
          <div className='row'>
            <div className='col-md-8'>
              <h3 className='heading'>{CHECKOUT}</h3>
            </div>
            {this.state.failPop ? <FailPop cancelFail={this.cancelFail} /> : ''}
            <div className='col-md-4'>
              <div className='summaryHeading'>
              </div>
            </div>
          </div>

          <div className="row">
            <div className='col-md-12'>
              <div className='row'>
                {this.handleStep()}
                <OrderSummaryComponent
                  isLoggedIn={this.state.loggedIn}
                  orderData={this.state.orderSummaryData}
                  pay={this.state.pay}
                  initialBdpayment={this.initialBdpayment}
                  isCheckSumAPIFailPro={this.state.isCheckSumAPIFail}
                  checkoutStep={this.state.step} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}