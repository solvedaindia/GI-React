import React from 'react';
import { deleteAddressAPI, updateAddressAPI } from '../../../../public/constants/constants';
import apiManager from '../../../utils/apiManager';

class AddressItem extends React.Component {
  state = {

  };

  editBtnClicked() {
    console.log('editBtnClicked');
    this.props.openEditAddress(this.props.addressData)
  }

  deleteBtnClicked() {
    const data = {
    }
    apiManager.post(deleteAddressAPI+this.props.addressData.nickName, data)
      .then(response => {
        this.props.onUpdateActivity();
      })
      .catch(error => {
        console.log('Delete Error---', error);
      });
  }

  setAsDefafultBtnClicked() {
    console.log('setAsDefafultBtnClicked');
    const data = {
      "name": this.props.addressData.name,
      "phone_number": this.props.addressData.phoneNumber,
      "email_id": this.props.addressData,
      "pincode": this.props.addressData.pincode,
      "address": this.props.addressData.address,
      "city": this.props.addressData.city,
      "state": this.props.addressData.state,
      "default": String(true),
    }
    console.log('Add Address  ----  ', data);

    apiManager.post(updateAddressAPI+this.props.addressData.nickName, data)
      .then(response => {
        this.props.onUpdateActivity();
      })
      .catch(error => {
        console.log('UPDATE Error---', error);
      });
  }


  render() {
    console.log('markeeee', this.props.addressData.isDefault)
    return (
      <div className='addressItem'>
        {this.props.addressData.isDefault ? <label className='defaultAddress'>Default Address :</label> : null}
        <label className='addressText'>
          {this.props.addressData.address}
          {this.props.addressData.city}
          {this.props.addressData.state},{this.props.addressData.pincode}
        </label>
        
        <ul className='modifyAddress'>
          <li className='listitem' onClick={this.deleteBtnClicked.bind(this)}>Delete</li>         
          <li className='listitem' onClick={this.editBtnClicked.bind(this)}>Edit</li>          
          <li className='listitem' onClick={this.setAsDefafultBtnClicked.bind(this)}>Set as Default</li>
        </ul>
      </div>
    );
  }
}


export default AddressItem;
