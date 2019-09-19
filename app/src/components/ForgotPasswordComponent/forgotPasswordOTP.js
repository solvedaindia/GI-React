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
import {PLEASE_ENTER_OPT ,SUBMIT,RESEND_OTP,CANCEL, FORGET_OPT,ENTER_VERIFICATION_CODE, FORGET_PASS_OTP,SENT_TO_XXX, OTP_INCORRECT,EXCEEDED_MAX,FORGOT_PASSWORD, FORGOT_PASSWORD_OTP,INCORRECT_OTP, FORGET_PASS, FORGET_OTP_MOBILE, FOUR_DIGIT_OTP} from '../../constants/app/footerConstants';

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
      errorClass: `${FORGET_OPT}`,
    };
  }

  proceedBtnPressed(e) {
    e.preventDefault(); 
    if (!this.state.showOTPTxtField) { 
      const nextComp = `${FORGET_PASS_OTP}`;
      this.props.handlerPro(nextComp, null, this.state.inputText, false, false);
      
      this.setState({
        showOTPTxtField: true,
        errorMessage: null,
        errorClass: `${FORGET_OPT}`,
      })
      return;
    }
   

    if (!validateEmptyObject(this.state.inputText)) {
      this.setState({
        error: true,
        errorMessage: `${PLEASE_ENTER_OPT}`,
      });
      return;
    }

    if (!validateOTPDigit(this.state.inputText)) {
      this.setState({
        error: true,
        errorMessage: `${OTP_INCORRECT}`,
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
        const nextComp = `${FORGET_PASS}`;
        this.props.handlerPro(nextComp, null, this.state.inputText);
      })
      .catch(error => {
        const errorData = error.response.data;
        const errorMessage = errorData.error.error_message;
        const errorMsgKey = errorData.error.error_key;
        if (errorMsgKey === `${INCORRECT_OTP}`) {
          const nextComp = `${FORGOT_PASSWORD_OTP}`;
          this.props.handlerPro(nextComp, null, null, false, true);
          this.setState({
            error: true,
            errorMessage,
            showOTPTxtField: false,
            errorClass: `${FORGET_OTP_MOBILE}`,
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
		const otpCount = response.data.data.otpCount;
        if (otpCount === 3) {
          const nextComp = `${FORGOT_PASSWORD_OTP}`;
          this.props.handlerPro(nextComp, null, null, false, true);
          this.setState({
            showOTPTxtField: false,
            error: true,
            errorMessage: `${EXCEEDED_MAX}`,
            errorClass: `${FORGET_OTP_MOBILE}`,
          });
        }
      })
      .catch(error => {
        const errorData = error.response.data;
        const errorMessage = errorData.error.error_message;
        this.setState({
          // error: true,
          // errorMessage,
          showOTPTxtField: false,
          error: true,
          errorMessage: errorMessage,
          errorClass: `${FORGET_OTP_MOBILE}`,
        });
      });
  }

  onOTPSubmit() {
    if (!validateEmptyObject(this.state.inputText)) {
      this.setState({
        error: true,
        errorMessage: `${PLEASE_ENTER_OPT}`,
      });
      return;
    }

    if (!validateOTPDigit(this.state.inputText)) {
      this.setState({
        error: true,
        errorMessage: `${FOUR_DIGIT_OTP}`,
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
      headingItem = <h3 className="heading">{FORGOT_PASSWORD}</h3>;
    } else {
      headingItem = null;
    }
    if (this.props.isFromMyProfilePro) {
      headingItem = <h3 className="heading">{PLEASE_ENTER_OPT}</h3>;
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
       {SENT_TO_XXX + userId.substr(userId.length - 4)})
      </p>;
    }
    if (this.props.isFromMyProfilePro) {
      titleOTP = (
        <p className="myProfile-Subtitle">
         {ENTER_VERIFICATION_CODE}
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
         {RESEND_OTP}
        </Button>
      );
    }

    let finalBtn = (
      <Button
        type="submit"
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
            {CANCEL}
          </button>
          <button
            className="btn-borderwhite btn-submit"
            onClick={this.onOTPSubmit.bind(this)}
          >
            {SUBMIT}
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
                {SENT_TO_XXX + this.props.myProfileNumberPro})
              </label>
            ) : null}
            <div className="form-div enterotp-msg clearfix">
              {inputTxtField}
              {errorItem}
              {resendBtn}
            </div>
          </FormGroup>
          <FormGroup />
        {finalBtn}
        </Form>
      </div>
    );
  }
}

export default ForgotPasswordOTP;
