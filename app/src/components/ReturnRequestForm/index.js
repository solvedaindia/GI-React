import React from "react";
import Dropdown from "../ServiceRequestForm/dropdown";
import UploadImage from "../ServiceRequestForm/uploadImage";
import BankDetails from "./bankDetail";
//import Checkboxes from "../ServiceRequestForm/checkboxes";
import apiManager from "../../utils/apiManager";
import {
  // getAddressListAPI,
  getDetailtForSerReq,
  BankListAPI
} from "../../../public/constants/constants";
import "../../../public/styles/myAccount/service-request.scss";

class ReturnRequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      returnRequestReasons: [
        "Defective item recieved",
        "Wrong product recieved",
        "Incorrect size",
        "Different color",
        "Quality issues",
        "Image shown does not match actual product",
        "Other"
      ],
      selectedReason: "",
      isBankDetailsValid: props.paymentMode !== "COD",
      selectedImages: [],
      otherReason: "",
      showTextview: false,
      characterCount: 100,
      characterLimit: 100,
      fullPaymentMode: props.paymentMode
    };
    this.onOtherReasonEnter = this.onOtherReasonEnter.bind(this);
    this.onTextareaInput = this.onTextareaInput.bind(this);
    this.onValidationChange = this.onValidationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // this.getAddressListAPI();
    // this.getDetailAPI()
  }
  // to be modified ...
  getDetailAPI = () => {
    apiManager
      .get(getDetailtForSerReq + "56101505SD00084")
      .then(response => {
        this.setState({
          returnRequestReasons: response.data.data.serviceReasonList
        });
      })
      .catch(error => {});
  };

  getReturnRequestReason(value) {
    this.setState({
      selectedReason: value
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
          className='text-area'
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
      <div className='refund-mode-wrapper'>
        <h4 className="heading">Refund Mode</h4>
        <div className='radioBtn'>
        <input className='inputBox' id='paymentMode'
            type="radio"
            value={this.state.fullPaymentMode}
            checked={true}
          />
        <label htmlFor='paymentMode' className='label-text'>
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
          <BankDetails handleInputValidation={this.onValidationChange} />
        ) : null}
      </div>
    );
  }

  handleSubmit() {}

  render() {
    const { isBankDetailsValid, selectedImages, selectedReason } = this.state;
    const isSaveDisabled =
      !isBankDetailsValid || !selectedImages.length || !selectedReason.length;

    return (
      <div>
        <div className="trackMyOrder service-request return-request">
        <div class="bottomDivider">
          <button
            className="backBtn"
            onClick={this.props.renderSelectionPro}
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
              onClick={this.props.renderSelectionPro}
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
        <UploadImage onImageAddRemove={this.onImageAddRemove.bind(this)} />
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
    return (
      <>
        <div className="itemBox">
          <div className="orderProduct clearfix">
            <div className="orderimgbox clearfix">
              <div className="imgBox">
                <img
                  src={require("../../../public/images/plpAssests/placeholder-image.png")}
                  className="imgfullwidth"
                />
              </div>
              <div className="product-text">
                <p className="heading">Product Name</p>
                <p className="description">(Description)</p>
                <p className="price">
                  <span className="discount-price">₹ 202922</span>
                </p>
                <div className="quantity-shipping clearfix">
                  <div className="quantity">
                    <span className="heading">Quantity: </span>
                    <span className="textval">2</span>
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
