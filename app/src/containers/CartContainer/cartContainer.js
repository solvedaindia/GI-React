import React from 'React';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import { getReleventReduxState } from '../../utils/utilityManager';
import reducer from './reducer';
import saga from './saga';
import { getCartDetails } from './action';
import {
    imagePrefix
} from '../../../public/constants/constants';
import EmptyCart from '../../components/Cart/emptyCart';
import Pincode from '../../components/Cart/pincode';
import CartUpdate from '../../components/Cart/updateCart';
import '../../../public/styles/cart/cartItem.scss';
import EMILogo from '../../components/SVGs/emiIcon';
import TermsAndCondition from '../../components/Cart/tnc';
import DeleteLogo from '../../components/SVGs/deleteIcon';
import DeleteCartItem from '../../components/Cart/cartDeleteItem';

class CartDetail extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount() {
        this.props.getCartDetails();
    }
    render() {
        const { cartData } = this.props;
        if(!cartData) return null;
        return (
            !!cartData.cartItems.length
            ? 
            <section className='cartDetails'>
                <div className='cartItem'>
                    <div className='cartHeadDetails'>
                        <h2 className='title'>Cart <span className='cartCount'>{cartData.cartTotalItems} items</span>
                        </h2>
                        <Pincode />
                    </div>
                    <ul className='cartItemList'>
                    {cartData.cartItems.map((itemData, index) => {
                        return (
                            <li className='prodList'>
                                <figure className='prodImg'>
                                    <img className='img' src={`${imagePrefix}${itemData.thumbnail}`} alt={index}/>
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
                                    {!itemData.freeGift &&
                                    <DeleteCartItem
                                        orderItemId={itemData.orderItemId}
                                        getCartDetails={this.props.getCartDetails}
                                    />}
                                    <p className='delBy'>DELIVERY BY:</p>
                                    <span className='date'>{itemData.deliveryDate}31 DEC 2019</span>
                                    <span className='price'>₹{itemData.offerPrice*itemData.quantity}</span>
                                    <span className='shipping'>Shipping charge ₹300</span>
                                </div>
                            </li>
                        )
                    })}
                    </ul>
                </div>
                <div className='orderSummary'>
                    <div className='promotion'>
                        <h3 className='promoHead'>Got a promo code?</h3>
                    </div>
                    <h2 className='title'>Order Summary</h2>
                    <div className='summary'>
                        <p className='cartTotal'>
                            <span className='info'>Cart Total</span> 
                            <span className='val'> ₹{cartData.orderSummary.totalAmount}</span>
                        </p>
                        {!!cartData.orderSummary.productDiscount &&
                            <p className='prodDisc'>
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
                            <span className='emiMsg'><EMILogo width={23} height={23} />Starting from ₹999 per month</span>
                            <TermsAndCondition />
                        </p>
                        <p className='totalAmt'>
                            <span className='totalPrice'>Total</span>
                            <span className='val'>₹{cartData.orderSummary.netAmount}</span>
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
    (state) => {
        return {
            cartData: getReleventReduxState(state, 'cart')
        };
    },
    {
        getCartDetails
    }
)

const withReducer = injectReducer({ key: 'cart', reducer });
const withSaga = injectSaga({ key: 'cartContainer', saga });

export default compose(
    withReducer,
    withSaga,
    withConnect,
  )(CartDetail);
