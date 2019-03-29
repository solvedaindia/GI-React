import React from 'react';
import { Button, Row, Col,FormGroup } from 'react-bootstrap';
import '../../../public/styles/registerComponent/registerComponent.scss';
import { facebookAppId, googleClientId } from '../../../public/constants/constants';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { registerWithEmail, registerWithMobileNum } from './constants';
import {LogoUrl} from './constants';
import { onFacebookResponse, onGoogleResponse } from '../../utils/socialLoginHandler';


class Register extends React.Component {
	constructor(props) {		
		super(props);
		this.state = {
			firstName: null,
			lastName: null,
			authorizationProvider: null,
			userId: null,
			socialToken: null,
			emialId: null,
			isFacebookClicked: false,
		}
	}

	handleRegisterWithEmail() {
		this.props.componentData(registerWithEmail);
	}

	handleRegisterWithMobile() {
		this.props.componentData(registerWithMobileNum);
	}

	//Social Login Handlers
	responseGoogle = (response) => {
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
			emialId: profileData.email
		})

		onGoogleResponse(this.state, (itemData) => {
			console.log('GoogleCallback', itemData)
		})
	}

	responseFacebook = (response) => {

		if (!response.email) {
			alert('SocialLogin - Email Id missing');
			return;
		}

		// Remove below condition to get auto Facebook login.
		if (this.state.isFacebookClicked) {
			const firstName = response.name.substr(0, response.name.indexOf(' '));
			const lastName = response.name.substr(response.name.indexOf(' ') + 1)
			this.setState({
				firstName: firstName,
				lastName: lastName,
				authorizationProvider: 'facebook',
				userId: response.userID,
				socialToken: response.accessToken,
				emialId: response.email
			})

			onFacebookResponse(this.state, (itemData) => {
				console.log('FacebookCallback', itemData)
			})
		}
	}

	facebookOnClick() {
		this.setState({ isFacebookClicked: true });
	}

	render() {
		return (
			<Row>
				<Col xs={12} md={12}>
					<div className='form_register'>
					   <div className='joinUs'>
					     <img className='logo_width' src={LogoUrl} alt='logo'/>
					     <h3 className='joinus-heading'>Join us Now</h3>
					   </div>
						
						<div className='inner-joinusform'>
							<div className='btn-wrapper'>
								<GoogleLogin className='btn-white'
									clientId={googleClientId}
									buttonText='Sign in with Google'
									cssClass="btn-white"
									onSuccess={this.responseGoogle}
									onFailure={this.responseGoogle}
								/>
								<FacebookLogin
									appId={facebookAppId}
									autoLoad={true}
									fields="name,email,picture"
									cssClass="btn-white btn-fb"
									buttonText='Sign in with Facebook'
									onClick={this.facebookOnClick.bind(this)}
									callback={this.responseFacebook}
								/>
							</div>
							<p className='text_or'>- or -</p>
							<FormGroup>
							<Button className='btn-bg btn-block' ref='email' onClick={this.handleRegisterWithEmail.bind(this)}>Email</Button>
							</FormGroup>
							<p className='text_or'>- or -</p>
							<FormGroup>
							<Button className='btn-bg btn-block' ref='mobile' onClick={this.handleRegisterWithMobile.bind(this)}>Mobile</Button>
							</FormGroup>
						</div>
					</div>
				</Col>
				{/* <Col xs={12} md={4} className='no-padding'>
					<div className='imagebox'></div>
				</Col> */}
			</Row>
		);
	}
}

export default Register;