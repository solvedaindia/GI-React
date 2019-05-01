import React from 'react';
import UserLogo from '../SVGs/user';
import WelcomeBack from '../WelcomeBack/index';
import ForgotPassword from '../ForgotPasswordComponent/forgotpassword';
import '../../../public/styles/userInfo/userInfo.scss';
import appCookie from '../../utils/cookie';
import RegisterModalData from '../RegisterComponent/registerModalData';

class UserAccInfo extends React.Component {
  state = {
    isLoggedIn: '',
    isLoading: true,
    errors: null,
    loginStatus: 'Login/Register',
    userType: 'Hello Guest!',
    showLoginRegisterMain: false,
    showForgotPassword: false,
    showRegister: false,
  };



  resetLoginValues() {
    console.log('resetLoginValues')
    this.setState({ 
      showLoginRegisterMain: false,
      showForgotPassword: false,
      showRegister: false
    })
  }

  onLoginRegisterClick() {
    this.setState({ showLoginRegisterMain: true })
  }

  welcomeBackCallback(fromForgot) { //Only to manage show and hide state
    if (fromForgot) {
      console.log('From Forgot');
      this.setState({
        showForgotPassword: true,
        showLoginRegisterMain: false
      })
    }
    else {
      console.log('From Register');
      this.setState({
        showRegister: true,
        showLoginRegisterMain: false
      })
    }
    
  }

  forgotPasswordCallback() {
    console.log('forgott --', this.state);
    this.setState({
      showLoginRegisterMain: true,
      showForgotPassword: false
    })
  }

  registerCallback() {
    this.setState({
      showLoginRegisterMain: true,
      showRegister: false
    })
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

  componentDidMount() {
    this.showLoginStatus();
  }

  render() {
    return (
      <li className="user icons">
        <UserLogo />
        <ul className="welcomeDropDown">
          <ul className="userList">
            <li className="listItem">
              <a href="" className="dropDown">
              {this.state.userType}
            </a>
            </li>
            <li className="listItem">
              <a className="dropDown" onClick={this.onLoginRegisterClick.bind(this)}>
                {this.state.loginStatus}
            </a>
            </li>
          </ul>
          {this.state.showLoginRegisterMain ? <WelcomeBack callbackPro={this.welcomeBackCallback.bind(this)} resetCallbackPro={this.resetLoginValues.bind(this)} /> : null}
          {this.state.showForgotPassword ? <ForgotPassword callbackForgotPro={this.forgotPasswordCallback.bind(this)} resetCallbackPro={this.resetLoginValues.bind(this)} /> : null}
          {this.state.showRegister ? <RegisterModalData callbackRegisterPro={this.registerCallback.bind(this)} resetCallbackPro={this.resetLoginValues.bind(this)} /> : null}
        </ul>
      </li>
    );
  }
}

export default UserAccInfo;
