import React from 'react';
import Input from '../../Primitives/input';
import {
  validateFullName,
  validateMobileNo,
  validateEmailId,
  validatePindcode,
  validateAddress,
  validateCityDistrict,
  validateState
} from '../../../utils/addressValidations';
import { cityStateAPI, addAddressAPI, updateAddressAPI } from '../../../../public/constants/constants';
import apiManager from '../../../utils/apiManager';
import { string } from 'prop-types';

class AddAddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText_name: this.props.editAddressDataPro.name,
      inputText_number: this.props.editAddressDataPro.phoneNumber,
      inputText_email: this.props.editAddressDataPro.emailId,
      inputText_pincode: this.props.editAddressDataPro.pincode,
      inputText_address: this.props.editAddressDataPro.address,
      inputText_city: this.props.editAddressDataPro.city,
      inputText_state: this.props.editAddressDataPro.state,
      isSetAsDefault: this.props.editAddressDataPro.isDefault,

      error_name: false,
      error_number: false,
      error_email: false,
      error_pincode: false,
      error_address: false,
      error_city: false,
      error_state: false,

      errorMessage_name: '',
      errorMessage_number: '',
      errorMessage_email: '',
      errorMessage_pincode: '',
      errorMessaget_address: '',
      errorMessage_city: '',
      errorMessage_state: '',

    };

    this.handleInput = this.handleInput.bind(this);
  }

  onSavebuttonClick(event) {

  }

  onSavebuttonClick(event) {
    event.preventDefault();

    if (!validateFullName(this.state.inputText_name)) {
      this.setState({
        error_name: true,
        errorMessage_name: 'Please enter a valid Name. It should not exceed 100 characters',
      });
      return;
    }
    if (!validateMobileNo(this.state.inputText_number)) {
      this.setState({
        error_number: true,
        errorMessage_number: 'Please enter valid mobile number.',
      });
      return;
    }
    if (!validateEmailId(this.state.inputText_email)) {
      this.setState({
        error_email: true,
        errorMessage_email: 'Please enter valid Email ID.',
      });
      return;
    }
    if (!validatePindcode(this.state.inputText_pincode)) {
      this.setState({
        error_pincode: true,
        errorMessage_pincode: 'Please enter valid Pincode.',
      });
      return;
    }
    if (!validateAddress(this.state.inputText_address)) {
      this.setState({
        error_address: true,
        errorMessaget_address: 'Please enter valid Address.',
      });
      return;
    }
    if (!validateCityDistrict(this.state.inputText_city)) {
      this.setState({
        error_city: true,
        errorMessage_city: 'Please enter valid City/District.',
      });
      return;
    }
    if (!validateState(this.state.inputText_state)) {
      this.setState({
        error_state: true,
        errorMessage_state: 'Please enter valid State.',
      });
      return;
    }
    this.addAddress();
  }

  handleInput(value) {
    this.setState({
      error_name: false,
      error_number: false,
      error_email: false,
      error_pincode: false,
      error_address: false,
      error_city: false,
      error_state: false,
    })
    switch (value.target.id) {
      case 'fullName':
        return (
          this.setState({
            inputText_name: value.target.value,
          })
        )
      case 'phoneNumber':
        return (
          this.setState({
            inputText_number: value.target.value,
          })
        )
      case 'emailId':
        return (
          this.setState({
            inputText_email: value.target.value,
          })
        )
      case 'pincode':
        return (
          this.setState({
            inputText_pincode: value.target.value,
          })
        )
      case 'address':
        return (
          this.setState({
            inputText_address: value.target.value,
          })
        )
      case 'cityDistrict':
        return (
          this.setState({
            inputText_city: value.target.value,
          })
        )
      case 'state':
        return (
          this.setState({
            inputText_state: value.target.value,
          })
        )
      default:
        return null;
    }
  }

  addAddress() {
    //updateAddressAPI+this.props.editAddressDataPro.nickName
    var APIURL = addAddressAPI;
    if (this.props.editAddressDataPro.nickName !== undefined) {
      APIURL = updateAddressAPI + this.props.editAddressDataPro.nickName
    }
    const data = {
      "name": this.state.inputText_name,
      "phone_number": this.state.inputText_number,
      "email_id": this.state.inputText_email,
      "pincode": this.state.inputText_pincode,
      "address": this.state.inputText_address,
      "city": this.state.inputText_city,
      "state": this.state.inputText_state,
      "default": String(this.state.isSetAsDefault),
    }
    console.log('Add Address  ----  ', data);

    apiManager.post(APIURL, data)
      .then(response => {
        console.log('Add Address Response ---- ', response.data);
        this.props.onCancel();
        this.props.onUpdateActivity();
      })
      .catch(error => {
        console.log('Add Address Error---', error);
      });
  }

  pincodeFocusOut() {
    if (validatePindcode(this.state.inputText_pincode)) {
      this.getStateCityFromPincode()
    }
  }

  getStateCityFromPincode() {
    apiManager.get(cityStateAPI + this.state.inputText_pincode)
      .then(response => {
        this.setState({
          inputText_city: response.data.data.city,
          inputText_state: response.data.data.state,
        })
      })
      .catch(error => {
      });
  }

  onSetAsDefaultChange() {
    this.setState({
      isSetAsDefault: !this.state.isSetAsDefault,
    })
  }

  closeAddNewAddress() {
    if (this.props.editAddressDataPro.nickName !== undefined) {
      this.props.onCancel({
        "name": '',
        "phone_number": '',
        "email_id": '',
        "pincode": '',
        "address": '',
        "city": '',
        "state": '',
        "default": String(false),
      })
    }
    else {
      this.props.onCancel({
        "name": this.state.inputText_name,
        "phone_number": this.state.inputText_number,
        "email_id": this.state.inputText_email,
        "pincode": this.state.inputText_pincode,
        "address": this.state.inputText_address,
        "city": this.state.inputText_city,
        "state": this.state.inputText_state,
        "default": String(this.state.isSetAsDefault),
      })
    }
    
  }

  render() {
    console.log('The Data --- ', this.props.editAddressDataPro.nickName)
    return (
      <form className='addAddressContainer'>
        <h4>Add New Address</h4>
        <button className='cancelBtn' onClick={this.closeAddNewAddress.bind(this)}>X</button>
        <div className="form-div clearfix div-error">
          <Input inputType={'text'} title={'Full Name'} name={'name'} id={'fullName'} placeholder={'Enter your name'} value={this.state.inputText_name} handleChange={this.handleInput} />
          {this.state.error_name ? <p className="error-msg">{this.state.errorMessage_name}</p> : null}
        </div>
        <div className="form-div clearfix div-error">
          <Input inputType={'number'} title={'Phone Number'} name={'name'} id={'phoneNumber'} placeholder={'Enter Number'} value={this.state.inputText_number} handleChange={this.handleInput} />
          {this.state.error_number ? <p className="error-msg">{this.state.errorMessage_number}</p> : null}
        </div>
        <div className="form-div clearfix div-error">
          <Input inputType={'email'} title={'Email ID (Optional)'} name={'name'} id={'emailId'} placeholder={'Enter EmailId'} value={this.state.inputText_email} handleChange={this.handleInput} />
          {this.state.error_email ? <p className="error-msg">{this.state.errorMessage_email}</p> : null}
        </div>
        <div className="form-div clearfix div-error">
          <Input inputType={'number'} title={'Pincode'} name={'name'} id={'pincode'} placeholder={'Enter Pincode'} value={this.state.inputText_pincode} handleChange={this.handleInput} focusOut={this.pincodeFocusOut.bind(this)} />
          {this.state.error_pincode ? <p className="error-msg">{this.state.errorMessage_pincode}</p> : null}
        </div>
        <div className="form-div clearfix div-error">
          <Input inputType={'text'} title={'Address'} name={'name'} id={'address'} placeholder={'Enter Address'} value={this.state.inputText_address} handleChange={this.handleInput} />
          {this.state.error_address ? <p className="error-msg">{this.state.errorMessaget_address}</p> : null}
        </div>
        <div className="form-div clearfix div-error">
          <Input inputType={'text'} title={'City/District'} name={'name'} id={'cityDistrict'} placeholder={'Enter City/District'} value={this.state.inputText_city} handleChange={this.handleInput} />
          {this.state.error_city ? <p className="error-msg">{this.state.errorMessage_city}</p> : null}
        </div>
        <div className="form-div clearfix div-error">
          <Input inputType={'text'} title={'State'} name={'name'} id={'state'} placeholder={'Enter State'} value={this.state.inputText_state} handleChange={this.handleInput} />
          {this.state.error_state ? <p className="error-msg">{this.state.errorMessage_state}</p> : null}
        </div>
        <input type='checkbox' title={'State'} name={'name'} id={'checkbox'} defaultChecked={this.state.isSetAsDefault} onChange={this.onSetAsDefaultChange.bind(this)} />
        <div className="actionBtnWrapper">
          <button onClick={this.closeAddNewAddress.bind(this)} className='actionBtnWrapper__cancelBtn btn'>Cancel</button>
          <button onClick={this.onSavebuttonClick.bind(this)} className='actionBtnWrapper__applyBtn btn'>Save</button>
        </div>
      </form>
    );
  }
}


export default AddAddressForm;
