import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import WelcomeBackForm from '../WelcomeBackForm';
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

import '../../../public/styles/login/login.scss';

class WelcomeBack extends React.Component {
  constructor() {
    super();
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      show: false,
      message: null,
    };
  }

  handleClose() {
    this.setState({ show: false, message: null });
  }

  handleShow() {
    this.setState({ show: true, message: null });
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
        alert('Successfully Logged In');
        this.handleClose();
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
        <a variant="primary" onClick={this.handleShow}>
          Login/Register
        </a>
        <Modal
          className="welcomeBack"
          size="lg"
          animation={false}
          show={this.state.show}
          onHide={this.handleClose}
        >
          {message}
          <Modal.Header closeButton>
            <Modal.Title>Welcome Back</Modal.Title>
          </Modal.Header>
          <div className="socialLogin">
            <GoogleLogin
              className="btn-white appLogin"
              clientId={googleClientId}
              buttonText="Sign in with Google"
              cssClass="btn-white"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            />
            <FacebookLogin
              appId={facebookAppId}
              autoLoad
              fields="name,email,picture"
              cssClass="appLogin"
              buttonText="Sign in with Facebook"
              onClick={this.facebookOnClick}
              callback={this.responseFacebook}
            />
          </div>
          <p className="divider">or</p>
          <WelcomeBackForm
            className="loginForm"
            handleUserData={this.handleUserLoginApi.bind(this)}
          />
          <p className="registerHere">
            New to Interio? <span>Register</span>
          </p>
        </Modal>
      </div>
    );
  }
}

export default WelcomeBack;
