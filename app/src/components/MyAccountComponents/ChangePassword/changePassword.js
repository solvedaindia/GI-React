import React from 'react';
import { connect } from 'react-redux';
import apiManager from '../../../utils/apiManager';
import { changePasswordAPI, setPassword } from '../../../../public/constants/constants';
import { PASSWORD,CANCEL,SIX_CHAR_PASS,REQUIRED_FIELD,ENTER_PASSWORD,INVALID_PASSWORD, PASSWORD_SHOUBLE_BE} from '../../../constants/app/myAccountConstants';

import '../../../../public/styles/myAccount/changePassword.scss';
import { regexPw, validateEmptyObject } from '../../../utils/validationManager';
import Input from '../../Primitives/input';
import { isMobile } from '../../../utils/utilityManager';
import { resetRWDHeaderFlag } from '../../../actions/app/actions';

class ChangePassword extends React.Component {
  state = {
    errorMessage: null,
    inputType: `${PASSWORD}`,
    inputTypeNew:  `${PASSWORD}`,
    isShowPass: false,
    isShowPassNew: false,
    inputTextCurrent: '',
    inputTextNew: '',
    errorCurrent: false,
    errorNew: false,
    newPasswordPasteTxt: null,
    isSaveBtnActive: false,
  };

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  showHidePass() {
    if (this.state.isShowPass) {
      this.setState({
        isShowPass: false,
        inputType: `${PASSWORD}`,
      });
    } else {
      this.setState({
        isShowPass: true,
        inputType: 'text',
      });
    }
  }

  showHidePassNew() {
    if (this.state.isShowPassNew) {
      this.setState({
        isShowPassNew: false,
        inputTypeNew: `${PASSWORD}`,
      });
    } else {
      this.setState({
        isShowPassNew: true,
        inputTypeNew: 'text',
      });
    }
  }

  saveBtnPressed() {
    if (!this.state.isSaveBtnActive) {
      return
    }

    if (this.props.changePasswordTagPro === 0) {
      if (!validateEmptyObject(this.state.inputTextCurrent)) {
        this.setState({
          errorCurrent: true,
          errorMessage: this.state.inputTextCurrent === '' ? `${REQUIRED_FIELD}` : `${ENTER_PASSWORD}`,
        });
        return;
      }

      if (!regexPw.test(this.state.inputTextCurrent)) {
        let errorMsg;
        if (this.state.inputTextCurrent.length > 25) {
          errorMsg =
          `${INVALID_PASSWORD}`;
        } else {
          errorMsg =
            `${PASSWORD_SHOUBLE_BE}`;
        }

        this.setState({
          errorCurrent: true,
          errorMessage: errorMsg,
        });
        return;
      }
    }


    if (!validateEmptyObject(this.state.inputTextNew)) {
      this.setState({
        errorNew: true,
        errorMessage: this.state.inputTextNew === '' ? `${REQUIRED_FIELD}` : `${ENTER_PASSWORD}`,
      });
      return;
    }

    if (!regexPw.test(this.state.inputTextNew)) {
      let errorMsg;
      if (this.state.inputTextNew.length > 25) {
        errorMsg =
        `${INVALID_PASSWORD}`;
      } else {
        errorMsg =
          `${SIX_CHAR_PASS}`;
      }

      this.setState({
        errorNew: true,
        errorMessage: errorMsg,
      });
      return;
    }

    if (this.props.changePasswordTagPro === 0) {
      this.changePassword();
    }
    else {
      this.setNewPassword();
    }

  }

  changePassword() {
    const data = {
      current_password: this.state.inputTextCurrent,
      new_password: this.state.inputTextNew,
    };
    apiManager
      .put(changePasswordAPI, data)
      .then(response => {
        this.setState({
          errorCurrent: false,
          errorNew: false,
          inputTextNew: '',
          inputTextCurrent: '',
        });
        alert(response.data.data.message);
        this.enableDisableSaveBtn();
      })
      .catch(error => {
        const errorData = error.response.data;
        const errorMessage = errorData.error.error_message;
        const erroCode = error.response.status;
        if(erroCode==400)
        {
          this.setState({
            errorNew: true,
            errorMessage: errorMessage,
          });
        }
        else
          alert(errorMessage);
       
      });
  }

