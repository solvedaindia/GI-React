import React from 'react';
import '../../../public/styles/cart/cartItem.scss';

class Pincode extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            error: null
        }
    }
    getCartData() {
        
    }
    componentDidMount() {
        this.getCartData();
    }
    render() {
        const { cartData } = this.state
        return (
            <input type='number' pattern="[0-9]{6}" />
        )
    }
}
export default Pincode;