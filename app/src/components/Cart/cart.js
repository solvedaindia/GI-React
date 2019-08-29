import React from 'react';
import { Route, NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
import { getUpdatedMinicartCount } from '../../utils/initialManager';
import MinicartItem from './minicartItem';
import EmptyMinicart from './emptyMinicart';
import ReactDOM from 'react-dom';
import '../../../public/styles/minicart.scss';
import { getReleventReduxState } from '../../utils/utilityManager';
import { updatetMinicart } from '../../actions/app/actions';

class CartCount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CartCount: '',
      isLoading: true,
      errors: null,
      options: ['Apple'],
      minicartData: null,
      isMobile: window.innerWidth <= 760,
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
        const count = response || {};
        this.setState({
          CartCount: data && data.data.cartTotalQuantity,
          isLoading: false,
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    document.addEventListener(
      'click',
      this.handleOutsideClick.bind(this),
      true,
    );
    this.fetchMinicartDetails();

    // this.getCartCount();
    getUpdatedMinicartCount(this);
    // this.setState({
    //   CartCount: this.props.updatedMinicartCount,
    // });
    // console.log('get mini cart count ---- ',getUpdatedMinicartCount(this))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updatedMinicartCount != this.props.updatedMinicartCount) {
      this.fetchMinicartDetails();
      // this.getCartCount();
      this.setState({
        CartCount: nextProps.updatedMinicartCount,
        isLoading: false,
      });
    }
  }

  fetchMinicartDetails() {
    apiManager
      .get(minicartAPI)
      .then(response => {
        const { data } = response || {}
        this.setState({ minicartData: data && data.data.miniCartData });
      })
      .catch(error => {
        console.log('miniCart Error ---', error);
      });
  }

  toggleDropdown = () => {
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
            <MinicartItem dataPro={option} closeDropdownPro={this.toggleDropdown} />
            {/* {option} */}
          </div>
        </>
      ));
    }
  }

  render() {
    const { isLoading, CartCount } = this.state;
    console.log('minicart recive props', CartCount, this.state.minicartData);
    let cartCountItem = null;
    let minicartDropdownItem = null;
    if (CartCount != 0 && CartCount != undefined) {
      cartCountItem = <span className="cartCount">{CartCount}</span>;
    }
    minicartDropdownItem = (
      <div
        className={`dropdown__list ${
          this.state.active ? 'dropdown__list--active' : ''
          }`}
      >
        <>
          {CartCount != 0 && CartCount != undefined ? (
            <>
              <div id="mini-cartscroll" className="mini-cartscroll">{this.renderOptions()}</div>{' '}
              <a href='/cart'><button className="checkout-btn">Proceed to Checkout</button></a>
            </>
          ) : (
              <EmptyMinicart />
            )}
          {/* <EmptyMinicart /> */}
        </>
      </div>
    );

    return (
      <li className="icons mini-cart">
        {/* {!isLoading ? (
          cartCountItem
        ) : (
          <p className="error">No Cart Item Found</p>
        )} */}
        {/* {cartCountItem} */}

        <div className="dropdown">
          {this.state.isMobile ?
            <Link className="link" to='/cart'>
              {cartCountItem}
              <div className="dropdown__toggle dropdown__list-item icons_border" >
                <CartLogo width={24} height={24} />
              </div>
            </Link>
            :
            <div onClick={() => this.toggleDropdown()} className="dropdown__toggle dropdown__list-item icons_border" >
              {cartCountItem}
              <CartLogo width={24} height={24} />
            </div>
          }

          {minicartDropdownItem}
        </div>
      </li>
    );
  }
}

function mapStateToProps(state) {
  const stateObj = getReleventReduxState(state, 'global');
  const minicartCount = getReleventReduxState(stateObj, 'minicartCount');
  console.log('Its Globale Minicart', minicartCount);
  return {
    updatedMinicartCount: minicartCount,
  };
}

export default connect(
  mapStateToProps,
  { updatetMinicart },
)(CartCount);
// export default CartCount;