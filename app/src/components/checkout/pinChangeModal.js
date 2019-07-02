import React from 'react';
import { Button, Modal } from 'react-bootstrap';

class PinChangePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      modalClass: 'delete-modal',
    };
  }
  handleCancel = () => {
    this.props.cancel()
  }
  
  render() {
    return (
      <Modal
        show={this.state.modal}
        className={this.state.modalClass}
      >
        <Modal.Body>
          <div className="modalwrapper">
            <Button className="cancelBtn" onClick={this.handleCancel} />
            <h3 className="heading">
              Are you sure you want to change the Pincode?
            </h3>
            <p>Changing the pincode will take you back to the cart and show you updated information on availability, delivery dates and shopping charges.</p>
            <div className="actionBtnWrapper">
              <Button className="btn-cancel btn" onClick={this.handleCancel}>
                Cancel
              </Button>
              <Button
                className="btn-save btn"
              >
                Proceed
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default PinChangePopup;
