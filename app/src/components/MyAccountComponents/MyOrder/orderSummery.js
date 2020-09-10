import React from "react";
import { Link } from "react-router-dom";
import apiManager from "../../../utils/apiManager";
import { changePasswordAPI } from "../../../../public/constants/constants";
import {
  mapPaymentMethodMode,
  formatPrice
} from "../../../utils/utilityManager";
import appCookie from "../../../utils/cookie";

class OrderSummery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onInvoiceClick(invoiceNo) {}

  render() {
    const summeryData = this.props.summeryDataro;
    const addressData = this.props.addressDataPro;
    const cancelRefundSummary = this.props.cancelRefundSummary;

    return (
      <>
        <div className="summerydata">
          <div className="orderList">
            <h4 className="heading">Delivery Address</h4>
            {addressData ? (
              <>
                <p className="subheading">
                  {addressData.name !== undefined ? addressData.name : null}
                </p>
                <p className="address">
                  {`${
                    addressData && addressData.address1 !== undefined
                      ? addressData.address1
                      : null
                  } ${
                    addressData && addressData.address2 !== undefined
                      ? addressData.address2
                      : null
                  } ${
                    addressData && addressData.address3 !== undefined
                      ? addressData.address3
                      : null
                  }
        , ${addressData.city !== undefined ? addressData.city : null}, ${
                    addressData.state !== undefined ? addressData.state : null
                  }, ${
                    addressData.pincode !== undefined
                      ? addressData.pincode
                      : null
                  }`}
                </p>
              </>
            ) : null}
            {appCookie.get("isLoggedIn") === "true" && (
              <ul className="invoiceList">
                {this.props.invoiceDataPro.map((data, key) => {
                  return (
                    <li
                      onClick={evt =>
                        this.onInvoiceClick(this.props.invoiceDataPro[key])
                      }
                      className="list"
                    >
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
            )}
          </div>

          <div className="orderList paymentmethod">
            <h4 className="heading">Payment Method</h4>
            <p className="subheading">
              {mapPaymentMethodMode(this.props.paymentMethodPro)}
            </p>
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
                <div className="rightText">
                  {summeryData.shippingCharges === 0
                    ? `Free`
                    : summeryData.shippingCharges}
                </div>
              </div>
              {summeryData.productDiscount === 0 ? null : (
                <div className="summaryDetails clearfix">
                  <div className="leftText">Product Discount</div>
                  <div className="rightText">
                    -₹
                    {summeryData.productDiscount}
                  </div>
                </div>
              )}

              {summeryData.orderDiscount === 0 ? null : (
                <div className="summaryDetails clearfix">
                  <div className="leftText">Order Discount</div>
                  <div className="rightText">
                    -₹
                    {summeryData.orderDiscount}
                  </div>
                </div>
              )}

              <div className="divider" />
              <div className="summaryDetails subTotaltext clearfix">
                <div className="leftText">Total</div>
                <div className="rightText">₹{summeryData.netAmount}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="clearfix" />
        <div className="refundsummarydata">
          {cancelRefundSummary && cancelRefundSummary.length > 0 ? (
            <>
              <h4 className="refundSummaryTitle">Refund Summary</h4>
              <table className="refundTable">
                <tr className="refundDataHeading">
                  <th>Transaction ID</th>
                  <th>Amount</th>
                  <th>Mode</th>
                </tr>
                {cancelRefundSummary.map(refundElement => {
                  return (
                    <tr>
                      <td>{refundElement.transactionID}</td>
                      <td>₹{formatPrice(refundElement.refundAmount)}</td>
                      <td>{refundElement.paymentMode}</td>
                    </tr>
                  );
                })}
              </table>
            </>
          ) : null}
        </div>
      </>
    );
  }
}

export default OrderSummery;
