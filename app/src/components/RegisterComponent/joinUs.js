import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../../../public/styles/registerComponent/registerComponent.scss';
import axios from 'axios';
import {
  storeId,
} from '../../../public/constants/constants';

import Register from './register';
import RegisterWithEmail from './registerWithEmail';
import GenerateOtp from './generateOtp';

class JoinUs extends React.Component {
  constructor() {
    super();
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      data: null,
    };
  }

  handleClose() {
    this.setState({
      show: false,
      data: null,
    });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleComponent(type, data = null) {
    let renderComponent = null;
    console.log('Tis is ma');
    if (type === 'registerWithEmail' || type === 'registerWithMobileNum') {
      renderComponent = (
        <RegisterWithEmail
          componentData={this.handleComponent.bind(this)}
          registrationType={type}
          handleApi={this.handleComponetData.bind(this)}
        />
      );
    } else if (type === 'generateOtp') {
      renderComponent = (
        <GenerateOtp
          componentData={this.handleComponent.bind(this)}
          userdata={data}
          registrationType={type}
          handleApi={this.handleComponetData.bind(this)}
        />
      );
    } else {
      renderComponent = (
        <Register componentData={this.handleComponent.bind(this)} />
      );
    }

    this.setState({ data: renderComponent });
  }

  handleComponetData(api, data, token, type) {
    console.log(type, 'joinUs');
    console.log(data);
    axios
      .post(api, data, { headers: { store_id: storeId, access_token: token } })
      .then(response => {
        if (type === 'registerWithEmail') {
          alert('Registerted successfully!');
          document.cookie = response.data.data.access_token;
        } else {
          alert(`OTP - ${response.data.data.otpVal}`);
          if (type !== 'resendOtp') {
            this.handleComponent('generateOtp', data);
          }
        }
      })
      .catch(error => {
        const errorData = error.response.data;
        const errorMessage = errorData.error.error_message;
        alert(`Error - ${errorMessage}`);
      });
  }

  render() {
    let data = null;
    if (this.state.data === null) {
      data = <Register componentData={this.handleComponent.bind(this)} />;
    } else {
      data = this.state.data;
    }
    return (
      <div>
        <Button className="btn-link" onClick={this.handleShow}>
          Register
        </Button>
        <Modal
          className="joinUsModal"
          show={this.state.show}
          onHide={this.handleClose}
        >
          <Modal.Body>
            <Button className="close" onClick={this.handleClose}>
              X
            </Button>
            {data}
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default JoinUs;
