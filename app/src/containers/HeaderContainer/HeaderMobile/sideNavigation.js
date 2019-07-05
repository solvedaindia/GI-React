import React from 'react';
import apiManager from '../../../utils/apiManager';
import { getCookie } from '../../../utils/utilityManager';
import { navigationApi, userDetailAPI } from '../../../../public/constants/constants';
import { logoutTheUser } from '../../../utils/initialManager';
import UserAccInfo from '../../../components/UserAccInfo/userAccInfo';
import { Link } from 'react-router-dom';
import '../../../../public/styles/RWDStyle/sideNavigation.scss';

export class HeaderMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      isLoading: true,
      showNav: false,
      navigationItem: null,
      userName: 'Hello',
      logonId: null,
      showLoginPopUp: false,
    };
  }

  componentDidMount() {
    this.getCategoryData();
    if (getCookie('isLoggedIn') === 'true') {
      this.getUserDetails();
    }
  }

  getUserDetails() {
    apiManager.get(userDetailAPI, {
      headers: { profile: 'summary' },
    })
      .then(response => {
        console.log('userDetail --- ', response.data.data.name);
        this.setState({
          userName: response.data.data.name,
          logonId: response.data.data.logonID
        })
        this.showLoginStatus();
        this.props.updateUserProfile(response.data.data.name)

      })
      .catch(error => {
        // return null;
      });
  }

  getCategoryData() {
    apiManager.get(navigationApi)
      .then(response => {
        const { data } = response || {};
        this.setState({
          category: data && data.data.categoryArray,
          isLoading: false,
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  onMenuClick() {
    console.log('On menuclick --- ', this.state.showNav);
    this.setState({
      showNav: true,
    })
  }

  onCategoryClick(subCat, catName) {
    if (subCat.length !== 0) {

      this.setState({
        navigationItem: (
          <div className='searchBackBtn'>
            <div className='topMenu'>
              <label onClick={this.onNavigationBackCick.bind(this)} className='usernameTxt catNavHeader'><img className='back-nav' src={require('../../../../public/images/nav_back.svg')} />{` ${catName}`}</label>
            </div>
            <ul>
              {!!subCat && subCat.map((subCatData, index) => {
                var routePath;
                var subcatName = String(subCatData.categoryName).toLowerCase()
                if (catName === 'Rooms') {
                  routePath = `/rooms-${subcatName.split(' ').join('-')}/${subCatData.uniqueID}`;
                }
                else {
                  routePath = `/furniture-${subcatName.split(' ').join('-')}/${subCatData.uniqueID}`;
                }

                return (
                  <Link to={{ pathname: routePath, state: { categoryId: subCatData.uniqueID }, }} className="links" onClick={this.onOverlayClick.bind(this)} >
                    <li onClick={() => this.onSubcategoryClick()} className='navTxt'>{subCatData.categoryName}</li>
                  </Link>

                )
              })}
            </ul>
          </div>
        )
      })
    }
  }

  onNavigationBackCick() {
    this.setState({
      navigationItem: null,
    })
  }

  onLinkNavigation(pageText) {
    this.props.pageNavigationRenderPro(pageText);
    this.setState({
      ishowNav: false,
    });
  }

  onOverlayClick() {
    console.log('On Overlay --- ', this.state.showNav);
    this.setState({
      showNav: false,
    })
    // this.props.pageNavigationRenderPro('My Profile');
  }

  onSubcategoryClick() {

  }

  onSignOutClick() {
    logoutTheUser();
  }

  onSignInClick() {
    this.setState({
      showNav: false,
      showLoginPopUp: true,
    })
  }

  onMyAccountClick() {
    this.setState({
      navigationItem: (
        <div className='searchBackBtn'>
          <div className='topMenu'>
            <label onClick={this.onNavigationBackCick.bind(this)} className='usernameTxt catNavHeader'><img className='back-nav' src={require('../../../../public/images/nav_back.svg')} />{` My Account`}</label>
          </div>
          {/* onClick={this.updatePincode.bind(this, this.props)} */}
          <ul>
            <Link to={{ pathname: '/myAccount', state: { from: 'myprofile' } }} onClick={() => this.onLinkNavigation('My Profile')}>
              <li className='navTxt'>My Profile</li>
            </Link>
            <Link to={{ pathname: '/myAccount', state: { from: 'password' } }} onClick={() => this.onLinkNavigation('Change Password')}>
              <li onClick={this.onOverlayClick.bind(this)} className='navTxt'>Change Password</li>
            </Link>
            <Link to={{ pathname: '/myAccount', state: { from: 'myorder' } }} onClick={() => this.onLinkNavigation('My Orders')}>
              <li className='navTxt'>My Orders</li>
            </Link>
            <Link to={{ pathname: '/myAccount', state: { from: 'address' } }} onClick={() => this.onLinkNavigation('Manage Address')}>
              <li className='navTxt'>Manage Address</li>
            </Link>
          </ul>
        </div>
      )
    })
  }

  render() {
    const { category = [], showNav } = this.state;

    var loginLogoutItem;
    var myAccountItem = null;
    if (getCookie('isLoggedIn') === 'true') {
      loginLogoutItem = <button onClick={this.onSignOutClick} className='signoutBtn'>Sign Out</button>
      myAccountItem = <li onClick={this.onMyAccountClick.bind(this)} className='navTxt'>My Account<span className='arrow'><img src={require('../../../../public/images/nav_next.svg')} /></span></li>
    }
    else {
      loginLogoutItem = <button onClick={this.onSignInClick.bind(this)} className='loginBtn'>Log In/ Register</button>
    }

    var navItem;
    if (this.state.navigationItem === null) {
      navItem = (
        <div className='leftAnim'>
          <div className='topMenu'>
            <label className='usernameTxt'>{this.state.userName}!</label>
            {loginLogoutItem}
          </div>
          <ul>
            {!!category && category.map((categoryData, index) => (
              <li onClick={() => this.onCategoryClick(categoryData.subCategoryArray, categoryData.categoryName)} className='navTxt'>{categoryData.categoryName}{categoryData.subCategoryArray.length > 1 ? <span className='arrow'><img src={require('../../../../public/images/nav_next.svg')} /></span> : null}</li>
            ))}
            {myAccountItem}
            <li className='navTxt'>For Businesses</li>
            <li className='navTxt'>Locate Store</li>
            <Link onClick={this.onOverlayClick.bind(this)} to="/guestTrackOrder">
              <li className='navTxt'>Track Order</li>
            </Link>

            <li className='navTxt'>Support</li>
          </ul>
        </div>
      );
    }
    else {
      navItem = this.state.navigationItem;
    }



    return (
      <>
        {this.state.showLoginPopUp ? <UserAccInfo fromWishlistPro /> : null}
        <div className='sideNavigation'>
          <label>
            <input type="checkbox" checked={showNav ? "checked" : ''} />
            <div onClick={this.onMenuClick.bind(this)} className="handler"><img className='nav-bar-img' src={require('../../../../public/images/RWD Assets/menu.svg')} alt="my image" /></div>
            <div onClick={this.onOverlayClick.bind(this)} className="overlay"></div>
            <nav>
              <div className='topMenuOverlap' />
              {navItem}
            </nav>

          </label>
        </div>
      </>
    );
  }
}

export default HeaderMobile;