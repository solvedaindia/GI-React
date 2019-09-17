import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUserProfile } from '../../actions/app/actions';
import apiManager from '../../utils/apiManager';
import UserLogo from '../SVGs/user';
import WelcomeBack from '../WelcomeBack/index';
import ForgotPassword from '../ForgotPasswordComponent/forgotpassword';
import '../../../public/styles/userInfo/userInfo.scss';
import appCookie from '../../utils/cookie';
import { getCookie, getReleventReduxState, isMobile } from '../../utils/utilityManager';
import RegisterModalData from '../RegisterComponent/registerModalData';
import { userDetailAPI } from '../../../public/constants/constants';
import { logoutTheUser } from '../../utils/initialManager';
import {MY_ORDER,MANAGE_ADDRESSES, WELCOME_INTERIO,LOGIN_REGISTER } from '../../constants/app/primitivesConstants';

class UserAccInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      userName: null,
      logonId: null,
    };
  }

  resetLoginValues() {
    if (this.props.resetCallbackPro) {
      this.props.resetCallbackPro();
    }
    this.setState({
      showLoginRegisterMain: false,
      showForgotPassword: false,
      showRegister: false,
    });
  }

  onLoginRegisterClick() {
    this.setState({ showLoginRegisterMain: true });
  }

  welcomeBackCallback(fromForgot) {
    // Only to manage show and hide state
    if (fromForgot) {
      this.setState({
        showForgotPassword: true,
        showLoginRegisterMain: false,
      });
    } else {
      this.setState({
        showRegister: true,
        showLoginRegisterMain: false,
      });
    }
  }

  forgotPasswordCallback(isShowRegister) { //isShowRegister active for JIRA-902
    this.setState({
      showLoginRegisterMain: true,
      showForgotPassword: false,
    });
    if (isShowRegister) {
      this.welcomeBackCallback(false);
    }

  }

  registerCallback() {
    this.setState({
      showLoginRegisterMain: true,
      showRegister: false,
    });
  }

  getUserDetails() { alert('USER')
    apiManager
      .get(userDetailAPI, {
        headers: { profile: 'summary' },
      })
      .then(response => {
        if (response.data.data.pincode && response.data.data.pincode !== '') {
          appCookie.set('pincode', response.data.data.pincode, 365 * 24 * 60 * 60 * 1000);
          window.location.reload();
        }
        var username = String(response.data.data.name);
        this.setState({
          userName: `Welcome ${username.split(' ')[0]}`,
          logonId: response.data.data.logonID,
        });


        document.cookie = `name=${response.data.data.name};path=/;expires=''`;
        this.showLoginStatus();
        this.props.updateUserProfile(response.data.data.name);
        
      })
      .catch(error => {
        // return null;
      });
  }

  showLoginStatus() {
    const getLoginCookie = appCookie.get('isLoggedIn');
    if (getCookie('isLoggedIn') === 'true') {
      (this.state.userType = (
        <>
          <li className="listItem">
            <Link to={{ pathname: '/myAccount', state: { from: 'myprofile' } }}>
              <a onClick={this.onMyProfileClick} className="dropDown">
                My Profile
              </a>
            </Link>
          </li>
          <li className="listItem">
            <Link to={{ pathname: '/myAccount', state: { from: 'myorder' } }}>
              <a className="dropDown">{MY_ORDER}</a>
            </Link>
          </li>
          <li className="listItem">
            <Link to={{ pathname: '/myAccount', state: { from: 'address' } }}>
              <a className="dropDown">{MANAGE_ADDRESSES}</a>
            </Link>
          </li>
        
        </>
      )),
        (this.state.loginStatus = (
          <a className="dropDown" onClick={this.onLogoutClick.bind(this)}>
            Sign Out
          </a>
        ));
    } else {
      this.setState({
        userType:
          <li className="listItemUnSelected">
            <a className="dropDown">{WELCOME_INTERIO}</a>
          </li>
        ,
        loginStatus:
          <a
            className="dropDown"
            onClick={this.onLoginRegisterClick.bind(this)}
          >
            {' '}
            {LOGIN_REGISTER}
          </a>

      });

    }
  }

  onLogoutClick() {
    logoutTheUser();
  }

  componentDidMount() {
    this.fromWishlist(this.props.fromWishlistPro);
    if (getCookie('isLoggedIn') === 'true') {
      this.getUserDetails();
    }
    this.showLoginStatus();
  }

  componentWillReceiveProps(nextProps) {
    this.fromWishlist(nextProps.fromWishlistPro);
    if (getCookie('isLoggedIn') === 'true') {
      this.getUserDetails();
    }
  }

  fromWishlist(data) {
    if (data) {
      this.setState({
        showLoginRegisterMain: true,
        isFromWishlist: true,
      });
    }
  }

  render() {
     let userLogoItem = null;
    let dropdownItem = null;
    if (this.props.showUserInfo) {
      userLogoItem = <UserLogo />;
      dropdownItem = (
        <ul className="userList">
          {this.state.userName !== null &&
            getCookie('isLoggedIn') === 'true' ? (
              <li className="listItem listItemUnSelected">
                <a className="dropDown">{this.state.userName}</a>
              </li>
            ) : null}
          {this.state.userType}
          <li className="listItem">{this.state.loginStatus}</li>
        </ul>
      );
    }
    return (
      <li className="user icons">
        {userLogoItem}
        <ul className={`welcomeDropDown ${getCookie('isLoggedIn') === 'true' ? 'userLogin' : null}`}>
          {dropdownItem}
          {this.state.showLoginRegisterMain ? (
            <WelcomeBack
              callbackPro={this.welcomeBackCallback.bind(this)}
              resetCallbackPro={this.resetLoginValues.bind(this)}
            />
          ) : null}
          {this.state.showForgotPassword ? (
            <ForgotPassword
              callbackForgotPro={this.forgotPasswordCallback.bind(this)}
              resetCallbackPro={this.resetLoginValues.bind(this)}
            />
          ) : null}
          {this.state.showRegister ? (
            <RegisterModalData
              callbackRegisterPro={this.registerCallback.bind(this)}
              resetCallbackPro={this.resetLoginValues.bind(this)}
            />
          ) : null}
        </ul>
      </li>
    );
  }
}


export default UserAccInfo;
