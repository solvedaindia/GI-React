import React from 'react';
import { cartDetailAPI,
        imagePrefix
    } from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';
import EmptyCart from './emptyCart';
import Pincode from './pincode';
import CartUpdate from './updateCart';
import '../../../public/styles/cart/cartItem.scss';
import {DELIVERY_BY, SHIPPING_CHARGES_300 } from '../../constants/app/cartConstants';
import {DECEMBER_2019 } from '../../constants/app/cartConstants';
import {SHIPPING_CHARGES_300 } from '../../constants/app/cartConstants';
import {DECEMBER_2019 } from '../../constants/app/cartConstants';
import {GOT_PROMO_CODE } from '../../constants/app/cartConstants';
import {ORDER_SUMMARY } from '../../constants/app/cartConstants';
import {ITEMS } from '../../constants/app/cartConstants';




class CartDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cartData: null,
            isLoading: false,
            error: null
        }
    }
    getCartData() {
        apiManager
        .get(cartDetailAPI, { 'headers': { 'pincode': '400610' } })
        .then(response => {
            this.setState({
                cartData: response.data.data,
                isLoading: false,
            });
        })
        .catch(error => {
            this.setState({
            error,
            isLoading: false,
            });
        });
    }
    componentDidMount() {
        this.getCartData();
    }
    render() {
        const { cartData } = this.state;
        if(!cartData) return null;

        return (
            !!cartData.cartItems.length
            ? 
            <section className='cartDetails'>
                <div className='cartItem'>
                    <div className='cartHeadDetails'>
                        <h2 className='title'>Cart <span className='cartCount'>{cartData.cartTotalItems} {ITEMS}</span>
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
                                    />}
                                    <p className='delBy'>{DELIVERY_BY}</p>
                                    <span className='date'>{itemData.deliveryDate}{DECEMBER_2019}</span>
                                    <span className='price'>₹{itemData.offerPrice}</span>
                                    <span className='shipping'>{SHIPPING_CHARGES_300}</span>
                                </div>
                            </li>
                        )
                    })}
                    </ul>
                </div>
                <div className='orderSummary'>
                    <div className='promotion'>
                        <h3 className='promoHead'>{GOT_PROMO_CODE}</h3>
                    </div>
                    <h2 className='title'>{ORDER_SUMMARY}</h2>
                    <div className='summary'>
                        <p className='cartTotal'>{}</p>
                        <p className='prodDisc'></p>
                        <p className='orderDisc'></p>
                        <p className='shipping'></p>
                    </div>
                </div>
            </section> 
            : <EmptyCart />
        )
    }
}

export default CartDetail;