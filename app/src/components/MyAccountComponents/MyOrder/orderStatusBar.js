import React from "react";
import apiManager from "../../../utils/apiManager";
import { changePasswordAPI } from "../../../../public/constants/constants";
import { formatPrice } from "../../../utils/utilityManager";

class OrderStatusBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shippingStatusArr: [],
      isInCurrenStatus: false
    };
  }

  componentDidMount() {
    this.filterShippingData();
  }

  filterShippingData() {
    if (this.props.shipmentDataPro) {
      var statusArr = this.props.shipmentDataPro.statusLine.split(",");
      this.setState({
        shippingStatusArr: statusArr
      });
    }
  }

  getStatusBarCustomClassname(item, index) {
    var customClassName = "list items5";
    if (this.state.shippingStatusArr.length < 5) {
      customClassName = "list items4";
    }

    if (index === 0) {
      customClassName += " first";
    }

    if (index + 1 === this.state.shippingStatusArr.length) {
      customClassName += " last";
    }

    if (item === this.props.shipmentDataPro.status) {
      this.state.isInCurrenStatus = true;
      customClassName += " active";
    } else {
      if (this.state.isInCurrenStatus) {
        customClassName += "";
      } else {
        customClassName += " visited";
      }
    }
    return customClassName;
  }

  getStatusBarDate(item) {
    var statusDate;
    if (item === "Created") {
      statusDate = this.props.shipmentDataPro.createdDate;
    } else if (item === "Packed") {
      statusDate = this.props.shipmentDataPro.packedDate;
    } else if (item === "Shipped" || item === "Shipping") {
      statusDate = this.props.shipmentDataPro.shippedDate;
    } else if (item === "Delivered" || item === "Delivery") {
      statusDate = this.props.shipmentDataPro.deliveryDate;
    } else if (item === "Installed" || item === "Installation") {
      statusDate = this.props.shipmentDataPro.installationDate;
    }
    //----------for rso condition start
    else if (item === "Return Initiated") {
      statusDate = this.props.shipmentDataPro.returnedOn;
    } else if (item === "Item Picked Up") {
      statusDate = this.props.shipmentDataPro.itemPickedDate;
    } else if (item === "Refund Initiated") {
      statusDate = this.props.shipmentDataPro.refundInitiatedDate;
    } else if (item === "Refund Processed") {
      statusDate = this.props.shipmentDataPro.refundProcessedDate;
    }
    //----------for Service Request condition start
    else if (item === "Request Created") {
      statusDate = this.props.shipmentDataPro.serviceRequestCreatedDate;
    } else if (item === "Service Booked") {
      statusDate = this.props.shipmentDataPro.serviceBookedDate;
    } else if (item === "Serviced") {
      statusDate = this.props.shipmentDataPro.servicedDate;
    }
    //----------for Cancelation
    else if (item === 'Ordered') {
      statusDate = this.props.shipmentDataPro.createdDate;
    } else if (item === 'Cancelled') {
      statusDate = this.props.shipmentDataPro.statusDate;
    }
    return statusDate ? statusDate.split(",")[1] : null;
  }

  renderTechnicianDetailsForServiceRequest() {
    return (
      <div className="contactDetails">
        {/* <p className="heading">Contact Details</p> */}
        {/* <p className="mobiletext">
          {this.props.shipmentDataPro.technicianName}
        </p> */}
        <p className="mobiletext">
          Technician Assigned
          {/* {this.props.shipmentDataPro.technicianAssignedDate} */}
        </p>
      </div>
    );
  }

  renderRefundDetails() {
    return (
      <div className="refundDetails">
        <p className="mobiletext">
          {`Amount: ₹${this.props.prodctDataPro &&
            this.props.prodctDataPro.cancelRefundAmount !== null &&
            formatPrice(this.props.prodctDataPro.cancelRefundAmount)}`}
        </p>
        <span className="spanTxt">
          Please check order details for more information
        </span>
      </div>
    );
  }

  render() {
    var statusBarItem = this.state.shippingStatusArr.map((item, index) => {
      console.log("ksksks -- ", this);
      return (
        <li class={this.getStatusBarCustomClassname(item, index)}>
          <div className="status">{item}</div>
          <div className="deliveryDate">{this.getStatusBarDate(item)}</div>
          {item === "Refund Details" ? this.renderRefundDetails() : null}
          {item === "Service Booked" &&
          this.props.shipmentDataPro.displayTechnicianDetails === "Y"
            ? this.renderTechnicianDetailsForServiceRequest()
            : null}
          {(item === "Delivered" || item === "Undelivered") &&
            this.props.shipmentDataPro.returnShipmentOrders &&
            this.props.shipmentDataPro.returnShipmentOrders.length > 0 && (
              <div
                className="returnDetails"
                onClick={() => {
                  this.props.onRSODetail(
                    this.props.shipmentDataPro.returnShipmentOrders
                  );
                }}
              >
                CHECK RETURN DETAILS
              </div>
            )}
        </li>
      );
    });

    return (
      <div class={this.props.customClassPro}>
        <ul class="track-bar">
          {(this.state.isInCurrenStatus = false)}
          {statusBarItem}

          {/* <li class="list visited first"><div className="status">Ordered</div><div className="deliveryDate">21 June 2018</div></li>
          <li class="list previous visited  "><div className="status">Packed</div><div className="deliveryDate">21 June 2018</div></li>
          <li class="list active"> <div className="status"> Shipping</div><div className="deliveryDate">21 June 2018</div></li>
          <li class="list "> <div className="status">Delivery</div><div className="deliveryDate">21 June 2018</div></li>
          <li class="list last"><div className="status">Installation</div><div className="deliveryDate">21 June 2018</div></li> */}
        </ul>
      </div>
    );
  }
}

export default OrderStatusBar;
