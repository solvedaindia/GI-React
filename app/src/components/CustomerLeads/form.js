import React, { Component } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  FormControl,
  Button,
  Modal,
} from 'react-bootstrap';
import Select, { components } from 'react-select';
import makeAnimated from 'react-select/animated';
import { Link } from 'react-router-dom';
import * as _ from 'lodash';

import {
  espotAPI,
  PinToCityAPI,
  customerLeadsAPI,
} from '../../../public/constants/constants';
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
  INVALID_PINCODE_FORMAT,
  NOT_VALID_PINCODE,
  ATLEAST_ONE_REQUIREMENT,
} from '../../constants/app/primitivesConstants';
import apiManager from '../../utils/apiManager';

const PINCODE_REGEX = /^\d{6}$/;
const animatedComponents = makeAnimated();
const Option = props => {
  return (
    <components.Option {...props}>
      <input type="checkbox" checked={props.isSelected} />
      <span />
      <label>{props.label}</label>
    </components.Option>
  );
};

class CustomerLeadsForm extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      email1: null,
      phone1: null,
      city: null,
      state: null,
      pincode: null,
      requirementsOptions: [],
      requirements: [],
      nameErrMsg: null,
      emailErrMsg: null,
      phoneErrMsg: null,
      pincodeErrMsg: null,
      requirementsErrMsg: null,
      successMsg: null,
      errorMsg: null,
    };
  }

  fieldChangeHandler = e => {
    const { pincode } = this.state;
    if (
      e.target.name === 'pincode' &&
      e.target.value &&
      PINCODE_REGEX.test(e.target.value) &&
      pincode !== e.target.value
    ) {
      this.fetchCityFromPin(e.target.value);
    }
    this.setState({
      [e.target.name]: e.target.value !== '' ? e.target.value : null,
    });
  };

  keyPressHandler = e => {
    if (e.key === 'Enter') this.formSubmitHandler();
  };

  requirementsChangeHandler = (value, actionMeta) => {
    const { requirements } = this.state;
    const newRequirements = requirements.slice();
    if (actionMeta.action === 'select-option') {
      newRequirements.push(actionMeta.option);
    } else if (
      actionMeta.action === 'remove-value' ||
      actionMeta.action === 'pop-value'
    ) {
      _.remove(
        newRequirements,
        requirement => requirement.value === actionMeta.removedValue.value,
      );
    } else if (actionMeta.action === 'deselect-option') {
      _.remove(
        newRequirements,
        requirement => requirement.value === actionMeta.option.value,
      );
    } else if (actionMeta.action === 'clear') {
      _.remove(newRequirements, () => true);
    }
    this.setState({
      requirements: newRequirements,
    });
  };

  formValidationHandler = () => {
    this.setState({
      nameErrMsg: null,
      emailErrMsg: null,
      phoneErrMsg: null,
      pincodeErrMsg: null,
      requirementsErrMsg: null,
      successMsg: null,
      errorMsg: null,
    });
    let isValid = true;
    const { name, email1, phone1, pincode, city, requirements } = this.state;
    if (!validateEmptyObject(name)) {
      this.setState({ nameErrMsg: FIELDREQ_MSG });
      isValid = false;
    } else if (!validateFullName(name) || !regexName.test(name)) {
      this.setState({ nameErrMsg: NAME_VALIDATION_MSG });
      isValid = false;
    }
    if (!validateEmptyObject(email1)) {
      this.setState({ emailErrMsg: FIELDREQ_MSG });
      isValid = false;
    } else if (!regexEmail.test(email1)) {
      this.setState({ emailErrMsg: INVALID_EMAIL_ADDRESS });
      isValid = false;
    }
    if (!validateEmptyObject(phone1)) {
      this.setState({ phoneErrMsg: FIELDREQ_MSG });
      isValid = false;
    } else if (!regexMobileNo.test(phone1)) {
      this.setState({ phoneErrMsg: INVALID_MOBILE_NUMBER });
      isValid = false;
    }
    if (!validateEmptyObject(pincode)) {
      this.setState({ pincodeErrMsg: FIELDREQ_MSG });
      isValid = false;
    } else if (!PINCODE_REGEX.test(pincode)) {
      this.setState({ pincodeErrMsg: INVALID_PINCODE_FORMAT });
    } else if (!validateEmptyObject(city)) {
      this.setState({ pincodeErrMsg: NOT_VALID_PINCODE });
    }
    if (!requirements || requirements.length === 0) {
      this.setState({
        requirementsErrMsg: ATLEAST_ONE_REQUIREMENT,
      });
      isValid = false;
    }
    return isValid;
  };

  formSubmitHandler = () => {
    if (!this.formValidationHandler()) return;
    const {
      name,
      phone1,
      email1,
      pincode,
      city,
      state,
      requirements,
    } = this.state;
    const requirementsStr = requirements.map(rqrmnt => rqrmnt.value).join('||');
    const urlSearchParams = new URLSearchParams(
      window.location.search.substring(1),
    );
    const data = {
      name,
      phone1,
      email1,
      pincode,
      city,
      state,
      requirements: requirementsStr,
      utmPlacement: urlSearchParams.get('utm_placement'),
      utmMedia: urlSearchParams.get('utm_medium'),
      utmKeyword: urlSearchParams.get('utm_keyword'),
      utmAddgroup: urlSearchParams.get('utm_adgroup'),
      utmCampaign: urlSearchParams.get('utm_campaign'),
      utmSource: urlSearchParams.get('utm_source'),
    };
    apiManager
      .post(customerLeadsAPI, data)
      .then(response => {
        const resData = response.data.data;
        if (resData.customerQuerySaved === true) {
          this.setState({
            name: '',
            phone1: '',
            email1: '',
            pincode: '',
            city: '',
            state: '',
            requirements: [],
            successMsg:
              'Thank You! Your nearest store representative will reach out to you shortly.',
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

  fetchCityFromPin = pincode => {
    if (!pincode) return;
    apiManager
      .get(PinToCityAPI + pincode)
      .then(response => {
        const { data } = response;
        if (data.data && data.data.city) {
          this.setState({
            pincodeErrMsg: null,
            city: data.data.city,
            state: data.data.state,
          });
        } else {
          this.setState({ pincodeErrMsg: NOT_VALID_PINCODE });
        }
      })
      .catch(error => {
        this.setState({ pincodeErrMsg: NOT_VALID_PINCODE });
      });
  };

  fetchRequirementsOptions = () => {
    apiManager
      .get(`${espotAPI}GI_Customer_Leads_Rqrmnts`)
      .then(response => {
        const { data } = response;
        if (data && data.data) {
          this.setState({
            requirementsOptions: data.data.requirements || [],
          });
        }
      })
      .catch(error => {});
  };

  toggleHandler = () => {
    this.setState({ successMsg: null });
  };

  componentDidMount() {
    this.fetchRequirementsOptions();
  }

  render() {
    const {
      name,
      email1,
      phone1,
      city,
      pincode,
      requirements,
      nameErrMsg,
      emailErrMsg,
      phoneErrMsg,
      pincodeErrMsg,
      requirementsErrMsg,
      successMsg,
      errorMsg,
      requirementsOptions,
    } = this.state;
    return (
      <>
        <Col xs={12}>
          <FormGroup>
            <Label>Name *</Label>
            <FormControl
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Full Name"
              value={name}
              onChange={this.fieldChangeHandler}
              onKeyPress={this.fieldChangeHandler}
            />
            <p className="error-msg">{nameErrMsg}</p>
          </FormGroup>
        </Col>
        <Col xs={12}>
          <FormGroup>
            <Label>Email *</Label>
            <FormControl
              type="text"
              name="email1"
              className="form-control"
              placeholder="Enter Email"
              value={email1}
              onChange={this.fieldChangeHandler}
              onKeyPress={this.fieldChangeHandler}
            />
            <p className="error-msg">{emailErrMsg}</p>
          </FormGroup>
        </Col>
        <Col xs={12}>
          <FormGroup>
            <Label>Mobile *</Label>
            <FormControl
              type="text"
              name="phone1"
              className="form-control"
              placeholder="Enter Mobile Number"
              value={phone1}
              onChange={this.fieldChangeHandler}
              onKeyPress={this.fieldChangeHandler}
            />
            <p className="error-msg">{phoneErrMsg}</p>
          </FormGroup>
        </Col>
        <Col xs={6}>
          <FormGroup>
            <Label>Pincode *</Label>
            <FormControl
              type="text"
              name="pincode"
              className="form-control"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={this.fieldChangeHandler}
              onKeyPress={this.fieldChangeHandler}
            />
            <p className="error-msg">{pincodeErrMsg}</p>
          </FormGroup>
        </Col>
        <Col xs={6}>
          <FormGroup>
            <Label>City *</Label>
            <FormControl
              type="text"
              disabled
              name="city"
              className="form-control"
              placeholder="City"
              value={city}
            />
            <p className="error-msg" />
          </FormGroup>
        </Col>
        <Col xs={12}>
          <FormGroup className="requirements-select">
            <Label>Requirements *</Label>
            <Select
              components={Object.assign({}, animatedComponents, {
                Option,
              })}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              isMulti
              value={requirements}
              options={requirementsOptions}
              placeholder="Select"
              onChange={this.requirementsChangeHandler}
              classNamePrefix="leads-rqrmnts"
            />
            <p className="error-msg">{requirementsErrMsg}</p>
          </FormGroup>
        </Col>
        <Col xs={12}>
          <FormGroup>
            <h6 className="message">
              {errorMsg && <span className="failed">{errorMsg}</span>}
            </h6>
            <Button
              className="submit-btn btn-block btn-bg"
              onClick={this.formSubmitHandler}
            >
              Submit
            </Button>
          </FormGroup>
        </Col>
        <Col xs={12}>
          <h6 className="disclaimer">
            By submitting this form, you agree to the{' '}
            <Link to="/privacy-policy">privacy policy</Link> &{' '}
            <Link to="/termsconditions">terms and conditions</Link>
          </h6>
        </Col>
        {successMsg && (
          <Modal
            className="modal-cust-query-success"
            show={!!successMsg}
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

export default CustomerLeadsForm;
