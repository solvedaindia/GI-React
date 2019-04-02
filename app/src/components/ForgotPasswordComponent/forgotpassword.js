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

class Forgotpassowrd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      currentItem: null,
      userId: null,
      otpNo: null,
    };

    this.toggle = this.toggle.bind(this);
    this.handler = this.handler.bind(this);
  }

  handler(itemStr, userId, otpStr) {
    if (userId != null) {
      this.setState({
        userId,
      });
    }

    let item;
    if (itemStr == 'ForgotPasswordOTP') {
      item = (
        <ForgotPasswordOTP
          handlerPro={this.handler.bind(this)}
          userIdPro={this.state.userId}
          isHeadingPro
        />
      );
    } else if (itemStr == 'ForgotPasswordNewPassword') {
      item = (
        <ForgotPasswordNewPassword
          handlerPro={this.handler.bind(this)}
          userIdPro={this.state.userId}
          otpPro={otpStr}
        />
      );
    } else if (itemStr == 'NewPasswordSuccess') {
      this.setState({
        modal: false,
      });
    }

    this.setState({
      currentItem: item,
    });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));

    if (this.state.modal) {
      this.setState({
        currentItem: null,
      });
    }
  }

  render() {
    let item;
    if (this.state.currentItem == null) {
      item = <ForgotPasswordEmailMobile handlerPro={this.handler.bind(this)} />;
    } else {
      item = this.state.currentItem;
    }

    return (
      <>
        <Button className="btn-bg" onClick={this.toggle}>
          Forgot Password
        </Button>
        <Modal show={this.state.modal} onHide={this.toggle}>
          <Modal.Body>
            <div className="modal-wrapper sliderContainer">
              <Button className="close" onClick={this.toggle} />
              <div className="form-center">{item}</div>
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
