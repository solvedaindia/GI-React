import React from "react";
import { imagePrefix } from "../../../../public/constants/constants";
import OrderStatusBar from "../../MyAccountComponents/MyOrder/orderStatusBar";
import {
  formatPrice,
  isMobile,
  mapPaymentMethodMode
} from "../../../utils/utilityManager";
const showImg = (
  <img
    className="iconImg"
    src={require("../../SVGs/plusIcon.svg")}
    alt="Increase"
  />
);
const hideImg = (
  <img
    className="iconImg"
    src={require("../../SVGs/minusIcon.svg")}
    alt="Decrease"
  />
);

class RSOItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpend: false,
      expendCollapseText: showImg,
      isInCurrenStatus: false
    };
  }

  collapseExpendClicked() {
    this.setState({
      isExpend: !this.state.isExpend,
      expendCollapseText: !this.state.isExpend ? hideImg : showImg
    });
  }

  render() {
    const data = this.props.data;
    if (data === undefined || data === null) {
      return null;
    }
    const statusArr = data.displaySeq.split(",");
    return (
      <>
        <div className="tabBar clearfix">
          <ul className="heading clearfix">
            <li className="list">
              <span className="heading-top">Return ID</span>{" "}
              <span className="heading-sub">{data.returnId}</span>
            </li>
            <li className="list">
              <span className="heading-top">Returned on</span>{" "}
              <span className="heading-sub">{data.returnedOn}</span>
            </li>
            <li className="list">
              <span className="heading-top">Total</span>{" "}
              <span className="heading-sub">
                ₹{formatPrice(data.returnOrderTotal)}
              </span>
            </li>
          </ul>
          <button
            className="btn-collapse"
            onClick={this.collapseExpendClicked.bind(this)}
          >
            Return Details
            {this.state.expendCollapseText}
          </button>
        </div>
        <div className="itemBox">
          <div
            className={`orderSummery  clearfix ${
              this.state.isExpend ? `heightActive` : `heightInActive`
            }`}
          >
            <div className="refundsummarydata">
              <h4 className="refundSummaryTitle">Refund Summary</h4>
              {isMobile() ? (
                <table className="refundTable">
                  {data.returnRefundSummary &&
                    Array.isArray(data.returnRefundSummary) &&
                    data.returnRefundSummary.map(refundElement => {
                      return (
                        <>
                          <tr>
                            <td>Transaction ID </td>
                            <td>{refundElement.transactionID}</td>
                          </tr>
                          <tr>
                            <td>Amount</td>
                            <td>₹{formatPrice(refundElement.refundAmount)}</td>
                          </tr>
                          <tr>
                            <td>Mode</td>
                            <td>
                              {mapPaymentMethodMode(refundElement.paymentMode)}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </table>
              ) : (
                <table className="refundTable">
                  <tr className="refundDataHeading">
                    <th>Transaction ID</th>
                    <th>Amount</th>
                    <th>Mode</th>
                  </tr>
                  {data.returnRefundSummary &&
                    Array.isArray(data.returnRefundSummary) &&
                    data.returnRefundSummary.map(refundElement => {
                      return (
                        <tr>
                          <td>{refundElement.transactionID}</td>
                          <td>₹{formatPrice(refundElement.refundAmount)}</td>
                          <td>
                            {mapPaymentMethodMode(refundElement.paymentMode)}
                          </td>
                        </tr>
                      );
                    })}
                </table>
              )}
            </div>
          </div>
          {data.items &&
            Array.isArray(data.items) &&
            data.items.map((prd, index) => {
              return this.renderProducts(prd, data.items.lenght, index);
            })}
          <div class="orderProduct removeBorder clearfix">
            <OrderStatusBar
              shipmentDataPro={data}
              customClassPro="trackorder-wrap"
            />
          </div>
        </div>
      </>
    );
  }

  renderProducts(productData, totalItems, itemIndex) {
    return (
      <>
        <div className="clearfix" />
        <div
          className={
            totalItems - 1 === itemIndex
              ? "orderProduct clearfix removeBorder"
              : "orderProduct clearfix"
          }
        >
          <div className="orderimgbox clearfix">
            <div className="imgBox">
              <img
                alt={productData.productName}
                src={
                  productData.thumbnail !== ""
                    ? `${imagePrefix}${productData.thumbnail}`
                    : require("../../../../public/images/plpAssests/placeholder-image.png")
                }
                className="imgfullwidth"
              />
            </div>
            <div className="product-text">
              <p className="heading">{productData.productName}</p>
              <p className="description">({productData.shortDescription})</p>
              <p className="price">
                <span className="discount-price">
                  ₹{productData.offerPrice}
                </span>
              </p>
              <div className="quantity-shipping clearfix">
                <div className="quantity">
                  <span className="heading">Quantity</span>
                  <span className="textval">{productData.quantity}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default RSOItem;
