import React from 'react';
import { Button, Modal, Form, FormGroup, Row, Col, Label, Alert } from 'react-bootstrap';
import apiManager from '../../utils/apiManager';
import modalImage from '../../../public/images/impact.jpg';
import {
  registartionWithEmailAPI,
  storeId,
  accessTokenAPI,
  generateOTPAPI,
} from '../../../public/constants/constants';
import '../../../public/styles/registerComponent/registerComponent.scss';
import {
  regexEmail,
  regexMobileNo,
  validateEmptyObject,
} from '../../utils/validationManager';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      errorMessageName: null,
      errorMessageEmail: null,
      errorMessagePassword: null,
      isValidate: false,
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props.registrationType, '---><><><>');
    /* if (!validateEmptyObject(this.state.name)) {
      this.setState({
          error: true,
          errorMessageName: 'The field is required',
          isValidate: false,
      });
      console.log('hehehe');
      return;
    } else {
        this.setState({
            error: false,
            errorMessageName: null,
            isValidate: true,
        });
    }
    
    if (!validateEmptyObject(this.state.email)) {
        this.setState({
            error: true,
            errorMessageEmail: 'The field is required',
            isValidate: false,
        });
        return;
    } else if (!validateEmptyObject(this.state.password)) {
        this.setState({
            error: true,
            errorMessagePassword: 'The field is required',
            isValidate: false,
        });
        return;
    } 

  var input = String(this.state.inputText);
  var firstChar = Number(input.charAt(0));
  if (!input.includes('@') && Number.isInteger(firstChar)) {
      if (!regexMobileNo.test(this.state.inputText)) {
          this.setState({
              error: true,
              errorMessage: 'Invalid Mobile Number',
              isValidate: false,
          });
          return;
      }
  }
  else {
      if (!regexEmail.test(this.state.email)) {
          this.setState({
              error: true,
              errorMessageEmail: 'Invalid Email address',
              isValidate: false,
          });
          return;
      }
  }
*/
    this.setState({
      isValidate: true,
    });

    const data = {
      name: this.state.name,
      user_id: this.state.email,
      password: this.state.password,
    };

    apiManager
      .post(accessTokenAPI, data)
      .then(token => {
        if (this.props.registrationType === 'registerWithEmail') {
        this.props.handleApi(registartionWithEmailAPI, data, token.data.data.access_token, this.props.registrationType);
          // this.apiCallForRegistration(registartionWithEmailAPI, data, token.data.data.access_token);
      } else {
        this.props.handleApi(generateOTPAPI, data, token.data.data.access_token, this.props.registrationType);
        // this.apiCallForRegistration(generateOTPAPI, data, token.data.data.access_token);
      }

      // this.apiCallForOtp(generateOTPAPI, data, token.data.data.access_token);
      })
      .catch(error => {
      const errorData = error.response.data;
      const errorMessage = errorData.error.error_message;
      alert(`Error - ${errorMessage}`);
      });
  };

  render() {
    let errorMessageName; let errorMessageEmail; let errorMessagePassword;
    if (this.state.errorMessageName) {
      errorMessageName = <p className='error-msg'>{this.state.errorMessageName}</p>
    } else {
      errorMessageName = null;
    }

    if (this.state.errorMessageEmail) {
      errorMessageEmail = <p className='error-msg'>{this.state.errorMessageEmail}</p>
    } else {
      errorMessageEmail = null;
    }

    if (this.state.errorMessagePassword) {
      errorMessagePassword = <p className='error-msg'>{this.state.errorMessagePassword}</p>
    } else {
      errorMessagePassword = null;
    }

    return (
      <div>
        <Row>
          <Col xs={12} md={8} className='joinUsVerticalLine'>
            <div className='leftColJoinUs'>
              <Modal.Title className='joinUstitle'>Join us Now</Modal.Title>
              <div className='joinUsNow clearfix form-group'>
                <Form>
                  <FormGroup>
                    <Label>FULL NAME</Label>
                    <input type='text' name='name' className='form-control' placeholder='Please Enter Full Name' onChange={this.handleChange}/>
                    {errorMessageName}

                    { this.props.registrationType === 'registerWithEmail' ? (
                      <div><Label className='label'>EMAIL ADDRESS</Label>
                        <input type='email' name='email' className='form-control' placeholder='Please Enter Email Address' onChange={this.handleChange}/>
                        {errorMessageEmail}
                      </div>
                    ) : (
                      <div><Label className='label'>Mobile Number</Label>
                        <input type='mobile' name='email' className='form-control' placeholder='Please Enter Mobile Number' onChange={this.handleChange}/> 
                      </div>
                    )}
                    )}

                    <Label className='label'>Password</Label>
                    <input type='password' name='password' className='form-control' placeholder='Please Enter Your Password' onChange={this.handleChange}/>
                    {errorMessagePassword}
                    <p></p>
                    <Button onClick={this.handleSubmit} className='btn btn-block btn-bg'>SIGN UP</Button>
                    <p className='text'>By signing up you agree to our <a href=''>T&C</a> </p>
                  </FormGroup>
                </Form>
              </div>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div className='rightColJoinUs'>
              <img src={modalImage} alt='Img'/>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Register;
