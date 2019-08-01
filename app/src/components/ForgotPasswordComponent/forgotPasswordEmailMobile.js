import React from 'react';
import { Button, Form, FormGroup, Label } from 'react-bootstrap';
import apiManager from '../../utils/apiManager';
import {
  generateOTPAPI,
  storeId,
  accessToken,
} from '../../../public/constants/constants';
import {
  regexEmail,
  regexMobileNo,
  validateEmptyObject,
} from '../../utils/validationManager';
import LoadingIndicator from '../../utils/loadingIndicator';

class ForgotPasswordEmailMobile extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      loading: true,
      error: false,
      errorMessage: null,
      inputText: null,
      isValidate: false,
      preFilledUserId: null,
    };
  }

  componentDidMount() {
    this.setState({ inputText: this.props.userIdPro });
  }

  proceedBtnPressed(e) {
    e.preventDefault();

    if (!validateEmptyObject(this.state.inputText)) {
      this.setState({
        error: true,
        errorMessage: 'Please enter Email or Mobile Number',
        isValidate: false,
      });
      return;
    }

    const input = String(this.state.inputText);
    const firstChar = Number(input.charAt(0));
    if (!input.includes('@') && Number.isInteger(firstChar)) {
      if (!regexMobileNo.test(this.state.inputText)) {
        this.setState({
          error: true,
          errorMessage: 'Invalid Mobile Number',
          isValidate: false,
        });
        return;
      }
    } else if (!regexEmail.test(this.state.inputText)) {
      this.setState({
        error: true,
        errorMessage: 'Invalid Email address',
        isValidate: false,
      });
      return;
    }

    this.setState({
      isValidate: true,
    });

    const data = {
      user_id: this.state.inputText,
      forgot_password: 'true',
    };
    apiManager
      .post(generateOTPAPI, data)
      .then(response => {
        const otpValue = response.data.data;
        alert(`OTP - ${otpValue.otpVal}`);
        const nextComp = 'ForgotPasswordOTP';
        this.props.handlerPro(nextComp, this.state.inputText, null);
      })
      .catch(error => {
        const errorData = error.response.data;
        const errorMessage = errorData.error.error_message;
        console.log('ssssss --- ',errorMessage);
        this.setState({
          error: true,
          errorMessage,
        });
      });
  }

  handleInputChange(text) {
    this.setState({
      error: false,
      inputText: text.target.value,
    });
  }

  // onpress = e => {
  //   e.preventDefault();
  // };

  render() {
    let errorItem;
    if (this.state.error) {
      errorItem = <p className="error-msg">{this.state.errorMessage}</p>;
    } else {
      errorItem = null;
    }

    let validateImg;
    if (this.state.isValidate) {
      validateImg = (
        <img
          className="checkmarkImg"
          src={require('../../../src/components/SVGs/checkmark.svg')}
        />
      );
    } else {
      validateImg = null;
    }

    let animeClass;
    if (this.props.isBack) {
      animeClass = 'leftAnim';
    }

    return (
      <div className={animeClass}>
        <h3 className="heading">Forgot password</h3>
        <Form className="modalmin-height">
          <FormGroup>
            <Label className="label" htmlFor="exampleEmail">
              Email id/mobile number
            </Label>
            <div className="form-div clearfix div-error">
              <input
                onKeyPress={this.onpress}
                onChange={this.handleInputChange.bind(this)}
                type="email"
                name="email"
                id="exampleEmail"
                className="form-control"
                placeholder="example@mail.com/9999999999"
                value={this.state.inputText}
              />
              <span className="valiationPosition">{validateImg}</span>
              {errorItem}
            </div>
          </FormGroup>
          <FormGroup>
            <p className="text text-emailotp">
            An OTP will be sent for validation{' '}
            </p>
          </FormGroup>
        </Form>
        <Button
          onClick={this.proceedBtnPressed.bind(this)}
          className="btn-block btn-bg"
        >
          Proceed
        </Button>
      </div>
    );
  }
}

export default ForgotPasswordEmailMobile;
