import React from "react";
import RWDSingleProduct from "./RWDSingleProduct";
import { Link } from "react-router-dom";
import appCookie from "../../../../utils/cookie";
import { formatPrice } from "../../../../utils/utilityManager";

class RWDCompleteOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const orderData = this.props.orderDataPro;
    const cancelRefundSummary = this.props.cancelRefundSummaryPro;
    const addressData = orderData.address;
    const summeryData = orderData.orderSummary;
    const invoiceData = orderData.invoices;
    return (
      <>
        <div className="tabBar clearfix">
          <ul className="orders-short-desc-heading clearfix">
            <li className="list">
              <span className="heading-top">Order ID</span>{" "}
              <span className="heading-sub">{orderData.orderID}</span>
            </li>
            <li className="list">
              <span className="heading-top">Ordered on</span>{" "}
              <span className="heading-sub">{orderData.orderDate}</span>
            </li>
            <li className="list">
              <span className="heading-top">Status</span>{" "}
              <span className="heading-sub">{orderData.orderStatus}</span>
            </li>
          </ul>
        </div>

        {orderData.orderItems.map(data => (
          <RWDSingleProduct
            orderDataPro={data}
            onRSODetail={data => this.props.onRSODetail(data)}
            isFromViewOrder={true}
            hideViewDetail={true}
            orderCompleteDataPro={orderData}
            showCancelModal={this.props.showCancelModal}
            showServiceRequestForm={this.props.showServiceRequestForm}
            viewOrderTrackCallbackPro={this.props.viewOrderTrackCallbackPro}
            // myOrderCallbackPro={this.props.myOrderCallbackPro}
          />
        ))}

        <div className="order-delivery-add">
          <h2 className="title">Delivery Address</h2>
          <p className="order-text-desc">
            { addressData && addressData.address1 !== undefined && <>{addressData.address1}<br/></>}
            { addressData && addressData.address2 !== undefined && <>{addressData.address2}<br/></>}
            { addressData && addressData.address3 !== undefined && <>{addressData.address3}<br/></>}

            { addressData && addressData.city !== undefined && <>{addressData.city}, </>}
            { addressData && addressData.state !== undefined && <>{addressData.state}, </>}
            { addressData && addressData.pincode !== undefined && <>{addressData.pincode}</>}
          </p>
         
        </div>

        <div className="order-payent-method">
          <h2 className="title">Payment Method</h2>
          <p className="order-text-desc">{orderData.paymentMethod}</p>
        </div>

        <div className="order-list-summary">
          <div className="orderSummary">
            <h2 className="title">Order Summary</h2>
            <div className="summary">
              <p className="cart-total">
                <span className="info-text">Cart Total</span>
                <span className="info-val">₹{summeryData.totalAmount}</span>
              </p>
              <p className="product-ship-disc">
                <span className="info-text">Shipping</span>
                <span className="info-val">
                  {summeryData.shippingCharges === 0
                    ? `Free`
                    : summeryData.shippingCharges}
                </span>
              </p>
              <p className="product-disc">
                <span className="info-text">Product Discount</span>
                <span className="info-val">
                  {summeryData.productDiscount === 0 ? null : "-"} ₹
                  {summeryData.productDiscount}
                </span>
              </p>
              {summeryData.orderDiscount === 0 ? null : (
                <p className="order-disc">
                  <span className="info-text">Order Discount</span>
                  <span className="info-val">
                    -₹
                    {summeryData.orderDiscount}
                  </span>
                </p>
              )}
              <div className="divider" />
              <p className="totalAmt">
                <span className="info-text">Total</span>
                <span className="info-val">₹{summeryData.netAmount}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="res-refund-summary">
          {cancelRefundSummary && cancelRefundSummary.length > 0 ? (
            <>
              <h2 className="res-refund-title">Refund Summary</h2>
              {cancelRefundSummary.map(refundElement => {
                return (
                  <>
                    <div className="res-refund-detail">
                      <div className="refund-row-wrapper">
                        <p className="refund-row">
                          <span className="info-label">Transaction ID:</span>
                          <span className="info-val">
                            {refundElement.transactionID}
                          </span>
                        </p>

                        <p className="refund-row">
                          <span className="info-label">
                            {refundElement.paymentMode}
                          </span>
                          <span className="info-val">
                            ₹{formatPrice(refundElement.refundAmount)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          ) : null}
        </div>
        {appCookie.get("isLoggedIn") === "true" && (
          <div className="order-invoice-details">
            <ul className="invoiceList">
              {invoiceData.map((data, key) => {
                return (
                  <li className="list">
                    <Link
                      className="link"
                      to={{ pathname: `/invoice/${data}` }}
                    >
                      INVOICE {key + 1}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </>
    );
  }
}

export default RWDCompleteOrder;
