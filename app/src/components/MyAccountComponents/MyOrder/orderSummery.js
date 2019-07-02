import React from 'react';
import apiManager from '../../../utils/apiManager';
import { changePasswordAPI } from '../../../../public/constants/constants';

class OrderSummery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="summerydata">
        <div className="orderList">
          <h4>Delivery Address</h4>
          <p>Noah Moran</p>
          <p>
            #312, Oceanus freesia enclave, E block, 7th cross, Bellandur,
            Bangalore, 560099 India
          </p>
        </div>

        <div className="orderList paymentmethod">
          <h4>Payment Method</h4>
          <p>UPI Payment</p>
        </div>

        <div className="orderList">
          <h4>Order Summary</h4>
          <p>UPI Payment</p>
        </div>
      </div>
    );
  }
}

export default OrderSummery;
