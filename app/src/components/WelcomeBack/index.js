import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import WelcomeBackForm from '../WelcomeBackForm';
import axios from 'axios';
import { storeId, accessToken, accessTokenCookie, userLoginAPI } from '../../../public/constants/constants';

class WelcomeBack extends React.Component {
	constructor() {
		super();
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.state = {
			show: false,
			message: null
		};
	}
  
	handleClose() {
	  	this.setState({ show: false, message: null });
	}
  
	handleShow() {
	  	this.setState({ show: true, message: null });
	}

	/* Handle User Login API */
	handleUserLoginApi(data) {
		this.setState({ message: null });
		axios.post(userLoginAPI, data, { 'headers': { 'store_id': storeId, 'access_token': accessToken } }).then(response => {
			document.cookie = 'isLoggedIn=true';
			document.cookie = `${accessTokenCookie}=${response.data.data.access_token}`;
			alert('Successfully Logged In');
			this.handleClose();
		}).catch(error => {
			const errorData = error.response.data;
			const errorMessage = errorData.error.error_message;
			this.setState({
				message: `Error - ${errorMessage}`
			});
		});		
	}
  
	render() {
		let message = null;
		if (this.state.message) {
		  message = <p>{this.state.message}</p>
		}
		return (
			<div>
				<Button variant='primary' onClick={this.handleShow}>
					Click Here
				</Button>
				<Modal className='welcomeBack' size='lg' animation={false} show={this.state.show} onHide={this.handleClose}>
					{message}
					<Modal.Header closeButton>
						<Modal.Title>Welcome Back</Modal.Title>
					</Modal.Header>
					<WelcomeBackForm handleUserData={this.handleUserLoginApi.bind(this)}/>
				</Modal>
			</div>
		);
	}
}

export default WelcomeBack;
