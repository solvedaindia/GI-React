import React from 'react';
import apiManager from '../../utils/apiManager';
import { cartApplyPromoAPI } from '../../../public/constants/constants';
import {PROMO_CODE_IS_INVALID } from '../../constants/app/cartConstants';

class PromoField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderID: this.props.orderID,
      promoCode: '',
      error: null,
    };
    this.handlePromoCode = this.handlePromoCode.bind(this);
    this.applyPromoCode = this.applyPromoCode.bind(this);
  }

  handlePromoCode(event) {
    this.setState({ promoCode: event.target.value });
  }

  applyPromoCode() {
    if (!this.state.promoCode) return null;
    const data = {
      orderId: this.state.orderID,
      promoCode: this.state.promoCode,
    };
    apiManager
      .post(cartApplyPromoAPI, data)
      .then(response => {
        this.setState({
          promoCode: response.data.data,
          error: null,
        });
        this.props.getCartDetails();
      })
      .catch(error => {
        this.setState({
          error: error.response.data.error,
          isLoading: false,
        });
      });
  }

  render() {
    const { error } = this.state;
    return (
      <div className="promoField">
        <input
          type="text"
          className="promoInput"
          value={this.state.promoCode}
          onChange={this.handlePromoCode}
        />
        <button className="applyBtn" onClick={this.applyPromoCode}>
          Apply
        </button>
        {!!error && (
          <div className="promoError">{error.error_message || `${PROMO_CODE_IS_INVALID }`}</div>
        )}
      </div>
    );
  }
}

export default PromoField;
