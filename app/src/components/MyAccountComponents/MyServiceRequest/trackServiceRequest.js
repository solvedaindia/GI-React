import React from 'react';
import OrderStatusBar from '../MyOrder/orderStatusBar';
import '../../../../public/styles/myAccount/trackMyOrder.scss';

class TrackServiceRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trackStatusData: {
        "status":"Shipped",
      "quantity":"2",
      "shipmentKey":"201909191600341918012",
      "createdDate":"Wednesday, 18 September 2019",
      "expectedShipmentDate":"",
      "shippedDate":"Thursday, 19 September 2019","packedDate":"",
      "expectedDeliveryDate":"Monday, 23 September 2019","deliveryDate":"",
      "installationReqDate":"","techAssignDate":"",
      "serviceRequestNo":"",
      "expectedInstallationDate":"",
      "installationInProgressDate":"",
      "installationCompleteDate":"",
      "installationDate":"",
      "invoiceNo":"7AI_12055375",
      "statusLine":"Created,Packed,Shipped,Delivered,Installed"},
    };
  }

  render() {
    return (
      <div className="trackMyOrder">
        <div className="bottomDivider">
          <button className="backBtn" onClick={this.props.renderSelectionPro} >{`< Back`}</button>
        </div>

        <h4>Track Service Request</h4>

        {this.renderProduct()}
        <OrderStatusBar shipmentDataPro={this.state.trackStatusData} customClassPro='trackorder-wrap' />
      </div>
    );
  }

  renderProduct() {
    return (
      <div className="itemBox">
        <div className="clearfix" />
        <div className="orderProduct clearfix removeBorder" /* className={this.props.totalItems - 1 === this.props.itemIndex ? "orderProduct clearfix removeBorder" : "orderProduct clearfix"} */>
          <div className="orderimgbox clearfix">
            <div className="imgBox">
              <img /* alt={productData.productName} */ src={require('../../../../public/images/plpAssests/placeholder-image.png')} className="imgfullwidth" />
            </div>
            <div className="product-text">
              <p className="heading">Product Name</p>
              <p className="description">(Shor Description)</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

}



export default TrackServiceRequest;
