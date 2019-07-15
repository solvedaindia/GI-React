import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class SuccessPop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      modalClass: 'delete-modal',
    };
  }
  
  render() {
    return (
      <Modal
        show={this.state.modal}
        className={this.state.modalClass}
      >
        <Modal.Body>
          <div className="modalwrapper">
            <h3>Success!</h3>
            <p>Your Order has been confirmed</p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}