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

const prevArrowImg = (
  <img
    src={require('../../../public/images/plpAssests/carousel__arrowLeft.svg')}
  />
);
class Forgotpassowrd extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		modal: false,
		currentItem: null,
		currentItemName: null,
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

		console.log('ComponentName---', itemStr);
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
		}

		this.setState({
		currentItem: item,
		currentItemName: itemStr,
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

	backButtonPressed() {
		let itemStr = this.state.currentItemName;
		let item;
		console.log('ComponentNameBAck---', this.state.currentItemName);
		if (itemStr == 'ForgotPasswordOTP') {
		item = (
			<ForgotPasswordEmailMobile
			handlerPro={this.handler.bind(this)}
			userIdPro={this.state.userId}
			isBack
			/>
		);
		} else if (itemStr == 'ForgotPasswordNewPassword') {
		item = (
			<ForgotPasswordOTP
			handlerPro={this.handler.bind(this)}
			userIdPro={this.state.userId}
			isHeadingPro
			isBack
			/>
		);
		itemStr = 'ForgotPasswordOTP';
		} else if (itemStr == 'NewPasswordSuccess') {
		this.setState({
			modal: false,
		});
		}

		this.setState({
		currentItem: item,
		currentItemName: itemStr,
		});

		console.log('Back');
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
			<p className="forgotPassword" onClick={this.toggle}>
			Forgot Password?
			</p>
			<Modal show={this.state.modal} onHide={this.toggle}>
				<Modal.Body>
					<div className="modal-wrapper sliderContainer">
						<Button className="close" onClick={this.toggle}>
							X
						</Button>
						<Button
							onClick={this.backButtonPressed.bind(this)}
							className="btn-back"
						>
							{' '}
							Back
						</Button>
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
