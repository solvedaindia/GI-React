import React from 'React';
import { cartDetailAPI } from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';
import EmptyCart from './emptyCart';
import Pincode from './pincode';
import '../../../public/styles/cart/cartItem.scss';

class CartItem extends React.Component {
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
            console.log('@@@@ Cart Data @@@', response.data.data);
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
        const { cartData } = this.state
        return (
            !!cartData && !!cartData.cartItems.length
            ? 
            <section className='cartItem'>
                
            </section> 
            : <EmptyCart />
        )
    }
}

export default CartItem;