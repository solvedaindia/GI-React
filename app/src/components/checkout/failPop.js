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
            <div className='OopsIcon'>
            <svg className='oopsImg' xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
    <g fill="none" fill-rule="nonzero">
                    <circle cx="50" cy="50" r="50" fill="#EF3E4A"/>
                    <g fill="#FFF">
                        <path d="M36.54 38.834l3.197-3.087L63.46 60.31 60.263 63.4z"/>
                        <path d="M63.46 38.834l-3.197-3.087L36.54 60.31l3.197 3.088z"/>
                    </g>
                </g>
            </svg>

            </div>
            <h3 className="heading">
              Oops
            </h3>
            <p className='payment-notcomplete'>Your payment could not be completed</p>
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