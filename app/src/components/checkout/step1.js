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
import RegisterModalData from '../RegisterComponent/registerModalData';
import WelcomeBack from '../WelcomeBack/index';
import ForgotPassword from '../ForgotPasswordComponent/forgotpassword';
import Input from '../Primitives/input'
import {isMobile, formatPrice} from '../../utils/utilityManager';
import {
  regexEmail,
  regexMobileNo,
  validateEmptyObject,
} from '../../utils/validationManager';
import {
    getReleventReduxState
  } from '../../utils/utilityManager';
  import {DOES_NOT_EXIST } from '../../constants/app/checkoutConstants';
  import {CREATE } from '../../constants/app/checkoutConstants';
  import {GI_ACCOUNT } from '../../constants/app/checkoutConstants';
  import {MOBILE_EMAIL } from '../../constants/app/checkoutConstants';
  import {DELIVERY_AND_PAYMENT_ADD } from '../../constants/app/checkoutConstants';
  import {I_HAVE_PASSWORD } from '../../constants/app/checkoutConstants';
  import {PROCEED_TO_CHECKOUT } from '../../constants/app/checkoutConstants';
  import {DELIVER_TO } from '../../constants/app/checkoutConstants';
  import {ADD_A_DELIVERY_ADD } from '../../constants/app/checkoutConstants';
  import {PAYMENT_OPTION } from '../../constants/app/checkoutConstants';
  import {CHOOSE_A_PAYMENT_METHOD } from '../../constants/app/checkoutConstants';
  import {PROCEED } from '../../constants/app/checkoutConstants';
  import {TOTAL_AMOUNT } from '../../constants/app/checkoutConstants';
  import { triggerGuestLoginIdGTEvent } from '../../utils/gtm';
  

  

