import React from 'react';
import { cartUpdateAPI } from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';

class CartUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: props.quantity,
      orderItemId: props.orderItemId,
      size: 1
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    //   this.setState({quantity: event.target.value});
    this.handleCartUpdate(event.target.value);
  }

  buildOptions() {
      var arr = [];
      for (let i = 1; i <= 99; i++) {
      arr.push(<option key={i} value="{i}">{i}</option>)
      }
      return arr; 
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
        this.props.getCartDetails();
        console.log('@@@@ Cart Update @@@', response.data.data);
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
      <form className="cartQty">
        <label className="qytLabel">QUANTITY</label>
        
        <select
          className="qytList"
          value={this.state.quantity}
          onChange={this.handleChange}
          >
            {this.buildOptions()}
        </select>
      </form>
    );
  }
}

export default CartUpdate;
