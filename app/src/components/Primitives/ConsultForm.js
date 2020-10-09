import React from "react";
import "../../../public/styles/static-pages/consultForm.scss";
import {
  consultFormApi,
  consultGetApi,
  callCentre1Api,
  callCentre2Api
} from "../../../public/constants/constants";
import apiManager from "../../utils/apiManager";
import {
  SEND,
  WHAT_YOU_LIKE,
  FULL_NAME,
  SELECT_OPTION,
  EMAIL,
  MESSEGE,
  MOBILE_NUMBER,
  FULLNAME_MSG,
  VALIDNAME_MSG,
  VALIDEMAIL_MSG,
  MOBILE_MSG,
  FEEDBACK_MSG,
  SELECT_OPTION_MSG,
  ENTER_MSG
} from "../../constants/app/primitivesConstants";

import {
  regexEmail,
  regexMobileNo,
  validateEmptyObject,
  validateFullName,
  regexName
} from "../../utils/validationManager";
import { triggerFormSubmissionGTEvent } from "../../utils/gtm";
import {
  BOOK_A_CONSULTATION_FORM_TYPE,
  FORM_POSITION,
} from "../../constants/app/gtmConstants";

class ConsultForm extends React.Component {
  constructor() {
    super();
    this.initialState = {
      name: "",
      email: "",
      mobileNumber: "",
      dropDownValue: "",
      message: "",
      dropDownArr: [],
      index: null,
      errorMessageName: null,
      errorMessageEmail: null,
      errorMessageDropOption: null,
      errorMessageMobile: null,
      errorMessageDescription: null
    };
    this.state = this.initialState;
  }

  handleChange = e => {
    const { name, value } = e.target; //gets info from Form
    if (e.target.name == "name") {
      this.setState({
        errorMessageName: ""
      });
    } else if (e.target.name == "email") {
      this.setState({
        errorMessageEmail: ""
      });
    } else if (e.target.name == "mobileNumber") {
      //Check for number input only
      if (e.target.validity.valid == false && e.target.value != "") {
        e.target.value = this.state.mobileNumber;
        const { name, value } = e.target;
        this.setState({
          [name]: value
        });
        return;
      }
      this.setState({
        errorMessageMobile: ""
      });
    } else if (e.target.name == "message") {
      this.setState({
        errorMessageDescription: ""
      });
    }
    this.setState({
      [name]: value
    });
  };

  clearData = () => {
    //blank data
    this.setState({
      name: "",
      email: "",
      mobileNumber: "",
      dropDownValue: "Select an option",
      message: "",
      index: null,
      errorMessageName: null,
      errorMessageEmail: null,
      errorMessageDropOption: null,
      errorMessageMobile: null,
      errorMessageDescription: null
    });
  };

  successMassage = () => {
    if (error !== null) {
      alert("Thank you for the feed back");
    }
  };
  onKeyPress = event => {
    if (event.key === "Enter") {
      const isValidate = this.handleValidation(this.state, true);
      if (isValidate === false) {
        return false;
      }
      this.callConsultApi();
    }
  };
  submitForm = e => {
    e.preventDefault();
    const isValidate = this.handleValidation(this.state, true);
    if (isValidate === false) {
      return false;
    }

    this.handleChange(e);
    this.callConsultApi();
  };

  //For Error Block
  getErrorMessageBlock = message => {
    return <p className="error-msg">{message}</p>;
  };

  /* Handle Validation */
  handleValidation = (obj, errorType) => {
    let isValidate = errorType;
    let isEmailEntered = validateEmptyObject(obj.email);
    let isMobileEntered = validateEmptyObject(obj.mobileNumber);
    this.setState({
      errorMessageName: null,
      errorMessageEmail: null,
      errorMessageDropOption: null,
      errorMessageMobile: null,
      errorMessageDescription: null
    });

    // For name validation
    if (!validateEmptyObject(obj.name)) {
      this.setState({
        errorMessageName: FULLNAME_MSG
      });
      isValidate = false;
    } else if (!validateFullName(obj.name) || !regexName.test(obj.name)) {
      this.setState({
        errorMessageName: VALIDNAME_MSG
      });
      isValidate = false;
    }

    // For email validation
    if (!validateEmptyObject(obj.email) /*&& !isMobileEntered*/) {
      this.setState({
        errorMessageEmail: VALIDEMAIL_MSG
      });
      isValidate = false;
    } else if (isEmailEntered && !regexEmail.test(obj.email)) {
      this.setState({
        errorMessageEmail: VALIDEMAIL_MSG
      });
      isValidate = false;
    }

    // For drop option validation
  if (obj.index === null) {
      this.setState({
        errorMessageDropOption: SELECT_OPTION_MSG
      });
      isValidate = false;
    }

    // For mobile validation
    // if (!validateEmptyObject(obj.mobileNumber) && !isEmailEntered) {
    if (!validateEmptyObject(obj.mobileNumber)) {
      this.setState({
        errorMessageMobile: MOBILE_MSG
      });
      isValidate = false;
    } else if (isMobileEntered && !regexMobileNo.test(obj.mobileNumber)) {
      this.setState({
        errorMessageMobile: MOBILE_MSG
      });
      isValidate = false;
    }

    // For message validation
    if (obj.message == "") {
      this.setState({
        errorMessageDescription: ENTER_MSG
      });
      isValidate = false;
    }

    return isValidate;
  };

