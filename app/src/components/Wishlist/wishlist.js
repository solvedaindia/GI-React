import React from 'react';
import axios from 'axios';
import {
  wishListCountApi,
  storeId,
  accessToken,
} from '../../../public/constants/constants';
import WishlistLogo from '../SVGs/wishlist';
import appCookie from '../../utils/cookie';
import { resolveTheWishlistData } from '../../utils/utilityManager';

class wishListCount extends React.Component {
  state = {
    wishListCount: '',
    isLoading: true,
    errors: null,
  };

  getWishListCount() {
    axios
      .get(wishListCountApi, {
        headers: { store_id: storeId, access_token: accessToken },
      })
      .then(response => {
        resolveTheWishlistData(response.data.data);
        const count = response.data.data.wishlistTotalItems;
        this.setState({
          wishListCount:
            count == '0' ? '1' : response.data.data.wishlistTotalItems,
          isLoading: false,
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  handleWLCount() {
    const token = appCookie.get('isLoggedIn');
    console.log('Testest', token);
    appCookie.get('isLoggedIn')
      ? alert('Take user to wishlist page')
      : alert('Please login');
  }

  componentDidMount() {
    this.getWishListCount();
  }

  render() {
    const { isLoading, wishListCount } = this.state;
    return (
      <li className="icons" onClick={this.handleWLCount}>
        {!isLoading ? (
          <span className="wishListCount">{wishListCount}</span>
        ) : (
          <p className="error">No Category Found</p>
        )}
        <WishlistLogo />
      </li>
    );
  }
}

export default wishListCount;
