import React from 'react';
import { imagePrefix } from '../../../../../public/constants/constants';
import RWDSingleProduct from './RWDSingleProduct';

class RWDCompleteOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  onInvoiceClick(invoiceNo) {
    console.log('INvoice No --- ', invoiceNo)
  }

  render() {
    const orderData = this.props.orderDataPro;
    const addressData = orderData.address;
    const summeryData = orderData.orderSummary
    const invoiceData = orderData.invoices;
    console.log('mkdmdk -- ', orderData);
    return (
      <>
        <div className="tabBar clearfix">
          <ul className="orders-short-desc-heading clearfix">
            <li className="list">
              <span className="heading-top">Order ID</span>{' '}
              <span className="heading-sub">{orderData.orderID}</span>
            </li>
            <li className="list">
              <span className="heading-top">Ordered on</span>{' '}
              <span className="heading-sub">{orderData.orderDate}</span>
            </li>
            <li className="list">
              <span className="heading-top">Status</span>{' '}
              <span className="heading-sub">{orderData.orderStatus}</span>
            </li>
          </ul>
        </div>

        {orderData.orderItems.map(data => (
          <RWDSingleProduct
            orderDataPro={data}
            isFromViewOrder={data.shipmentData.length > 1 ? true : false }
            viewOrderTrackCallbackPro={this.props.viewOrderTrackCallbackPro}
            // myOrderCallbackPro={this.props.myOrderCallbackPro}
          />
        ))}

        <div className="">
          <h4 className="heading">Delivery Address</h4>
          <p className="subheading">{addressData.name}</p>
          <p className="address">{`${addressData.address}, ${addressData.city}, ${addressData.state}, ${addressData.pincode}`}</p>
        </div>

        <div className="">
          <h4 className="heading">Payment Method</h4>
          <p className="subheading">{orderData.paymentMethod}</p>
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
              <div className="rightText">{summeryData.productDiscount === 0 ? null : '-'} ₹{summeryData.productDiscount}</div>
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

        <div>

          <ul className="invoiceList">
            {invoiceData.map((data, key) => {
              return (
                <li onClick={evt => this.onInvoiceClick(data)} className="list">INVOICE {key + 1}</li>
              )
            })}

          </ul>
        </div>

      </>
    );
  }
}

export default RWDCompleteOrder;
