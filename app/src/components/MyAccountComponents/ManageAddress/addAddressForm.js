import React from "react";
import { string } from "prop-types";
import Input from "../../Primitives/input";
import {
  validateFullName,
  validateMobileNo,
  validateEmailId,
  validatePindcode,
  validateAddress,
  validateCityDistrict,
  validateState
} from "../../../utils/validationManager";
import {
  cityStateAPI,
  addAddressAPI,
  updateAddressAPI
} from "../../../../public/constants/constants";
import apiManager from "../../../utils/apiManager";
import {
  ADD_NEW_ADD,
  REQUIRED_FIELD,
  VALID_NAME,
  DEFAULT_ADDRESS,
  VALID_MOBILE_NO,
  ENTER_EMAIL_ID,
  VALID_CITY,
  VALID_STATE,
  VALID_PIN,
  VALID_ADD
} from "../../../constants/app/myAccountConstants";
import appCookie from "../../../utils/cookie";

class AddAddressForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText_name:
        this.props.editAddressDataPro == undefined
          ? ""
          : this.props.editAddressDataPro.name,
      inputText_number:
        this.props.editAddressDataPro == undefined
          ? ""
          : this.props.editAddressDataPro.phoneNumber,
      inputText_email:
        this.props.editAddressDataPro == undefined
          ? ""
          : this.props.editAddressDataPro.emailId,
      inputText_pincode:
        this.props.editAddressDataPro == undefined
          ? ""
          : this.props.editAddressDataPro.pincode,
      inputText_address1:
        this.props.editAddressDataPro == undefined
          ? ""
          : this.props.editAddressDataPro.address1,
      inputText_address2:
        this.props.editAddressDataPro == undefined
          ? ""
          : this.props.editAddressDataPro.address2,
      inputText_address3:
        this.props.editAddressDataPro == undefined
          ? ""
          : this.props.editAddressDataPro.address3,
      inputText_city:
        this.props.editAddressDataPro == undefined
          ? ""
          : this.props.editAddressDataPro.city,
      inputText_state:
        this.props.editAddressDataPro == undefined
          ? ""
          : this.props.editAddressDataPro.state,
      isSetAsDefault:
        this.props.editAddressDataPro == undefined
          ? ""
          : this.props.editAddressDataPro.isDefault,
      nickname:
        this.props.editAddressDataPro == undefined
          ? undefined
          : this.props.editAddressDataPro.nickName,

      error_name: false,
      error_number: false,
      error_email: false,
      error_pincode: false,
      error_address1: false,
      error_address2: false,
      error_city: false,
      error_state: false,

      errorMessage_name: "",
      errorMessage_number: "",
      errorMessage_email: "",
      errorMessage_pincode: "",
      errorMessaget_address1: "",
      errorMessaget_address2: "",
      errorMessage_city: "",
      errorMessage_state: "",

      isSaveBtnDisabled: false
    };
    this.reference = React.createRef();
    this.handleInput = this.handleInput.bind(this);
    this.changeAddressFrom = this.changeAddress.bind(this);
  }

  changeAddress(editAddressDataPro) {
    this.setState({
      inputText_name: editAddressDataPro.name,
      inputText_number: editAddressDataPro.phoneNumber,
      inputText_email: editAddressDataPro.emailId,
      inputText_pincode: editAddressDataPro.pincode,
      inputText_address1: editAddressDataPro.address1,
      inputText_address2: editAddressDataPro.address2,
      inputText_address3: editAddressDataPro.address3,
      inputText_city: editAddressDataPro.city,
      inputText_state: editAddressDataPro.state,
      isSetAsDefault: editAddressDataPro.isDefault,
      nickname: editAddressDataPro.nickName,

      error_name: false,
      error_number: false,
      error_email: false,
      error_pincode: false,
      error_address1: false,
      error_address2: false,
      error_city: false,
      error_state: false,

      errorMessage_name: "",
      errorMessage_number: "",
      errorMessage_email: "",
      errorMessage_pincode: "",
      errorMessaget_address1: "",
      errorMessaget_address2: "",
      errorMessage_city: "",
      errorMessage_state: "",

      isSaveBtnDisabled: false
    });
    window.scrollTo(0, document.body.scrollHeight - 700);
    if (this.reference.current) {
      this.reference.current.focus();
      //this.reference.current.getInputDOMNode().focus();
    }
  }

  componentWillReceiveProps1(nextProps) {
    this.setState({
      inputText_name: nextProps.editAddressDataPro.name,
      inputText_number: nextProps.editAddressDataPro.phoneNumber,
      inputText_email: nextProps.editAddressDataPro.emailId,
      inputText_pincode: nextProps.editAddressDataPro.pincode,
      inputText_address: nextProps.editAddressDataPro.address,
      inputText_city: nextProps.editAddressDataPro.city,
      inputText_state: nextProps.editAddressDataPro.state,
      isSetAsDefault: nextProps.editAddressDataPro.isDefault,
      inputText_address1: "",
      inputText_address2: "",

      error_name: false,
      error_number: false,
      error_email: false,
      error_pincode: false,
      error_address: false,
      error_address1: false,
      error_city: false,
      error_state: false,

      errorMessage_name: "",
      errorMessage_number: "",
      errorMessage_email: "",
      errorMessage_pincode: "",
      errorMessaget_address: "",
      errorMessaget_address1: "",
      errorMessage_city: "",
      errorMessage_state: "",

      isSaveBtnDisabled: false
    });
    window.scrollTo(0, document.body.scrollHeight - 700);
    if (this.reference.current) {
      this.reference.current.getInputDOMNode().focus();
    }
  }

  onSavebuttonClick(event) {
    if (event) event.preventDefault();

    var isProceed = true;
    if (!validateFullName(this.state.inputText_name)) {
      isProceed = false;
      this.setState({
        error_name: true,
        errorMessage_name: !this.state.inputText_name
          ? `${REQUIRED_FIELD}`
          : `${VALID_NAME}`
      });
    }
    if (!validateMobileNo(this.state.inputText_number)) {
      isProceed = false;
      this.setState({
        error_number: true,
        errorMessage_number: !this.state.inputText_number
          ? `${REQUIRED_FIELD}`
          : `${VALID_MOBILE_NO}`
      });
    }
    if (!validateEmailId(this.state.inputText_email)) {
      isProceed = false;
      this.setState({
        error_email: true,
        errorMessage_email: !this.state.inputText_email
          ? `${REQUIRED_FIELD}`
          : `${ENTER_EMAIL_ID}`
      });
    }
    if (!validatePindcode(this.state.inputText_pincode)) {
      isProceed = false;
      this.setState({
        error_pincode: true,
        errorMessage_pincode: !this.state.inputText_pincode
          ? `${REQUIRED_FIELD}`
          : `${VALID_PIN}`,
        inputText_pincode: null
      });
    }
    if (!validateAddress(this.state.inputText_address1)) {
      isProceed = false;
      this.setState({
        error_address1: true,
        errorMessaget_address1: !this.state.inputText_address1
          ? `${REQUIRED_FIELD}`
          : `${VALID_ADD}`
      });
    }
    if (!validateAddress(this.state.inputText_address2)) {
      isProceed = false;
      this.setState({
        error_address2: true,
        errorMessaget_address2: `${REQUIRED_FIELD}`
      });
    }
    if (!validateCityDistrict(this.state.inputText_city)) {
      isProceed = false;
      this.setState({
        error_city: true,
        errorMessage_city: !this.state.inputText_city
          ? `${REQUIRED_FIELD}`
          : `${VALID_CITY}`
      });
    }
    if (!validateState(this.state.inputText_state)) {
      isProceed = false;
      this.setState({
        error_state: true,
        errorMessage_state: !this.state.inputText_state
          ? `${REQUIRED_FIELD}`
          : `${VALID_STATE}`
      });
    }

    if (!isProceed) {
      return;
    }

    if (this.props.isFromServiceRequest) {
      this.props.onAddressChange({
        name: this.state.inputText_name,
        phone_number: this.state.inputText_number,
        email_id: this.state.inputText_email,
        pincode: this.state.inputText_pincode,
        address1: this.state.inputText_address1,
        address2: this.state.inputText_address2,
        address3: this.state.inputText_address3,
        city: this.state.inputText_city,
        state: this.state.inputText_state,
        default: "false"
      });
    } else {
      this.addAddress();
    }
  }

  handleInput(value) {
    this.setState({
      error_name: false,
      error_number: false,
      error_email: false,
      error_pincode: false,
      error_address1: false,
      error_address2: false,
      error_city: false,
      error_state: false
    });
    switch (value.target.id) {
      case "fullName":
        return this.setState({
          inputText_name: value.target.value
        });
      case "phoneNumber":
        return this.setState({
          inputText_number: value.target.value
        });
      case "emailId":
        return this.setState({
          inputText_email: value.target.value
        });
      case "pincode":
        return this.setState({
          inputText_pincode: value.target.value
        });
      case "address1":
        return this.setState({
          inputText_address1: value.target.value
        });
      case "address2":
        return this.setState({
          inputText_address2: value.target.value
        });
      case "address3":
        return this.setState({
          inputText_address3: value.target.value
        });
      case "cityDistrict":
        return this.setState({
          inputText_city: value.target.value
        });
      case "state":
        return this.setState({
          inputText_state: value.target.value
        });
      default:
        return null;
    }
  }

  addAddress() {
    if (this.props.fromRequestFor) {
      this.props.onUpdateActivity({
        addressID: "",
        nickName: "",
        name: this.state.inputText_name,
        phone_number: this.state.inputText_number,
        phoneNumber: this.state.inputText_number,
        email_id: this.state.inputText_email,
        pincode: this.state.inputText_pincode,
        address1: this.state.inputText_address1,
        address2: this.state.inputText_address2,
        address3: this.state.inputText_address3,
        city: this.state.inputText_city,
        state: this.state.inputText_state,
        default: String(document.getElementById("checkbox").checked)
      });
      this.props.onCancel();
      return;
    }

    let APIURL = addAddressAPI;
    if (this.state.nickname !== undefined) {
      APIURL = updateAddressAPI + this.state.nickname;
    }

    this.setState({
      isSaveBtnDisabled: true
    });
    const data = {
      name: this.state.inputText_name,
      phone_number: this.state.inputText_number,
      email_id: this.state.inputText_email,
      pincode: this.state.inputText_pincode,
      address1: this.state.inputText_address1,
      address2: this.state.inputText_address2,
      address3: this.state.inputText_address3,
      city: this.state.inputText_city,
      state: this.state.inputText_state,
      default: String(document.getElementById("checkbox").checked)
    };

    apiManager
      .post(APIURL, data)
      .then(response => {
        this.props.onUpdateActivity();
        this.props.onCancel({
          name: "",
          phoneNumber: "",
          emailId: "",
          pincode: "",
          address1: "",
          address2: "",
          address3: "",
          city: "",
          state: "",
          isDefault: String(false)
        });
        this.setState({
          isSaveBtnDisabled: false
        });
        if (this.state.isSetAsDefault) {
          appCookie.set(
            "pincode",
            this.state.inputText_pincode,
            365 * 24 * 60 * 60 * 1000
          );
          appCookie.set("pincodeUpdated", true, 365 * 24 * 60 * 60 * 1000);
        }
      })
      .catch(error => {
        this.setState({
          isSaveBtnDisabled: false
        });
      });
  }

  pincodeFocusOut() {
    if (
      this.state.inputText_pincode !== "" &&
      this.state.inputText_pincode.length === 6
    ) {
      if (validatePindcode(this.state.inputText_pincode)) {
        this.getStateCityFromPincode();
      }
    } else {
      this.setState({
        inputText_city: "",
        inputText_state: ""
      });
    }
  }

  getStateCityFromPincode() {
    apiManager
      .get(cityStateAPI + this.state.inputText_pincode)
      .then(response => {
        this.setState({
          inputText_city: response.data.data.city,
          inputText_state: response.data.data.state
        });
      })
      .catch(error => {
        const errorData = error.response.data;
        const errorMessage = errorData.error.error_message;
        this.setState({
          inputText_city: "",
          inputText_state: "",
          error_pincode: true,
          errorMessage_pincode: errorMessage
        });
      });
  }

  onSetAsDefaultChange() {
    this.setState({
      isSetAsDefault: !this.state.isSetAsDefault
    });
  }

  closeAddNewAddress() {
    if (this.state.nickName !== undefined) {
      this.props.onCancel({
        name: "",
        phoneNumber: "",
        emailId: "",
        pincode: "",
        address1: "",
        address2: "",
        address3: "",
        city: "",
        state: "",
        isDefault: false
      });
    } else {
      this.props.onCancel({
        name: this.state.inputText_name,
        phoneNumber: this.state.inputText_number,
        emailId: this.state.inputText_email,
        pincode: this.state.inputText_pincode,
        address1: this.state.inputText_address1,
        address2: this.state.inputText_address2,
        address3: this.state.inputText_address3,
        city: this.state.inputText_city,
        state: this.state.inputText_state,
        isDefault: false //String(this.state.isSetAsDefault), //commented for GI-951
      });
    }
  }

  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight - 700);
  }

  onKeyPress = event => {
    if (event.key === "Enter") {
      if (!this.state.isSaveBtnDisabled) {
        this.onSavebuttonClick();
      }
    }
  };
  render() {
    return (
      <div className="form-BgContainer addAddressContainer">
        <h4 className="heading">{ADD_NEW_ADD}</h4>
        {this.props.isFromServiceRequest ? null : (
          <button
            className="cancelBtn"
            onClick={this.closeAddNewAddress.bind(this)}
          />
        )}

        <div className="row">
          <div className="col-md-6">
            <div className="form-div clearfix div-error">
              <Input
                ref1={this.reference}
                onKeyPress={this.onKeyPress}
                inputType="text"
                title="Full Name"
                name="name"
                id="fullName"
                placeholder="Enter your name"
                value={this.state.inputText_name}
                handleChange={this.handleInput}
                isAutoFocus={true}
                maxLength={80}
              />
              {this.state.error_name ? (
                <div className="error-msg">{this.state.errorMessage_name}</div>
              ) : null}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-div clearfix div-error">
              <Input
                onKeyPress={this.onKeyPress}
                inputType={"number"}
                title={"Phone Number"}
                name={"number"}
                id={"phoneNumber"}
                placeholder={"Enter Number"}
                value={this.state.inputText_number}
                handleChange={this.handleInput}
                maxLength={10}
              />
              {this.state.error_number ? (
                <div className="error-msg">
                  {this.state.errorMessage_number}
                </div>
              ) : null}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-div clearfix div-error">
              <Input
                onKeyPress={this.onKeyPress}
                inputType="email"
                title="Email ID (Optional)"
                name="email"
                id="emailId"
                placeholder="Enter EmailId"
                value={this.state.inputText_email}
                handleChange={this.handleInput}
                maxLength={30}
              />
              {this.state.error_email ? (
                <div className="error-msg">{this.state.errorMessage_email}</div>
              ) : null}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-div clearfix div-error">
              <Input
                onKeyPress={this.onKeyPress}
                inputType="text"
                title="Pincode"
                name="pincode"
                id="pincode"
                maxLength="6"
                placeholder="Enter Pincode"
                value={this.state.inputText_pincode}
                handleChange={this.handleInput}
                focusOut={this.pincodeFocusOut.bind(this)}
              />
              {this.state.error_pincode ? (
                <div className="error-msg">
                  {this.state.errorMessage_pincode}
                </div>
              ) : null}
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-div clearfix div-error">
              <Input
                onKeyPress={this.onKeyPress}
                inputType="text"
                title="Address"
                name="address1"
                id="address1"
                placeholder="Flat/ House no/ Floor/Building name"
                value={this.state.inputText_address1}
                handleChange={this.handleInput}
                maxLength={30}
              />
              {this.state.error_address1 ? (
                <div className="error-msg">
                  {this.state.errorMessaget_address1}
                </div>
              ) : null}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-div clearfix div-error">
              <Input
                onKeyPress={this.onKeyPress}
                inputType="text"
                name="address2"
                id="address2"
                placeholder="Street name/number/locality"
                value={this.state.inputText_address2}
                handleChange={this.handleInput}
                maxLength={40}
              />
              {this.state.error_address2 ? (
                <div className="error-msg">
                  {this.state.errorMessaget_address2}
                </div>
              ) : null}
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-div clearfix div-error">
              <Input
                onKeyPress={this.onKeyPress}
                inputType="text"
                name="address3"
                id="address3"
                placeholder="Landmark"
                value={this.state.inputText_address3}
                handleChange={this.handleInput}
                maxLength={40}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-div clearfix div-error">
              <Input
                inputType="text"
                title="City/District"
                name="city"
                id="cityDistrict"
                placeholder="Enter City/District"
                value={this.state.inputText_city}
                handleChange={this.handleInput}
                readOnly
              />
              {this.state.error_city ? (
                <div className="error-msg">{this.state.errorMessage_city}</div>
              ) : null}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-div clearfix div-error">
              <Input
                inputType="text"
                title="State"
                name="state"
                id="state"
                placeholder="Enter State"
                value={this.state.inputText_state}
                handleChange={this.handleInput}
                readOnly
              />
              {this.state.error_state ? (
                <div className="error-msg">{this.state.errorMessage_state}</div>
              ) : null}
            </div>
          </div>
        </div>
        {this.props.isFromServiceRequest ? null : (
          <div className="col-md-6">
            <div className="defaultOption">
              <div className="input_box">
                <input
                  className="defaultCheckbox inputCheck"
                  type="checkbox"
                  title="State"
                  name="name"
                  id="checkbox"
                  checked={this.state.isSetAsDefault}
                  onChange={this.onSetAsDefaultChange.bind(this)}
                />
                <label className="lblCheck" htmlFor="checkbox" />
              </div>
              <label className="defaultlbl">{DEFAULT_ADDRESS}</label>
            </div>
          </div>
        )}

        <div className="clearfix" />

        {this.props.isFromServiceRequest ? null : (
          <div className="col-md-12 add-new-btn">
            <div className="actionBtnWrapper">
              <button
                onClick={this.closeAddNewAddress.bind(this)}
                className="btn-cancel btn"
              >
                Cancel
              </button>
              <button
                onClick={this.onSavebuttonClick.bind(this)}
                disabled={this.state.isSaveBtnDisabled}
                className="btn-save btn"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AddAddressForm;
