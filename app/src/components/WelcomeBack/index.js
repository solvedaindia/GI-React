import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import apiManager from '../../utils/apiManager';
import WhiteLogo from '../SVGs/whiteLogo';
import appCookie from '../../utils/cookie';
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
      isFacebookClicked: false,
    };
  }

  handleClose() {
    this.props.resetCallbackPro();
    this.setState({ show: false, message: null });
  }

  handleShow() {
    if (this.state.loginStatus == 'Login/Register') {
      this.setState({ show: true, message: null });
    } else {
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
        userId: response.email,
        socialToken: response.accessToken,
        emialId: response.email,
      });

      onFacebookResponse(this.state, itemData => {
      });
    }
  };

  facebookOnClick() {
    this.setState({ isFacebookClicked: true });
  }

  showLoginStatus() {
    const getLoginCookie = appCookie.get('isLoggedIn');
    if (getLoginCookie) {
      (this.state.userType = 'Hello User!'),
        (this.state.loginStatus = 'Logout');
    } else {
      (this.state.userType = 'Hello Guest!'),
        (this.state.loginStatus = 'Login/Register');
    }
  }

  /* Handle User Login API */
  handleUserLoginApi(data, callbackFunc) {
    this.setState({ message: null });
    apiManager
      .post(userLoginAPI, data)
      .then(response => {
        if (window.location.pathname.includes('myAccount')) {
          window.location.assign('/')
        }
        else {
          window.location.reload();
        }
        appCookie.set(
          `${accessTokenCookie}=${
          response.data.data.access_token
          };path=/;expires=''`,
        );
        this.setState({
          loginStatus: 'Logout',
          userType: 'Hello User!',
          show: false,
        });
      })
      .catch(error => {
        const errorData = error.response.data;
        const errorMessage = errorData.error.error_message;

        callbackFunc(errorMessage);
      });
  }

  clickedOnForgotPassword() {
    this.props.callbackPro(true);
    this.setState({ show: false, message: null });
  }

  clickedOnRegister() {
    this.props.callbackPro(false);
    this.setState({ show: false, message: null });
  }

  render() {
    let message = null;
    if (this.state.message) {
      message = <p>{this.state.message}</p>;
    }
    return (
      <div>

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
              <WhiteLogo width="171" height="33" />
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
                    <img className="icon" src={Google} alt="Google"/>
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
                    <img className="icon" src={Facebook} alt="Facebook"/>
                  </span>
                  <span className="signin-text">Sign in with Facebook</span>
                </button>
              )}
              // autoLoad
              fields="name,email,picture"
              cssClass="btn-white"
              onClick={this.facebookOnClick.bind(this)}
              callback={this.responseFacebook}
              disableMobileRedirect={true}
            />
          </div>
          <p className="divider">or</p>
          <WelcomeBackForm
            className="loginForm"
            handleUserData={this.handleUserLoginApi.bind(this)}
          />
          <div className="forgotPassword">
            <p onClick={this.clickedOnForgotPassword.bind(this)}>
              Forgot Password?
            </p>
          </div>
          <p className="registerHere">
            <span className='labelText'>New to Godrej Interio? </span>
            <Button
              className="registerNow"
              onClick={this.clickedOnRegister.bind(this)}
            >
              Register
            </Button>
          </p>
        </Modal>
      </div>
    );
  }
}

export default WelcomeBack;
