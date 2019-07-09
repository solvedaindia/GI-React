import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import { getReleventReduxState } from '../../utils/utilityManager';
import { isMobile } from '../../utils/utilityManager';
import reducer from './reducer';
import saga from './saga';
import { getCartDetails } from './action';
import { imagePrefix } from '../../../public/constants/constants';
import EmptyCart from '../../components/Cart/emptyCart';
import Pincode from '../../components/Cart/pincode';
import CartUpdate from '../../components/Cart/updateCart';
import EMILogo from '../../components/SVGs/emiIcon';
import TermsAndCondition from '../../components/Cart/tnc';
import DeleteCartItem from '../../components/Cart/cartDeleteItem';
import MoveToWishList from '../../components/Cart/moveToWishList';
import '../../../public/styles/cart/cartItem.scss';
import GetCartPromo from '../../components/Cart/promotion';
import PromoField from '../../components/Cart/applyPromo';

class CartDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showReply: false,
    }
  }

  componentDidMount() {
    this.props.getCartDetails();
  }

  handleOnClick(e) {
    e.preventDefault();
    this.setState({ showReply: !this.state.showReply })
  }

  render() {
    const { cartData } = this.props;
    if (!cartData) return null;
    return (
      !!cartData.cartItems.length
        ?
        <section className='cartDetails'>
          <div className='cartItem'>
            <div className='cartHeadDetails'>
                {!isMobile() ? <h2 className='title'>Cart <span className='cartCount'>{cartData.cartTotalItems} items</span>
                </h2> : <h2 className='title'>Cart <span className='cartCount'>({cartData.cartTotalItems} items)</span>
                </h2> }
              <Pincode />
            </div>
            <ul className='cartItemList'>
              {cartData.cartItems.map((itemData, index) => (
                <li className='prodList' key={`${index}-pro`}>
                  <figure className='prodImg'>
                    <img className='img' src={`${imagePrefix}${itemData.thumbnail}`} alt={index} />
                  </figure>
                  <div className='prodDetails'>
                    <h3 className='prodTitle'>{itemData.productName}</h3>
                    <p className='subTitle'>({itemData.shortDescription})</p>
                    {!itemData.freeGift &&
                      <CartUpdate
                        quantity={itemData.quantity}
                        orderItemId={itemData.orderItemId}
                        getCartDetails={this.props.getCartDetails}
                      />}
                    <MoveToWishList
                      uniqueID={itemData.uniqueID}
                      orderItemId={itemData.orderItemId}
                      getCartDetails={this.props.getCartDetails}
                    />
                    {!itemData.freeGift &&
                      <DeleteCartItem
                        orderItemId={itemData.orderItemId}
                        uniqueID={itemData.uniqueID}
                        productName = {itemData.productName}
                        getCartDetails={this.props.getCartDetails}
                      />}
                    <p className='delBy'>DELIVERY BY:</p>
                    <span className='date'>{itemData.deliveryDate}31 DEC 2019</span>
                    <span className='price'>₹{itemData.offerPrice}</span>
                    <span className='shipping'>Shipping charge ₹300</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className='orderSummary'>
            <div className='promotion'>
              <p className='promoMsg' onClick={this.handleOnClick.bind(this)}>Got a promo code? </p>
              {this.state.showReply && <PromoField
                orderID={cartData.orderSummary.orderID}
                getCartDetails={this.props.getCartDetails}
              />}
              <GetCartPromo
                orderID={cartData.orderSummary.orderID}
                getCartDetails={this.props.getCartDetails}
              />
            </div>
            <h2 className='title'>Order Summary</h2>
            <div className='summary'>
              <p className='cartTotal'>
                <span className='info'>Cart Total</span>
                <span className='val'> ₹{cartData.orderSummary.netAmount}</span>
              </p>
              {!!cartData.orderSummary.productDiscount &&
                <p className="prodDisc">
                  <span className='info'>Product Discount</span>
                  <span className='val'> ₹{cartData.orderSummary.productDiscount}</span>
                </p>
              }
              {!!cartData.orderSummary.orderDiscount &&
                <p className='orderDisc'>
                  <span className='info'>Order Discount</span>
                  <span className='val'>-₹{cartData.orderSummary.orderDiscount}</span>
                </p>
              }
              {!!cartData.orderSummary.shippingCharges == '0' ?
                <p className='shipping'>
                  <span className='info'>Shipping</span>
                  <span className='val'>Free</span>
                  <span className='shippingMsg'>Free shipping on cart total above ₹5000</span>
                </p>
                :
                <p className='shipping'>
                  <span className='info'>Shipping</span>
                  <span className='val'>-₹{cartData.orderSummary.shippingCharges}</span>
                </p>
              }
              <p className='emiInfo'>
                <p className='emiMsg'><span className='emiLogo'><EMILogo width={23} height={23} /></span>Starting from ₹999 per month</p>
                <TermsAndCondition />
              </p>
              <p className='totalAmt'>
                <span className='totalPrice'>Total</span>
                <span className='val'>₹{cartData.orderSummary.totalAmount}</span>
                <span className='savingText'>You saved ₹{cartData.orderSummary.saving}</span>
              </p>
              <a className='btn btnCheckout' href='/checkout'>Proceed to Checkout</a>
            </div>
          </div>
        </section>
        : <EmptyCart />
    )
  }
}

const withConnect = connect(
  (state) => ({
    cartData: getReleventReduxState(state, 'cart')
  }),
  {
    getCartDetails,
  }
);

const withReducer = injectReducer({ key: 'cart', reducer });
const withSaga = injectSaga({ key: 'cartContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(CartDetail);
