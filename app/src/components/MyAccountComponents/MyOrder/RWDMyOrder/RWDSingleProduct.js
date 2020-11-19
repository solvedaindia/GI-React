import React from "react";
import apiManager from "../../../../utils/apiManager";
import {
  changePasswordAPI,
  imagePrefix
} from "../../../../../public/constants/constants";
import OrderStatusBar from "../orderStatusBar";
import { CACELATION_WINDOW_CLOSE } from "../../../../../../app/src/constants/app/cancelConstants";

class RWDSingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dsNameTag: null,
      dsDateTag: null
    };
  }

  componentDidMount() {
    this.filterDeliveryInstallationTags();
  }

  showOrderDetail() {
    this.props.orderDetailCallbackPro(this.props.orderCompleteDataPro);
  }

  trackOrderFromViewOrder(data) {
    this.props.viewOrderTrackCallbackPro(data);
  }

  filterDeliveryInstallationTags() {
    if (
      this.props.orderDataPro.orderItemStatus &&
      this.props.orderDataPro.orderItemStatus === "Cancelled"
    ) {
      return;
    }
    const shipmentData = this.props.orderDataPro.shipmentData[0];
    if (shipmentData && shipmentData.expectedDeliveryDate !== "") {
      this.setState({
        dsNameTag: "Delivery on: ",
        dsDateTag:
          shipmentData.expectedDeliveryDate.split(",")[0] +
          ", " +
          shipmentData.expectedDeliveryDate.split(",")[1]
      });
    } else if (shipmentData && shipmentData.expectedInstallationDate !== "") {
      if (shipmentData.installationDate === "") {
        this.setState({
          dsNameTag: "Installation On: ",
          dsDateTag:
            shipmentData.expectedInstallationDate.split(",")[0] +
            ", " +
            shipmentData.expectedInstallationDate.split(",")[1]
        });
      }
    }
  }

  render() {
    const productData = this.props.orderDataPro;
    const shipmentDataPro = this.props.shipmentDataPro;
    const showServiceRequestButton =
      productData.serviceRequestOrderLineFlag == "Y";
    const isServiceable = productData.isServiceable == "Y";
    const showReturnButton = this.props.isGuestTrackOrderPro
      ? false
      : productData.showReturnButton == "Y";
    let btnCancelDisable = false;
    let showCancelMessage = false;
    let showReturnMessage = false;
    let showReturnMessageS = false;
    let showCancelButton = false;
    let returnText = null;
    let returnTextS = null;
    let cancelText = "Cancel Item";
    if (
      productData.orderItemStatus &&
      productData.orderItemStatus === "Cancelled"
    ) {
      btnCancelDisable = true;
      showCancelMessage = false;
      showCancelButton = true;
      cancelText = "Cancelled";
    } else if (productData.cancelOrderLineFlag !== "Y") {
      showCancelMessage = false;
      showCancelButton = false;
    } else if (
      productData.cancelOrderLineFlag === "Y" &&
      productData.cancelButtonDisable !== "Y"
    ) {
      //enable cancel button
      showCancelButton = true;
      cancelText = "Cancel Item";
      showCancelMessage = false;
    } else {
      btnCancelDisable = true;
      showCancelMessage = true;
      showCancelButton = true;
      cancelText = "Cancel Item";
    }

    if (productData.returnMssg !== null) {
      showReturnMessage = true;
      returnText = productData.returnMssg;
    } else if (shipmentDataPro && shipmentDataPro.returnMessage !== null) {
      showReturnMessageS = true;
      returnTextS = shipmentDataPro.returnMessage;
    }
    return (
      <>
        <div className="itemBoxTrack clearfix">
          <div className="itemImg">
            <img
              className="imgBox"
              src={
                productData.thumbnail !== ""
                  ? `${imagePrefix}${productData.thumbnail}`
                  : require("../../../../../public/images/plpAssests/placeholder-image.png")
              }
              alt="thumbnail"
            />
          </div>
          <div className="itemInfo">
            <div className="productName">{productData.productName}</div>
            <div className="description">{productData.shortDescription}</div>
            <div className="quantity">
              Quantity:{" "}
              {this.props.isMultiTrackPro
                ? this.props.shipmentDataPro.quantity
                : productData.quantity}
            </div>
            <div className="price">₹{productData.offerPrice}</div>
            <div className="deliveryTag">
              <span>{this.state.dsNameTag}</span>
              <span>{this.state.dsDateTag}</span>
            </div>
            {/*Cance message condtion replaced by true */}
            {showCancelMessage &&
              !this.props.isGuestTrackOrderPro && (
                <div className="cancelation-text-info">
                  <span className="textval">{CACELATION_WINDOW_CLOSE}</span>
                </div>
              )}
            {/*Return message condtion replaced by true for orderline */}
            {this.props.isFromViewOrder &&
              !this.props.isGuestTrackOrderPro &&
              returnText && (
                <div className="cancelation-text-info">
                  <span className="textval">{returnText}</span>
                </div>
              )}
            {/*Return message condtion replaced by true for shipmentline */}
            {this.props.isMultiTrackPro &&
              !this.props.isGuestTrackOrderPro &&
              returnTextS && (
                <div className="cancelation-text-info">
                  <span className="textval">{returnTextS}</span>
                </div>
              )}
          </div>
        </div>
        <div className="clearfix" />
        <div className="orderStatus">
          {this.props.isFromViewOrder ? null : (
            <OrderStatusBar
              prodctDataPro={productData}
              onRSODetail={data => this.props.onRSODetail(data)}
              shipmentDataPro={
                this.props.isMultiTrackPro
                  ? this.props.shipmentDataPro
                  : productData.shipmentData[0]
              }
              customClassPro="trackorder-wrap"
            />
          )}
        </div>
        <div className="clearfix" />
        <div className="orderBtn">
          {!this.props.isMultiTrackPro ? (
            productData.shipmentData.length > 0 && this.props.hideViewDetail ? (
              <button
                className="btn-blackbg btn-block track-order-btn"
                onClick={this.trackOrderFromViewOrder.bind(this, productData)}
              >
                {showServiceRequestButton ? "View Item History" : "Track Order"}
              </button>
            ) : !this.props.isFromViewOrder &&
            this.props.hideViewDetail ? null : null
          ) : null}

          {this.props.isFromViewOrder &&
            showCancelButton &&
            !this.props.isGuestTrackOrderPro && (
              <button
                className={
                  btnCancelDisable
                    ? "btn-borderwhite disabled"
                    : "btn-borderwhite"
                }
                style={{ marginTop: "5px", width: "100%" }}
                onClick={evt =>
                  this.props.showCancelModal(
                    productData,
                    this.props.orderCompleteDataPro
                  )
                }
              >
                {cancelText}
              </button>
            )}

          {this.props.isFromViewOrder &&
            showReturnButton && (
              <button
                className="btn-borderwhite"
                style={{ marginTop: "5px", width: "100%" }}
                onClick={this.trackOrderFromViewOrder.bind(this, productData)}
              >
                Return Item
              </button>
            )}
          {!this.props.isGuestTrackOrderPro &&
            this.props.isMultiTrackPro &&
            this.props.shipmentDataPro.returnButtonDisplay == "Y" && (
              <button
                className="btn-borderwhite"
                style={{ marginTop: "5px", width: "100%" }}
                onClick={evt => this.props.onReturn(this.props.shipmentDataPro)}
              >
                Return Item
              </button>
            )}

          {!this.props.isGuestTrackOrderPro &&
            this.props.isFromViewOrder &&
            showServiceRequestButton && (
              <button
                className="btn-borderwhite"
                style={{ marginTop: "5px", width: "100%" }}
                onClick={evt =>
                  this.props.showServiceRequestForm(
                    productData,
                    this.props.orderCompleteDataPro
                  )
                }
              >
                Service Request
              </button>
            )}
        </div>
      </>
    );
  }
}

export default RWDSingleProduct;
