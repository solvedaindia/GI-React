import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import RedditShareButton from 'react-share/lib/RedditShareButton';
import { Redirect } from 'react-router-dom'
import appCookie from '../../utils/cookie';
import {isMobile} from '../../utils/utilityManager';
import {ARE_YOU_SURE } from '../../constants/app/checkoutConstants';
import {CHANGING_YOUR_PIN_CODE } from '../../constants/app/checkoutConstants';
import {PROCEED } from '../../constants/app/checkoutConstants';
import {SUBMIT } from '../../constants/app/checkoutConstants';
import {CANCEL } from '../../constants/app/checkoutConstants';
import apiManager from '../../utils/apiManager';
import { updateAddressAPI } from '../../../public/constants/constants'


class PinChangePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      modalClass: 'delete-modal',
      redirect: false
    };
  }
  handleCancel = () => {
    this.props.cancel()
  }

  handleProceed = () => {
    this.setAsDefafultBtnClicked();
    this.setState({
      redirect: true
    })
  }

  setAsDefafultBtnClicked() {
    const data = {
      name: this.props.currentAddressPro.name,
      phone_number: this.props.currentAddressPro.phoneNumber,
      email_id: this.props.currentAddressPro,
      pincode: this.props.currentAddressPro.pincode,
      address: this.props.currentAddressPro.address,
      city: this.props.currentAddressPro.city,
      state: this.props.currentAddressPro.state,
      default: String(true),
    };
    console.log('Add Address  ----  ', data);
    apiManager
      .post(updateAddressAPI + this.props.currentAddressPro.nickName, data)
      .then(response => {})
      .catch(error => {});
  }
  
  render() {
    if (this.state.redirect) {
      appCookie.set('pincode', this.props.currentPinPro, 365 * 24 * 60 * 60 * 1000);
      appCookie.set('pincodeUpdated', true, 365 * 24 * 60 * 60 * 1000);
      return <Redirect to='/cart'/>;
    }
    return (
      <Modal
        show={this.state.modal}
        className={this.state.modalClass}
      >
        <Modal.Body>
          <div className="modalwrapper change-pinocde">
            <Button className="cancelBtn" onClick={this.handleCancel} />
            <h3 className="heading">
           {ARE_YOU_SURE}
            </h3>
            <p className='text'>{CHANGING_YOUR_PIN_CODE}</p>
            {!isMobile() && <div className="actionBtnWrapper">
              <Button className="btn-cancel btn" onClick={this.handleCancel}>
                {CANCEL}
              </Button>
              <Button
                className="btn-save btn"
                onClick={this.handleProceed}
              >
                {SUBMIT}
              </Button>
            </div>}
          </div>

          {isMobile() && <div className="actionBtnWrapper mobileView">
              <Button className="btn-cancel btn" onClick={this.handleCancel}>
                {CANCEL}
              </Button>
              <Button
                className="btn-save btn"
                onClick={this.handleProceed}
              >
                {PROCEED}
              </Button>
            </div>}
        </Modal.Body>
      </Modal>
    );
  }
}

export default PinChangePopup;
