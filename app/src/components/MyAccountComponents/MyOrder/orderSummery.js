import React from 'react';
import apiManager from '../../../utils/apiManager';
import { changePasswordAPI } from '../../../../public/constants/constants';
import { mapPaymentMethodMode } from '../../../utils/utilityManager';

class OrderSummery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onInvoiceClick(invoiceNo) {
    console.log('INvoice No --- ', invoiceNo)
  }

  render() {
    
    const summeryData = this.props.summeryDataro;
    const addressData = this.props.addressDataPro;
    console.log('summery ddd invo9cdee -- ', addressData.pincode)
    return (
      <div className="summerydata">
        <div className="orderList">
          <h4 className="heading">Delivery Address</h4>
          {addressData ? <><p className="subheading">{addressData.name !== undefined ? addressData.name : null}</p>
          <p className="address">{`${addressData && addressData.address !== undefined ? addressData.address : null}, ${addressData.city !== undefined ? addressData.city : null}, ${addressData.state !== undefined ? addressData.state: null}, ${addressData.pincode !== undefined ? addressData.pincode : null}`}</p></>: null }
          
           <ul className="invoiceList">
            {this.props.invoiceDataPro.map((data, key) => {
              return (
                <li onClick={evt => this.onInvoiceClick(this.props.invoiceDataPro[key])} className="list">INVOICE {key + 1}</li>
              )
            })}
          </ul> 
        </div>

        <div className="orderList paymentmethod">
          <h4 className="heading">Payment Method</h4>
          <p className="subheading">{mapPaymentMethodMode(this.props.paymentMethodPro)}</p>

        </div>
        <div className="orderList">
          <div className="orderSummary">
            <h4 className="heading">Order Summary</h4>
            <div className="summaryDetails clearfix">
              <div className="leftText">Cart Total</div>
              <div className="rightText">₹{summeryData.totalAmount}</div>
            </div>
            <div className="summaryDetails clearfix">
              <div className="leftText">Shipping</div>
              <div className="rightText">{summeryData.shippingCharges === 0 ? `Free` : summeryData.shippingCharges}</div>
            </div>
            {summeryData.productDiscount === 0 ? null : <div className="summaryDetails clearfix">
              <div className="leftText">Product Discount</div>
              <div className="rightText">-₹{summeryData.productDiscount}</div>
            </div>}

            {summeryData.orderDiscount === 0 ? null : <div className="summaryDetails clearfix">
              <div className="leftText">Order Discount</div>
              <div className="rightText">-₹{summeryData.orderDiscount}</div>
            </div>}
            
            <div className="divider"></div>
            <div className="summaryDetails subTotaltext clearfix">
              <div className="leftText">Total</div>
              <div className="rightText">₹{summeryData.netAmount}</div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default OrderSummery;
