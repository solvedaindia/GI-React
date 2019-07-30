import React, { Component } from 'react';
/* Import Components */
import Input from '../Primitives/input';
import Button from '../Button/button';
import {
  regexEmail,
  regexMobileNo,
  validateEmptyObject,
} from '../../utils/validationManager';
import Forgotpassowrd from '../ForgotPasswordComponent/forgotpassword';

class WelcomeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      password: '',
      shown: true,
      errorMessageUserId: null,
      errorMessagePassword: null,
      isShowPass: false,
      inputType: 'password',
    };
    this.showHidePass=this.showHidePass.bind(this);
    this.callbackFunc=this.callbackFunc.bind(this);
  }

  /* Handle Change */
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  /* Handle Validation */
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
        errorMessageUserId: 'Please enter valid Email id/Mobile Number',
      });
      isValidate = false;
    } else if (!input.includes('@') && Number.isInteger(firstChar)) {
      if ((!regexMobileNo.test(obj.userId)) || ((obj.userId.length) < 10) || ((obj.userId.length) > 10)) {
        this.setState({
          errorMessageUserId: 'Please enter valid Email id/Mobile Number',
        });
        isValidate = false;
      }
    } else if (!regexEmail.test(obj.userId)) {
      this.setState({
        errorMessageUserId: 'Please enter valid Email id/Mobile Number',
      });
      isValidate = false;
    }

    if (!validateEmptyObject(obj.password)) {
      this.setState({
        errorMessagePassword: 'Enter a valid password ',
      });
      isValidate = false;
    }

    return isValidate;
  }

  /* Handle Submit */
  handleFormSubmit = e => {
    e.preventDefault();
    const isValidate = this.handleValidation(this.state, true);

    if (isValidate === false) {
      return false;
    }

    const data = {
      user_id: this.state.userId,
      password: this.state.password,
    };
    this.props.handleUserData(data, this.callbackFunc);
  };

  callbackFunc(res) {
    this.setState({
      errorMessagePassword: res,
    });
    isValidate = false;
  }

  /* Show Hide Password */
  showHidePass() {
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

  copyPaste = e => {
    e.preventDefault();
  }


  /* Error Messgae */
  errorMessage = message => <p className="error-msg">{message}</p>;
  // handleHide = (e) => {
  //     e.preventDefault();

  // }
  render() {
    let errorMessageUserId = null;
    let errorMessagePassword = null;
    if (this.state.errorMessageUserId) {
      errorMessageUserId = this.errorMessage(this.state.errorMessageUserId);
    }

    if (this.state.errorMessagePassword) {
      errorMessagePassword = this.errorMessage(this.state.errorMessagePassword);
    }
    return (
      <form className="loginForm" onSubmit={this.handleFormSubmit}>
        <div className='relative'><Input
          type="text"
          title="Email ID/Mobile Number"
          name="userId"
          placeholder=""
          onChange={this.handleChange}
          hideAnimation
        />
        {errorMessageUserId}
        {/* Name or email of the user */}
        </div>
        
        <div className='password-field relative'>
        <Input
          type={this.state.inputType}
          name="password"
          title="Password"
          placeholder=""
          onChange={this.handleChange}
          hideAnimation
          onPaste={this.copyPaste}
        />
       <span
            onClick={this.showHidePass}
            className="valiationPosition-NewPassword"
          >
            {
              <img
                src={require('../../../src/components/SVGs/eye.svg')}
              />
            }
          </span>
          {errorMessagePassword}
        </div>
        {/* Password of the user */}
        {/* <Forgotpassowrd/> */}
        <Button type="primary" title="Login" />
        {/* Submit */}
      </form>
    );
  }
}

export default WelcomeForm;
