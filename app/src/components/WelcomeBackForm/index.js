import React, { Component } from 'react';
/* Import Components */
import Input from '../Primitives/input';
import Button from '../Button/button';
//import { Button } from 'react-bootstrap';
import ProgressButton from '../Button/progressButton'
import {
  regexEmail,
  regexMobileNo,
  validateEmptyObject,
  regexPw
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
      isActive: 'hideData',
      isProcessing:false
    };
    this.showHidePass=this.showHidePass.bind(this);
    this.callbackFunc=this.callbackFunc.bind(this);
  }

  /* Handle Change */
  handleChange = e => {
    const passVal = document.getElementById('password').value;
    let activeClass = 'hideData';
    if (passVal.length > 0) {
      activeClass = 'showData';
    }
    this.setState({ [e.target.name]: e.target.value, isActive: activeClass });
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
    } else if ((!regexPw.test(obj.password) && obj.password.length < 25) || (obj.password.length > 25)) {
      this.setState({
        errorMessagePassword: 'Password entered is incorrect ',
      });
      isValidate = false;
    }

    return isValidate;
  }

  /* Handle Submit */
  handleFormSubmit = e => {
    if(e!=null)
      e.preventDefault();
    const isValidate = this.handleValidation(this.state, true);

    if (isValidate === false) {
      return false;
    }

    this.setState({isProcessing:true})

    const data = {
      user_id: this.state.userId,
      password: this.state.password,
    };
    this.props.handleUserData(data, this.callbackFunc);
  };

  callbackFunc(res) {
    this.setState({
      errorMessagePassword: res,
      isProcessing:false
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


  onKeyPress=(event)=>
  {
    if(event.key === 'Enter'){
      this.handleFormSubmit();
    }
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
          title="Email Address or Mobile Number"
          name="userId"
          onKeyPress={this.onKeyPress}
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
          id="password"
          title="Password"
          placeholder=""
          onChange={this.handleChange}
          hideAnimation
          onKeyPress={this.onKeyPress}
          onPaste={this.copyPaste}
        />
       <span
            onClick={this.showHidePass}
            className={`valiationPosition-NewPassword ${this.state.isActive}`}
          >
            {
              <img
                src={require('../../../src/components/SVGs/eye.svg')}
				 alt="Show Password"
              />
            }
          </span>
          {errorMessagePassword}
        </div>
        {/* Password of the user */}
        {/* <Forgotpassowrd/> */}
        {/* <Button type="primary" title="Log In"></Button> */}
         <ProgressButton isProcessing = {this.state.isProcessing} title="Log In" onClickEvent={this.handleFormSubmit} styleClassName = "formBtn"/> 
        {/* Submit */}
      </form>
    );
  }
}

export default WelcomeForm;
