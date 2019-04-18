import React from 'react';
import { Modal } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import WhiteLogo from '../SVGs/whiteLogo';
import axios from 'axios';
import WelcomeBackForm from '../WelcomeBackForm';
import Forgotpassowrd from '../ForgotPasswordComponent/forgotpassword';
import RegisterModalData from '../RegisterComponent/registerModalData';
import {
  facebookAppId,
  googleClientId,
} from '../../../public/constants/constants';
import {
  onFacebookResponse,
  onGoogleResponse,
} from '../../utils/socialLoginHandler';

import {
  storeId,
  accessToken,
  accessTokenCookie,
  userLoginAPI,
} from '../../../public/constants/constants';
import Google from '../../../public/images/google.png';
import Facebook from '../../../public/images/facebook.png';

import '../../../public/styles/login/login.scss';

class WelcomeBack extends React.Component {
	constructor() {
		super();
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
		this.state = {
			show: false,
			message: null,
			loginStatus: 'Login/Register',
			userType: 'Hello Guest!',
		};
	}

	handleClose() {
		this.setState({ show: false, message: null });
	}

	handleShow() {
		if(this.state.loginStatus == 'Login/Register') {
			this.setState({ show: true, message: null });
		} else {
			console.log('Remove the cookie');
		}
	}
	// handleShow() {
	// 		this.setState({ show: true, message: null });
	// }
	
    handleToggle = () => {
		console.log('CLICKED');
		// this.setState({ show: false, message: null });
    } 

	// Social Login Handlers
	responseGoogle = response => {
		const profileData = response.profileObj;
		if (!profileData.email) {
			alert('SocialLogin - Email Id missing');
			return;
		}

		this.setState({
			firstName: profileData.givenName,
			lastName: profileData.familyName,
			authorizationProvider: 'google',
			userId: response.googleId,
			socialToken: response.accessToken,
			emialId: profileData.email,
		});

		onGoogleResponse(this.state, itemData => {
			console.log('GoogleCallback', itemData);
		});
	};
	
	responseFacebook = response => {
		if (!response.email) {
			alert('SocialLogin - Email Id missing');
			return;
		}

	// Remove below condition to get auto Facebook login.
		if (this.state.isFacebookClicked) {
			const firstName = response.name.substr(0, response.name.indexOf(' '));
			const lastName = response.name.substr(response.name.indexOf(' ') + 1);
			this.setState({
				firstName,
				lastName,
				authorizationProvider: 'facebook',
				userId: response.userID,
				socialToken: response.accessToken,
				emialId: response.email,
			});

			onFacebookResponse(this.state, itemData => {
				console.log('FacebookCallback', itemData);
			});
		}
	};
	
	facebookOnClick() {
		this.setState({ isFacebookClicked: true });
	}

	/* Handle User Login API */
	handleUserLoginApi(data) {
		this.setState({ message: null });
		axios
		.post(userLoginAPI, data, {
			headers: { store_id: storeId, access_token: accessToken },
		})
		.then(response => {
			document.cookie = 'isLoggedIn=true';
			document.cookie = `${accessTokenCookie}=${
				response.data.data.access_token
			}`;
			this.setState({
				userType: 'Hello User!',
				loginStatus: 'Logout',
				show: false
            });   
			alert('Successfully Logged In');
		})
		.catch(error => {
			const errorData = error.response.data;
			const errorMessage = errorData.error.error_message;
			this.setState({
			message: `Error - ${errorMessage}`,
			});
		});
	}

	render() {
		let message = null;
		if (this.state.message) {
			message = <p>{this.state.message}</p>;
		}
		return (
			<div>
				<ul className='userList'>
					<li className='listItem'>
						<a href='' className="dropDown" >{this.state.userType}</a>
					</li>
					<li className='listItem'>
						<a className="dropDown" onClick={this.handleShow}>
							{this.state.loginStatus}
						</a>
					</li>
				</ul>
				<Modal
					className="welcomeBack"
					size="lg"
					animation={false}
					show={this.state.show}
					onHide={this.handleClose}
				>
					{message}
					<Modal.Header closeButton>
						<div className='smallLogo'><WhiteLogo /></div>
						<Modal.Title>Welcome Back</Modal.Title>
					</Modal.Header>
					<div className="socialLogin">
						<GoogleLogin
							clientId={googleClientId}
							render={renderProps => (
								<button className="btn-white" onClick={renderProps.onClick}  disabled={renderProps.disabled}>
								<span className="icon-img">
									<img className="icon" src={Google} />
								</span>
								<span className="signin-text">Sign in with Google</span>
								</button>
							)}
							onSuccess={this.responseGoogle}
							onFailure={this.responseGoogle}
						/>
						<FacebookLogin
							appId={facebookAppId}
							render={renderProps => (
								<button className="btn-white btn-fb" onClick={renderProps.onClick} isdisabled={renderProps.disabled}>
								<span className="icon-img">
									<img className="icon" src={Facebook} />
								</span>
								<span className="signin-text">Sign in with Facebook</span>
								</button>
							)}
							autoLoad
							fields="name,email,picture"
							cssClass="btn-white"
							onClick={this.facebookOnClick.bind(this)}
							callback={this.responseFacebook}
						/>
					</div>
					<p className="divider">or</p>
					<WelcomeBackForm
						className="loginForm"
						handleUserData={this.handleUserLoginApi.bind(this)}
					/>
					<div className='forgotPassword' onClick={this.handleToggle}>
                    	<Forgotpassowrd onClick={this.handleToggle}/>
					</div>
					<p className="registerHere">
						<span>New to Godrej Interio? </span><RegisterModalData />
					</p>
				</Modal>
			</div>
		);
	}
}

export default WelcomeBack;
