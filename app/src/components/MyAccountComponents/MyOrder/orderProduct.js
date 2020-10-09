import React from "react";
import OrderStatusBar from "./orderStatusBar";
import { imagePrefix } from "../../../../public/constants/constants";
import { CACELATION_WINDOW_CLOSE } from "../../../../../app/src/constants/app/cancelConstants";

class ProductOrder extends React.Component {
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

  onTrackOrderClick() {
    this.props.proceedToTrackOrderPro(this.props.allDataPro);
  }

  filterDeliveryInstallationTags() {
    if (this.props.prodctDataPro.shipmentData) {
      const shipmentData = this.props.prodctDataPro.shipmentData[0];
      if (shipmentData !== undefined) {
        if (shipmentData.expectedDeliveryDate !== "") {
          this.setState({
            dsNameTag: "DELIVERY ON",
            dsDateTag: shipmentData.expectedDeliveryDate.split(",")[1]
          });
        } else if (shipmentData.expectedInstallationDate !== "") {
          if (shipmentData.installationDate === "") {
            this.setState({
              dsNameTag: "INSTALLATION ON",
              dsDateTag: shipmentData.expectedInstallationDate.split(",")[1]
            });
          }
        }
      }
    }
  }

  render() {
    const productData = this.props.prodctDataPro;
    const showServiceRequestButton =
      productData.serviceRequestOrderLineFlag == "Y";
    const isServiceable = productData.isServiceable == "Y";
    const showReturnButton = this.props.isGuestTrackOrderPro
      ? false
      : productData.showReturnButton == "Y";
    let btnCancelDisable = false;
    let showCancelMessage = false;
    let showCancelButton = false;
    const showReturnMessage = productData.returnMssg;
    // const showReturnMessage = "item not eligible for return";
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
    return (
      <>
        <div className="clearfix" />
        <div
          className={
            this.props.totalItems - 1 === this.props.itemIndex
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
                {productData.shipmentData &&
                productData.shipmentData.length > 1 ? null : (
                  <div className="delivery quantity">
                    <span className="heading">{this.state.dsNameTag}</span>
                    <span className="textval">{this.state.dsDateTag}</span>
                  </div>
                )}
              </div>
              {/*Cance message condtion replaced by true */}
              {showCancelMessage && (
                <div className="cancelation-text-info">
                  <span className="textval">{CACELATION_WINDOW_CLOSE}</span>
                </div>
              )}

              {/*return message condtion replaced by true */}
              {showReturnMessage && (
                <div className="cancelation-text-info">
                  <span className="textval">{showReturnMessage}</span>
                </div>
              )}
            </div>
          </div>

          <div className="orderbtn">
            {/* <button className="btn-borderwhite btn-cancel">Cancel Order</button> // Not in Phase1 as Per BRD */}
            {productData.shipmentData && productData.shipmentData.length > 0 ? (
              <button
                className="btn-borderwhite"
                onClick={evt =>
                  this.props.proceedToTrackOrderPro(
                    this.props.prodctDataPro,
                    this.props.allDataPro
                  )
                }
              >
                {showServiceRequestButton ? "View Item History" : "Track Item"}
              </button>
            ) : null}

            {showServiceRequestButton && (
              <button
                className="btn-borderwhite cancel-item"
                onClick={evt =>
                  this.props.proceedToServiceRequest(
                    this.props.prodctDataPro,
                    this.props.allDataPro
                  )
                }
              >
                Service Request
              </button>
            )}

            {showReturnButton && (
              <button
                className="btn-borderwhite cancel-item"
                onClick={evt =>
                  this.props.proceedToTrackOrderPro(
                    this.props.prodctDataPro,
                    this.props.allDataPro
                  )
                }
              >
                Return Item
              </button>
            )}

            {showCancelButton && (
              <button
                className={
                  btnCancelDisable
                    ? "btn-borderwhite cancel-item disabled"
                    : "btn-borderwhite cancel-item"
                }
                onClick={evt =>
                  this.props.showCancelModal(this.props.prodctDataPro)
                }
              >
                {cancelText}
              </button>
            )}
          </div>
          {/* <div className='clearfix'></div> //GIP-111
          {productData.shipmentData && productData.shipmentData.length === 1 ?
            <OrderStatusBar shipmentDataPro={productData.shipmentData[0]} customClassPro='trackorder-wrap' />
            : null} */}
        </div>
      </>
    );
  }
}

export default ProductOrder;
