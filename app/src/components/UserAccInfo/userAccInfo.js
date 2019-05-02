import React from 'react';
import axios from 'axios';
import UserLogo from '../SVGs/user';
import WelcomeBack from '../WelcomeBack/index';
import ForgotPassword from '../ForgotPasswordComponent/forgotpassword';
import '../../../public/styles/userInfo/userInfo.scss';
import appCookie from '../../utils/cookie';
import { getCookie } from '../../utils/utilityManager';
import RegisterModalData from '../RegisterComponent/registerModalData';
import { storeId, accessToken, logoutAPI, accessTokenCookie, wishlistDataCookie, wishlistIdCookie } from '../../../public/constants/constants';

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
    loginLogoutBtnItem: null,
    isFromWishlist: false,
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
      this.setState({
        showForgotPassword: true,
        showLoginRegisterMain: false
      })
    }
    else {
      this.setState({
        showRegister: true,
        showLoginRegisterMain: false
      })
    }

  }

  forgotPasswordCallback() {

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
    console.log('dkddd', getLoginCookie);
    if (getCookie('isLoggedIn') === 'true') {
      (this.state.userType = <a className="dropDown">Hello User!</a>),
        (this.state.loginStatus = <a className="dropDown" onClick={this.onLogoutClick.bind(this)}>Logout</a>);
    } else {
      (this.state.userType = <a className="dropDown">Hello Guest!</a>),
        (this.state.loginStatus = <a className="dropDown" onClick={this.onLoginRegisterClick.bind(this)}> Login/Register</a>);
    }
  }

  onLogoutClick() {
    let data = {
      'email_id': this.state.inputText,
    }
    axios.post(logoutAPI, data, { 'headers': { 'store_id': storeId, 'access_token': accessToken } }).then(response => {
      if (response.data.status === 'success') {
        //Reset all the user Cookies
        document.cookie = `${accessTokenCookie}=;path=/;expires=''`; /* accessTokenCookie + '=' + guestToken + ',' + ';path=/home'; */
        const json_str = JSON.stringify([]);
        document.cookie = `${wishlistDataCookie}=${json_str};path=/;expires=''`;
        document.cookie = `${wishlistIdCookie}=;path=/;expires=''`;
        appCookie.set('isLoggedIn', false, 365 * 24 * 60 * 60 * 1000);
        window.location.reload();
      }
      // alert('Newsletter Subscription - ' + data.status);
    }).catch(error => {
      console.log('newsError---', error);
    });
  }

  componentDidMount() {
    console.log('Did Mount -- ',this.props.fromWishlistPro);
    this.fromWishlist(this.props.fromWishlistPro);
    this.showLoginStatus();
  }

  componentWillReceiveProps(nextProps) {
    console.log( 'Recive Porps -- ',nextProps.fromWishlistPro);
    this.fromWishlist(nextProps.fromWishlistPro);
  }

  fromWishlist(data) {
    if (data) {
      this.setState({
        showLoginRegisterMain: true,
        isFromWishlist: true,
      })
    }
  }

  render() {
    console.log('back to login from forgot password', this.state);

    var userLogoItem = null;
    var dropdownItem = null;
    if (!this.state.isFromWishlist) {
      userLogoItem = <UserLogo />
      dropdownItem = <ul className="userList">
        <li className="listItem">
          {this.state.userType}
        </li>
        <li className="listItem">
          {this.state.loginStatus}
        </li>
      </ul>
    }




    return (
      <li className="user icons">
        {userLogoItem}
        <ul className="welcomeDropDown">
          {dropdownItem}
          {this.state.showLoginRegisterMain ? <WelcomeBack callbackPro={this.welcomeBackCallback.bind(this)} resetCallbackPro={this.resetLoginValues.bind(this)} /> : null}
          {this.state.showForgotPassword ? <ForgotPassword callbackForgotPro={this.forgotPasswordCallback.bind(this)} resetCallbackPro={this.resetLoginValues.bind(this)} /> : null}
          {this.state.showRegister ? <RegisterModalData callbackRegisterPro={this.registerCallback.bind(this)} resetCallbackPro={this.resetLoginValues.bind(this)} /> : null}
        </ul>
      </li>
    );
  }
}




export default UserAccInfo;
