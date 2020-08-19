import React from "react";
import OrderStatusBar from "../MyOrder/orderStatusBar";
import "../../../../public/styles/myAccount/trackMyOrder.scss";
import { imagePrefix } from "../../../../public/constants/constants";

class TrackServiceRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trackStatusData: this.props.dataPro.serviceRequestMetaData,
      trackData: this.props.dataPro
    };
  }

  render() {
    return (
      <div className="trackMyOrder">
        {this.renderProduct()}
        <OrderStatusBar
          shipmentDataPro={this.state.trackStatusData}
          customClassPro="trackorder-wrap"
        />
      </div>
    );
  }

  renderProduct() {
    return (
      <div className="itemBox">
        <div className="clearfix" />
        <div
          className="orderProduct clearfix removeBorder" /* className={this.props.totalItems - 1 === this.props.itemIndex ? "orderProduct clearfix removeBorder" : "orderProduct clearfix"} */
        >
          <div className="orderimgbox clearfix">
            <div className="imgBox">
              <img
                /* alt={productData.productName} */ src={
                  imagePrefix + this.state.trackData.thumbnail
                }
                className="imgfullwidth"
              />
            </div>
            <div className="product-text">
              <p className="heading">{this.state.trackData.productName}</p>
              <p className="description">
                {this.state.trackData.shortDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TrackServiceRequest;
