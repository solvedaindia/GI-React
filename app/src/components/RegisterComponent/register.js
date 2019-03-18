import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import '../../../public/styles/registerComponent/registerComponent.scss';
import {facebookAppId, googleClientId } from '../../../public/constants/constants';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { registerWithEmail, registerWithMobileNum } from './constants';

class Register extends React.Component {

	handleRegisterWithEmail() {
    	this.props.componentData(registerWithEmail);
  	}

	handleRegisterWithMobile() {
		this.props.componentData(registerWithMobileNum);
	}

	//Social Login Handlers
	responseFacebook = (response) => {
		console.log(response);
		this.setState({ fbData: response })
	}

	facebookOnClick() {
		console.log('Facebook Click');
	}

	responseGoogle = (response) => {
		console.log(response);
	}
  
	render() {
		return (
			<Row>
				<Col xs={12} md={8}>
					<div className='form_register'>            
						<h3 className='heading'>Join us Now</h3>
						<div>
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
								onClick={this.facebookOnClick}
								callback={this.responseFacebook}
								/>
							</div>
							<p className='text_or'>- or -</p>
							<Button className='btn-white btn-block' ref='email' onClick={this.handleRegisterWithEmail.bind(this)}>Email</Button>
							<p className='text_or'>- or -</p>
							<Button className='btn-white btn-block' ref='mobile' onClick={this.handleRegisterWithMobile.bind(this)}>Mobile</Button>
						</div>
					</div>
				</Col>
				<Col xs={12} md={4} className='no-padding'>
					<div className='imagebox'></div>
				</Col>
			</Row>
		);
	}
}

export default Register;