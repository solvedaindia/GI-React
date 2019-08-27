import React from 'react';
import { Button, Form, FormGroup, Label, Modal } from 'react-bootstrap';
import apiManager from '../../utils/apiManager';
import {
  generateOTPAPI,
  storeId,
  accessToken,
  validateOTPAPI,
} from '../../../public/constants/constants';
import {
  validateEmptyObject,
  validateOTPDigit,
} from '../../utils/validationManager';
import '../../../public/styles/forgotpassword/forgototp.scss';

class ForgotPasswordOTP extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      loading: true,
      error: false,
      errorMessage: null,
      inputText: null,
      showOTPTxtField: true,
      errorClass: 'forgototp-mobile modalmin-height',
    };
  }

  proceedBtnPressed() {
    if (!this.state.showOTPTxtField) {
      const nextComp = 'ForgotPasswordOTP';
      this.props.handlerPro(nextComp, null, this.state.inputText, true);
      return;
    }

    if (!validateEmptyObject(this.state.inputText)) {
      this.setState({
        error: true,
        errorMessage: 'Please enter OTP',
      });
      return;
    }

    if (!validateOTPDigit(this.state.inputText)) {
      this.setState({
        error: true,
        errorMessage: 'OTP entered is incorrect',
      });
      return;
    }

    const data = {
      user_id: this.props.userIdPro,
      otp: this.state.inputText,
      forgot_password: 'true',
    };
    apiManager
      .post(validateOTPAPI, data)
      .then(response => {
        const nextComp = 'ForgotPasswordNewPassword';
        this.props.handlerPro(nextComp, null, this.state.inputText);
      })
      .catch(error => {
        const errorData = error.response.data;
        const errorMessage = errorData.error.error_message;
        const errorMsgKey = errorData.error.error_key;
        console.log('OTP Response----', errorMsgKey);
        if (errorMsgKey === 'otp_incorrect_limit_exceed') {
          const nextComp = 'ForgotPasswordOTP';
          this.props.handlerPro(nextComp, null, null, false, true);
          this.setState({
            error: true,
            errorMessage,
            showOTPTxtField: false,
            errorClass: 'forgototp-mobile modalmin-height forgot-attempts',
          });
        } else {
          this.setState({
            error: true,
            errorMessage,
          });
        }
      });
  }

  handleInputChange(text) {
    this.setState({
      inputText: text.target.value,
      error: false,
    });
  }

  resendOTP() {
    const data = {
      user_id: this.props.userIdPro,
      resend: 'true',
      forgot_password: this.props.isFromMyProfilePro ? 'false' : 'true',
    };
    apiManager
      .post(generateOTPAPI, data)
      .then(response => {
        console.log('rrbrb -- ',response.data)
        const otpCount = response.data.data.otpCount;
        if (otpCount === 3) {
          const nextComp = 'ForgotPasswordOTP';
          this.props.handlerPro(nextComp, null, null, false, true);
          this.setState({
            showOTPTxtField: false,
            error: true,
            errorMessage: 'OTP cannot be regenerated. You have exceeded the maximum number of resending attempts (3)',
            errorClass: 'forgototp-mobile modalmin-height forgot-attempts',
          });
        }
        const otpValue = response.data.data;
        alert(`OTP - ${otpValue.otpVal}`);
      })
      .catch(error => {
        console.log('dmeee -- ',error);
        const errorData = error.response.data;
        const errorMessage = errorData.error.error_message;
        this.setState({
          // error: true,
          // errorMessage,
          showOTPTxtField: false,
          error: true,
          errorMessage: errorMessage,
          errorClass: 'forgototp-mobile modalmin-height forgot-attempts',
        });
      });
  }

  onOTPSubmit() {
    if (!validateEmptyObject(this.state.inputText)) {
      this.setState({
        error: true,
        errorMessage: 'Please enter OTP',
      });
      return;
    }

    if (!validateOTPDigit(this.state.inputText)) {
      this.setState({
        error: true,
        errorMessage: 'Pleaes enter 4 digit OTP',
      });
      return;
    }

    this.props.enteredOTPCallbackPro(this.state.inputText);
    this.props.cancelOTPPro();
  }

  render() {
    const userId = this.props.userIdPro;
    let errorItem;
    if (this.state.error) {
      errorItem = (
        <p className="error-msg otperrorwidth">{this.state.errorMessage}</p>
      );
    } else {
      errorItem = null;
    }

    let headingItem;
    if (this.props.isHeadingPro) {
      headingItem = <h3 className="heading">Forgot password</h3>;
    } else {
      headingItem = null;
    }
    if (this.props.isFromMyProfilePro) {
      headingItem = <h3 className="heading">Enter OTP</h3>;
    }

    let animeClass;
    if (this.props.isBack) {
      animeClass = 'leftAnim';
    } else {
      animeClass = 'searchBackBtn';
    }

    let inputTxtField = null;
    let titleOTP = null;
    if (this.state.showOTPTxtField) {
      titleOTP = <p className="text">     
        OTP sent to xxxxxx{userId.substr(userId.length - 4)}
      </p>;
    }
    if (this.props.isFromMyProfilePro) {
      titleOTP = (
        <p className="myProfile-Subtitle">
          Enter the verification code that has been OTP sent to your mobile
          number
        </p>
      );
    }

    if (this.state.showOTPTxtField) {
      inputTxtField = (
        <input
          onChange={this.handleInputChange.bind(this)}
          type="number"
          name="text"
          id="exampleEmail"
          className="form-control margin-none"
          placeholder="Enter OTP"
        />
      );
    }

    let resendBtn = null;
    if (this.state.showOTPTxtField) {
      resendBtn = (
        <Button onClick={this.resendOTP.bind(this)} className="resend-otp">
          Resend OTP
        </Button>
      );
    }

    let finalBtn = (
      <Button
        onClick={this.proceedBtnPressed.bind(this)}
        className="btn-block btn-bg"
      >
        {this.state.showOTPTxtField ? 'Proceed' : 'Back'}
      </Button>
    );
    if (this.props.isFromMyProfilePro) {
      finalBtn = (
        <div className="myProfile-btn">
          <button className="btn-borderwhite" onClick={this.props.cancelOTPPro}>
            Cancel
          </button>
          <button
            className="btn-borderwhite btn-submit"
            onClick={this.onOTPSubmit.bind(this)}
          >
            Submit
          </button>
        </div>
      );
    }

    return (
      <div className={animeClass}>
        {headingItem}
        <Form className={this.state.errorClass}>
          <FormGroup>
            {titleOTP}
            {this.props.isFromMyProfilePro ? (
              <label className="myProfile-otplabel">
                OTP (Sent to xxxxx x{this.props.myProfileNumberPro})
              </label>
            ) : null}
            <div className="form-div enterotp-msg clearfix">
              {inputTxtField}
              {errorItem}
              {resendBtn}
            </div>
          </FormGroup>
          <FormGroup />
        </Form>
        {finalBtn}
      </div>
    );
  }
}

export default ForgotPasswordOTP;
