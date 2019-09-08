import React from 'react';
import { string } from 'prop-types';
import Input from '../../Primitives/input';
import {
  validateFullName,
  validateMobileNo,
  validateEmailId,
  validatePindcode,
  validateAddress,
  validateCityDistrict,
  validateState
} from '../../../utils/validationManager';
import { cityStateAPI, addAddressAPI, updateAddressAPI } from '../../../../public/constants/constants';
import apiManager from '../../../utils/apiManager';

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
    event.preventDefault();

    var isProceed = true;
    if (!validateFullName(this.state.inputText_name)) {
      isProceed = false;
      this.setState({
        error_name: true,
        errorMessage_name: !this.state.inputText_name ? 'This is a required field' : 'Please enter a valid Name. It should not exceed 100 characters',
      });
      // return;
    }
    if (!validateMobileNo(this.state.inputText_number)) {
      isProceed = false;
      this.setState({
        error_number: true,
        errorMessage_number: !this.state.inputText_number ? 'This is a required field' : 'Please enter valid mobile number.',
      });
      // return;
    }
    if (!validateEmailId(this.state.inputText_email)) {
      isProceed = false;
      this.setState({
        error_email: true,
        errorMessage_email: !this.state.inputText_email ? 'This is a required field' : 'Please enter valid Email ID.',
      });
      // return;
    }
    if (!validatePindcode(this.state.inputText_pincode)) {
      isProceed = false;
      this.setState({
        error_pincode: true,
        errorMessage_pincode: !this.state.inputText_pincode ? 'This is a required field' : 'Please enter valid Pincode.',
        inputText_pincode: null
      });
      // return;
    }
    if (!validateAddress(this.state.inputText_address)) {
      isProceed = false;
      this.setState({
        error_address: true,
        errorMessaget_address: !this.state.inputText_address ? 'This is a required field' : 'Please enter valid Address.',
      });
      // return;
    }
    if (!validateCityDistrict(this.state.inputText_city)) {
      isProceed = false;
      this.setState({
        error_city: true,
        errorMessage_city: !this.state.inputText_city ? 'This is a required field' : 'Please enter valid City/District.',
      });
      // return;
    }
    if (!validateState(this.state.inputText_state)) {
      isProceed = false;
      this.setState({
        error_state: true,
        errorMessage_state: !this.state.inputText_state ? 'This is a required field' : 'Please enter valid State.',
      });
      // return;
    }

    if (!isProceed) {
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
      case 'pincode':
        return this.setState({
          inputText_pincode: value.target.value,
        });
      case 'address':
        return this.setState({
          inputText_address: value.target.value,
        });
      case 'cityDistrict':
        return this.setState({
          inputText_city: value.target.value,
        });
      case 'state':
        return this.setState({
          inputText_state: value.target.value,
        });
      default:
        return null;
    }
  }

  addAddress() {
    // updateAddressAPI+this.props.editAddressDataPro.nickName
    let APIURL = addAddressAPI;
    if (this.props.editAddressDataPro.nickName !== undefined) {
      APIURL = updateAddressAPI + this.props.editAddressDataPro.nickName;
    }
    const data = {
      name: this.state.inputText_name,
      phone_number: this.state.inputText_number,
      email_id: this.state.inputText_email,
      pincode: this.state.inputText_pincode,
      address: this.state.inputText_address,
      city: this.state.inputText_city,
      state: this.state.inputText_state,
      default: String(this.state.isSetAsDefault),
    };
    console.log('Add Address  ----  ', data);

    apiManager
      .post(APIURL, data)
      .then(response => {
        console.log('Add Address Response ---- ', response.data);
        this.props.onUpdateActivity();
        this.props.onCancel({
          name: '',
          phoneNumber: '',
          emailId: '',
          pincode: '',
          address: '',
          city: '',
          state: '',
          isDefault: String(false),
        });
      })
      .catch(error => {
        console.log('Add Address Error---', error);
      });
  }

  pincodeFocusOut() {
    console.log('pinFocus ---- ',this.state.inputText_pincode)
    if (this.state.inputText_pincode !== '' && this.state.inputText_pincode.length === 6) {
      if (validatePindcode(this.state.inputText_pincode)) {
        this.getStateCityFromPincode();
      }
    }
    else {
      this.setState({
        inputText_city: '',
        inputText_state: '',
      })
    }
    
  }

  getStateCityFromPincode() {
    apiManager
      .get(cityStateAPI + this.state.inputText_pincode)
      .then(response => {
        this.setState({
          inputText_city: response.data.data.city,
          inputText_state: response.data.data.state,
        });
      })
      .catch(error => { 
        const errorData = error.response.data;
        const errorMessage = errorData.error.error_message;
        console.log('iii --- ',errorMessage)
        this.setState({
          inputText_city: '',
          inputText_state: '',
          error_pincode: true,
          errorMessage_pincode: errorMessage,
        })
      });
  }

  onSetAsDefaultChange() {
    this.setState({
      isSetAsDefault: !this.state.isSetAsDefault,
    });
  }

  closeAddNewAddress() {
    if (this.props.editAddressDataPro.nickName !== undefined) {
      this.props.onCancel({
        name: '',
        phoneNumber: '',
        emailId: '',
        pincode: '',
        address: '',
        city: '',
        state: '',
        isDefault: false,
      });
    } else {
      this.props.onCancel({
        name: this.state.inputText_name,
        phoneNumber: this.state.inputText_number,
        emailId: this.state.inputText_email,
        pincode: this.state.inputText_pincode,
        address: this.state.inputText_address,
        city: this.state.inputText_city,
        state: this.state.inputText_state,
        isDefault: false //String(this.state.isSetAsDefault), //commented for GI-951
      });
    }
  }

  componentDidMount() {
    window.scrollTo(0,document.body.scrollHeight - 700);
  }

  render() {
    console.log('The Data --- ', this.props.editAddressDataPro.nickName);
    return (
      <div className="form-BgContainer addAddressContainer">
        <h4 className="heading">Add New Address</h4>
        <button
          className="cancelBtn"
          onClick={this.closeAddNewAddress.bind(this)}
        />
        <div className="row">
          <div className="col-md-6">
            <div className='form-div clearfix div-error'>
              <Input inputType="text" title="Full Name" name="name" id="fullName" placeholder="Enter your name" value={this.state.inputText_name} handleChange={this.handleInput} isAutoFocus={true} />
              {this.state.error_name ? <div className='error-msg'>{this.state.errorMessage_name}</div> : null}
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-div clearfix div-error">
              <Input
                inputType={'number'}
                title={'Phone Number'}
                name={'number'}
                id={'phoneNumber'}
                placeholder={'Enter Number'}
                value={this.state.inputText_number}
                handleChange={this.handleInput}
              />
              {this.state.error_number ? (
                <div className="error-msg">
                  {this.state.errorMessage_number}
                </div>
              ) : null}
            </div>
          </div>

          <div className="col-md-6">
            <div className='form-div clearfix div-error'>
              <Input inputType="email" title="Email ID (Optional)" name="email" id="emailId" placeholder="Enter EmailId" value={this.state.inputText_email} handleChange={this.handleInput} />
              {this.state.error_email ? <div className="error-msg">{this.state.errorMessage_email}</div> : null}
            </div>
          </div>

          <div className='col-md-6'>
            <div className='form-div clearfix div-error'>
              <Input inputType="number" title="Pincode" name="pincode" id="pincode" size="6" placeholder="Enter Pincode" value={this.state.inputText_pincode} handleChange={this.handleInput} focusOut={this.pincodeFocusOut.bind(this)} />
              {this.state.error_pincode ? <div className='error-msg'>{this.state.errorMessage_pincode}</div> : null}
            </div>
          </div>

          <div className='col-md-12'>
            <div className='form-div clearfix div-error'>
              <Input inputType="text" title="Address" name="address" id="address" placeholder="Enter Address" value={this.state.inputText_address} handleChange={this.handleInput} maxLength={200} />
              {this.state.error_address ? <div className='error-msg'>{this.state.errorMessaget_address}</div> : null}
            </div>
          </div>

          <div className='col-md-6'>
            <div className='form-div clearfix div-error'>
              <Input inputType="text" title="City/District" name="city" id="cityDistrict" placeholder="Enter City/District" value={this.state.inputText_city} handleChange={this.handleInput} readOnly/>
              {this.state.error_city ? <div className='error-msg'>{this.state.errorMessage_city}</div> : null}
            </div>
          </div>

          <div className='col-md-6'>
            <div className='form-div clearfix div-error'>
              <Input inputType="text" title="State" name="state" id="state" placeholder="Enter State" value={this.state.inputText_state} handleChange={this.handleInput} readOnly/>
              {this.state.error_state ? <div className='error-msg'>{this.state.errorMessage_state}</div> : null}
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <div className='defaultOption'>
            <div className='input_box'>
              <input className='defaultCheckbox inputCheck' type='checkbox' title="State" name="name" id="checkbox" defaultChecked={this.state.isSetAsDefault} onChange={this.onSetAsDefaultChange.bind(this)} />
              <label className="lblCheck" htmlFor="checkbox"></label>
            </div>
            <label className='defaultlbl'>Make this default address</label>
          </div>
        </div>
        <div className='clearfix'></div>

        <div className='col-md-12 add-new-btn'>
          <div className='actionBtnWrapper'>
            <button onClick={this.closeAddNewAddress.bind(this)} className='btn-cancel btn'>Cancel</button>
            <button onClick={this.onSavebuttonClick.bind(this)} className='btn-save btn'>Save</button>
          </div>
        </div>
      </div>

    );
  }
}

export default AddAddressForm;
