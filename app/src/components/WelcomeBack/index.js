import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import apiManager from '../../utils/apiManager';
import WhiteLogo from '../SVGs/whiteLogo';
import appCookie from '../../utils/cookie';
import WelcomeBackForm from '../WelcomeBackForm';
import { isMobile } from '../../utils/utilityManager';
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
    this.windowModelRef=React.createRef();
    this.modalRef=React.createRef();
    this.isOutSide=false;
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
        appCookie.set('isLoggedIn', true, 365 * 24 * 60 * 60 * 1000);
        if (response.data.data.userDetails.pincode && response.data.data.userDetails.pincode !== '') {
          appCookie.set('pincode', response.data.data.userDetails.pincode, 365 * 24 * 60 * 60 * 1000);
          appCookie.set('pincodeUpdated', true, 365 * 24 * 60 * 60 * 1000);
        }
        appCookie.set(
          `${accessTokenCookie}=${
          response.data.data.access_token
          };path=/;expires=''`,
        );
		 appCookie.set(
          `userID=${
          response.data.data.userID
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
  
  trackMouseMovement=(event)=>{
    console.log(event);
  }

  trackMouseUp=(event)=>{
  
    let winWidth=window.innerWidth/2;
    let comWidth=this.modalRef.current.offsetWidth/2;

    let winHieght=window.innerHeight/2;
    let comHeight=this.modalRef.current.offsetHeight/2;

    if( (event.clientX<winWidth-comWidth && this.isOutSide) ||
          (event.clientX>winWidth+comWidth && this.isOutSide) ||
          (event.clientY<winHieght-comHeight && this.isOutSide) ||
          (event.clientY>winHieght+comHeight && this.isOutSide) )
    {
       this.props.resetCallbackPro();
       this.setState({ show: false});
    }
    // if(event.clientX>winWidth+comWidth && this.isOutSide)
    // {
    //   this.props.resetCallbackPro();
    //   this.setState({ show: false });
    // }

    // if(event.clientY<winHieght-comHeight && this.isOutSide)
    // {
    //    this.props.resetCallbackPro();
    //    this.setState({ show: false});
    // }
    // if(event.clientY>winHieght+comHeight && this.isOutSide)
    // {
    //   this.props.resetCallbackPro();
    //   this.setState({ show: false });
    // }


  }

  trackMouseDown=(event)=>{
    console.log("down ",event.clientX +" "+event.clientY );
    this.isOutSide=false;
    let winWidth=window.innerWidth/2;
    let comWidth=this.modalRef.current.offsetWidth/2;

    let winHieght=window.innerHeight/2;
    let comHeight=this.modalRef.current.offsetHeight/2;

    console.log("clickeArea p1",window.innerHeight/2);
    console.log("clickeArea p2",this.modalRef.current.offsetHeight/2);
    console.log("clickeArea p3",event.clientY );
    
    if((event.clientX<winWidth-comWidth) ||
        (event.clientX>winWidth+comWidth) ||
        (event.clientY<winHieght-comHeight) ||
        (event.clientY>winHieght+comHeight) )
    {
      this.isOutSide=true;
    }
    // if(event.clientX>winWidth+comWidth)
    // {
    //   this.isOutSide=true;
    // }


    // if(event.clientY<winHieght-comHeight)
    // {
    //   this.isOutSide=true;
    // }
    // if(event.clientY>winHieght+comHeight)
    // {
    //   this.isOutSide=true;
    // }
    if(isMobile())
    {
      this.isOutSide=false;
    }

    console.log("clickeArea",this.isOutSide);

  }


  render() {
    let message = null;
    if (this.state.message) {
      message = <p>{this.state.message}</p>;
    }
    //onMouseMove={this.trackMouseMovement}
    return (
      <div  id ='abc'  onMouseUp={this.trackMouseUp} onMouseDown={this.trackMouseDown} >

        <Modal style={{background:'rgba(0, 0, 0, 0.5)', zIndex:'2147483648'}}
          ref={this.windowModelRef}
          className="welcomeBack"
          size="lg"
          animation={false}
          show={this.state.show}
          onHide={this.handleClose}
          backdrop = {false}
          
          >
          <div ref= {this.modalRef}>
          {message}
          <Modal.Header closeButton>
            <div className="smallLogo">
              <WhiteLogo width="171" height="33" />
            </div>
            <Modal.Title>Welcome Back</Modal.Title>
          </Modal.Header>
          <div className="socialLogin"  >
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
          </div>
        </Modal>
      </div>
    );
  }
}

export default WelcomeBack;