  setNewPassword() {
    const data = {
      new_password: this.state.inputTextNew,
    };
    apiManager
      .post(setPassword, data)
      .then(response => {
        this.setState({
          errorCurrent: false,
          errorNew: false,
          inputTextNew: '',
          inputTextCurrent: '',
        });
        alert(response.data.data.message);
        this.enableDisableSaveBtn();
      })
      .catch(error => {
    
      });
  }

  handleInputChange(value) {
    if (value.target.id === 'new') {
      this.state.inputTextNew = this.state.newPasswordPasteTxt !== null ? this.state.inputTextNew : value.target.value;
      this.setState({
        errorCurrent: false,
        errorNew: false,
        newPasswordPasteTxt: null,
      });
    } else {
      this.state.inputTextCurrent = value.target.value;
      this.setState({
        errorCurrent: false,
        errorNew: false,
      });
    }

    this.enableDisableSaveBtn();
  }

  enableDisableSaveBtn() {
    var isBtnValidate = true;
  
    if (this.state.inputTextCurrent !== '' && this.state.inputTextNew !== '') {
      isBtnValidate = true;
    }
    else {
      isBtnValidate = false;
    }

    if (this.props.changePasswordTagPro === 1) {
      if (this.state.inputTextNew !== '') {
        isBtnValidate = true;
      }
      else {
        isBtnValidate = false;
      }
    }

    this.setState({
      isSaveBtnActive: isBtnValidate,
    })

  }

  onPasteText(value) {

    if (value.target.id === 'new') {
      this.setState({
        errorCurrent: false,
        errorNew: false,
        newPasswordPasteTxt: value.clipboardData.getData('text'),
      });
    }
  }

  onRWDCancelBtnClick() {
    this.props.resetRWDHeaderFlag(true);
  }

  render() {
    let errorItemCurrent = null;
    if (this.state.errorCurrent) {
      errorItemCurrent = (
        <div className="error-msg">{this.state.errorMessage}</div>
      );
    }

    let errorItemNew = null;
    if (this.state.errorNew) {
      errorItemNew = <div className="error-msg">{this.state.errorMessage}</div>;
    }

    var oldPasswordItem;
    if (this.props.changePasswordTagPro === 0) {
      oldPasswordItem = (
        <div className="form-div clearfix">
          <div className="currentPassword">
            <Input
              className="form-control newinputmargin"
              inputType={this.state.inputType}
              title="Current Password"
              name="text"
              id="current"
              placeholder="Enter Current Password"
              value={this.state.inputTextCurrent}
              handleChange={this.handleInputChange.bind(this)}
            />
            {this.state.inputTextCurrent !== '' ? <span onClick={this.showHidePass.bind(this)} className="valiationPosition-NewPassword" >
              {<img src={require('../../SVGs/eye.svg')}  alt='Show Password'/>}
            </span> : null}

          </div>
          {errorItemCurrent}
        </div>
      )
    }

    return (
      <div className="form-BgContainer changePasswordContainer">

        {oldPasswordItem}

        <div className="form-div clearfix">
          <div className="form-group">
            <Input
              className="form-control"
              inputType={this.state.inputTypeNew}
              title="New Password"
              name="email"
              id="new"
              placeholder="Enter New Password"
              value={this.state.inputTextNew}
              handleChange={this.handleInputChange.bind(this)}
              onPaste={this.onPasteText.bind(this)}
            />
            {this.state.inputTextNew !== '' ? <span onClick={this.showHidePassNew.bind(this)} className="valiationPosition-NewPassword2" >
              {<img src={require('../../SVGs/eye.svg')}  alt='Show Password' />}
            </span> : null}
          </div>
          {errorItemNew}
        </div>
        {isMobile() && <button onClick={this.onRWDCancelBtnClick.bind(this)} className='btn-cancel btn'>{CANCEL}</button>}
        <button onClick={this.saveBtnPressed.bind(this)} className={this.state.isSaveBtnActive ? "btn-applyActive btn" : "btn-apply btn"}>
          Save
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  
}

export default connect(
  mapStateToProps,
  { resetRWDHeaderFlag },
)(ChangePassword);
