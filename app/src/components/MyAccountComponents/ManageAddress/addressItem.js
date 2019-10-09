import React from 'react';
import {
  deleteAddressAPI,
  updateAddressAPI,
} from '../../../../public/constants/constants';
import apiManager from '../../../utils/apiManager';
import DeletePopup from './deletePopup';
import {isMobile} from '../../../utils/utilityManager';
import {DELETE, SET_DEFAULT, EDIT, DEF_ADD} from '../../../constants/app/myAccountConstants';
import appCookie from '../../../utils/cookie';

class AddressItem extends React.Component {
  state = {
    isDeletePressed: false,
  };

  editBtnClicked() {
    this.props.openEditAddress(this.props.addressData);
  }

  deleteBtnClicked() {
    this.setState({
      isDeletePressed: true,
    });
  }

  resetDeleteFlag() {
    this.setState({
      isDeletePressed: false,
    });
  }

  deleteAddress() {
    const data = {};
    apiManager
      .post(deleteAddressAPI + this.props.addressData.nickName, data)
      .then(response => {
        this.props.onUpdateActivity();
      })
      .catch(error => {
      });
  }

  setAsDefafultBtnClicked() {
    const data = {
      name: this.props.addressData.name,
      phone_number: this.props.addressData.phoneNumber,
      email_id: this.props.addressData,
      pincode: this.props.addressData.pincode,
      address: this.props.addressData.address,
      city: this.props.addressData.city,
      state: this.props.addressData.state,
      default: String(true),
    };


    apiManager
      .post(updateAddressAPI + this.props.addressData.nickName, data)
      .then(response => {
        this.props.onUpdateActivity();
      })
      .catch(error => {
        console.log('Error: ', error);
      });

    appCookie.set('pincode', this.props.addressData.pincode, 365 * 24 * 60 * 60 * 1000);
    appCookie.set('pincodeUpdated', true, 365 * 24 * 60 * 60 * 1000);
  }

  render() {
    let stylingClass = '';
    if (this.props.addressData.isDefault) {
      stylingClass = 'defaultAddress';
    }

    return (
      <>
        {this.state.isDeletePressed ? (
          <DeletePopup
            deleteAddressPro={this.deleteAddress.bind(this)}
            resetDeleteFlagPro={this.resetDeleteFlag.bind(this)}
          />
        ) : null}
        <div className={`addressItem ${stylingClass}`}>
          {this.props.addressData.isDefault ? (
            <label className="defaultAddress">{DEF_ADD}</label>
          ) : null}

          {isMobile() &&
            <>
              {this.props.addressData.isDefault ? null : (
                <div
                  className="setAsdefaultbtn"
                  onClick={this.setAsDefafultBtnClicked.bind(this)}
                >
                  {SET_DEFAULT}
                </div>
              )}
              <ul className="myacAddressList">
                <li className="listitem" onClick={this.editBtnClicked.bind(this)}>
                  <img src={require('../../../../public/images/edit.svg')}  alt='Edit' />
                </li>
                <li className="listitem" onClick={this.deleteBtnClicked.bind(this)}>
                  <img src={require('../../../../public/images/delete.svg')}  alt='Delete'/>
                </li>
              </ul>
            </>
          }
          <label className="addressText">
            {this.props.addressData.address},
            {this.props.addressData.city}
            <div>{this.props.addressData.state},{` ${this.props.addressData.pincode}`}</div>

          </label>

          {!isMobile() && <ul className="modifyAddress">
            <li className="listitem" onClick={this.deleteBtnClicked.bind(this)}>
              {DELETE}
            </li>
            <li className="listitem" onClick={this.editBtnClicked.bind(this)}>
              {EDIT}
            </li>
            {this.props.addressData.isDefault ? null : (
              <li
                className="listitem"
                onClick={this.setAsDefafultBtnClicked.bind(this)}
              >
                {SET_DEFAULT}
              </li>
            )}
          </ul>}

        </div>
      </>
    );
  }
}

export default AddressItem;
