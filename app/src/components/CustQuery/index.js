/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
  Label,
} from 'react-bootstrap';

import '../../../public/styles/custQuery/custQuery.scss';
import {
  validateEmptyObject,
  validateFullName,
  regexName,
  regexMobileNo,
  regexEmail,
} from '../../utils/validationManager';
import {
  FIELDREQ_MSG,
  NAME_VALIDATION_MSG,
  INVALID_MOBILE_NUMBER,
  INVALID_EMAIL_ADDRESS,
} from '../../constants/app/primitivesConstants';
import apiManager from '../../utils/apiManager';
import { customerQueryAPI } from '../../../public/constants/constants';

class CustomerQueryModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      phone1: null,
      email1: null,
      nameErrMsg: null,
      phoneErrMsg: null,
      emailErrMsg: null,
      successMsg: null,
      errorMsg: null,
      saveEnable: true,
    };
  }

  toggleHandler = () => {
    this.setState({
      nameErrMsg: null,
      phoneErrMsg: null,
      emailErrMsg: null,
      successMsg: null,
      errorMsg: null,
      saveEnable: true,
    });
    this.props.toggleHandler();
  };

  fieldChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value !== '' ? e.target.value : null,
    });
  };

  keyPressHandler = e => {
    if (e.key === 'Enter') this.formSubmitHandler();
  };

  formValidationHandler = () => {
    this.setState({
      nameErrMsg: null,
      phoneErrMsg: null,
      emailErrMsg: null,
      successMsg: null,
      errorMsg: null,
    });
    let isValid = true;
    const { name, phone1, email1 } = this.state;
    if (!validateEmptyObject(name)) {
      this.setState({ nameErrMsg: FIELDREQ_MSG });
      isValid = false;
    } else if (!validateFullName(name) || !regexName.test(name)) {
      this.setState({ nameErrMsg: NAME_VALIDATION_MSG });
      isValid = false;
    }
    if (!validateEmptyObject(phone1)) {
      this.setState({ phoneErrMsg: FIELDREQ_MSG });
      isValid = false;
    } else if (!regexMobileNo.test(phone1)) {
      this.setState({ phoneErrMsg: INVALID_MOBILE_NUMBER });
      isValid = false;
    }
    if (validateEmptyObject(email1) && !regexEmail.test(email1)) {
      this.setState({ emailErrMsg: INVALID_EMAIL_ADDRESS });
      isValid = false;
    }
    return isValid;
  };

  formSubmitHandler = () => {
    if (!this.formValidationHandler()) return;
    this.setState({ saveEnable: false });
    const { name, phone1, email1 } = this.state;
    const { partNumber, productName, pincode } = this.props;
    const data = {
      partNumber,
      productName,
      pincode,
      name,
      phone1,
      email1,
    };
    apiManager
      .post(customerQueryAPI, data)
      .then(response => {
        const resData = response.data.data;
        if (resData.customerQuerySaved === true) {
          this.setState({
            name: null,
            phone1: null,
            email1: null,
            successMsg:
              'Thank You! Our customer support team will reach out to you shortly.',
          });
        } else {
          this.setState({
            errorMsg: 'Unable to save your data. Sorry for inconvenience.',
          });
        }
      })
      .catch(() => {
        this.setState({
          errorMsg: 'Unable to save your data. Sorry for inconvenience.',
        });
      });
  };

  render() {
    const {
      name,
      phone1,
      email1,
      nameErrMsg,
      phoneErrMsg,
      emailErrMsg,
      successMsg,
      errorMsg,
      saveEnable,
    } = this.state;
    return (
      <>
        {!successMsg && (
          <Modal
            className="modal-cust-query"
            show={this.props.show}
            onHide={this.toggleHandler}
          >
            <Modal.Body>
              <Button className="close" onClick={this.toggleHandler} />
              <div className="cust-query-inner">
                <Row>
                  <Col xs={12}>
                    <div>
                      <h4 className="heading">Request a Callback</h4>
                    </div>
                  </Col>
                  <Col xs={3} md={2} className="info-label">
                    Product:
                  </Col>
                  <Col xs={9} md={4} className="info">
                    {this.props.productName}
                  </Col>
                  <Col xs={3} md={2} className="info-label">
                    Pincode:
                  </Col>
                  <Col xs={9} md={4} className="info">
                    {this.props.pincode}
                  </Col>
                  <Form>
                    <Col xs={12}>
                      <FormGroup>
                        <Label>Name *</Label>
                        <FormControl
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Please Enter Full Name"
                          value={name}
                          onChange={this.fieldChangeHandler}
                          onKeyPress={this.keyPressHandler}
                        />
                        <p className="error-msg">{nameErrMsg}</p>
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                      <FormGroup>
                        <Label>Mobile *</Label>
                        <FormControl
                          type="text"
                          name="phone1"
                          className="form-control"
                          placeholder="Please Enter Mobile"
                          value={phone1}
                          onChange={this.fieldChangeHandler}
                          onKeyPress={this.keyPressHandler}
                        />
                        <p className="error-msg">{phoneErrMsg}</p>
                      </FormGroup>
                    </Col>
                    <Col xs={12} md={6}>
                      <FormGroup>
                        <Label>Email</Label>
                        <FormControl
                          type="text"
                          name="email1"
                          className="form-control"
                          placeholder="Please Enter Email"
                          value={email1}
                          onChange={this.fieldChangeHandler}
                          onKeyPress={this.keyPressHandler}
                        />
                        <p className="error-msg">{emailErrMsg}</p>
                      </FormGroup>
                    </Col>
                    <Col xs={12}>
                      <FormGroup>
                        <h6 className="message">
                          {errorMsg && (
                            <span className="failed">{errorMsg}</span>
                          )}
                        </h6>
                        <Button
                          className="submit-btn btn-block btn-bg"
                          disabled={!saveEnable}
                          onClick={this.formSubmitHandler}
                        >
                          Submit
                        </Button>
                      </FormGroup>
                    </Col>
                  </Form>
                </Row>
              </div>
            </Modal.Body>
          </Modal>
        )}
        {successMsg && (
          <Modal
            className="modal-cust-query-success"
            show={this.props.show}
            onHide={this.toggleHandler}
          >
            <Modal.Body>
              {successMsg && (
                <h6 className="message">
                  <span className="success">{successMsg}</span>
                </h6>
              )}
              <Row>
                <Col xs={12}>
                  <Button
                    className="success-btn btn-block btn-bg"
                    onClick={this.toggleHandler}
                  >
                    OK
                  </Button>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
        )}
      </>
    );
  }
}

CustomerQueryModal.propTypes = {
  show: PropTypes.bool,
  toggleHandler: PropTypes.func,
  partNumber: PropTypes.string,
  productName: PropTypes.string,
  pincode: PropTypes.number,
};

export default CustomerQueryModal;
