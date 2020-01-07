import React from 'react';
import { Button, Form, FormGroup, Label } from 'react-bootstrap';
import apiManager from '../../utils/apiManager';
import { generateOTPAPI } from '../../../public/constants/constants';
import {
  regexEmail,
  regexMobileNo,
  validateEmptyObject,
} from '../../utils/validationManager';
import {
  ENTER_MOBILE_EMAIL,
  INVALID_MOBILE_NUMBER,
  PROCEED,
  INVALID_EMAIL_ADDRESS,
  FORGOT_PASSWORD,
  EMAIL_MOBILE_NUM,
  AN_OTP,
} from '../../constants/app/footerConstants';
import ProgressButton from '../Button/progressButton'

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
      isProcessing:false
    };
    this.onRegisterRedirectClick = this.onRegisterRedirectClick.bind(this);
  }

  componentDidMount() {
    this.setState({ inputText: this.props.userIdPro });
  }

  proceedBtnPressed(e) {
    e.preventDefault();

    if (!validateEmptyObject(this.state.inputText)) {
      this.setState({
        error: true,
        errorMessage: <p className="error-msg">{ENTER_MOBILE_EMAIL}</p>,
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
          errorMessage: <p className="error-msg">{INVALID_MOBILE_NUMBER}</p>,
          isValidate: false,
        });
        return;
      }
    } else if (!regexEmail.test(this.state.inputText)) {
      this.setState({
        error: true,
        errorMessage: <p className="error-msg">{INVALID_EMAIL_ADDRESS}</p>,
        isValidate: false,
      });
      return;
    }
    if(this.state.isProcessing)
    {
      return
    }
    this.setState({
      isValidate: true,
    });

    const data = {
      user_id: this.state.inputText,
      forgot_password: 'true',
    };
    this.setState({isProcessing:true})
    apiManager
      .post(generateOTPAPI, data)
      .then(response => {
        const nextComp = 'ForgotPasswordOTP';
        this.setState({isProcessing:false})
        this.props.handlerPro(nextComp, this.state.inputText, null);
      })
      .catch(error => {
        this.setState({isProcessing:false})
        const errorData = error.response.data;
        const errorMessage = errorData.error.error_message;
        const errorKey = errorData.error.error_key;
        const lll = (
          <>
            Please click{' '}
            <span
              onClick={this.onRegisterRedirectClick}
              className="registerHere"
            >
              here
            </span>{' '}
            to register
          </>
        );
        const errorItem = (
          <p className="error-msg">
            {errorMessage}
            {` `}
            {errorKey === 'invalid_user_id' ? lll : null}
          </p>
        );
        this.setState({
          error: true,
          errorMessage: errorItem,
        });
      });
  }

  onRegisterRedirectClick(e) {
    e.preventDefault();
    const nextComp = 'RegisterRedirect';
    this.props.handlerPro(nextComp, null, null);
  }

  handleInputChange(text) {
    this.setState({
      error: false,
      inputText: text.target.value,
    });
  }

  render() {
    let errorItem;
    if (this.state.error) {
      errorItem = this.state.errorMessage;
    } else {
      errorItem = null;
    }

    let validateImg;
    if (this.state.isValidate) {
      validateImg = (
        <img
          className="checkmarkImg"
          src={require('../../../src/components/SVGs/checkmark.svg') } alt="Select"
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
        <h3 className="heading">{FORGOT_PASSWORD}</h3>
        <Form className="modalmin-height"
         onSubmit = {this.proceedBtnPressed.bind(this)}
        >
          <FormGroup>
            <Label className="label" htmlFor="exampleEmail">
              {EMAIL_MOBILE_NUM}
            </Label>
            <div className="form-div clearfix div-error">
              <input
                onKeyPress={this.onpress}
                onChange={this.handleInputChange.bind(this)}
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
            {this.state.error ? null : <p className="text text-emailotp">{AN_OTP} </p>  }
            
          </FormGroup>
        </Form>
          {/* <Button
            type="submit"
            onClick={this.proceedBtnPressed.bind(this)}
            className="btn-block btn-bg"
          >
            {this.state.isProcessing?<ul className="loadingdots-on-button-container">
                          <li>{PROCEED}</li>
                          <li> <div className="loadingdots-on-button">
                            <div className="loadingdots-on-button--dot"></div>
                            <div className="loadingdots-on-button--dot"></div>
                            <div className="loadingdots-on-button--dot"></div>
                            </div>
                          </li>
                      </ul>:PROCEED }
          </Button> */}
          <ProgressButton isProcessing = {this.state.isProcessing} title={PROCEED} onClickEvent={this.proceedBtnPressed.bind(this)} styleClassName = "btn-block btn-bg"/>
      </div>
    );
  }
}

export default ForgotPasswordEmailMobile;
