import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import apiManager from '../../../utils/apiManager';
import { getAddressListAPI } from '../../../../public/constants/constants';
import {
  resolveTheWishlistData,
  getCookie,
  getReleventReduxState,
} from '../../../utils/utilityManager';
import '../../../../public/styles/myAccount/changePassword.scss';
import { regexPw, validateEmptyObject } from '../../../utils/validationManager';
import '../../../../public/styles/myAccount/manageAddress/manageAddress.scss';
import AddressItem from './addressItem';
import AddAddressForm from './addAddressForm';
import { ADD_NEW_ADD} from '../../../constants/app/myAccountConstants';

class ManageAddress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddAddress: false,
      addressListData: [],
      addressListItem: null,
      editAddressData: {
        name: '',
        phone_number: '',
        email_id: '',
        pincode: '',
        address: '',
        city: '',
        state: '',
        default: String(false),
      },
    };
  }

  componentDidMount() {
    this.getAddressListAPI();
  }

  addNewAddressBtnClicked(editData) {
    this.setState({
      editAddressData: editData,
      isAddAddress: !this.state.isAddAddress,
    });
  }

  addNewAddressBtnClicked1(editData) {
    this.setState({
      isAddAddress: !this.state.isAddAddress,
    });
  }

  getAddressListAPI() {
    apiManager
      .get(getAddressListAPI)
      .then(response => {
        this.fetchAddressItems(response.data.data.addressList);
      })
      .catch(error => {
      });
  }

  fetchAddressItems(listData) {
    if (listData) {
      const item = listData.map(data => (
        <li className="list">
          <AddressItem
            addressData={data}
            onUpdateActivity={this.getAddressListAPI.bind(this)}
            openEditAddress={this.addNewAddressBtnClicked.bind(this)}
          />
        </li>
      ));
      this.setState({
        addressListItem: item,
      });
    }
  }

  render() {
    return (
      <div className="manageAddressContainer">
        <ul className="itemList">{this.state.addressListItem}</ul>
        <div className="clearfix" />
        {this.state.isAddAddress ? (
          <AddAddressForm
            onCancel={this.addNewAddressBtnClicked.bind(this)}
            onUpdateActivity={this.getAddressListAPI.bind(this)}
            editAddressDataPro={this.state.editAddressData}
          />
        ) : (
          <button
            className="addNewAddress"
            onClick={this.addNewAddressBtnClicked1.bind(this)}
          >
            <span className='icon'>+</span> {ADD_NEW_ADD}
          </button>
        )}
      </div>
    );
  }
}

export default ManageAddress;