export class Step1Component extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          has_pass: false,
          userId: props.logonBy,
          password: '',
          logonBy: '',
          errorMessageUserId: null,
          errorMessagePassword: props.msg,
          showLoginRegisterMain: false,
          showForgotPassword: false,
          showRegister: false,
          inputType: 'password',
          isShowPass: false,
          isEnable: true
        }
    }

    componentDidMount() {
      triggerGuestLoginIdGTEvent();
    }

    componentDidUpdate() {
      triggerGuestLoginIdGTEvent();
    } 
       
    handleChange = e => {
      const mobileOrEmail = document.getElementById('userId').value;
      let isEnableVal = true;
      if (mobileOrEmail.trim() !== "") {
        isEnableVal = false;
      }
      this.setState({ [e.target.name]: e.target.value, isEnable: isEnableVal, errorMessageUserId: null });
    };

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

    handleValidation(obj, errorType) {
      let isValidate = errorType;
      const input = String(obj.userId);
      const firstChar = Number(input.charAt(0));
      this.setState({
        errorMessageUserId: null,
        errorMessagePassword: null,
      });
  
      if (!validateEmptyObject(obj.userId)) {
        this.setState({
          errorMessageUserId: 'Please enter valid Email Id/Mobile number',
        });
        isValidate = false;
      } else if (!input.includes('@') && Number.isInteger(firstChar)) {
        if (!regexMobileNo.test(obj.userId)) {
          this.setState({
            errorMessageUserId: 'Please enter valid Email Id/Mobile number',
          });
          isValidate = false;
        }
      } else if (!regexEmail.test(obj.userId)) {
        this.setState({
          errorMessageUserId: 'Please enter valid Email Id/Mobile number',
        });
        isValidate = false;
      }
      if (!validateEmptyObject(obj.password) && this.state.has_pass) {
        this.setState({
          errorMessagePassword: 'Invalid logon id or password.',
        });
        isValidate = false;
      }
      return isValidate;
    }

    handleFormSubmit = e => { 
      var uId = document.getElementById('userId').value;
      if(this.state.has_pass) {
        var pass = document.getElementById('password').value;
      }
      const data = {
        userId: uId,
        password: pass,
      };
      const isValidate = this.handleValidation(data, true);
  
      if (isValidate === false) {
        return false;
      }
      const loginData = {
        user_id: uId,
        password: pass
      }
      if(this.state.has_pass) {
        this.props.login(loginData);
      } else {
        this.props.proceedToSecond(uId);
      }
    };
    
    CheckProceed = () => {
      if(this.state.has_pass) {
        this.handleFormSubmit();
      } else {
        this.handleProceed();
      }
    }
    welcomeBackCallback(fromForgot) {
      // Only to manage show and hide state
      if (fromForgot) {
        this.setState({
          showForgotPassword: true,
          showLoginRegisterMain: false,
        });
      } else {
        this.setState({
          showRegister: true,
          showLoginRegisterMain: false,
        });
      }
    }
  
    forgotPasswordCallback() {
      this.setState({
        showLoginRegisterMain: true,
        showForgotPassword: false,
      });
    }

    showHidePass = () => {
      if (this.state.isShowPass) {
        this.setState({
          isShowPass: false,
          inputType: 'password',
        });
      } else {
        this.setState({
          isShowPass: true,
          inputType: 'text',
        });
      }
    }

    openModal = () => {
      this.setState({
        showRegister: true
      })
    }

    registerCallback() {
      this.setState({
        showLoginRegisterMain: true,
        showRegister: false,
      });
    }

    resetLoginValues() {
      this.setState({
        showLoginRegisterMain: false,
        showForgotPassword: false,
        showRegister: false,
      });
    }

    

    errorMessage = message => {
     if(message === 'user verify err') {
       return <div className="error-msg errorAcountnotfound">{DOES_NOT_EXIST} <span style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}} onClick={this.openModal}>{CREATE}</span>{GI_ACCOUNT}</div>
     } else {
      return  <div className="error-msg">{message}</div>;
     }
    }
    render() {
      let errorMessageUserId = null;
      let errorMessagePassword = this.props.msg;
      if (this.state.errorMessageUserId) {
        errorMessageUserId = this.errorMessage(this.state.errorMessageUserId);
      }
      if(this.state.errorMessagePassword) {
        errorMessagePassword = this.errorMessage(this.state.errorMessagePassword)
      }
      if (this.props.msg && this.props.msg !== "user verify err") {
        errorMessagePassword = this.errorMessage(this.props.msg);
      }
      if(this.props.msg == "user verify err") {
        errorMessagePassword = this.errorMessage(this.props.msg);
      }

      return (
        <>
        {isMobile() &&<div className='checkout-title'>
                    {MOBILE_EMAIL}
                 </div>}
            <div className="col-md-8 checkout_wrapper"> 
               <div className='listRow bgfullflex clearfix'>
                 <div className='stepActive'>
                  <div className='stepBg'>1</div>
                 </div>
                 
                 {!isMobile() &&<div className='leftBox bgGrey'>
                    <div className='heading-label'>{MOBILE_EMAIL}</div>
                 </div>}

                  <div className="rightBox" id='rightHeight'>
                    <div className='shipping-text'>{DELIVERY_AND_PAYMENT_ADD}</div>
                    <div className="row">
                      <div className="col-md-12">
                        <div>
                          <div className='form-div clearfix div-error'>
                            <Input
                              type="text"
                              name="userId"
                              title="Mobile or Email"
                              placeholder=""
                              onChange={e => this.handleChange(e)}
                              value={this.state.userId}
                            />
                          {errorMessageUserId}
                          </div>
                        </div>
                        
                        
                        <div className='havePassword customCheckbox clearfix'>
                          <div className='input_box'>
                            <input className='checkBox inputCheck' id="checkbox" type="checkbox" name="has_pass" onChange={this.handleHasPass} />
                            <label className="lblCheck" htmlFor="checkbox"></label>
                          </div>
                          <label className='form-label defaultlbl' htmlFor="has_pass">{I_HAVE_PASSWORD}</label>
                        </div>
                       
                        {this.state.has_pass ? <div className='form-div clearfix div-error'><div>
                            <div className='password-field'>
                            <Input
                              type={this.state.inputType}
                              name="password"
                              title="Password"
                              placeholder=""
                              onChange={this.handleChange}
                            />
                          <span
                                onClick={this.showHidePass}
                                className="valiationPosition-NewPassword"
                              >
                                {
                                  <img
                                    src={require('../SVGs/eye.svg')}
									 alt='Show Password'
                                  />
                                }
                              </span>
                            </div>{errorMessagePassword}</div></div> : ''}

                        {this.state.showRegister ? <RegisterModalData callbackRegisterPro={this.registerCallback.bind(this)}
                                                resetCallbackPro={this.resetLoginValues.bind(this)}/> : '' }
                        {this.state.showLoginRegisterMain ? (
                          <WelcomeBack
                            callbackPro={this.welcomeBackCallback.bind(this)}
                            resetCallbackPro={this.resetLoginValues.bind(this)}
                          />
                        ) : null}
                        {this.state.showForgotPassword ? (
                          <ForgotPassword
                            callbackForgotPro={this.forgotPasswordCallback.bind(this)}
                            resetCallbackPro={this.resetLoginValues.bind(this)}
                          />
                        ) : null}
                      </div>
                    </div>

                    {!isMobile() ? (<button className="btn-blackbg btn-block proceedButton" onClick={this.handleFormSubmit}>{PROCEED_TO_CHECKOUT}</button>):''}
                  </div>
            
              
                </div>
                {!isMobile() ?  <><div className='listRow disableddiv clearfix' disabled='disabled'>
                 <div className='stepActive'>
                  <div className='stepbgNone'>2</div>
                 </div>
                <div className='leftBox'>
                  <div className='heading-label'>{DELIVER_TO}</div>
                </div>
                <div className='rightBox'>                 
                <div className='heading-label'>{ADD_A_DELIVERY_ADD}</div>              
                </div>
              </div>
              
              <div className='listRow disableddiv clearfix' disabled='disabled'>
                 <div className='stepActive'>
                   <div className='stepbgNone'>3</div>
                 </div>
                <div className='leftBox'>
                <div className='heading-label'>{PAYMENT_OPTION}</div>
                </div>
                <div className='rightBox'>
                <div className='heading-label'>{CHOOSE_A_PAYMENT_METHOD}</div>
                </div>
              </div></>: ''}

              {isMobile() ? (<div className='checkout-btn-floater'>
                <div className='total-amount'><div className='net-amount-box'>&#8377;{formatPrice(this.props.netAmount)} <span className='total-amount-text'>{TOTAL_AMOUNT}</span></div></div>
                <div className='proceed-btn'><button className="btn-blackbg btn-block" disabled={this.state.isEnable} onClick={this.handleFormSubmit}>{PROCEED}</button></div>
              </div>):''}
               
            </div>
            </>
      )
    }
}