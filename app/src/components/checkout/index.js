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
import apiManager from '../../utils/apiManager';
import {
  storeId,
  accessToken,
  accessTokenCookie,
  userLoginAPI,
  addressListAPI,
  userDataAPI
} from '../../../public/constants/constants';
import {
    getReleventReduxState
  } from '../../utils/utilityManager';
import { blue } from 'ansi-colors';

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
        }
    }

    componentDidMount() {
        var coke = appCookie.get('isLoggedIn')
        console.log(coke, 'coke in did mount');
        if(coke == 'true') {
            this.callprofileAPI()
              .then((data) => {
              this.setState({
                step: 2,
                loggedIn: true,
                logon_by: data.logonId
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

    callAddressAPI = () => {
      return new Promise((resolve, reject) => {
        let token = appCookie.get('accessToken')
        let url = addressListAPI;
        axios.get(addressListAPI, {
          headers: { store_id: storeId, access_token: token }
        }).then(response => {
          resolve(response.data.data);
        }).catch(error => {
          reject(error);
        })
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

    handleUserLoginApi(data) {
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
        show: false,
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

    handleStep = () => {
        if(this.state.step == 3) {
            return <Step3Component 
                    back={this.handleChange} 
                    backtoMobile={this.handleChangeMobile} />             
        } else if(this.state.step == 2) {
            return <Step2Component 
                    proceed={this.handleProceed} 
                    back={this.handleChange} 
                    isLoggedIn={this.state.loggedIn} 
                    logonBy={this.state.logon_by} />
        } else {
            return <Step1Component 
                    proceed={this.handleProceed}
                    login={this.handleUserLoginApi.bind(this)} 
                    proceedToSecond={this.proceedToSecond}
                    logonBy={this.state.logon_by} />
        }
    }

    proceedToSecond = (uid) => {
      this.setState({
        logon_by: uid,
        step: 2
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
        <div className="container" style={{marginBottom: '100px'}}>
          <div className="row">
            <h2 style={{fontWeight: "bold"}}>Checkout</h2>
            {this.handleStep()}
            <div className="col-md-4">
              <OrderSummaryComponent />
            </div>
          </div>
        </div>
      )
    }
}