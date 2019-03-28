import React from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Modal } from 'react-bootstrap';
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
    };
  }

  proceedBtnPressed() {
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

    const data = {
      user_id: this.props.userIdPro,
      otp: this.state.inputText,
      forgot_password: 'true',
    };
    axios
      .post(validateOTPAPI, data, {
        headers: { store_id: storeId, access_token: accessToken },
      })
      .then(response => {
        const nextComp = 'ForgotPasswordNewPassword';
        this.props.handlerPro(nextComp, null, this.state.inputText);
      })
      .catch(error => {
        const errorData = error.response.data;
        const errorMessage = errorData.error.error_message;
        this.setState({
          error: true,
          errorMessage,
        });
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
      forgot_password: 'true',
    };
    axios
      .post(generateOTPAPI, data, {
        headers: { store_id: storeId, access_token: accessToken },
      })
      .then(response => {
        const otpValue = response.data.data;
        alert(`OTP - ${otpValue.otpVal}`);
      })
      .catch(error => {
        const errorData = error.response.data;
        const errorMessage = errorData.error.error_message;
        this.setState({
          error: true,
          errorMessage,
        });
      });
  }

  render() {
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

    let animeClass;
    if (this.props.isBack) {
      animeClass = 'leftAnim';
    } else {
      animeClass = 'rightAnim';
    }

    return (
      <div className={animeClass}>
        {headingItem}
        <Form>
          <FormGroup>
            <p className="text otp-text">
              Enter OTP sent to your mobile number
            </p>
            <div className="form-div clearfix">
              <input
                onChange={this.handleInputChange.bind(this)}
                type="number"
                name="text"
                id="exampleEmail"
                className="form-control margin-none"
                placeholder="Enter OTP"
              />
              {errorItem}
              <Button
                onClick={this.resendOTP.bind(this)}
                className="resend-otp"
              >
                Resend OTP
              </Button>
            </div>
          </FormGroup>
          <FormGroup>
            <Button
              onClick={this.proceedBtnPressed.bind(this)}
              className="btn-block btn-bg"
            >
              Proceed
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default ForgotPasswordOTP;
