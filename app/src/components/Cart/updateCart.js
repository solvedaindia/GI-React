import React from 'react';
import { cartUpdateAPI } from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';
import { isMobile } from '../../utils/utilityManager';
import {QUANTITY } from '../../constants/app/cartConstants';
import {MOBILE_QUANTITY } from '../../constants/app/cartConstants';


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
          orderItemId: this.props.orderItemId,
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
      })
      .catch(error => {
        this.setState({
          error,
          isLoading: false,
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.quantity !== nextProps.quantity){
      this.setState({
        quantity: nextProps.quantity
      })
    }
  }

  render() {
    return (
      <form className="cartQty">
        <label className="qytLabel">{!isMobile() ? QUANTITY  : MOBILE_QUANTITY}</label>
        <select
          className="qytList"
          value={this.state.quantity}
          onChange={this.handleChange}
          >
          {[...Array(100)].map((e, key) => {
            if (key > 0) {
              return <option key={key} value={key}>{key}</option>;
            }
          })}
        </select>
        {!!isMobile() && <span className='caretDown' />}
      </form>
    );
  }
}

export default CartUpdate;
