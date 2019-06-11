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
} from '../../utils/utilityManager';
import UserAccInfo from '../UserAccInfo/userAccInfo';
import MyWishlist from '../MyWishlist/myWishlist';

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

    // const token = appCookie.get('isLoggedIn');
    // console.log('Testest', token);
    // appCookie.get('isLoggedIn')
    //   ? alert('Take user to wishlist page')
    //   : this.setState({isWelcomeBack: true})
  }

  componentWillReceiveProps(nextProps) {
    console.log(
      'Wishlist -- componentWillReceiveProps -- ',
      nextProps.wishlistUpdatedCount,
    );
    this.setState({
      wishListCount: nextProps.wishlistUpdatedCount,
    });
  }

  componentDidMount() {
    this.getWishListCount();
  }

  render() {
    const token = appCookie.get('isLoggedIn');
    console.log('From Sishlit --- ', token);
    const { isLoading, wishListCount } = this.state;
    let wishlistItem = null;
    let wishlistLogo = <WishlistLogo />;
    if (token === 'true') {
      if (wishListCount != 0 && wishListCount != undefined) {
        wishlistItem = <span className="wishListCount">{wishListCount}</span>;
      }
      console.log('Wihslist islog --', token);
      wishlistLogo = (
        <Link to="/wishlist">
          <WishlistLogo />
        </Link>
      );
    }

    

    return (
      <>
        <li className="icons" onClick={this.handleWLCount.bind(this)}>
          {!isLoading ? (
            wishlistItem
          ) : (
            <p className="error">No Category Found</p>
          )}
          {wishlistLogo}
        </li>
        {this.state.isWelcomeBack ? <UserAccInfo fromWishlistPro /> : null}
      </>
    );
  }
}

function mapStateToProps(state) {
  const stateObj = getReleventReduxState(state, 'global');
  const wishlistCount = getReleventReduxState(stateObj, 'wishlistCount');
  console.log('Its Globale', wishlistCount);
  return {
    wishlistUpdatedCount: wishlistCount,
  };
}

export default connect(mapStateToProps)(wishListCount);

// export default wishListCount;
