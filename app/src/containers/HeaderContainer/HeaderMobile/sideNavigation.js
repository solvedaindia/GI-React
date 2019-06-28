import React from 'react';
import apiManager from '../../../utils/apiManager';
import { getCookie } from '../../../utils/utilityManager';
import { navigationApi, userDetailAPI } from '../../../../public/constants/constants';
import { logoutTheUser } from '../../../utils/initialManager';
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

  onOverlayClick() {
    console.log('On Overlay --- ', this.state.showNav);
    this.setState({
      showNav: false,
    })
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
          <div className='rightAnim'>
            <div className='topMenu'>
              <label onClick={this.onNavigationBackCick.bind(this)} className='usernameTxt'>{`< ${catName}`}</label>
            </div>

            <ul>
              {!!subCat && subCat.map((subCatData, index) => (
                <li onClick={() => this.onSubcategoryClick()} className='navTxt'>{subCatData.categoryName}</li>
              ))}
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

  onSubcategoryClick() {

  }

  onSignOutClick() {
    logoutTheUser();
  }

  onSignInClick() {

  }

  render() {
    const { category = [], showNav } = this.state;

    var loginLogoutItem;
    if (getCookie('isLoggedIn') === 'true') {
      loginLogoutItem = <button onClick={this.onSignOutClick} className='signoutBtn'>Sign Out</button>
    }
    else {
      loginLogoutItem = <button onClick={this.onSignInClick} className='loginBtn'>Log In/ Register</button>
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
              <li onClick={() => this.onCategoryClick(categoryData.subCategoryArray, categoryData.categoryName)} className='navTxt'>{categoryData.categoryName}{categoryData.subCategoryArray.length > 1 ? <span className='arrow'>></span> : null}</li>
            ))}
            <li className='navTxt'>For Businesses</li>
            <li className='navTxt'>Locate Store</li>
            <li className='navTxt'>Track Order</li>
            <li className='navTxt'>Support</li>
          </ul>
        </div>
      );
    }
    else {
      navItem = this.state.navigationItem;
    }



    return (
      <div className='sideNavigation'>
        <label>
          <input type="checkbox" checked={showNav ? "checked" : ''} />
          <div onClick={this.onMenuClick.bind(this)} className="handler"><img src={require('../../../../public/images/RWD Assets/menu.svg')} alt="my image" /></div>
          <div onClick={this.onOverlayClick.bind(this)} className="overlay"></div>
          <nav>
            <div className='topMenuOverlap' />
            {navItem}
          </nav>

        </label>
      </div>
    );
  }
}

export default HeaderMobile;
