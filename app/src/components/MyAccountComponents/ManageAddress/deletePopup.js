import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import {
  deleteAddressAPI,
  updateAddressAPI,
} from '../../../../public/constants/constants';
import apiManager from '../../../utils/apiManager';
import {isMobile} from '../../../utils/utilityManager';
import {DELETE,CANCEL,SURE_DELETE_YOUR_ADD } from '../../../constants/app/myAccountConstants';

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
		   <div className="deleteQuestion"> 
			<p className="heading">{SURE_DELETE_YOUR_ADD}</p> 
		  </div>
         {!isMobile() && <Button className="cancelBtn" onClick={this.toggle} />}

            <div className="actionBtnWrapper">
             <Button className="btn-cancel btn" onClick={this.toggle}>
                {CANCEL}
              </Button>
              <Button
                className="btn-save btn"
                onClick={this.onDelete.bind(this)}
              >
               { DELETE}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default DeletePopup;
