import React from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import apiManager from '../../utils/apiManager';
import {
  forgotPasswordAPI,
  storeId,
  accessToken,
} from '../../../public/constants/constants';
import Input from '../../components/Primitives/input';
import { regexPw, validateEmptyObject } from '../../utils/validationManager';
import {ENTER_VALID_PASS, PASSWORD_SHOULD_NOT, SIX_CHARACTER_PASS, NEW_PASS } from '../../constants/app/footerConstants';

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
      
      inputText: '',
      newPasswordPasteTxt: null,
    };
  }

  doneBtnPressed(e) {
    e.preventDefault();
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

  // handleInputChange(text) {
  //   // this.state.inputText = this.state.newPasswordPasteTxt !== null ? this.state.inputText : value.target.value;

  //   // this.setState({
  //   //   error: false,
  //   //   inputText: text.target.value,
  //   // });
  // }

  handleInputChange(value) {
      this.state.inputText = this.state.newPasswordPasteTxt !== null ? this.state.inputText : value.target.value;
      this.setState({
        errorCurrent: false,
        errorNew: false,
        newPasswordPasteTxt: null,
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
  
  onPasteText(value) {

      this.setState({
        errorCurrent: false,
        errorNew: false,
        newPasswordPasteTxt: value.clipboardData.getData('text'),
      });
  }

  render() {
    let errorItem;
    if (this.state.error) {
      errorItem = <p className="error-msg error-msg-new-password">{this.state.errorMessage}</p>;
    } else {
      errorItem = null;
    }

    return (
      <div className="searchAnimate">
        <h3 className="heading">Set New Password</h3>
        <Form className="modalmin-height"
         onSubmit = {this.doneBtnPressed.bind(this)}
        >
          <FormGroup className="enternew-password">
            <p className="text">{NEW_PASS}</p>
            <div className="form-div clearfix">
              <Input
            
                type={this.state.inputType}
                name="text"
                id="exampleEmail"
                className="form-control newinputmargin"
                placeholder="Enter New Password"
                maxLength={25}
                value={this.state.inputText}
                handleChange={this.handleInputChange.bind(this)}
                onPaste={this.onPasteText.bind(this)}
              />
              {errorItem}
              
              {this.state.inputText !== '' ? <span onClick={this.showHidePass.bind(this)} className="valiationPosition-NewPassword">
                {<img src={require('../../../src/components/SVGs/eye.svg')}  alt="Show Password" />}
              </span> : null}
            </div>
          </FormGroup>
          
        </Form>
        <Button
          type="submit"
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
