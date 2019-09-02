import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../../../public/styles/registerComponent/registerComponent.scss';
import apiManager from '../../utils/apiManager';
import { accessTokenCookie } from '../../../public/constants/constants';
import Register from './register';
import RegisterWithEmailMobile from './registerWithEmailMobile';
import GenerateOtp from './generateOtp';
import {
  registerWithEmail,
  generateOtp,
  resendOtp,
  otpConfirmed,
} from './constants';
import appCookie from '../../utils/cookie';
import WelcomeBack from '../WelcomeBack/index';

class RegisterModalData extends React.Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      data: null,
      modalClass: 'modal-wrapperjoinus',
    };
  }

  /* Handle Modal Close */
  handleClose(isClose = false) {
    if (this.state.data.props.registrationType === 'generateOtp' && isClose !== true) {
      this.handleComponent('registerWithMobileNum', this.state.data.props.userdata);
    } else {
      this.props.resetCallbackPro();
      this.setState({
        show: false,
        data: null,
        modalClass: 'modal-wrapperjoinus',
      });
    }
  }

  /* Handle Modal Show */
  handleShow() {
    this.setState({ show: true });
  }

  handleLoginComponent() {
    console.log('back to login');
    this.props.callbackRegisterPro();
    this.setState({
      show: false,
      data: null,
      modalClass: 'modal-wrapperjoinus',
    });
    this.handleClose(true);
    return <WelcomeBack />;
  }

  /* Handle Components */
  handleComponent(type, data = null) {
    let renderComponent = null;
    this.setState({
      modalClass: 'modalJoinus',
    });

    if (type !== generateOtp) {
      renderComponent = (
        <RegisterWithEmailMobile
          componentData={this.handleComponent.bind(this)}
          registrationType={type}
          loginComponentData={this.handleLoginComponent.bind(this)}
          handleApi={this.handleComponetData.bind(this)}
          userdata={data}
        />
      );
      this.setState({
        modalClass: 'registerEmailMobile',
      });
    } else if (type === generateOtp) {
      renderComponent = (
        <GenerateOtp
          componentData={this.handleComponent.bind(this)}
          userdata={data}
          registrationType={type}
          handleApi={this.handleComponetData.bind(this)}
        />
      );
      this.setState({
        modalClass: 'modal-wrapperotp',
      });
    } else {
      renderComponent = (
        <Register
          componentData={this.handleComponent.bind(this)}
          loginComponentData={this.handleLoginComponent.bind(this)}
        />
      );
    }

    this.setState({ data: renderComponent });
  }

  /* Handle Components API Data */
  handleComponetData(api, data, type, callbackFunc) {
    apiManager
      .post(api, data)
      .then(response => {
        if (type === registerWithEmail || type === otpConfirmed) {

          appCookie.set('isLoggedIn', true, 365 * 24 * 60 * 60 * 1000);
          appCookie.set(
            `${accessTokenCookie}=${
              response.data.data.access_token
            };path=/;expires=''`,
          );
          this.handleClose(true);
          window.location.reload();
        } else {
          if (type === resendOtp && response.data.data.otpCount > 3) {
            callbackFunc('OTP cannot be regenerated. You have exceeded the maximum number of resending attempts (3)');
            return;
          } 
          if (type !== resendOtp) {
            this.handleComponent(generateOtp, data);
          }
        }
      })
      .catch(error => {
        const errorData = error.response.data;
        const errorMessage = errorData.error.error_message;
        callbackFunc(errorMessage);
      });
      
  }

  componentDidMount() {
    this.setState({ show: true });
  }

  render() {
    let data = null;
    if (this.state.data === null && this.state.show === true) {
      data = (
        <Register
          componentData={this.handleComponent.bind(this)}
          loginComponentData={this.handleLoginComponent.bind(this)}
        />
      );
    } else {
      data = this.state.data;
    }

    return (
      <>
        {/* <Button className="registerNow" onClick={this.handleShow}>
          Register
        </Button> */}
        <Modal
          className={`modal_register ${this.state.modalClass}`}
          show={this.state.show}
          onHide={this.handleClose}
        >
          <Modal.Body className={this.state.modalClass}>
            <div className="modal-wrapper">
              <Button className="close" onClick={this.handleClose} />
              {data}
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default RegisterModalData;
