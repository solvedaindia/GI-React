import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import apiManager from '../../utils/apiManager';
import {
  wishListCountApi,
  storeId,
  accessToken,
} from '../../../public/constants/constants';
import WishlistLogo from '../SVGs/wishlist';
import appCookie from '../../utils/cookie';
import {
  resolveTheWishlistData,
  getCookie,
  getReleventReduxState,
  isMobile,
} from '../../utils/utilityManager';
import UserAccInfo from '../UserAccInfo/userAccInfo';
import MyWishlist from '../MyWishlist/myWishlist';
import {
  updatetWishListCount,
} from '../../actions/app/actions';

class wishListCount extends React.Component {
  state = {
    wishListCount: '',
    isLoading: true,
    errors: null,
    isWelcomeBack: false,
  };

  getWishListCount() {
    apiManager
      .get(wishListCountApi)
      .then(response => {
        resolveTheWishlistData(response.data.data);
        const count = response.data.data.wishlistTotalItems;
        this.props.updatetWishListCount(count);
        this.setState({
          wishListCount: response.data.data.wishlistTotalItems,
          isLoading: false,
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  handleWLCount() {
    if (getCookie('isLoggedIn') === 'true') {
    } else {
      this.setState({ isWelcomeBack: true });
    }

  
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      wishListCount: nextProps.wishlistUpdatedCount,
      isWelcomeBack: false
    });
  }

  componentDidMount() {
    this.setState({ isWelcomeBack: false });
    this.getWishListCount();
    
  }

  onLinkNavigation(pageText) {
    if (isMobile()) {
      this.props.pageNavigationRenderPro(pageText);
    }
  }

  render() {
    const token = appCookie.get('isLoggedIn');
    const { isLoading, wishListCount } = this.state;
    let wishlistItem = null;
    let wishlistLogo = <WishlistLogo />;
    if (token === 'true') {
      if (wishListCount != 0 && wishListCount != undefined) {
        wishlistItem = <span className="wishListCount">{wishListCount}</span>;
      }
      wishlistLogo = (
        <Link to="/wishlist" onClick={() => this.onLinkNavigation('My Wishlist')}>
          {!isLoading ? wishlistItem : null}
          <WishlistLogo />
        </Link>
      );
    }

    return (
      <>
        <li className="icons" onClick={this.handleWLCount.bind(this)}>          
          {wishlistLogo}
        </li>
        {this.state.isWelcomeBack ? isMobile() ? <UserAccInfo fromWishlistPro /> : this.props.userInfoCallbackPro() : null}
      </>
    );
  }
}

function mapStateToProps(state) {
  const stateObj = getReleventReduxState(state, 'global');
  const wishlistCount = getReleventReduxState(stateObj, 'wishlistCount');
  return {
    wishlistUpdatedCount: wishlistCount,
  };
}

export default connect(
  mapStateToProps,
  { updatetWishListCount },
)(wishListCount);
