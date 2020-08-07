import React from "react";
import apiManager from "../../../../utils/apiManager";
import { changePasswordAPI } from "../../../../../public/constants/constants";
import "../../../../../public/styles/myAccount/trackMyOrder.scss";
import OrderItem from "../orderItem";
import TrackOrderProduct from "./trackOrderProduct";

class TrackOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onReturnRequest(shipmentData) {
    this.props.renderReturnRequest(shipmentData);
  }

  render() {
    return (
      <div className="trackMyOrder">
        <div className="bottomDivider">
          <button
            className="backBtn"
            onClick={this.props.renderSelectionPro}
          >{`< Back`}</button>
        </div>
        {this.props.trackOrderDataPro.shipmentData.map((item, index) => {
          return (
            <TrackOrderProduct
              prodctDataPro={this.props.trackOrderDataPro}
              shipmentDataPro={item}
              onRSODetail={() => {
                this.props.onRSODetail();
              }}
              onReturnRequest={this.onReturnRequest.bind(this)}
            />
          );
        })}
      </div>
    );
  }
}

export default TrackOrder;
