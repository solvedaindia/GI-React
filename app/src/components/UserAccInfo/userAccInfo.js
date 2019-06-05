import React from 'react';
import { connect } from 'react-redux';
import { updateUserProfile } from '../../actions/app/actions';
import { Link } from 'react-router-dom';
import apiManager from '../../utils/apiManager';
import UserLogo from '../SVGs/user';
import WelcomeBack from '../WelcomeBack/index';
import ForgotPassword from '../ForgotPasswordComponent/forgotpassword';
import '../../../public/styles/userInfo/userInfo.scss';
import appCookie from '../../utils/cookie';
import { getCookie } from '../../utils/utilityManager';
import RegisterModalData from '../RegisterComponent/registerModalData';
import { userDetailAPI } from '../../../public/constants/constants';
import { logoutTheUser } from '../../utils/initialManager';

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
    userName: null,
    logonId: null,
  };

  resetLoginValues() {
    console.log('resetLoginValues');
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

  forgotPasswordCallback() {
    this.setState({
      showLoginRegisterMain: true,
      showForgotPassword: false,
    });
  }

  registerCallback() {
    this.setState({
      showLoginRegisterMain: true,
      showRegister: false,
    });
  }

  getUserDetails() {
    apiManager.get(userDetailAPI, {
      headers: { profile: 'summary' },
    })
      .then(response => {
        console.log('userDetail --- ', response.data.data.firstName);
        this.setState({
          userName: response.data.data.firstName,
          logonId: response.data.data.logonID
        })
        this.props.updateUserProfile(response.data.data.firstName)
        this.showLoginStatus();
      })
      .catch(error => {
        // return null;
      });


  }

  showLoginStatus() {
    const getLoginCookie = appCookie.get('isLoggedIn');
    console.log('my Name', this.state.userName);
    if (getCookie('isLoggedIn') === 'true') {
      (this.state.userType = (
        <>
          {/* <li className="listItem">
            <a className="dropDown">{this.state.userName}!</a>
          </li> */}

          <li className="listItem">
            <Link to={{ pathname: '/myAccount', state: { from: 'myprofile' } }}>
              <a onClick={this.onMyProfileClick} className="dropDown">My Profile</a>
            </Link>

          </li>
          <li className="listItem">
            <Link to={{
              pathname: '/myAccount', state: { from: 'myorder' }
            }}>
              <a className="dropDown">My Orders</a>
            </Link>

          </li>
          <li className="listItem">
            <Link to={{ pathname: '/myAccount', state: { from: 'address' } }}>
              <a className="dropDown">Manage Addresses</a>
            </Link>

          </li>
          {/* <li className="listItem">
            <a className="dropDown">Godrej Credit</a>
          </li>
          <li className="listItem">
            <a className="dropDown">Gift Credit</a>
          </li>
          <li className="listItem">
            <a className="dropDown">Notifications</a>
          </li> */}
        </>
      )),
        (this.state.loginStatus = (
          <a className="dropDown" onClick={this.onLogoutClick.bind(this)}>
            Sign Out
        </a>
        ));
    } else {
      (this.state.userType = (
        <li className="listItem">
          <a className="dropDown">Hello Guest!</a>
        </li>
      )),
        (this.state.loginStatus = (
          <a
            className="dropDown"
            onClick={this.onLoginRegisterClick.bind(this)}
          >
            {' '}
            Login/Register
        </a>
        ));
    }
  }

  onLogoutClick() {
    logoutTheUser();
  }

  componentDidMount() {
    console.log('Did Mount -- ', this.props.fromWishlistPro);
    this.fromWishlist(this.props.fromWishlistPro);
    if (getCookie('isLoggedIn') === 'true') {
      this.getUserDetails();
    }
    this.showLoginStatus();

  }

  componentWillReceiveProps(nextProps) {
    console.log('Recive Porps -- ', nextProps.fromWishlistPro);
    this.fromWishlist(nextProps.fromWishlistPro);
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
    console.log('back to login from forgot password', this.state);

    let userLogoItem = null;
    let dropdownItem = null;
    if (!this.state.isFromWishlist) {
      userLogoItem = <UserLogo />;
      dropdownItem = (
        <ul className="userList">
          {/* <li className="listItem"> */}
          {this.state.userName !== null && getCookie('isLoggedIn') === 'true' ? <li className="listItem">
            <a className="dropDown">{this.state.userName}!</a>
          </li> : null}
          {this.state.userType}
          {/* </li> */}
          <li className="listItem">{this.state.loginStatus}</li>
        </ul>
      );
    }
    return (
      <li className="user icons">
        {userLogoItem}
        <ul className="welcomeDropDown">
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

function mapStateToProps(state) {
	return {
		// default: state.default
	};
}

export default connect(
	mapStateToProps,
	{ updateUserProfile },
)(UserAccInfo);
// export default UserAccInfo;
