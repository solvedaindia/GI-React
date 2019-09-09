import React from 'react';
import { cartUpdateAPI } from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';
import {QUANTITY } from '../../constants/app/cartConstants';

class OrderSummy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: props.quantity,
      orderItemId: props.orderItemId,
    };
  }

  render() {
    return (
      <form className="cartQty">
        <label className="qytLabel">{QUANTITY}</label>
        <select
          className="qytList"
          value={this.state.quantity}
          onChange={this.handleChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </form>
    );
  }
}

export default OrderSummy;
