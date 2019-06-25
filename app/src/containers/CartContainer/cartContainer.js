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

class CartDetail extends React.Component {
    constructor(props){
        super(props);
        // this.state = {
        //     cartData: null,
        //     isLoading: false,
        //     error: null
        // }
    }
    // getCartData() {
    //     apiManager
    //     .get(cartDetailAPI, { 'headers': { 'pincode': '400610' } })
    //     .then(response => {
    //         this.setState({
    //             cartData: response.data.data,
    //             isLoading: false,
    //         });
    //         console.log('@@@@ Cart Data @@@', response.data.data);
    //     })
    //     .catch(error => {
    //         this.setState({
    //         error,
    //         isLoading: false,
    //         });
    //     });
    // }
    
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
