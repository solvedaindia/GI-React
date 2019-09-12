import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class SuccessPop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      modalClass: 'delete-modal succes',
    };
  }
  
  render() {
    return (
      <Modal
        show={this.state.modal}
        className={this.state.modalClass}
      >
        <Modal.Body>
          <div className="modalwrapper succesModal">
            <div className='successIcon'>
              <img src={require('../../components/SVGs/succesIcon.svg')} alt='sucessIcon'/>
            </div>
            <h3 className='heading-succes'>Success!</h3>
            <div className='orderConfirmed'>Your Order has been confirmed!</div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}