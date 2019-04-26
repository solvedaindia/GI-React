import React from 'react';
import axios from 'axios';
import '../../../public/styles/headerContainer/category.scss';
import {
  cartCountApi,
  storeId,
  accessToken,
} from '../../../public/constants/constants';
import CartLogo from '../SVGs/cart';

class CartCount extends React.Component {
  state = {
    CartCount: '',
    isLoading: true,
    errors: null,
  };

  getCartCount() {
    axios
      .get(cartCountApi, {
        headers: { store_id: storeId, access_token: accessToken },
      })
      .then(response => {
        const count = response.data.data.wishlistTotalItems;
        this.setState({
          CartCount: count == '0' ? '1' : response.data.data.wishlistTotalItems,
          isLoading: false,
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  handleCartCount() {
    const token = appCookie.get('isLoggedIn');
    console.log('Testest', token);
    appCookie.get('isLoggedIn')
      ? alert('Take user Cart page')
      : alert('Please login');
  }

  componentDidMount() {
    this.getCartCount();
  }

  render() {
    const { isLoading, CartCount } = this.state;
    return (
      <li className="icons" onClick={this.handleCartCount}>
        {!isLoading ? (
          <span className="cartCount">{CartCount}</span>
        ) : (
          <p className="error">No Cart Item Found</p>
        )}
        <CartLogo />
      </li>
    );
  }
}

export default CartCount;
