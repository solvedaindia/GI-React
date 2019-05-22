import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import apiManager from '../../../utils/apiManager';
import {
  changePasswordAPI
} from '../../../../public/constants/constants';
import {
  resolveTheWishlistData,
  getCookie,
  getReleventReduxState,
} from '../../../utils/utilityManager';
import '../../../../public/styles/myAccount/changePassword.scss';
import { regexPw, validateEmptyObject } from '../../../utils/validationManager';

class ChangePassword extends React.Component {
  state = {
    errorMessage: null,
    inputType: 'password',
    isShowPass: false,
    inputTextCurrent: '',
    inputTextNew: '',
    errorCurrent: false,
    errorNew: false,
  };

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

  saveBtnPressed() {
    // this.validate(this.state.inputTextCurrent, this.state.errorCurrent);
    // console.log('afterrrr');
    if (!validateEmptyObject(this.state.inputTextCurrent)) {
      this.setState({
        errorCurrent: true,
        errorMessage: 'Please enter the Password',
      });
      return;
    }

    if (!regexPw.test(this.state.inputTextCurrent)) {
      let errorMsg;
      if (this.state.inputTextCurrent.length > 25) {
        errorMsg = 'Invalid Password. Password should not be more than 25 characters';
      } else {
        errorMsg =
          'Invalid Password. Password should have min 6 characters and atleast 1 number';
      }

      this.setState({
        errorCurrent: true,
        errorMessage: errorMsg,
      });
      return;
    }

    if (!validateEmptyObject(this.state.inputTextNew)) {
      this.setState({
        errorNew: true,
        errorMessage: 'Please enter the Password',
      });
      return;
    }

    if (!regexPw.test(this.state.inputTextNew)) {
      let errorMsg;
      if (this.state.inputTextNew.length > 25) {
        errorMsg = 'Invalid Password. Password should not be more than 25 characters';
      } else {
        errorMsg =
          'Invalid Password. Password should have min 6 characters and atleast 1 number';
      }

      this.setState({
        errorNew: true,
        errorMessage: errorMsg,
      });
      return;
    }

    const data = {
      "current_password": this.state.inputTextCurrent,
      "new_password": this.state.inputTextNew
    };
    apiManager.put(changePasswordAPI, data)
      .then(response => {
        console.log('Change password -- ', response.data.data.message);
        this.setState({
          errorCurrent: false,
          errorNew: false,
          inputTextNew: '',
          inputTextCurrent: '',
        });
        alert(response.data.data.message);
      })
      .catch(error => {
        const errorData = error.response.data;
        const errorMessage = errorData.error.error_message;
        console.log('Current passwod Error -- ', errorMessage);
        alert(errorMessage);
        // this.setState({
        //   error: true,
        //   errorMessage,
        // });
      });

  }



  handleInputChange(value) {
    console.log('Handle Input --- ', value.target.id)
    if (value.target.id === 'new') {
      this.setState({
        errorCurrent: false,
        errorNew: false,
        inputTextNew: value.target.value,
      });
    }
    else {
      this.setState({
        errorCurrent: false,
        errorNew: false,
        inputTextCurrent: value.target.value,
      });
    }
  }

  render() {

    let errorItemCurrent = null;
    if (this.state.errorCurrent) {
      errorItemCurrent = <p className="error-msg">{this.state.errorMessage}</p>;
    }

    let errorItemNew = null;
    if (this.state.errorNew) {
      errorItemNew = <p className="error-msg">{this.state.errorMessage}</p>;
    }

    return (
      <div className='changePasswordContainer'>
        <h6>Current Password</h6>
        <div className="form-div clearfix div-error">
          <input
            onChange={this.handleInputChange.bind(this)}
            type={this.state.inputType}
            name="text"
            id="current"
            className="form-control newinputmargin"
            placeholder="Enter Current Password"
            value={this.state.inputTextCurrent}
          />
          {errorItemCurrent}
          <span
            onClick={this.showHidePass.bind(this)}
            className="valiationPosition-NewPassword"
          >
            {<img src={require('../../SVGs/eye.svg')} />}
          </span>
        </div>

        <h6>New Password</h6>
        <div className="form-div clearfix div-error">
          <input
            // onKeyPress={this.onpress}
            onChange={this.handleInputChange.bind(this)}
            type="password"
            name="email"
            id="new"
            className="form-control"
            placeholder="Enter New Password"
            value={this.state.inputTextNew}
          />
          {errorItemNew}
        </div>
        <button
          onClick={this.saveBtnPressed.bind(this)}
          className="btn-block btn-bg"
        >
          Save
        </button>
      </div>
    );
  }
}


export default ChangePassword;
