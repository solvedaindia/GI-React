import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import RedditShareButton from 'react-share/lib/RedditShareButton';
import { Redirect } from 'react-router-dom'
import appCookie from '../../utils/cookie';
import {isMobile} from '../../utils/utilityManager';

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
    this.setState({
      redirect: true
    })
  }
  
  render() {
    console.log('Pincode eee ---- ',this.props.currentPinPro)
    if (this.state.redirect) {
      appCookie.set('pincode', this.props.currentPinPro, 365 * 24 * 60 * 60 * 1000);
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
            Are you sure you want to change your pincode?
            </h3>
            <p className='text'>Changing your pincode will take you back to the cart and show updated information on product availability, delivery charges and expected delivery date.</p>
            {!isMobile() && <div className="actionBtnWrapper">
              <Button className="btn-cancel btn" onClick={this.handleCancel}>
                Cancel
              </Button>
              <Button
                className="btn-save btn"
                onClick={this.handleProceed}
              >
                Submit
              </Button>
            </div>}
          </div>

          {isMobile() && <div className="actionBtnWrapper mobileView">
              <Button className="btn-cancel btn" onClick={this.handleCancel}>
                Cancel
              </Button>
              <Button
                className="btn-save btn"
                onClick={this.handleProceed}
              >
                Proceed
              </Button>
            </div>}
        </Modal.Body>
      </Modal>
    );
  }
}

export default PinChangePopup;
