import React from "react";
import Dropdown from "../ServiceRequestForm/dropdown";
import UploadImage from "../ServiceRequestForm/uploadImage";
import BankDetails from "./bankDetail";
import { isMobile } from "../../utils/utilityManager";
//import Checkboxes from "../ServiceRequestForm/checkboxes";
import apiManager from "../../utils/apiManager";
import {
  // getAddressListAPI,
  storeId,
  accessToken,
  getDetailtForSerReq,
  returnOrderShipment,
  espotReasonOrderReturn,
  BankListAPI
} from "../../../public/constants/constants";
import "../../../public/styles/myAccount/service-request.scss";
import {imagePrefix} from "../../../public/constants/constants";

class ReturnRequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      returnRequestReasons: [],
      selectedQuantity: "1",
      selectedReason: "",
      isBankDetailsValid: props.paymentMode !== "COD",
      selectedImages: [],
      otherReason: "",
      showTextview: false,
      characterCount: 100,
      characterLimit: 100,
      fullPaymentMode: props.paymentMode,
      bankInfo: {}
    };
    this.onOtherReasonEnter = this.onOtherReasonEnter.bind(this);
    this.onTextareaInput = this.onTextareaInput.bind(this);
    this.onValidationChange = this.onValidationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.returnOrderShipmentAPI = this.returnOrderShipmentAPI.bind(this);
    this.getReturnRequestQuantity = this.getReturnRequestQuantity.bind(this);
    this.getBankDetails = this.getBankDetails.bind(this);
  }

  componentDidMount() {
    //this.returnOrderShipmentAPI();
    this.fetchReasonArray();
  }

  fetchReasonArray()
    {
        apiManager
        .get(espotReasonOrderReturn)
        .then(response => {
          this.setState({
            returnRequestReasons:response.data.data,
          })
        })
        .catch(error => {
      
        });
    }

  // to be modified ...
  // getDetailAPI = () => {
  //   apiManager
  //     .get(getDetailtForSerReq + "56101505SD00084")
  //     .then(response => {
  //       this.setState({
  //         returnRequestReasons: response.data.data.serviceReasonList
  //       });
  //     })
  //     .catch(error => {});
  // };

  // addToWishlistAPI() {
  //   const data = {
  //     sku_id: this.props.uniqueId,
  //   };
  //   apiManager
  //     .post(addToWishlist, data)
  //     .then(response => {

  //     getUpdatedWishlist(this);
  //       this.setState({
  //         wishlistCurrentImage: this.wishlistAddedImg,
  //         wishlistPopup: this.wishlistPopupItem(),
  //       });
  //     })
  //     .catch(error => {
  //     });
  // }

 
  returnOrderShipmentAPI() {
    let returnReason;
    let imageEndpoint1 = `${imagePrefix}${thumbnail}`;
    let imageEndpoint2 = `${imagePrefix}${thumbnail2}`;
    
    const {
      selectedQuantity,
      selectedReason, 
      selectedImages, 
      otherReason,
      fullPaymentMode,
      bankInfo   
    } = this.state;
    if (selectedReason === 'Other' )
    returnReason = otherReason;

    returnReason = selectedReason;
     
    const {
      partNumber,
      shipmentData,
      returnUnitPrice,
      subLineNo,
      primeLineNo,
      thumbnail,
      thumbnail2
    } = this.props.orderItemData;

    const {
      transactions,
      orderID,
    } = this.props.orderData;
  

    const data = {
        "orderId": orderID,
        "shipmentNo": this.props.orderShipmentData && this.props.orderShipmentData.shipmentNo,
        "partNumber": partNumber,
        "price": returnUnitPrice,
        "quantity": selectedQuantity,
        "returnReason": returnReason,
        "refundMethod": transactions && transactions[0].paymentMode,
        "bankDetails":{ 
          "name": bankInfo.Name,
          "accountNO": bankInfo.AccountNumber,
          "confirmAccountNO": bankInfo.AcoountNumberConfirm,
          "IFSCCode": bankInfo.ifscCode
         },
        "images":[
            imageEndpoint1,
            imageEndpoint2
        ],
        "invoiceNo": this.props.orderShipmentData && this.props.orderShipmentData.invoiceNo,
        "shipNode": this.props.orderShipmentData && this.props.orderShipmentData.shipNode,
        "primeLineNo": primeLineNo,
        "subLineNo": subLineNo,
      //   "creditCardNo": transactions[0].creditCardNo,
        "transactionId": transactions && transactions[0].transactionID,
        "transactionDate": transactions && transactions[0].transactionDate
      };
      console.log("returnOrderShipment",data);
      apiManager
      .post(returnOrderShipment, data)
      .then(response => {
        console.log(response);
      })
      .catch(error => {});
  }

  getReturnRequestReason(value) {
    this.setState({
      selectedReason: value
    });
  }

  getReturnRequestQuantity(value) {
    this.setState({
      selectedQuantity: value
    });
  }

  getBankDetails(value) {
    // debugger;
    alert("aaaa");
    this.setState({
      bankInfo: value
    });
  }

  onOtherReasonEnter(value) {
    this.setState({
      otherReason: value
    });
  }

  onImageAddRemove(value) {
    this.setState({
      selectedImages: value
    });
  }

  onTextareaInput() {
    this.setState({
      characterCount: 100 - document.getElementById("textareaRR").value.length
    });
    //this.props.onSelection([document.getElementById('textareaRR').value]);
    this.onOtherReasonEnter(document.getElementById("textareaRR").value);
  }
  renderTextField() {
    return (
      <div className="service-request-desc">
        <h5>{this.props.title}</h5>
        <textarea
          onChange={() => this.onTextareaInput()}
          name="the-textarea"
          id="textareaRR"
          maxlength={this.state.characterLimit}
          placeholder="Please Specify"
          autofocus
          rows="4"
          cols="50"
          className="text-area"
        />
        <label className="label-text">
          {" "}
          {this.state.characterCount} Character
          {this.state.characterCount <= 1 ? "" : "s"} remaining
        </label>
      </div>
    );
  }

  onValidationChange(isInputValid) {
    this.setState({ isBankDetailsValid: isInputValid });
  }

  renderRefund() {
    return (
      <div className="refund-mode-wrapper">
        <h4 className="heading">Refund Mode</h4>
        <div className="radioBtn">
          <input
            className="inputBox"
            id="paymentMode"
            type="radio"
            value={this.state.fullPaymentMode}
            checked={true}
          />
          <label htmlFor="paymentMode" className="label-text">
            {this.state.fullPaymentMode === "COD"
              ? this.state.fullPaymentMode
              : "Full Online Payment"}
          </label>
        </div>
        <div className="notification-title">
          Your refund will be processed to
          {this.state.fullPaymentMode === "COD"
            ? " Bank Account"
            : ` ${this.state.fullPaymentMode}`}
        </div>
        {this.state.fullPaymentMode === "COD" ? (
          <BankDetails onSubmit={this.getBankDetails} handleInputValidation={this.onValidationChange} />
        ) : null}
      </div>
    );
  }

  handleSubmit() {
    console.log(this.props.renderSelectionPro);
    console.log(this.state);
    this.returnOrderShipmentAPI();
  }

  render() {
    console.log(this.props.orderData);
    console.log(this.props.orderItemData);
    
    console.log(this.props.orderList);
    const { isBankDetailsValid, selectedImages, selectedReason } = this.state;
    const isSaveDisabled =
      !isBankDetailsValid || !selectedImages.length || !selectedReason.length;

    return (
      <div>
        <div className="trackMyOrder service-request return-request">
          <div class="bottomDivider">
            <button
              className="backBtn"
              onClick={this.props.renderReturnRequestPro}
            >{`< Back`}</button>
          </div>
          <div class="ongoingOrder">Return Products</div>

          {this.renderProductDetails()}
          {this.renderReturnRequestReason()}
          {this.renderUploadImage()}
          {this.renderRefund()}

          <div className="actionBtnWrapper">
            <button
              className="btn-cancel btn"
              onClick={
                isMobile() ? this.props.onCancel : this.props.renderReturnRequestPro
              }
            >
              Cancel
            </button>
            <button
              disabled={isSaveDisabled}
              onClick={this.handleSubmit}
              className="btn-save btn"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderUploadImage() {
    return (
      <div className="add-img">
        <h4 className="heading">Add Image</h4>
        <UploadImage type={"ser"}  onImageAddRemove={this.onImageAddRemove.bind(this)} />
      </div>
    );
  }

  renderReturnRequestReason() {
    return (
      <div className="product-category">
        <h4 className="heading">Reason For Return Request</h4>
        <Dropdown
          data={this.state.returnRequestReasons}
          title="Reason for Return Request"
          onSelection={this.getReturnRequestReason.bind(this)}
          onOtherText={this.onOtherReasonEnter.bind(this)}
        />
        {this.state.selectedReason === "Other" ? this.renderTextField() : null}
      </div>
    );
  }

  renderProductDetails() {
    // debugger;
    let data = this.props.orderItemData;
    let shipmentData = this.props.orderShipmentData;
    let imageEndpoint = `${imagePrefix}${data.thumbnail}`;
    let cancelQuantity = [];
    if (data.quantity>0) {
      let i;
      for(i=1; i<= shipmentData.quantity; i++)
      cancelQuantity.push(i);
    }

    return (
      <>
        <div className="itemBox">
          <div className="orderProduct clearfix">
            <div className="orderimgbox clearfix">
              <div className="imgBox">
                <img
                  src={imageEndpoint}
                  className="imgfullwidth"
                />
              </div>
              <div className="product-text">
                <p className="heading">{data.productName}</p>
                <p className="description">
                  ({data.shortDescription})
                </p>
                <p className="price">
                  <span className="discount-price">
                    ₹ {data.returnUnitPrice}
                  </span>
                </p>
                <div className="quantity-shipping clearfix">
                  <div className="quantity">
                    <span className="heading">Quantity: </span>
                    {data.quantity == 0 ?
                    <>
                    <span className="textval">
                      {data.quantity}
                    </span>
                    </> :
                    <Dropdown
                      data={cancelQuantity}
                      title="1"
                      onSelection={this.getReturnRequestQuantity}
                    />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default ReturnRequestForm;
