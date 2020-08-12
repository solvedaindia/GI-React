import React from "react";
import apiManager from "../../../utils/apiManager";
import { orderListAPI } from "../../../../public/constants/constants";
import "../../../../public/styles/myAccount/myOrder/myOrder.scss";
import OrderItem from "./orderItem";
import TrackOrder from "./TrackMyOrder/trackOrder";
import ServiceRequestForm from "../../ServiceRequestForm/index";
import CancelComponents from "../../cancelComponents/index";

import ReturnRequestForm from "../../ReturnRequestForm/index";
import RSODetail from "../RSO/index";

class MyOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTrackOrder: false,
      isGuestTrackOrder: this.props.isGuestTrackOrderPro,
      isServiceRequest: false,
      orderListData: [],
      isLoading: true,
      updatedTrackOrderData: null,
      isOnGoingOrderShown: false,
      isPastOrdeShown: false,
      serviceOrderData: undefined,
      serviceOrderItemData: undefined,
      //returnrequest Flags and data
      isReturnRequest: false,
      returnOrderData: undefined,
      returnOrderItemData: undefined,
      returnOrderShipmentData: undefined,
      //Lazy Load Vars
      isRSODetail: false,
      error: false,
      hasMore: true,
      isLoading: false,
      pageNumber: 1,
      pageSize: 20
    };
    this.renderSelection = this.renderSelection.bind(this);
    this.onscroll = this.onscroll.bind(this);
    this.renderReturnRequest = this.renderReturnRequest.bind(this);
    this.refreshOrderData = this.refreshOrderData.bind(this);
    this.modalRef = React.createRef();
  }

  componentDidMount() {
    addEventListener("scroll", this.onscroll);
    if (this.props.isGuestTrackOrderPro) {
      this.setState({
        orderListData: this.props.guestOrderDataPro,
        hasMore: false,
        isLoading: false
      });
    } else {
      this.getOrderList();
    }
  }
  refreshOrderData() {
    this.setState({
      orderListData: [],
      pageNumber: 1
    });
    this.getOrderList();
  }

  componentWillUnmount() {
    removeEventListener("scroll", this.onscroll);
  }

  getOrderList(isFromScroll) {
    this.setState({ isLoading: true }, () => {
      let orderAPI =
        `${orderListAPI}?` +
        `pagenumber=${this.state.pageNumber}&` +
        `pagesize=${this.state.pageSize}&`;

      apiManager
        .get(orderAPI)
        .then(response => {
          this.setState({
            orderListData: isFromScroll
              ? [...this.state.orderListData, ...response.data.data.orderList]
              : response.data.data.orderList,
            hasMore: response.data.data.orderList.length !== 0, // Now only show on 0 Products and disable it for lazyload
            isLoading: false
          });
        })
        .catch(error => {
          this.setState({
            isLoading: false,
            error: error.message
          });
        });
    });
  }

  renderSelection(trackOrderData, orderData) {
    this.setState({
      isTrackOrder: !this.state.isTrackOrder,
      updatedTrackOrderData: trackOrderData,
      returnOrderData: orderData,
      returnOrderItemData: trackOrderData
    });
  }

  renderRSODetail() {
    this.setState({
      isTrackOrder: !this.state.isTrackOrder,
      isRSODetail: !this.state.isRSODetail
    });
  }

  renderServiceRequest(orderItemData, orderData) {
    this.setState({
      isServiceRequest: !this.state.isServiceRequest,
      serviceOrderData: orderData,
      serviceOrderItemData: orderItemData
    });
  }

  renderReturnRequest(shipmentData) {
    this.setState({
      isTrackOrder: !this.state.isTrackOrder,
      isReturnRequest: !this.state.isReturnRequest,
      returnOrderShipmentData: shipmentData
    });
  }

  // renderReturnRequest(orderItemData,orderData)
  // {
  //   // debugger;
  //   this.setState({
  //     isReturnRequest: !this.state.isReturnRequest,
  //     returnOrderData: orderData,
  //     returnOrderItemData:orderItemData,
  //   });
  // }

  onscroll = () => {
    const {
      state: { error, isLoading, hasMore }
    } = this;

    var scrollYindex;
    if (
      navigator.userAgent.search("Safari") >= 0 &&
      navigator.userAgent.search("Chrome") < 0
    ) {
      //Safari browser
      scrollYindex = window.innerHeight + document.body.scrollTop;
    } else if (window.navigator.userAgent.indexOf("Edge") > -1) {
      //Edge browser
      scrollYindex = window.innerHeight + window.pageYOffset;
    } else {
      //All other browsers
      scrollYindex = window.innerHeight + document.documentElement.scrollTop;
    }

    if (error || isLoading || !hasMore) return;
    const adjustedHeight = 600;
    const windowHeight = scrollYindex;
    const windowOffsetHeight =
      document.documentElement.offsetHeight - adjustedHeight;

    if (
      windowHeight >= windowOffsetHeight &&
      windowHeight - 300 <= windowOffsetHeight
    ) {
      this.setState({ pageNumber: this.state.pageNumber + 1 });
      this.getOrderList(true);
    }
  };

  displayOnGoingPastOrder(data) {
    // Loop data.orderItems -> if any order has installation required true
    // True -> Final Status should be Installed
    // False -> Final Status should be Deliverd
    // If Final Status === Deleiverd -> show Past Orders on Deliver status
    // Else if Final Status === Installed -> show Past Orders on Installed status
    // else -> show OnGoing Orders

    if (!this.state.isPastOrdeShown && !this.state.isOnGoingOrderShown) {
      var tagOutput;
      var isInstallationRequired = true;
      data.orderItems.map(item => {
        if (item.installationRequired === "N") {
          isInstallationRequired = true;
        }
      });

      if (isInstallationRequired) {
        if (data.orderStatus === "Installed") {
          tagOutput = "Past Orders";
          this.state.isPastOrdeShown = true;
        } else {
          tagOutput = "Ongoing Orders";
          this.state.isOnGoingOrderShown = true;
        }
      } else {
        if (data.orderStatus === "Delivered") {
          tagOutput = "Past Orders";
          this.state.isPastOrdeShown = true;
        } else {
          tagOutput = "Ongoing Orders";
          this.state.isOnGoingOrderShown = true;
        }
      }

      return <div className="ongoingOrder">{tagOutput}</div>;
    } else {
      return null;
    }
  }

  componentWillReceiveProps() {}

  showCancelModal(orderData, orderItem) {
    this.modalRef.current.showModal(orderItem, orderData);
  }

  loadingbar() {
    return (
      <div className="lazyloading-Indicator">
        <img
          id="me"
          className="loadingImg"
          src={require("../../../../public/images/plpAssests/lazyloadingIndicator.svg")}
          alt="Loading Orders"
        />
      </div>
    );
  }

  render() {
    // debugger;
    this.state.isOnGoingOrderShown = false;
    this.state.isPastOrdeShown = false;
    return (
      <div className="myOrder">
        {this.state.isTrackOrder ? (
          <TrackOrder
            renderSelectionPro={this.renderSelection.bind(this)}
            trackOrderDataPro={this.state.updatedTrackOrderData}
            onRSODetail={() => {
              this.renderRSODetail();
            }}
            renderReturnRequest={this.renderReturnRequest.bind(this)}
          />
        ) : this.state.isServiceRequest ? (
          <ServiceRequestForm
            orderData={this.state.serviceOrderData}
            orderItemData={this.state.serviceOrderItemData}
            renderServiceRequestPro={this.renderServiceRequest.bind(this)}
          />
        ) : this.state.isRSODetail ? (
          <RSODetail
            backPress={() => {
              this.renderRSODetail();
            }}
            orderData={this.state.returnOrderData}
          />
        ) : this.state.isReturnRequest ? (
          <ReturnRequestForm
            orderList={this.state.orderListData}
            // dataPro={this.state.updatedTrackOrderData}
            renderSelectionPro={this.renderSelection.bind(this)}
            trackOrderDataPro={this.state.updatedTrackOrderData}
            renderReturnRequestPro={this.renderReturnRequest}
            orderData={this.state.returnOrderData}
            orderItemData={this.state.returnOrderItemData}
            orderShipmentData={this.state.returnOrderShipmentData}
            paymentMode="COD"
          />
        ) : this.state.orderListData.length !== 0 ? (
          this.state.orderListData.map((data, key) => {
            return (
              <>
                {this.displayOnGoingPastOrder(data)}
                <OrderItem
                  renderSelectionPro={this.renderSelection.bind(this)}
                  renderServiceRequestPro={this.renderServiceRequest.bind(this)}
                  isGuestTrackOrderPro={this.state.isGuestTrackOrder}
                  showCancelModal={this.showCancelModal.bind(this)}
                  orderItemData={data}
                  renderReturnRequestPro={this.renderReturnRequest}
                />
              </>
            );
          })
        ) : this.state.isLoading ? (
          this.loadingbar()
        ) : (
          <div className="noOrder">No Orders to Show</div>
        )}

        <CancelComponents
          ref={this.modalRef}
          refreshOrderData={this.refreshOrderData}
        />
      </div>
    );
  }
}

export default MyOrder;
