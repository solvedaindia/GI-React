import React from 'react';
import { connect } from 'react-redux';
import apiManager from '../../../utils/apiManager';
import { Button, Modal } from 'react-bootstrap';
import { userDetailAPI, userDetailValidateAPI, userDetailUpdateAPI } from '../../../../public/constants/constants';
import '../../../../public/styles/myAccount/changePassword.scss';
import { regexEmail, regexMobileNo } from '../../../utils/validationManager';
import '../../../../public/styles/myAccount/myProfile.scss';
import Input from '../../Primitives/input';
import {
  validateFullName,
  validateEmailId,
  validateMobileNo_OPTIONAL
} from '../../../utils/validationManager';
import { } from '../../../../public/constants/constants';
import ForgotPasswordOTP from '../../ForgotPasswordComponent/forgotPasswordOTP';
import '../../../../public/styles/forgotpassword/forgototp.scss';
import '../../../../public/styles/forgotpassword/forgotpass.scss';
import { resetRWDHeaderFlag, updateUserProfile } from '../../../actions/app/actions';
import { isMobile } from '../../../utils/utilityManager';
import { NAME_VALIDATION, NUMBER_VALIDATION, EMAIL_VALIDATION} from '../../../constants/app/myAccountConstants';


class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText_name: '',
      inputText_number: '',
      inputText_email: '',

      error_name: false,
      error_number: false,
      error_email: false,

      errorMessage_name: '',
      errorMessage_number: '',
      errorMessage_email: '',

      noteItem: null,
      noteItemMsg: null,
      userResponse: null,
      inputLogoId: null,
      //Validaton vars
      logonId: null,
      field1: null,

      //OTP PopUp Vars
      modal: false,
      modalClass: 'modal-forgot',

      dataLoad: {},
      enteredOTP: null,
      isSaveBtnDisable: true,
      saveDisable: false,
    };

    this.handleInput = this.handleInput.bind(this);
    this.toggle = this.toggle.bind(this);
    this.updateUserDetail = this.updateUserDetail.bind(this);
  }

  toggle() {
    this.state.enteredOTP =null;
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  componentDidMount() {
    this.getProfileDetails();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.userResponse !== null) {
      this.setState({
        inputText_name: this.state.userResponse.name,
        inputText_email: this.state.userResponse.emailID,
        inputText_number: this.state.userResponse.mobileNo,
        error_name: false,
        error_number: false,
        error_email: false,
  
        errorMessage_name: '',
        errorMessage_number: '',
        errorMessage_email: '',
      });
    }
  }


  onSavebuttonClick(event) {
    if(event)
      event.preventDefault();
    if (this.state.userResponse.name !== '') {
      if (!validateFullName(this.state.inputText_name)) {
        this.setState({
          error_name: true,
          errorMessage_name: NAME_VALIDATION,
        });
        return;
      }
    }

    // if (this.state.userResponse.mobileNo !== '') { //If user register with Email this condition fails
    if (this.state.inputText_number !== '') {
      if (!validateMobileNo_OPTIONAL(this.state.inputText_number)) {
        this.setState({
          error_number: true,
          errorMessage_number: NUMBER_VALIDATION,
        });
        return;
      }
    }

    // }

    // if (this.state.userResponse.emailID !== '') { //If user register with Mobile this condition fails
    if (!validateEmailId(this.state.inputText_email)) {
      this.setState({
        error_email: true,
        errorMessage_email: EMAIL_VALIDATION,
      });
      return;
    }
    // }


    //Update the data on server
    this.validateUserDetails();
  }

  getProfileDetails() {
    apiManager
      .get(userDetailAPI)
      .then(response => {
        this.setState({
          inputText_name: response.data.data.name,
          inputText_email: response.data.data.emailID,
          inputText_number: response.data.data.mobileNo,
          inputLogoId: response.data.data.logonID,
          userResponse: response.data.data,
        });
        this.props.myProfileCallbackPro(response.data.data.name, response.data.data.field3);
      })
      .catch(error => {
        // return null;
      });
  }

  validateUserDetails() {
    var showOTP = false;
    //var dataLoad = {}
    if (this.state.userResponse.name !== this.state.inputText_name && this.state.userResponse.emailID === this.state.inputText_email && this.state.userResponse.mobileNo === this.state.inputText_number) {
      // Call Update API
      this.state.dataLoad = {
        name: this.state.inputText_name,
      }
      this.updateUserDetail(()=>{});
      return;
    }
    if (this.state.userResponse.name !== this.state.inputText_name) {
      // Call Validate API
      this.state.dataLoad.name = this.state.inputText_name
    }

    if (this.state.userResponse.emailID !== this.state.inputText_email) {
      // Check if Logon id is email or mobile, and add accordingly.
      if (regexEmail.test(this.state.userResponse.logonID)) {
        // LogonId is Email
        this.state.dataLoad.logonid = this.state.inputText_email
      }
      else {
        this.state.dataLoad.field1 = this.state.inputText_email
      }
    }

    if (this.state.userResponse.mobileNo !== this.state.inputText_number) {
      showOTP = true;
      if (regexMobileNo.test(this.state.userResponse.logonID)) {
        // LogonId is Email
        this.state.dataLoad.logonid = this.state.inputText_number
      }
      else {
        this.state.dataLoad.field1 = this.state.inputText_number
      }
    }

    if (!this.isEmpty(this.state.dataLoad)) {
      this.setState({
        saveDisable: true
      })
      apiManager.post(userDetailValidateAPI, this.state.dataLoad)
        .then(response => {
          if (showOTP) {
            // Call Validate API
            this.setState({
              modal: true,
              saveDisable: false,
            })
          }
          else {
            this.updateUserDetail(()=>{});
          }

        })
        .catch(error => {
          setTimeout(() => {
            this.setState({
              noteItem: null,
              noteItemMsg: null,
            });
          }, 2000);
          this.setState({
            saveDisable: false,
            noteItemMsg: (
              <div className="noteMsg">
                <span className="failMsg">{error.response.data.error.error_message}</span>
              </div>
            ),
          });
        });

    }



  }

  isEmpty(map) {
    for (var key in map) {
      if (map.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  enteredOTPCallback(otpText,callback) {
    this.state.enteredOTP = otpText
    this.updateUserDetail((err, res) => {
      callback(err, res);
    });
  }

  updateUserDetail(callback) {
    var updateDataload = this.state.dataLoad;
    if (this.state.enteredOTP !== null) {
      updateDataload.otp = this.state.enteredOTP;
      updateDataload.validateotp = "true";
    }
    else {
      updateDataload.validateotp = "false";
    }

    this.setState({
      saveDisable: true,
    })
    apiManager.post(userDetailUpdateAPI, this.state.dataLoad)
      .then(response => {
        callback(null, 'success')
        setTimeout(() => {
          this.setState({
            noteItem: null,
            noteItemMsg: null,
          });
        }, 2000);
        this.setState({
          saveDisable: false,
          isSaveBtnDisable: true,
          dataLoad: {},
          noteItem: (
            <div className="noteMsg">
              <span className="successMsg">Profile Updated!</span>
            </div>
          ),
        });
        this.getProfileDetails();
        this.props.updateUserProfile(this.state.inputText_name);
      })
      .catch(error => {
        callback(error, null)
        // setTimeout(() => {
        //   this.setState({
        //     noteItem: null,
        //     noteItemMsg: null,
        //   });
        // }, 2000);
        this.setState({
          saveDisable: false,
          // noteItemMsg: (
          //   <div className="noteMsg">
          //     <span className="failMsg">{error.response.data.error.error_message}</span>
          //   </div>
          // ),
        });
      });
  }

  handleInput(value) {
    this.setState({
      error_name: false,
      error_number: false,
      error_email: false,
    });

    // if (this.state.userResponse.name !== value.target.value && this.state.userResponse.mobileNo !== value.target.value && this.state.userResponse.emailID !== value.target.value) {
    //   this.setState({
    //     isSaveBtnDisable: false
    //   });
    // }
    // else {
    //   this.setState({
    //     isSaveBtnDisable: true
    //   });
    // }


    switch (value.target.id) {
      case 'fullName':
        this.state.inputText_name = value.target.value
        // this.setState({
        //   inputText_name: value.target.value,
        //   // isSaveBtnDisable: this.state.userResponse.name !== value.target.value ? false : true
        // });
        break
      case 'phoneNumber':
        this.state.inputText_number = value.target.value
        // this.setState({
        //   inputText_number: value.target.value,
        //   // isSaveBtnDisable: this.state.userResponse.mobileNo !== value.target.value ? false : true
        // });
        break
      case 'emailId':
        this.state.inputText_email = value.target.value
        // this.setState({
        //   inputText_email: value.target.value,
        //   // isSaveBtnDisable: this.state.userResponse.emailID !== value.target.value ? false : true
        // });
        break
      default:

    }


    this.enableDisableSaveBtn();


  }

  enableDisableSaveBtn() {
    var isBtnValidate = true;
    if (this.state.userResponse.name !== this.state.inputText_name) {

      isBtnValidate = false;
    }
    if (this.state.userResponse.mobileNo !== this.state.inputText_number) {
      isBtnValidate = false;
    }
    if (this.state.userResponse.emailID !== this.state.inputText_email) {
      isBtnValidate = false;
    }
    this.setState({
      isSaveBtnDisable: isBtnValidate,
      saveDisable: isBtnValidate,
    })

  }

  focusIn() {
    this.setState({
      noteItem: (
        <div className="noteMsg">
          <span className="bold">Note:</span> Changing your mobile number and
          Email ID, will also cause your primary login ID to change
        </div>
      ),
    });
  }

  otpPopup() {
    return (
      <Modal
        show={this.state.modal}
        onHide={this.toggle}
        className={this.state.modalClass}
      >
        <Modal.Body>
          <div className="modal-wrapper sliderContainer">
            <Button className="close" onClick={this.toggle} />
            <div className="form-center">{
              <ForgotPasswordOTP
                isFromMyProfilePro={true}
                myProfileNumberPro={this.state.inputText_number.slice(-4)}
                enteredOTPCallbackPro={this.enteredOTPCallback.bind(this)}
                cancelOTPPro={this.toggle}
                userIdPro={this.state.inputText_number}
              />
            }
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )

  }

  onRWDCancelBtnClick() {
    this.props.resetRWDHeaderFlag(true);
  }

  onKeyPress=(event)=>
  {
    if(event.key === 'Enter'){
      if(!this.state.isSaveBtnDisable)
      {
        this.onSavebuttonClick();
      }
    }
  }

  render() {
    return (
      <>
        {this.otpPopup()}
        <div className="form-BgContainer">
          {/* {this.otpPopup()} */}
          <div className="form-div clearfix div-error">
            <Input
              inputType={'text'}
              title={'Full Name'}
              name={'name'}
              id={'fullName'}
              placeholder={'Enter your name'}
              value={this.state.inputText_name}
              handleChange={this.handleInput}
              onKeyPress={this.onKeyPress}
            />
            {this.state.error_name ? (
              <div className="error-msg">{this.state.errorMessage_name}</div>
            ) : null}
          </div>
          <div className="form-div clearfix div-error">
            <Input
              inputType={'text'}
              title={'Phone Number'}
              name={'name'}
              id={'phoneNumber'}
              placeholder={'Enter Number'}
              value={this.state.inputText_number}
              handleChange={this.handleInput}
              focusIn={this.focusIn.bind(this)}
              onKeyPress={this.onKeyPress}
            />
            {this.state.error_number ? (
              <div className="error-msg">{this.state.errorMessage_number}</div>
            ) : null}
          </div>
          <div className="form-div clearfix div-error">
            <Input
              inputType={'email'}
              title={'Email Address'}
              name={'name'}
              id={'emailId'}
              placeholder={'Enter email address'}
              value={this.state.inputText_email}
              handleChange={this.handleInput}
              focusIn={this.focusIn.bind(this)}
              onKeyPress={this.onKeyPress}
            />
            {this.state.error_email ? (
              <div className="error-msg">{this.state.errorMessage_email}</div>
            ) : null}
          </div>
          {this.state.noteItemMsg}
          {isMobile() && <button onClick={this.onRWDCancelBtnClick.bind(this)} className='btn-cancel btn'>Cancel</button>}
          <button
            disabled={this.state.saveDisable}
            onClick={this.onSavebuttonClick.bind(this)}
            className={this.state.isSaveBtnDisable ? "btn-apply btn" : "btn-applyActive btn"}
          >
            Save
        </button>
          {this.state.noteItem}
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  // const stateObj = getReleventReduxState(state, 'global');
  // const updatedUsername = getReleventReduxState(stateObj, 'userName');

  // return {
  //   username: updatedUsername,
  // };
}

export default connect(
  mapStateToProps,
  { resetRWDHeaderFlag, updateUserProfile },
)(MyProfile);
//export default MyProfile;
