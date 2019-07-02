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
import {
  regexEmail,
  regexMobileNo,
  validateEmptyObject,
} from '../../utils/validationManager';
import {
    getReleventReduxState
  } from '../../utils/utilityManager';

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
        }
    }

    // componentDidMount() {
    //   if(this.props.logonBy) {
    //     this.setState({
          
    //     })
    //   }
    // }

    handleChange = e => {
      console.log(e.target.name, e.target.value, "name and vlaue")
      this.setState({ [e.target.name]: e.target.value });
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
      console.log("handle validetion called", obj.userId, obj.pass)
      this.setState({
        errorMessageUserId: null,
        errorMessagePassword: null,
      });
  
      if (!validateEmptyObject(obj.userId)) {
        console.log("empty userId")
        this.setState({
          errorMessageUserId: 'Please enter valid Email Id/Mobile number',
        });
        isValidate = false;
      } else if (!input.includes('@') && Number.isInteger(firstChar)) {
        if (!regexMobileNo.test(obj.userId)) {
          this.setState({
            errorMessage: 'Please enter valid Email Id/Mobile number',
          });
          isValidate = false;
        }
      } else if (!regexEmail.test(obj.userId)) {
        console.log("wrong user id")
        this.setState({
          errorMessageUserId: 'Please enter valid Email Id/Mobile number',
        });
        isValidate = false;
      }
      if (!validateEmptyObject(obj.password) && this.state.has_pass) {
        this.setState({
          errorMessagePassword: 'Enter a valid password ',
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
      console.log('resetLoginValues');
      this.setState({
        showLoginRegisterMain: false,
        showForgotPassword: false,
        showRegister: false,
      });
    }

    

    errorMessage = message => {
     if(message === 'user verify err') {
       return <div className="error-msg">This account does not exist. Enter a valid mobile number or email address to proceed or <span style={{color: 'blue', textDecoration: 'underline', cursor: 'pointer'}} onClick={this.openModal}>Create</span> a new GI account</div>
     } else {
      console.log("user error found")
      return  <div className="error-msg">{message}</div>;
     }
    }
    render() {
      let errorMessageUserId = null;
      let errorMessagePassword = this.props.msg;
      if (this.state.errorMessageUserId) {
        errorMessageUserId = this.errorMessage(this.state.errorMessageUserId);
      }
  
      if (this.props.msg && this.props.msg !== "user verify err") {
        errorMessagePassword = this.errorMessage(this.props.msg);
      }

      if(this.props.msg == "user verify err") {
        errorMessagePassword = this.errorMessage(this.props.msg);
      }

      return (
            <div className="col-md-8 checkout_wrapper"> 
               <div className='listRow bgfullflex clearfix'>
                 <div className='stepActive'>
                  <div className='stepBg'>1</div>
                 </div>
                 
                 <div className='leftBox bgGrey'>
                    <div className='heading-label'>Mobile or Email</div>
                 </div>

                  <div className="rightBox" id='rightHeight'>
                    <div className='shipping-text'>Your Shipping and payment details will be assocaited with this number</div>
                    <div className="row">
                      <div className="col-md-12">
                        <div>
                          <div className='form-div clearfix div-error'>
                          {/* <label className='from-label' htmlFor="mobile">Mobile Number/Email Address</label>
                          <input type="text" name="userId" id="userId" value={this.state.userId} className="form-control"
                            onChange={e => this.handleChange(e)} /> */}
                            <Input
                              type="text"
                              name="userId"
                              title="Email ID/Mobile Number"
                              placeholder=""
                              onChange={e => this.handleChange(e)}
                              value={this.state.userId}
                            />
                          {errorMessageUserId}
                          </div>
                        </div>
                        {/* <Input
                          title="Mobile Number/Email Address"
                          name='userId'
                          inputType="text"
                          value={this.props.logonBy ? this.props.logonBy : null}
                          onChange={this.handleChange}
                         /> */}
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
                                  />
                                }
                              </span>
                            </div>{errorMessagePassword}</div></div> : ''}
                        <div className='havePassword customCheckbox clearfix'>
                          <div className='input_box'>
                            <input className='checkBox inputCheck' id="checkbox" type="checkbox" name="has_pass" onChange={this.handleHasPass} />
                            <label className="lblCheck" htmlFor="checkbox"></label>
                          </div>
                          <label className='form-label defaultlbl' htmlFor="has_pass">I have a password</label>
                        </div>
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

                    <button className="btn-blackbg btn-block" onClick={this.handleFormSubmit}>Proceed to checkout</button>
                  </div>
            
              
                </div>
              <div className="listRow disableddiv clearfix" disabled="disabled">
                 <div className='stepActive'>
                  <div className='stepbgNone'>2</div>
                 </div>
                <div className="leftBox">
                  <div className='heading-label'>Ship To</div>
                </div>
                <div className="rightBox">                 
                <div className='heading-label'>Add your shipping address</div>              
                </div>
              </div>
              
              <div className="listRow disableddiv clearfix" disabled="disabled">
                 <div className='stepActive'>
                   <div className='stepbgNone'>3</div>
                 </div>
                <div className="leftBox">
                <div className='heading-label'>Pay Byf</div>
                </div>
                <div className="rightBox">
                <div className='heading-label'>Choose a payment method</div>
                </div>
              </div>
             
            </div>
      )
    }
}