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
import { Step1Component } from './step1';
import { Step2Component } from './step2';
import { Step3Component } from './step3';
import { OrderSummaryComponent } from './orderSummary'
import loadable from 'loadable-components';
import appCookie from '../../utils/cookie';
import queryString from 'query-string';
import apiManager from '../../utils/apiManager';
import failPop from './failPop'
import {
  storeId,
  accessToken,
  accessTokenCookie,
  userLoginAPI,
  addressListAPI,
  userDataAPI,
  UserVerifyAPI,
  OrderSummaryAPI,
  CreateCheckSumAPI
} from '../../../public/constants/constants';
import {
    getReleventReduxState
  } from '../../utils/utilityManager';
import { blue } from 'ansi-colors';
import { timeout } from 'q';
import FailPop from './failPop';

export class CheckoutComponent extends React.Component {
    constructor(props){
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
          failPop: false
        }
    }

    componentDidMount() {
        var parsed = queryString.parse(location.search);
        if(parsed && parsed.status == "fail") {
          this.setState({
            failPop: true
          })
        }
        var coke = appCookie.get('isLoggedIn');
        this.callOrderSummaryAPI();
        console.log(coke, 'coke in did mount');
        if(coke == 'true') {
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
        let url = addressListAPI;
        axios.get(userDataAPI, {
          headers: { store_id: storeId, access_token: token }
        }).then(response => {
          console.log(response, 'profile response')
          resolve(response.data.data);
        }).catch(error => {
          reject(error);
        })
      })
    }

    // callAddressAPI = () => {
    //   return new Promise((resolve, reject) => {
    //     let token = appCookie.get('accessToken')
    //     let url = addressListAPI;
    //     axios.get(addressListAPI, {
    //       headers: { store_id: storeId, access_token: token }
    //     }).then(response => {
    //       resolve(response.data.data);
    //     }).catch(error => {
    //       reject(error);
    //     })
    //   })
    // }

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


    handleUserLogin(data) {
      
      this.checkUserExist(data)
        .then(this.CallLoginApi)
        .catch((err) => {
          console.log(err);
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
          console.log(error, "this is in catch block");
          // const errorData = error.response.data;
          // const errorMessage = errorData.error.error_message;
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
          this.setState({
            loginStatus: 'Logout',
            userType: 'Hello User!',
            show: false
          });
        
        // alert('Successfully Logged In');
      })
      .catch(error => {
        const errorData = error.response.data;
        const errorMessage = errorData.error.error_message;
        this.setState({
        message: `Error - ${errorMessage}`,
        });
      });
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

    showGiftCard = () => {
        
    }

    handleChangeMobile = () => {
      this.setState({
        step: 1
      })
    }

    callOrderSummaryAPI = () => {
      console.log(this.props.isLoggedIn, "logged in order summary")
      let token = appCookie.get('accessToken');
      axios.get(OrderSummaryAPI, {
        headers: { store_id: storeId, access_token: token }
      }).then(response => {
        console.log(response, 'order Summary response');
        this.setState({
          orderSummaryData: response.data.data.orderSummary
        })
      }).catch(error => {
        console.log(error, "order summary error");
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
        email: this.state.logon_by.includes('@') ? this.state.logon_by : '',
        payMethodId: "BillDesk",
        amount: this.state.orderSummaryData.netAmount,
        billing_address_id: this.state.ship_add.billAddId,
        callbackUrl: 'https://localhost:8002/api/payment/handlePayment',
        BankID: this.state.BankID,
        paymentMode: this.state.paymentMode
      };
      if(this.state.paymentMode == "NET_BANKING" || this.state.paymentMode == "PAYTM" || this.state.paymentMode == "MOBIKWIK" || this.state.paymentMode == "PHONEPE") {
        body.BankID = '123'
      }
      let token = appCookie.get('accessToken');
      axios.post(CreateCheckSumAPI, body, {
        headers: { store_id: storeId, access_token: token }
      }).then((response) => {
        console.log(response, "checksum response")
        var res = response.data.data.response;
        var url = `${res.transactionUrl}?msg=${res.msg}&txtPayCategory=CREDIT`;
        if(this.state.paymentMode == "NET_BANKING" || this.state.paymentMode == "PAYTM" || this.state.paymentMode == "MOBIKWIK" || this.state.paymentMode == "PHONEPE") {
          url = `${res.transactionUrl}&msg=${res.msg}`;;
          //  axios.post(url, {}, {

          //   }).then((redirect) => {
          //     // window.location.assign(redirect.data);
          //   }).catch((err) => {
          //     console.log(err, "biildessk err")
          //   })
        }
        window.location.assign(url)
        
      }).catch((err) => {
        console.log(err, "checksum error")
      })
    }

    enalblePay = (data) => {
      this.setState({
        pay: true,
        BankID: data.BankID,
        paymentMode: data.paymentMode
      })
    }

    disablePay = () => {
      this.setState({
        pay: false
      })
    }

    handleStep = () => {
        if(this.state.step == 3) {
            return <Step3Component 
                    back={this.handleChange}
                    backtoMobile={this.handleChangeMobile} 
                    address={this.state.ship_add}
                    logonBy={this.state.logon_by}
                    isLoggedIn={this.state.loggedIn}
                    initialBdpayment={this.initialBdpayment}
                    enalblePay={this.enalblePay}
                    disablePay={this.disablePay} />
        } else if(this.state.step == 2) {
            return <Step2Component 
                    proceed={this.handleProceed} 
                    back={this.handleChange}
                    isLoggedIn={this.state.loggedIn} 
                    logonBy={this.state.logon_by} 
                    handleAddress={this.handleAddress} />
        } else {
            return <Step1Component 
                    proceed={this.handleProceed}
                    login={this.handleUserLogin.bind(this)}
                    proceedToSecond={this.proceedToSecond}
                    logonBy={this.state.logon_by}
                    msg={this.state.message} />
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
      if(this.state.step == 1) {
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
        <div className='checkout'>
        <div className="container">
          <div className='row'>
          <div className='col-md-8'>
            <h3 className='heading'>Checkout</h3>
          </div>
          {this.state.failPop ? <FailPop cancelFail={this.cancelFail} /> : '' }
          <div className='col-md-4'>
            <div className='summaryHeading'>
              {/* <h4 className='headingOrder'>Order Summary</h4> */}
            </div>
          </div>
          </div>

          <div className="row">      
           <div className='col-md-12'>
            {/* <h3 className='heading'>Checkout</h3> */}
            <div className='row'>
              {this.handleStep()}
              {/* <div className="col-md-4"> */}
                <OrderSummaryComponent 
                  isLoggedIn={this.state.loggedIn} 
                  orderData={this.state.orderSummaryData} 
                  pay={this.state.pay} 
                  initialBdpayment={this.initialBdpayment} />
              {/* </div>  */}
            </div>
            </div>    
          </div>
        </div>
        </div>
      )
    }
}