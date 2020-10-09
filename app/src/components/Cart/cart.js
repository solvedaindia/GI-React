import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import apiManager from '../../utils/apiManager';
import '../../../public/styles/headerContainer/category.scss';
import {
  cartCountApi,
  
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
import {PROCEED_TO_CHECK_OUT } from '../../constants/app/cartConstants';

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
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);

  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('touchstart', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    document.addEventListener('touchstart', this.handleClickOutside);
  }

   /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

   /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target) && this.state.active) {
      this.toggleDropdown();
    }
  }

  // handleOutsideClick(e) {
  //   const domNode = ReactDOM.findDOMNode(this);

  //   if (!domNode || !domNode.contains(event.target)) {
  //     this.setState({
  //       active: false,
  //     });
  //   }
  // }

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
    
    this.fetchMinicartDetails();

    getUpdatedMinicartCount(this);
    this.setState({ //For Mobile
      CartCount : this.props.updatedMinicartCount
    })
   
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updatedMinicartCount != this.props.updatedMinicartCount) {
      this.fetchMinicartDetails();
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
      });
  }

  toggleDropdown = () => {
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
        <div
        onClick={evt => this.handleClick(i)}
        key={i}
        className={`dropdown__list-item${
          i === this.state.selected ? '' : ''
          }`}
      >
        <MinicartItem dataPro={option} closeDropdownPro={this.toggleDropdown} />
      </div>
      ));
    }
  }

  render() {
    const { isLoading, CartCount } = this.state;
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
              <a href='/cart'><button className="checkout-btn">{PROCEED_TO_CHECK_OUT}</button></a>
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
       
        {/* {cartCountItem} */}

        <div className="dropdown" ref={this.setWrapperRef}>
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
  return {
    updatedMinicartCount: minicartCount,
  };
}

export default connect(
  mapStateToProps,
  { updatetMinicart },
)(CartCount);
