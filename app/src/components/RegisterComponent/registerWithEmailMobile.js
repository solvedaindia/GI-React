import React from 'react';
import { Button, Form, FormGroup, Row, Col, Label } from 'react-bootstrap';
import {
  registartionAPI,
  generateOTPAPI,
} from '../../../public/constants/constants';
import '../../../public/styles/registerComponent/registerComponent.scss';
import {
  regexEmail,
  regexMobileNo,
  validateEmptyObject,
  regexPw,
  validateFullName,
  regexName
} from '../../utils/validationManager';
import {
  registerWithEmail,
  registerWithMobileNum,
  registerWithEmailText,
  registerWithMobileNumText,
} from './constants';
import RegisterThumbnailImg from '../../../public/images/register_thumbnail.png';
import appCookie from '../../utils/cookie';
import {isMobile} from '../../utils/utilityManager';
// import { LogoUrl } from './constants';
import WhiteLogo from '../SVGs/whiteLogo';

class RegisterWithEmailMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      userId: '',
      password: '',
      errorMessageName: null,
      errorMessageUserId: null,
      errorMessagePassword: null,
      isShowPass: false,
      inputType: 'password',
      isActive: 'hideData'
	};
	this.callbackFunc = this.callbackFunc.bind(this);
  }

  componentDidMount() {
    if (this.props.userdata) {
      this.setState({
        name: this.props.userdata.name,
        userId: this.props.userdata.user_id,
		//password: this.props.userdata.password,
		password: ''
      });
    }
  }

  /* Handle Change */
  handleChange = e => {
    const passVal = document.getElementById('password').value;
    let activeClass = 'hideData';
    if (passVal.length > 0) {
      activeClass = 'showData';
    }

    this.setState({ [e.target.name]: e.target.value, isActive: activeClass});
  };

  /* Handle Validation */
  handleValidation(obj, errorType) {
    let isValidate = errorType;

    this.setState({
      errorMessageName: null,
      errorMessageUserId: null,
      errorMessagePassword: null,
    });

    if (!validateEmptyObject(obj.name)) {
      this.setState({
        errorMessageName: 'This field is required',
      });
      isValidate = false;
	} else if (!validateFullName(obj.name) || !(regexName.test(obj.name))) {
		this.setState({
		  errorMessageName: 'Please enter a valid Name. It should not exceed 100 characters',
		});
		isValidate = false;
	}

    if (!validateEmptyObject(obj.userId)) {
      this.setState({
        errorMessageUserId: 'The field is required',
      });
      isValidate = false;
    } else if (
      !regexEmail.test(obj.userId) &&
      this.props.registrationType !== registerWithMobileNum
    ) {
      this.setState({
        errorMessageUserId: 'Please enter valid Email Id',
      });
      isValidate = false;
    } else if (
      !regexMobileNo.test(obj.userId) &&
      this.props.registrationType === registerWithMobileNum
    ) {
      this.setState({
        errorMessageUserId: 'Please enter valid Mobile number',
      });
      isValidate = false;
    }

    if (!validateEmptyObject(obj.password)) {
      this.setState({
        errorMessagePassword: 'The field is required',
      });
      isValidate = false;
    } else if (!regexPw.test(obj.password) && obj.password.length < 25) {
      this.setState({
        errorMessagePassword:
          'Invalid Password. Password should have min 6 characters and atleast 1 number',
      });
      isValidate = false;
    } else if ((!regexPw.test(obj.password) && obj.password.length > 24) || obj.password.length > 25) {
		this.setState({
		  errorMessagePassword:
			'Invalid Password. Password should have max 25 characters and atleast 1 number',
		});
		isValidate = false;
	  }
    return isValidate;
  }

  copyPaste = e => {
    e.preventDefault();
  }

  /* Handle Submit */
  handleSubmit = e => {
    e.preventDefault();
    const isValidate = this.handleValidation(this.state, true);

    if (isValidate === false) {
      return false;
    }

    const data = {
      name: this.state.name,
      user_id: this.state.userId,
      password: this.state.password,
      pincode: appCookie.get('pincode'),
    };

    if (this.props.registrationType === registerWithEmail) {
      this.props.handleApi(
        registartionAPI,
        data,
		this.props.registrationType,
		this.callbackFunc
      );
    } else {
      this.props.handleApi(
        generateOTPAPI,
        data,
		this.props.registrationType,
		this.callbackFunc
      );
    }
  };

  /* Error Messgae */
  errorMessage = message => <p className="error-msg">{message}</p>;

  /* Show Hide Password */
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

  callbackFunc(errorMsg) {
  if (errorMsg === 'userid and password cannot be same') {
	this.setState({
		errorMessagePassword: errorMsg
	});

  } else {
	this.setState({
		errorMessageUserId: errorMsg
	});
  }
  }


  renderLoginComponent() {
    this.props.loginComponentData();
  }

  render() {
    let errorMessageName = null;
    let errorMessageUserId = null;
    let errorMessagePassword = null;
    let headerText = registerWithEmailText;

    if (this.state.errorMessageName) {
      errorMessageName = this.errorMessage(this.state.errorMessageName);
    }

    if (this.state.errorMessageUserId) {
      errorMessageUserId = this.errorMessage(this.state.errorMessageUserId);
    }

    if (this.state.errorMessagePassword) {
      errorMessagePassword = this.errorMessage(this.state.errorMessagePassword);
    }

    if (this.props.registrationType === registerWithMobileNum) {
      headerText = registerWithMobileNumText;
    }

    return (
      <div>
        <Row>
          <Col xs={12} md={5} className="no-padding">
            {!isMobile () ? (<div className="Thumbnailbox">
              <img className="imgfullwidth" src={RegisterThumbnailImg} />
            </div>):(<div className="reg-join-Us">
              {/* <img className="logo_width" src={LogoUrl} alt="logo" /> */}
              <WhiteLogo width="100" height="33" />
              <h3 className="joinus-heading">Join us Now</h3>
            </div>)}
          </Col>

          <Col xs={12} md={7}>
            <div className="form_register">
            {!isMobile () &&<h3 className="heading">{headerText}</h3>}
              <div>
                <Form>
                  <FormGroup>
                    <div className="form-div clearfix">
                      <Label>Full Name</Label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Please Enter Full Name"
                        onChange={this.handleChange}
                        value={this.state.name}
                      />
                      {errorMessageName}
                    </div>
                  </FormGroup>
                  <FormGroup>
                    {this.props.registrationType === registerWithEmail ? (
                      <div>
                        <Label className="label">Email Address</Label>
                        <div className="form-div clearfix">
                          <input
                            type="email"
                            name="userId"
                            className="form-control"
                            placeholder="Please Enter Email Address"
                            onChange={this.handleChange}
                          />
                          {errorMessageUserId}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Label className="label">Mobile Number</Label>
                        <div className="form-div clearfix">
                          <input
                            type="mobile"
                            name="userId"
                            className="form-control"
                            placeholder="Please Enter Mobile Number"
                            onChange={this.handleChange}
                            value={this.state.userId}
                            maxlength="10"
                          />
                          {errorMessageUserId}
                        </div>
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <div>
                      <Label className="label">Password</Label>
                      <div className="form-div clearfix">
                        <input
                          type={this.state.inputType}
                          onPaste={this.copyPaste}
                          name="password"
                          id="password"
                          className="form-control"
                          placeholder="Please Enter Your Password"
                          onChange={this.handleChange}
                          value={this.state.password}
                        />
                        <span
                          onClick={this.showHidePass.bind(this)}
                          className={`valiationPosition-NewPassword ${this.state.isActive}`}
                        >
                          {
                            <img
                              src={require('../../../src/components/SVGs/eye.svg')}
                            />
                          }
                        </span>
                        {errorMessagePassword}
                        <p />
                      </div>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Button
                      onClick={this.handleSubmit}
                      className="btn-block btn-bg"
                    >
                      Register
                    </Button>
                    <p className="have-account">
                    Already have an account?{' '}
                      <a
                        className="login"
                        role="button"
                        onClick={this.renderLoginComponent.bind(this)}
                      >
                        Login
                      </a>
                    </p>
                    <p className="sign_text">
                    By clicking register you agree to our{' '}
                      <a className="link" href="">
                        'Terms & Conditions'
                      </a>{' '}
                    </p>
                    {/* </p> */}
                  </FormGroup>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default RegisterWithEmailMobile;
