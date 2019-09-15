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
            hideViewDetail={true}
            viewOrderTrackCallbackPro={this.props.viewOrderTrackCallbackPro}
            // myOrderCallbackPro={this.props.myOrderCallbackPro}
          />
        ))}

        <div className='order-delivery-add'>
          <h2 className="title">Delivery Address</h2>
          <p className="order-text-desc">{addressData.name}</p>
          <p className="order-text-desc">{`${addressData.address}, ${addressData.city}, ${addressData.state}, ${addressData.pincode}`}</p>
        </div>

        <div className='order-payent-method'>
          <h2 className="title">Payment Method</h2>
          <p className="order-text-desc">{orderData.paymentMethod}</p>
        </div>

        <div className="order-list-summary">
          <div className="orderSummary">
            <h2 className="title">Order Summary</h2>
            <div className='summary'>
            <p className="cart-total">
              <span className="info-text">Cart Total</span>
              <span className="info-val">₹{summeryData.netAmount}</span>
            </p>
            <p className="product-ship-disc">
              <span className="info-text">Shipping</span>
              <span className="info-val">{summeryData.shippingCharges === 0 ? `Free` : summeryData.shippingCharges}</span>
            </p>
            <p className="product-disc">
              <span className="info-text">Product Discount</span>
              <span className="info-val">{summeryData.productDiscount === 0 ? null : '-'} ₹{summeryData.productDiscount}</span>
            </p> 
            <p className="order-disc">
              <span className="info-text">Order Discount</span>
              <span className="info-val">-₹{summeryData.orderDiscount}</span>
            </p>
            <div className="divider"></div>
            <p className="totalAmt">
              <span className="info-text">Total</span>
              <span className="info-val">₹{summeryData.totalAmount}</span>
            </p>
            </div>
          </div>
        </div>

        <div className='order-invoice-details'>
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
