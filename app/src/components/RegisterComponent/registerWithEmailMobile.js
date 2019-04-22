import React from 'react';
import { Button, Form, FormGroup, Row, Col, Label } from 'react-bootstrap';
import {
  registartionAPI,
  generateOTPAPI,
  accessToken,
} from '../../../public/constants/constants';
import '../../../public/styles/registerComponent/registerComponent.scss';
import {
  regexEmail,
  regexMobileNo,
  validateEmptyObject,
  regexPw,
} from '../../utils/validationManager';
import {
  registerWithEmail,
  registerWithMobileNum,
  registerWithEmailText,
  registerWithMobileNumText,
} from './constants';
import RegisterThumbnailImg from '../../../public/images/register_thumbnail.png';

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
    };
  }

  componentDidMount() {
    if (this.props.userdata) {
      this.setState({
        name: this.props.userdata.name,
        userId: this.props.userdata.user_id,
        password: this.props.userdata.password,
      });
    }
  }

  /* Handle Change */
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
    } else if (!regexPw.test(obj.password)) {
      this.setState({
        errorMessagePassword: 'Invalid Password. Password should have min 6 characters and atleast 1 number',
      });
      isValidate = false;
    }
    return isValidate;
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
    }

    if (this.props.registrationType === registerWithEmail) {
      this.props.handleApi(registartionAPI, data, accessToken, this.props.registrationType);
    } else {
      this.props.handleApi(generateOTPAPI, data, accessToken, this.props.registrationType);
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
    }
    else {
      this.setState({
        isShowPass: true,
        inputType: 'text',
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
          <Col xs={12} md={5} className='no-padding'>
            <div className='Thumbnailbox'>
              <img className='imgfullwidth' src={RegisterThumbnailImg} />
            </div>
          </Col>

          <Col xs={12} md={7}>
            <div className='form_register'>
              <h3 className='heading'>{headerText}</h3>
              <div>
                <Form>
                  <FormGroup>
                    <div className='form-div clearfix'>
                      <Label>FULL NAME</Label>
                      <input type='text' name='name' className='form-control' placeholder='Please Enter Full Name' onChange={this.handleChange} value={this.state.name} />
                      {errorMessageName}
                    </div>
                  </FormGroup>
                  <FormGroup>
                    {this.props.registrationType === registerWithEmail ? (
                      <div>
                        <Label className='label'>EMAIL ADDRESS</Label>
                        <div className='form-div clearfix'>
                          <input type='email' name='userId' className='form-control' placeholder='Please Enter Email Address' onChange={this.handleChange} />
                          {errorMessageUserId}
                        </div>
                      </div>
                    ) : (
                        <div>
                          <Label className='label'>Mobile Number</Label>
                          <div className='form-div clearfix'>
                            <input type='mobile' name='userId' className='form-control' placeholder='Please Enter Mobile Number' onChange={this.handleChange} value={this.state.userId} />
                            {errorMessageUserId}
                          </div>
                        </div>
                      )}
                  </FormGroup>
                  <FormGroup>
                    <div>
                      <Label className='label'>Password</Label>
                      <div className='form-div clearfix'>
                        <input type={this.state.inputType} name='password' className='form-control' placeholder='Please Enter Your Password' onChange={this.handleChange} value={this.state.password} />
                        <span onClick={this.showHidePass.bind(this)} className='valiationPosition-NewPassword'>{<img src={require('../../../src/components/SVGs/eye.svg')} />}</span>
                        {errorMessagePassword}
                        <p></p>
                      </div>
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <Button onClick={this.handleSubmit} className='btn-block btn-bg'>SIGN UP</Button>
                    <p className='have-account'>Have an account? <a className='login' role='button' onClick={this.renderLoginComponent.bind(this)}>Login</a></p>
                    <p className='sign_text'>By signing up you agree to our <a className='link' href=''>T&C</a> </p>
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
