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
          <div className="modalwrapper succesModal">
            <div className='successIcon'>
            <svg className='successImg' xmlns="http://www.w3.org/2000/svg" width="178" height="178" viewBox="0 0 178 178">
              <defs>
                  <filter id="a" width="122.6%" height="122.6%" x="-11.3%" y="-11.3%" filterUnits="objectBoundingBox">
                      <feOffset dy="3" in="SourceAlpha" result="shadowOffsetOuter1"/>
                      <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="3"/>
                      <feColorMatrix in="shadowBlurOuter1" result="shadowMatrixOuter1" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.135516827 0"/>
                      <feMerge>
                          <feMergeNode in="shadowMatrixOuter1"/>
                          <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                  </filter>
              </defs>
              <g fill="none" fill-rule="nonzero" filter="url(#a)" transform="translate(7 4)">
                  <circle cx="82" cy="82" r="82" fill="#17C37B" stroke="#17C37B"/>
                  <path fill="#FFF" d="M123.845 47L132 54.821 70.112 118 33 80.114l8.155-7.821 28.957 29.56z"/>
              </g>
          </svg>

            </div>
            <h3 className='heading-succes'>Success!</h3>
            <p className='orderConfirmed'>Your Order has been confirmed</p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}