  callConsultApi = () => {
    // const contact_id = Date.now().toString()+ Math.floor(Math.random()*1000).toString();

    triggerFormSubmissionGTEvent(
      BOOK_A_CONSULTATION_FORM_TYPE,
      FORM_POSITION[this.props.sourcePage || 'default'],
    );
    const message = this.state.message.split("&").join("and");
    const urlSearchParams = new URLSearchParams(
      window.location.search.substring(1),
    );
    const data = {
      name: this.state.name,
      mobileNumber: this.state.mobileNumber,
      email: this.state.email,
      dropDownValue: this.state.dropDownValue,
      message,
      utmPlacement: urlSearchParams.get('utm_placement')
        ? urlSearchParams.get('utm_placement')
        : '',
      utmMedia: urlSearchParams.get('utm_medium')
        ? urlSearchParams.get('utm_medium')
        : '',
      utmKeyword: urlSearchParams.get('utm_keyword')
        ? urlSearchParams.get('utm_keyword')
        : '',
      utmAddgroup: urlSearchParams.get('utm_adgroup')
        ? urlSearchParams.get('utm_adgroup')
        : '',
      utmCampaign: urlSearchParams.get('utm_campaign')
        ? urlSearchParams.get('utm_campaign')
        : '',
      utmSource: urlSearchParams.get('utm_source')
        ? urlSearchParams.get('utm_source')
        : '',
    };
    apiManager
      .post(consultFormApi, data)
      .then(res => {
        alert(FEEDBACK_MSG);
        this.clearData();
      })
      .catch(error => {
        this.setState({
          error: error
        });
      });

    /* var myHeaders = new Headers();
      myHeaders.append("Content-Type", "multipart/form-data;");

      var formdata = new FormData();

      formdata.append("campaign", "IBM: Some value");
      formdata.append("contact_id", contact_id);
      formdata.append("contact_name", this.state.name);
      formdata.append("contact_phone", this.state.mobileNumber);
      formdata.append("contact_city", "Mumbai");
      formdata.append("contact_email", this.state.email);
      formdata.append("contact_topic", this.state.dropDownValue);
      formdata.append("contact_message", this.state.message);
      formdata.append("contact_source", "INTGodrejInterio : some static value");


      formdata.append("CONTACT_ID", contact_id);
      formdata.append("CONTACT_NAME", this.state.name);
      formdata.append("CONTACT_PHONE", this.state.mobileNumber);
      formdata.append("CONTACT_CITY", "Mumbai");
      formdata.append("CONTACT_EMAIL", this.state.email);
      formdata.append("CONTACT_TOPIC", this.state.dropDownValue);
      formdata.append("CONTACT_MESSAGE", this.state.message);
      formdata.append("CONTACT_SOURCE", "INTGodrejInterio : some static value");


      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch(callCentre1Api, requestOptions)
        .then(response => response.text())
        .then(result => {})
        .catch(error => {});


      fetch(callCentre2Api, requestOptions)
        .then(response => response.text())
        .then(result => {}})
        .catch(error => {}});*/
  };
  getConsultDropDownApi = () => {
    const sourcePage = this.props.sourcePage || 'default';
    const consultGetApiUrl = `${consultGetApi}?sourcePage=${sourcePage}`;
    apiManager
      .get(consultGetApiUrl)
      .then(response => {
        const { data } = response || {};
        this.setState({
          dropDownArr: data.data.consultationData,
          dropDownValue:
            this.state.index !== null
              ? data.data.consultationData[this.state.index]
              : '',
        });
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false
        });
      });
  };
  componentDidMount() {
    this.getConsultDropDownApi();
  }

  createSelectItems = () => {
    let items = [];
    let currentIndex = this.state.index;
    items = this.state.dropDownArr.map((item, index) => {
      return (
        <option key={item} value={index} selected={currentIndex === index}>
          {item}
        </option>
      );
    });

    return items;
  };

  onDropdownSelected = e => {
    if (
      e.target.value !== "null" &&
      this.state.dropDownValue !== e.target.value
    ) {
      this.setState({
        dropDownValue: this.state.dropDownArr[e.target.value],
        index: e.target.value,
        errorMessageDropOption: null,
      });
    }
  };

  render() {
    const {
      name,
      email,
      mobileNumber,
      message,
      dropDownValue,
      index
    } = this.state;
    let errorMessageName = null;
    let errorMessageEmail = null;
    let errorMessageOption = null;
    let errorMessageMobile = null;
    let errorMessageDescription = null;
    if (this.state.errorMessageName) {
      errorMessageName = this.getErrorMessageBlock(this.state.errorMessageName);
    }
    if (this.state.errorMessageEmail) {
      errorMessageEmail = this.getErrorMessageBlock(
        this.state.errorMessageEmail
      );
    }
    if (this.state.errorMessageDropOption) {
      errorMessageOption = this.getErrorMessageBlock(
        this.state.errorMessageDropOption
      );
    }
    if (this.state.errorMessageMobile) {
      errorMessageMobile = this.getErrorMessageBlock(
        this.state.errorMessageMobile
      );
    }
    if (this.state.errorMessageDescription) {
      errorMessageDescription = this.getErrorMessageBlock(
        this.state.errorMessageDescription
      );
    }

    return (
      <form className="consultForm">
        <div className="row">
          <div className="col-md-6 ">
            <div className="form-div clearfix div-error">
              <div className="form-group">
                <label className="form-labeled" htmlFor="name">
                  {FULL_NAME}
                </label>
                <input
                  onKeyPress={this.onKeyPress}
                  onChange={this.handleChange}
                  onClick={this.handleChange}
                  className="form-control"
                  value={name}
                  id="name"
                  name="name"
                  type="text"
                  required
                />
                {errorMessageName}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-div clearfix div-error">
              <div className="form-group">
                <label className="form-labeled" htmlFor="email">
                  {EMAIL}
                </label>
                <input
                  onKeyPress={this.onKeyPress}
                  onChange={this.handleChange}
                  onClick={this.handleChange}
                  className="form-control"
                  id="email"
                  value={email}
                  name="email"
                  type="email"
                  required
                />
                {errorMessageEmail}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 ">
            <div className="form-div clearfix div-error">
              <div className="form-group">
                <label className="form-labeled" htmlFor="dropdown">{WHAT_YOU_LIKE[this.props.sourcePage] || WHAT_YOU_LIKE['default']}</label>
                <select
                  name="dropDownValue"
                  onChange={this.onDropdownSelected}
                  onClick={this.onDropdownSelected.bind(this)}
                  className="form-control"
                  required
                >
                        <option value="Select an option" selected={!this.state.index}>
                    {SELECT_OPTION}
                  </option>
                  {this.createSelectItems()}
                </select>
                {errorMessageOption}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-div clearfix div-error">
              <div className="form-group">
                <label className="form-labeled" htmlFor="number">
                  {MOBILE_NUMBER}
                </label>
                <input
                  onKeyPress={this.onKeyPress}
                  className="form-control"
                  onChange={this.handleChange}
                  pattern="[0-9]*"
                  value={mobileNumber}
                  id="mobileNumber"
                  type="mobile"
                  name="mobileNumber"
                  maxLength="10"
                  required
                />
                {errorMessageMobile}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-div clearfix div-error">
              <div className="form-group">
                <label className="form-labeled" htmlFor="massage">{MESSEGE[this.props.sourcePage] || MESSEGE['default']}</label>
                      <input  onKeyPress={this.onKeyPress} className="form-control"  onChange={this.handleChange} onClick={this.handleChange} value={message}  id="message" name="message" type="text" required/>
                {errorMessageDescription}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-div clearfix div-error">
              <div className="form-group">
                <button
                  type="button"
                  onClick={this.submitForm}
                  className="btn btn-primary btn-submit"
                >
                  {SEND}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default ConsultForm;
