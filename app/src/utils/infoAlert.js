import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../../public/styles/infoAlert.scss'
import {isMobile} from './utilityManager';
import {ARE_YOU_SURE,CHANGING_YOUR_PIN_CODE,PROCEED,SUBMIT,CANCEL } from '../constants/app/checkoutConstants';

class InfoAlert extends React.Component {
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
    return null;
    // return (
    //   <Modal show={this.state.modal} className={this.state.modalClass}>
    //     <Modal.Body>
    //       <div className="modalwrapper change-pinocde">
    //         <Button className="cancelBtn" onClick={this.handleCancel} />
    //         <h3 className="heading">
    //           {ARE_YOU_SURE}
    //         </h3>
    //         <p className='text'>{CHANGING_YOUR_PIN_CODE}</p>
    //         {!isMobile() && <div className="actionBtnWrapper">
    //           <Button className="btn-cancel btn" onClick={this.handleCancel}>
    //             {CANCEL}
    //           </Button>
    //           <Button
    //             className="btn-save btn"
    //             onClick={this.handleProceed}
    //           >
    //             {SUBMIT}
    //           </Button>
    //         </div>}
    //       </div>

    //       {isMobile() && <div className="actionBtnWrapper mobileView">
    //         <Button className="btn-cancel btn" onClick={this.handleCancel}>
    //           {CANCEL}
    //         </Button>
    //         <Button
    //           className="btn-save btn"
    //           onClick={this.handleProceed}
    //         >
    //           {PROCEED}
    //         </Button>
    //       </div>}
    //     </Modal.Body>
    //   </Modal>
    // );
  }
}

export default InfoAlert;
