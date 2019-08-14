import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class FailPop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      modalClass: 'delete-modal',
    };
  }
  handleCancel = () => {
    window.location.assign('/')
    this.props.cancelFail()
  }

  handleTryAgain = () => {
    this.setState({
      modal: false,
    })
  }
  
  render() {
    return (
      <Modal
        show={this.state.modal}
        className={this.state.modalClass}
      >
        <Modal.Body>
          <div className="modalwrapper">
            <h3 className="heading">
              Oops!
            </h3>
            <p>We couldn't complete the payment.</p>
            <div className="actionBtnWrapper">
              <Button className="btn-cancel btn" onClick={this.handleCancel}>
                Cancel
              </Button>
              <Button onClick={this.handleTryAgain} className="btn-save btn">
                Try Again
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}