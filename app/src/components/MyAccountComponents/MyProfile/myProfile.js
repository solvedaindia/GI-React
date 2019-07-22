import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import apiManager from '../../../utils/apiManager';
import { Button, Form, FormGroup, Label, Modal } from 'react-bootstrap';
import { userDetailAPI, userDetailValidateAPI, userDetailUpdateAPI } from '../../../../public/constants/constants';
import {
  resolveTheWishlistData,
  getCookie,
  getReleventReduxState,
} from '../../../utils/utilityManager';
import '../../../../public/styles/myAccount/changePassword.scss';
import { regexEmail } from '../../../utils/validationManager';
import '../../../../public/styles/myAccount/myProfile.scss';
import Input from '../../Primitives/input';
import {
  validateFullName,
  validateMobileNo,
  validateEmailId,
} from '../../../utils/validationManager';
import { } from '../../../../public/constants/constants';
import ForgotPasswordOTP from '../../ForgotPasswordComponent/forgotPasswordOTP';
import '../../../../public/styles/forgotpassword/forgototp.scss';
import '../../../../public/styles/forgotpassword/forgotpass.scss';
import { updateUserProfile } from '../../../actions/app/actions';
import { isMobile } from '../../../utils/utilityManager';

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
    };

    this.handleInput = this.handleInput.bind(this);
    this.toggle = this.toggle.bind(this);
    this.updateUserDetail = this.updateUserDetail.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  componentDidMount() {
    this.getProfileDetails();
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps -- ', this.state)
    if (this.state.userResponse !== null) {
      this.setState({
        inputText_name: this.state.userResponse.name,
        inputText_email: this.state.userResponse.emailID,
        inputText_number: this.state.userResponse.mobileNo,
      });
    }
  }


  onSavebuttonClick(event) {
    event.preventDefault();

    console.log('Makssss ---- ', this.state.userResponse.mobileNo);
    if (this.state.userResponse.name !== '') {
      if (!validateFullName(this.state.inputText_name)) {
        this.setState({
          error_name: true,
          errorMessage_name: 'Please enter a valid Name. It should not exceed 100 characters',
        });
        return;
      }
    }

    if (this.state.userResponse.mobileNo !== '') {
      if (!validateMobileNo(this.state.inputText_number)) {
        this.setState({
          error_number: true,
          errorMessage_number: 'Please enter valid mobile number.',
        });
        return;
      }
    }

    if (this.state.userResponse.emailID !== '') {
      if (!validateEmailId(this.state.inputText_email) || this.state.inputText_email === '') {
        this.setState({
          error_email: true,
          errorMessage_email: 'Please enter valid Email ID.',
        });
        return;
      }
    }


    //Update the data on server
    this.validateUserDetails();
  }

  getProfileDetails() {
    apiManager
      .get(userDetailAPI)
      .then(response => {
        console.log('profile detail --- ', response.data);
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
      console.log('update only the Name');
      // Call Update API
      this.state.dataLoad = {
        name: this.state.inputText_name,
      }
      this.updateUserDetail();
      return;
    }
    if (this.state.userResponse.name !== this.state.inputText_name) {
      console.log('update only the Name Seperate');
      // Call Validate API
      this.state.dataLoad.name = this.state.inputText_name
    }

    if (this.state.userResponse.emailID !== this.state.inputText_email) {
      console.log('update only the Email');
      // Check if Logon id is email or mobile, and add accordingly.
      if (regexEmail.test(this.state.userResponse.logonID)) {
        // LogonId is Email
        this.state.dataLoad.logonid = this.state.inputText_email
      }
      else {
        this.state.dataLoad.field1 = this.state.inputText_number
      }
    }

    if (this.state.userResponse.mobileNo !== this.state.inputText_number) {
      console.log('update only the Mobile No');
      showOTP = true;
      if (regexEmail.test(this.state.userResponse.logonID)) {
        // LogonId is Email
        this.state.dataLoad.field1 = this.state.inputText_number
      }
      else {
        this.state.dataLoad.logonid = this.state.inputText_email
      }
    }

    apiManager.post(userDetailValidateAPI, this.state.dataLoad)
      .then(response => {
        console.log('Validate Profile --- ', response.data.data.otpValue);
        if (showOTP) {
          // Call Validate API
          this.setState({
            modal: true
          })
          alert(`OTP - ${response.data.data.otpValue}`);
        }
        else {
          this.updateUserDetail();
        }

      })
      .catch(error => {
        console.log('validateUserDetails Error---', error.response.data.error.error_message);
        setTimeout(() => {
          this.setState({
            noteItem: null,
          });
        }, 2000);
        this.setState({
          noteItem: (
            <div className="noteMsg">
              <span className="failMsg">{error.response.data.error.error_message}</span>
            </div>
          ),
        });
      });




  }

  enteredOTPCallback(otpText) {
    this.state.enteredOTP = otpText
    this.updateUserDetail();
  }

  updateUserDetail() {
    var updateDataload = this.state.dataLoad;
    if (this.state.enteredOTP !== null) {
      updateDataload.otp = this.state.enteredOTP;
      updateDataload.validateotp = "true";
    }
    else {
      updateDataload.validateotp = "false";
    }

    apiManager.post(userDetailUpdateAPI, this.state.dataLoad)
      .then(response => {
        console.log('profile detail --- ', response.data);
        setTimeout(() => {
          this.setState({
            noteItem: null,
          });
        }, 2000);
        this.setState({
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
        console.log('updateUserDetail Error---', error);
        setTimeout(() => {
          this.setState({
            noteItem: null,
          });
        }, 2000);
        this.setState({
          noteItem: (
            <div className="noteMsg">
              <span className="failMsg">{error.response.data.error.error_message}</span>
            </div>
          ),
        });
        //alert(error.response.data.error.error_message)
      });
  }

  handleInput(value) {
    this.setState({
      error_name: false,
      error_number: false,
      error_email: false,
    });
    switch (value.target.id) {
      case 'fullName':
        return this.setState({
          inputText_name: value.target.value,
        });
      case 'phoneNumber':
        return this.setState({
          inputText_number: value.target.value,
        });
      case 'emailId':
        return this.setState({
          inputText_email: value.target.value,
        });
      default:
        return null;
    }
  }

  focusIn() {
    console.log('Focus In');
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

  render() {
    return (
      <>
        {this.otpPopup()}
        <form className="form-BgContainer">
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
            />
            {this.state.error_number ? (
              <div className="error-msg">{this.state.errorMessage_number}</div>
            ) : null}
          </div>
          <div className="form-div clearfix div-error">
            <Input
              inputType={'email'}
              title={'Email ID'}
              name={'name'}
              id={'emailId'}
              placeholder={'Enter EmailId'}
              value={this.state.inputText_email}
              handleChange={this.handleInput}
              focusIn={this.focusIn.bind(this)}
            />
            {this.state.error_email ? (
              <div className="error-msg">{this.state.errorMessage_email}</div>
            ) : null}
          </div>
          {isMobile() && <button className='btn-cancel btn'>Cancel</button>}
          <button
            onClick={this.onSavebuttonClick.bind(this)}
            className="btn-apply btn"
          >
            Save
        </button>
          {this.state.noteItem}
        </form>
      </>
    );
  }
}

function mapStateToProps(state) {
  // console.log('MyAccount MapStatetoprops --- ', state);
  // const stateObj = getReleventReduxState(state, 'global');
  // const updatedUsername = getReleventReduxState(stateObj, 'userName');

  // return {
  //   username: updatedUsername,
  // };
}

export default connect(
  mapStateToProps,
  { updateUserProfile },
)(MyProfile);
//export default MyProfile;
