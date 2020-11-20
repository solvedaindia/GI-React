import React from "react";
import RWDSingleProduct from "./RWDSingleProduct";

class RWDMultiTrack extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {}
  onReturn(shipmentData) {
    this.props.onReturn(
      this.props.orderDataPro,
      this.props.currentCompleteData,
      shipmentData
    );
  }

  showCancelModal(orderData, orderItem) {
    this.porps.showCancelModal(orderItem, orderData);
  }

  render() {
    const productData = this.props.orderDataPro;
    let shipmetNumber = 1;
    return (
      <>
        {productData.shipmentData.map((item, index) => {
          return (
            <RWDSingleProduct
              itemNum={
                item.status !== "Created" && item.status !== "Packed"
                  ? shipmetNumber++
                  : ""
              }
              orderDataPro={productData}
              onRSODetail={data => this.props.onRSODetail(data)}
              shipmentDataPro={item}
              isMultiTrackPro={true}
              showCancelModal={this.showCancelModal.bind(this)}
              currentCompleteData={this.props.currentCompleteData}
              myOrderCallbackPro={this.props.myOrderCallbackPro}
              onReturn={this.onReturn.bind(this)}
              isGuestTrackOrderPro={this.props.isGuestTrackOrderPro}
            />
          );
        })}
      </>
    );
  }
}

export default RWDMultiTrack;
