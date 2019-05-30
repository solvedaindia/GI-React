import React from 'react';
import { connect } from 'react-redux';
import { updateMyProfile } from '../../actions/app/actions';

import { Modal, Button } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import apiManager from '../../utils/apiManager';
import WhiteLogo from '../SVGs/whiteLogo';
import appCookie from '../../utils/cookie';

import WelcomeBackForm from '../WelcomeBackForm';
import {
  facebookAppId,
  googleClientId
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
		this.state = {
			show: true,
			message: null,
			firstName: null,
			lastName: null,
			authorizationProvider: null,
			userId: null,
			socialToken: null,
			emialId: null,
			loginStatus: 'Login/Register',
			userType: 'Hello Guest!',
			isFacebookClicked: false
		};
	}

	handleClose() {
		console.log('welocme Cloase');
		this.props.resetCallbackPro();
		this.setState({ show: false, message: null });
	}

	handleShow() {
		if (this.state.loginStatus == 'Login/Register') {
		this.setState({ show: true, message: null });
		} else {
		console.log('Remove the cookie');
		}
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
			window.location.reload();
			appCookie.set('isLoggedIn', true, 365 * 24 * 60 * 60 * 1000);
			document.cookie = `${accessTokenCookie}=${
			response.data.data.access_token
			};path=/;expires=''`;
			this.setState({
			loginStatus: 'Logout',
			userType: 'Hello User!',
			show: false,
			});
			// alert('Successfully Logged In');
		})
		.catch(error => {
			const errorData = error.response.data;
			const errorMessage = errorData.error.error_message;
			this.setState({
			message: `Error - ${errorMessage}`,
			});
		});
	}

	showLoginStatus() {
		const getLoginCookie = appCookie.get('isLoggedIn');
		if (getLoginCookie) {
		(this.state.userType = 'Hello User!'),
			(this.state.loginStatus = 'Logout');
		} else {
		(this.state.userType = 'Hello Gues!'),
			(this.state.loginStatus = 'Login/Register');
		}
	}

  /* Handle User Login API */
  handleUserLoginApi(data) {
    this.setState({ message: null });
    apiManager
      .post(userLoginAPI, data)
      .then(response => {
				this.props.updateMyProfile('Deepak');
        window.location.reload();
        appCookie.set('isLoggedIn', true, 365 * 24 * 60 * 60 * 1000);
        appCookie.set(`${accessTokenCookie}=${response.data.data.access_token};path=/;expires=''`);
        this.setState({
          loginStatus: 'Logout',
          userType: 'Hello User!',
          show: false,
        });
        // alert('Successfully Logged In');
      })
      .catch(error => {
        const errorData = error.response.data;
        const errorMessage = errorData.error.error_message;
        this.setState({
          message: `Error - ${errorMessage}`,
        });
      });
  }

	clickedOnForgotPassword() {
		this.props.callbackPro(true);
		this.setState({ show: false, message: null });
		//this.handleClose();
	}

	clickedOnRegister() {
		this.props.callbackPro(false);
		this.setState({ show: false, message: null });
		//this.handleClose();
	}

	render() {
		let message = null;
		if (this.state.message) {
		message = <p>{this.state.message}</p>;
		}
		return (
		<div>
			{/* <ul className="userList">
			<li className="listItem">
				<a href="" className="dropDown">
				{this.state.userType}
				</a>
			</li>
			<li className="listItem">
				<a className="dropDown" onClick={this.handleShow}>
				{this.state.loginStatus}
				</a>
			</li>
			</ul> */}
			<Modal
			className="welcomeBack"
			size="lg"
			animation={false}
			show={this.state.show}
			onHide={this.handleClose}
			>
			{message}
			<Modal.Header closeButton>
				<div className="smallLogo">
					<WhiteLogo />
				</div>
				<Modal.Title>Welcome Back</Modal.Title>
			</Modal.Header>
			<div className="socialLogin">
				<GoogleLogin
				clientId={googleClientId}
				render={renderProps => (
					<button
					className="btn-white"
					onClick={renderProps.onClick}
					disabled={renderProps.disabled}
					>
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
					<button
						className="btn-white btn-fb"
						onClick={renderProps.onClick}
						isdisabled={renderProps.disabled}
					>
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
			<div className="forgotPassword">
				<p onClick={this.clickedOnForgotPassword.bind(this)}>Forgot Password?</p>
			</div>
			<p className="registerHere">
				<span>New to Godrej Interio? </span>
				<Button className="registerNow" onClick={this.clickedOnRegister.bind(this)}>
				Register
				</Button>
				{/* <RegisterModalData /> */}
			</p>
			</Modal>
		</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    // default: state.default
  };
}


//export default WelcomeBack;
export default connect(
  mapStateToProps,
  { updateMyProfile },
)(WelcomeBack);
