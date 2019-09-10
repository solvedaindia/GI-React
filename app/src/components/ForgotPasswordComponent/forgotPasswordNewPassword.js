import React from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import apiManager from '../../utils/apiManager';
import {
  forgotPasswordAPI,
  storeId,
  accessToken,
} from '../../../public/constants/constants';
import { regexPw, validateEmptyObject } from '../../utils/validationManager';
import {ENTER_VALID_PASS, PASSWORD_SHOULD_NOT, SIX_CHARACTER_PASS, SET_NEW,NEW_PASS } from '../../constants/app/footerConstants';

class ForgotPasswordNewPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      loading: true,
      error: false,
      errorMessage: null,
      inputText: '',
      isShowPass: false,
      inputType: 'password',
      validationImage: '',
    };
  }

  doneBtnPressed() {
    if (!validateEmptyObject(this.state.inputText)) {
      this.setState({
        error: true,
        errorMessage: `${ENTER_VALID_PASS}`,
      });
      return;
    }

    if (!regexPw.test(this.state.inputText)) {
      let errorMsg;
      if (this.state.inputText.length > 25) {
        errorMsg = `${PASSWORD_SHOULD_NOT}`;
      } else {
        errorMsg =
          `${SIX_CHARACTER_PASS}`;
      }

      this.setState({
        error: true,
        errorMessage: errorMsg,
      });
      return;
    }

    this.setState({ error: false });

    const data = {
      user_id: this.props.userIdPro,
      otp: this.props.otpPro,
      new_password: this.state.inputText,
    };
    apiManager
      .post(forgotPasswordAPI, data)
      .then(response => {
        const passData = response.data.data;
        const nextComp = 'NewPasswordSuccess';
        this.props.handlerPro(nextComp, null, null);
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
      error: false,
      inputText: text.target.value,
    });
  }

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

  render() {
    let errorItem;
    if (this.state.error) {
      errorItem = <p className="error-msg">{this.state.errorMessage}</p>;
    } else {
      errorItem = null;
    }

    return (
      <div className="searchAnimate">
        <h3 className="heading">{SET_NEW}</h3>
        <Form className="modalmin-height">
          <FormGroup className="enternew-password">
            <p className="text">{NEW_PASS}</p>
            <div className="form-div clearfix">
              <input
                onChange={this.handleInputChange.bind(this)}
                type={this.state.inputType}
                name="text"
                id="exampleEmail"
                className="form-control newinputmargin"
                placeholder="Enter New Password"
                maxLength={25}
              />
              {errorItem}
              
              {this.state.inputText !== '' ? <span onClick={this.showHidePass.bind(this)} className="valiationPosition-NewPassword">
                {<img src={require('../../../src/components/SVGs/eye.svg')}  alt="Show Password" />}
              </span> : null}
            </div>
          </FormGroup>
        </Form>
        <Button
          onClick={this.doneBtnPressed.bind(this)}
          className="btn-block btn-bg"
        >
          Save
        </Button>
      </div>
    );
  }
}

export default ForgotPasswordNewPassword;
