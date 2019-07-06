import React from 'react';
import apiManager from '../../utils/apiManager';
import { cartApplyPromoAPI } from '../../../public/constants/constants';
class PromoField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderID : this.props.orderID,
            promoCode: ''
        }
        this.handlePromoCode = this.handlePromoCode.bind(this);
        this.applyPromoCode = this.applyPromoCode.bind(this);
    }
    handlePromoCode(event) {
        this.setState({promoCode: event.target.value});
    }
    applyPromoCode() {
        if(!this.state.promoCode) return;
        const data = {  
            orderId: this.state.orderID,
            promoCode: this.state.promoCode
        }
        apiManager
        .post(cartApplyPromoAPI, data)
        .then(response => {
            this.setState({
                promoCode: response.data.data
            });
            this.props.getCartDetails();
            console.log('Promotion Data', response.data.data);
        })
        .catch(error => {
            this.setState({
            error,
            isLoading: false,
            });
        });
    }
    render() {
        return (
        <div className='promoField'>
            <input type='text' className='promoInput' value={this.state.promoCode} onChange={this.handlePromoCode}></input>
            <button className='applyBtn' onClick={this.applyPromoCode}>Apply</button>
        </div>
        )
    }
}

export default PromoField;