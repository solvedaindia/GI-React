import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import '../../../public/styles/checkout.scss';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import axios from 'axios';
import Link from 'react-router-dom/Link';
import {
  regexEmail,
  regexMobileNo,
  validateEmptyObject,
} from '../../utils/validationManager';
import {
    getReleventReduxState
  } from '../../utils/utilityManager';

export class Step1Component extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          has_pass: false,
          userId: '',
          password: '',
          errorMessageUserId: null,
          errorMessagePassword: null,
        }
    }

    handleChange = e => {
      console.log(e.target.name, e.target.value, "name and vlaue")
      this.setState({ [e.target.name]: e.target.value });
    };

    handleHasPass = () => {
      if(this.state.has_pass == false) {
        this.setState({
          has_pass: true
        })
      } else {
        this.setState({
          has_pass: false
        })
      }
    }

    handleProceed = () => {
      this.props.proceed();
    }

    handleValidation(obj, errorType) {
      let isValidate = errorType;
      const input = String(obj.userId);
      const firstChar = Number(input.charAt(0));
      console.log("handle validetion called", obj.userId, obj.pass)
      this.setState({
        errorMessageUserId: null,
        errorMessagePassword: null,
      });
  
      if (!validateEmptyObject(obj.userId)) {
        console.log("empty userId")
        this.setState({
          errorMessageUserId: 'Please enter valid Email Id/Mobile number',
        });
        isValidate = false;
      } else if (!input.includes('@') && Number.isInteger(firstChar)) {
        if (!regexMobileNo.test(obj.userId)) {
          this.setState({
            errorMessage: 'Please enter valid Email Id/Mobile number',
          });
          isValidate = false;
        }
      } else if (!regexEmail.test(obj.userId)) {
        console.log("wrong user id")
        this.setState({
          errorMessageUserId: 'Please enter valid Email Id/Mobile number',
        });
        isValidate = false;
      }
  
      if (!validateEmptyObject(obj.password) && this.state.has_pass) {
        this.setState({
          errorMessagePassword: 'Enter a valid password ',
        });
        isValidate = false;
      }
  
      return isValidate;
    }

    handleFormSubmit = e => {
      var uId = document.getElementById('userId').value;
      if(this.state.has_pass) {
        var pass = document.getElementById('password').value;
      }
      const data = {
        userId: uId,
        password: pass,
      };
      const isValidate = this.handleValidation(data, true);
  
      if (isValidate === false) {
        return false;
      }
      // this.props.handleUserData(data);
    };

    

    errorMessage = message => <p className="error-msg">{message}</p>;

    render() {
      let errorMessageUserId = null;
      let errorMessagePassword = null;
      if (this.state.errorMessageUserId) {
        errorMessageUserId = this.errorMessage(this.state.errorMessageUserId);
      }
  
      if (this.state.errorMessagePassword) {
        errorMessagePassword = this.errorMessage(this.state.errorMessagePassword);
      }
      return (
            <div className="col-md-8">
              <div className="row">
                <hr style={{marginBottom: "0px"}} className="hr_line" />
              </div>
              <div className="row" style={{display: "table", width: '100%'}}>
                <div style={{display: "table-row"}}>
                  <div style={{background:"#eeeded", display: "table-cell", float: "none"}} className="col-md-3">
                    <h4 style={{marginTop: "30px", fontWeight: "bold"}}>Mobile or Email</h4>
                  </div>
                  <div className="col-md-9" style={{display: "table-cell", float: "none", paddingBottom: "20px"}}>
                    <p>Your Shipping and payment details will be assocaited with this number</p>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="mobile">Mobile Number/Email Address</label>
                          <input type="text" name="userId" id="userId" className="form-control"
                            onChange={this.handleChange} />
                          {errorMessageUserId}
                        </div>
                        {this.state.has_pass ?<div className='form-group'><label htmlFor="pass">Password</label> <input
                            type="text" name="password" id="password" onChange={this.handleChange}
                            className="form-control" style={{marginTop: "10px"}} />{errorMessagePassword}</div> : ''}
                        <div style={{marginTop: '10px'}}>
                          <input type="checkbox" name="has_pass" onChange={this.handleHasPass} />
                          <label htmlFor="has_pass" style={{marginLeft: "10px"}}>I have a password</label>
                        </div>
                      </div>
                    </div>

                    <button
                      style={{width: '100%', background: 'black', color: 'white', fontWeight: 'bold', padding: '10px'}}
                      className="btn btn-large" onClick={this.handleFormSubmit}>Proceed to checkout</button>
                  </div>
                </div>
              </div>
              <div className="row">
                <hr style={{marginTop: "0px"}} className="hr_line" />
              </div>
              <div className="row">
                <div className="col-md-3">
                  <h4>Ship To</h4>
                </div>
                <div className="col-md-9">
                  <h5>
                    Add your shipping address
                  </h5>
                </div>
              </div>
              <div className="row">
                <hr className="hr_line" />
              </div>
              <div className="row">
                <div className="col-md-3">
                  <h4>Pay By</h4>
                </div>
                <div className="col-md-9">
                  <h5>Choose a payment method</h5>
                </div>
              </div>
              <div className="row">
                <hr className="hr_line" />
              </div>
            </div>
      )
    }
}