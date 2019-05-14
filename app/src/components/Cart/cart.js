import React from 'react';
import apiManager from '../../utils/apiManager';
import appCookie from '../../utils/cookie';
import '../../../public/styles/headerContainer/category.scss';
import {
  cartCountApi,
  storeId,
  accessToken,
  minicartAPI,
} from '../../../public/constants/constants';
import CartLogo from '../SVGs/cart';
import { fetchMinicartDetails } from '../../utils/initialManager';
import MinicartItem from './minicartItem';
import ReactDOM from 'react-dom';
import '../../../public/styles/minicart.scss';

class CartCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CartCount: '',
      isLoading: true,
      errors: null,
      options: ['Apple'],
      minicartData: [],
    };
  }

  handleOutsideClick(e) {
    console.log('handleOutsideClick');
    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(event.target)) {
      this.setState({
        active: false,
      });
    }
  }

  getCartCount() {
    apiManager
      .get(cartCountApi)
      .then(response => {
        const count = response.data.data.cartTotalQuantity;
        this.setState({
          CartCount: response.data.data.cartTotalQuantity,
          // active: response.data.data.cartTotalQuantity != 0 ? true : ,
          isLoading: false,
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  handleCartCount() {
    const token = appCookie.get('isLoggedIn');
    console.log('Testest', token);
    appCookie.get('isLoggedIn')
      ? '' // alert('Take user Cart page')
      : alert('Please login');
  }

  componentDidMount() {
    document.addEventListener(
      'click',
      this.handleOutsideClick.bind(this),
      true,
    );
    this.fetchMinicartDetails();
    this.getCartCount();
  }

  fetchMinicartDetails() {
    apiManager
      .get(minicartAPI)
      .then(response => {
        this.setState({ minicartData: response.data.data.miniCartData });
        console.log('minicart Response --- ', response.data.data.miniCartData);
      })
      .catch(error => {
        console.log('miniCart Error ---', error);
      });
  }

  toggleDropdown() {
    console.log('toggleDropdown');
    this.setState({
      active: !this.state.active,
    });
  }

  handleClick(i) {
    this.setState({
      selected: i,
    });
  }

  renderOptions() {
    if (this.state.minicartData) {
      return this.state.minicartData.map((option, i) => (
        <>
          <div
            onClick={evt => this.handleClick(i)}
            key={i}
            className={`dropdown__list-item${
              i === this.state.selected ? '' : ''
            }`}
          >
            <MinicartItem dataPro={option} />
            {/* {option} */}
          </div>
        </>
      ));
    }
  }

  render() {
    const { isLoading, CartCount } = this.state;
    let cartCountItem = null;
    let minicartDropdownItem = null;
    if (CartCount != 0 && CartCount != undefined) {
      cartCountItem = <span className="cartCount">{CartCount}</span>;
      minicartDropdownItem = (
        <div
          className={`dropdown__list ${
            this.state.active ? 'dropdown__list--active' : ''
          }`}
        >
          <>
            <div className="mini-cartscroll">{this.renderOptions()}</div>{' '}
            <button className="checkout-btn">Checkout</button>
          </>
        </div>
      );
    }

    return (
      <li className="icons mini-cart" onClick={this.handleCartCount}>
        {!isLoading ? (
          cartCountItem
        ) : (
          <p className="error">No Cart Item Found</p>
        )}

        <div className="dropdown">
          <div
            onClick={() => this.toggleDropdown()}
            className="dropdown__toggle dropdown__list-item icons_border"
          >
            <CartLogo />
            <i className="fa fa-angle-down" aria-hidden="true" />
          </div>
          {minicartDropdownItem}
        </div>
      </li>
    );
  }
}

export default CartCount;
