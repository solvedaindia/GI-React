/**
 *
 * Forgot passowrd
 *
 */

import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../../../public/styles/forgotpassword/forgotpass.scss';
import ForgotPasswordEmailMobile from './forgotPasswordEmailMobile';
import ForgotPasswordOTP from './forgotPasswordOTP';
import ForgotPasswordNewPassword from './forgotPasswordNewPassword';

const LeftArrow = (
  <img
    className="leftArrow" id="leftArrowId"
    src={require('../../../public/images/left-arrow.png')}
  />
);

const prevArrowImg = (
  <img src={require('../../../src/components/SVGs/carousel__arrowLeft.svg')} />
);
class Forgotpassowrd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      currentItem: null,
      currentItemName: 'ForgotPassword',
      userId: null,
      otpNo: null,
      modalClass: 'modal-forgot',
      hideBackArrow: false,
      isFirstBackPressed: false,
    };

    this.toggle = this.toggle.bind(this);
    this.handler = this.handler.bind(this);
  }

  //* Callback Handler *//
  handler(itemStr, userId, otpStr, isBack, hideBackArrow) { 
    if (userId != null) {
      this.setState({
        userId,
      });
    }

    if (hideBackArrow) {
      this.setState({
        hideBackArrow: true,
      });
      return;
    }

    this.setState({
      hideBackArrow: false,
    });

    if (isBack) {
      this.setState({
        currentItemName: itemStr,
      });
      this.backButtonPressed();
      return;
    }

    let item;
    if (itemStr == 'ForgotPasswordOTP') {
      item = (
        <ForgotPasswordOTP
          handlerPro={this.handler.bind(this)}
          userIdPro={this.state.userId}
          isHeadingPro
          isBack={false}
        />
      );
    } else if (itemStr == 'ForgotPasswordNewPassword') {
      item = (
        <ForgotPasswordNewPassword
          handlerPro={this.handler.bind(this)}
          userIdPro={this.state.userId}
          otpPro={otpStr}
          isBack={false}
        />
      );
    } else if (itemStr == 'NewPasswordSuccess') {
      this.setState({
        modal: false,
      });
      this.props.callbackForgotPro();
    } else if (itemStr == 'RegisterRedirect') {
      this.props.callbackForgotPro(true);
    }

    this.setState({
      currentItem: item,
      currentItemName: itemStr,
    });
  }

  toggle() {
    if (this.state.modal) {
      if (this.props.resetCallbackPro) {
        this.props.resetCallbackPro();
      }
    }

    this.setState(prevState => ({
      modal: !prevState.modal,
    }));

    if (this.state.modal) {
      this.setState({
        currentItem: null,
      });
    }
  }

  backButtonPressed() {
    let itemStr = this.state.currentItemName;
    let item;
    if (itemStr === 'ForgotPasswordOTP') {
      item = (
        <ForgotPasswordEmailMobile
          handlerPro={this.handler.bind(this)}
          userIdPro={this.state.userId}
          isBack
        />
      );
      itemStr = 'ForgotPassword';
    } else if (itemStr === 'ForgotPasswordNewPassword') {
      item = (
        <ForgotPasswordOTP
          handlerPro={this.handler.bind(this)}
          userIdPro={this.state.userId}
          isHeadingPro
          isBack
        />
      );
      itemStr = 'ForgotPasswordOTP';
    } else if (itemStr === 'NewPasswordSuccess') {
      this.setState({
        modal: false,
      });
    } else if (itemStr === 'ForgotPassword') {
      this.props.callbackForgotPro();
      this.setState({
        modal: false,
      });
      //this.toggle();
    }

    this.setState({
      currentItem: item,
      currentItemName: itemStr,
    });
  }

  componentDidMount() {
    this.toggle();
  }

  render() {
    let item;
    if (this.state.currentItem == null) {
      item = (
        <ForgotPasswordEmailMobile
          handlerPro={this.handler.bind(this)}
          isBack={false}
        />
      );
    } else {
      item = this.state.currentItem;
    }
    
    return (
      <>
        {/* <p onClick={this.toggle}>Forgot Password?</p> */}
        <Modal
          show={this.state.modal}
          onHide={this.toggle}
          className={this.state.modalClass}
        >
          <Modal.Body>
            <div className="modal-wrapper sliderContainer">
              <Button className="close" onClick={this.toggle} />
              <Button
                onClick={this.backButtonPressed.bind(this)}
                className="btn-back"
              >
                {this.state.hideBackArrow ? null : LeftArrow}
              </Button>
              <div className="form-center forrgot-pass-box">{item}</div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

Forgotpassowrd.propTypes = {};
Button.defaultProps = {
  color: 'bg',
  tag: 'button',
};

export default Forgotpassowrd;
