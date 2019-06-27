import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import {
  deleteAddressAPI,
  updateAddressAPI,
} from '../../../../public/constants/constants';
import apiManager from '../../../utils/apiManager';

class DeletePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      modalClass: 'delete-modal',
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
    this.props.resetDeleteFlagPro();
  }

  onDelete() {
    this.props.deleteAddressPro();
    this.toggle();
  }

  render() {
    return (
      <Modal
        show={this.state.modal}
        onHide={this.toggle}
        className={this.state.modalClass}
      >
        <Modal.Body>
          <div className="modalwrapper">
            <Button className="cancelBtn" onClick={this.toggle} />
            <h3 className="heading">
              Are you sure you want delete the address?
            </h3>

            <div className="actionBtnWrapper">
              <Button className="btn-cancel btn" onClick={this.toggle}>
                Cancel
              </Button>
              <Button
                className="btn-save btn"
                onClick={this.onDelete.bind(this)}
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

export default DeletePopup;
