import React from 'react';
import { cartUpdateAPI } from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';

class CartUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: props.quantity,
      orderItemId: props.orderItemId,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.handleCartUpdate(event.target.value);
  }

  handleCartUpdate(qty) {
    const data = {
      orderItem: [
        {
          quantity: qty,
          orderItemId: this.state.orderItemId,
        },
      ],
    };
    apiManager
      .post(cartUpdateAPI, data)
      .then(response => {
        this.setState({
          quantity: qty,
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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <select value={this.state.quantity} onChange={this.handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </label>
      </form>
    );
  }
}

export default CartUpdate;
