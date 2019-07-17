import React from 'react';
import apiManager from '../../../utils/apiManager';
import { changePasswordAPI } from '../../../../public/constants/constants';

class OrderSummery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onInvoiceClick(invoiceNo) {
    console.log('INvoice No --- ', invoiceNo)
  }

  render() {
    console.log('summery ddd -- ', this.props.summeryDataro, this.props.addressDataPro)
    const summeryData = this.props.summeryDataro;
    const addressData = this.props.addressDataPro;

    return (
      <div className="summerydata">
        <div className="orderList">
          <h4 className="heading">Delivery Address</h4>
          <p className="subheading">{addressData.name}</p>
          <p className="address">{`${addressData.address}, ${addressData.city}, ${addressData.state}, ${addressData.pincode}`}</p>
          <ul className="invoiceList">
            {this.props.invoiceDataPro.map((data, key) => {
              return (
                <li onClick={evt => this.onInvoiceClick(this.props.invoiceDataPro[key])} className="list">INVOICE {key + 1}</li>
              )
            })}
          </ul> */}
        </div>

        <div className="orderList paymentmethod">
          <h4 className="heading">Payment Method</h4>
          <p className="subheading">{this.props.paymentMethodPro}</p>

        </div>
        <div className="orderList">
          <div className="orderSummary">
            <h4 className="heading">Order Summary</h4>
            <div className="summaryDetails clearfix">
              <div className="leftText">Cart Total</div>
              <div className="rightText">₹{summeryData.netAmount}</div>
            </div>
            <div className="summaryDetails clearfix">
              <div className="leftText">Shipping</div>
              <div className="rightText">{summeryData.shippingCharges === 0 ? `Free` : summeryData.shippingCharges}</div>
            </div>
            <div className="summaryDetails clearfix">
              <div className="leftText">Product Discount</div>
              <div className="rightText">{summeryData.productDiscount === 0 ? null : '-' } ₹{summeryData.productDiscount}</div>
            </div>
            <div className="summaryDetails clearfix">
              <div className="leftText">Order Discount</div>
              <div className="rightText">-₹{summeryData.orderDiscount}</div>
            </div>
            <div className="divider"></div>
            <div className="summaryDetails subTotaltext clearfix">
              <div className="leftText">Total</div>
              <div className="rightText">₹{summeryData.totalAmount}</div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default OrderSummery;
