import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../../../public/styles/registerComponent/registerComponent.scss';
import axios from 'axios';
import { storeId, accessTokenCookie } from '../../../public/constants/constants';
import Register from './register';
import RegisterWithEmailMobile from './registerWithEmailMobile';
import GenerateOtp from './generateOtp';
import { registerWithEmail, generateOtp, resendOtp, otpConfirmed } from './constants';
import WelcomeBack from '../WelcomeBack/index';

class RegisterModalData extends React.Component {
	constructor(props) {
		super(props);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);

		this.state = {
			show: false,
			data: null,
			message: null,
			modalClass: 'modal-wrapperjoinus',
		}
	}

	/* Handle Modal Close */
	handleClose() {
		this.setState({ 
			show: false,
			data: null,
			message: null,
			modalClass: 'modal-wrapperjoinus',
		});
	}

	/* Handle Modal Show */
	handleShow() {
		this.setState({ show: true });
	}

	handleLoginComponent() {
		this.handleClose();
		return <WelcomeBack />;
	}

	/* Handle Components */
	handleComponent(type, data = null) {
		let renderComponent = null;
		this.setState({
			modalClass: 'modalJoinus',
		})

		if (type !== generateOtp) {
			renderComponent = <RegisterWithEmailMobile componentData={this.handleComponent.bind(this)} registrationType={type} loginComponentData={this.handleLoginComponent.bind(this)} handleApi={this.handleComponetData.bind(this)} userdata={data}/>;
			this.setState({
				modalClass: 'registerEmailMobile',
			})
		} else if(type === generateOtp) {
			renderComponent = <GenerateOtp componentData={this.handleComponent.bind(this)} userdata={data} registrationType={type} handleApi={this.handleComponetData.bind(this)}/>;
			this.setState({
				modalClass: 'modal-wrapperotp',
			})
		} else {
			renderComponent = <Register componentData={this.handleComponent.bind(this)} loginComponentData={this.handleLoginComponent.bind(this)} />
		}

		this.setState({data: renderComponent});
	}

	/* Handle Components API Data */
	handleComponetData(api, data, token, type) {
		this.setState({ message: null });

		axios.post(api, data, { 'headers': { 'store_id': storeId, 'access_token': token } }).then(response => {
			if (type === registerWithEmail || type === otpConfirmed) {
				this.setState({
					message: 'Registerted successfully!',
				});

				document.cookie = 'isLoggedIn=true';
				document.cookie = `${accessTokenCookie}=${response.data.data.access_token}`;
				this.handleClose();
			} else {
				alert(`OTP - ${response.data.data.otpVal}`);
				if (type !== resendOtp) {
					this.handleComponent(generateOtp, data);
				}
			}
		}).catch(error => {
			const errorData = error.response.data;
			const errorMessage = errorData.error.error_message;
				this.setState({
				message: `Error - ${errorMessage}`,
			});
		});
	}

	render () {
		let data = null;
		if (this.state.data === null && this.state.show === true) {
			data = <Register componentData={this.handleComponent.bind(this)} loginComponentData={this.handleLoginComponent.bind(this)} />
		} else {
			data = this.state.data;
		}

		let message = null;
		if (this.state.message) {
			message = <p className='errormsg'>{this.state.message}</p>
		}

		return (
		<>
			<Button className='registerNow' onClick={this.handleShow}>
				Register
			</Button>
			<Modal className={`modal_register ${this.state.modalClass}`} show={this.state.show} onHide={this.handleClose}>
				<Modal.Body className={this.state.modalClass}>					
					<div className='modal-wrapper'>
						<Button className="close" onClick={this.handleClose}></Button>            
						{message}
						{data}     
					</div>
				</Modal.Body>
			</Modal>
		</>
		);
	}
}

export default RegisterModalData;