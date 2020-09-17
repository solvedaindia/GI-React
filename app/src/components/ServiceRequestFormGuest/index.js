import React from "react";
import { Link } from "react-router-dom";
import { getCookie } from "../../utils/utilityManager";
import apiManager from "../../utils/apiManager";
import {
  getDetailtForSerReq,
  saveServiceRequest
} from "../../../public/constants/constants";
import UserAccInfo from "../UserAccInfo/userAccInfo";
import Dropdown from "../ServiceRequestForm/dropdown";
import AddAddressForm from "../../components/MyAccountComponents/ManageAddress/addAddressForm";
import EnterInvoiceView from "../ServiceRequestForm/enterInvoiceView";
import Checkboxes from "../ServiceRequestForm/checkboxes";
import UploadImage from "../ServiceRequestForm/uploadImage";
import "../../../public/styles/myAccount/service-request.scss";
import { validateFullName } from "../../utils/validationManager";

class ServiceRequestFormGuest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      productCategory: [],
      descriptionText: "",
      serviceRequestReasons: [],
      characterCount: 50,
      characterLimit: 50,
      selectedInvoice: "",
      selectedProductCategory: null,
      selectedReason: [],
      otherReason: "",
      guestAddress: null,
      isSaveBtnDisabled: true,
      selectedImages: [],
      invoiceFile: "",
      showInvoiceDisclaimer: true
    };
  }

  componentDidMount() {
    this.getDetailAPI();
  }

  getDetailAPI() {
    apiManager
      .get(getDetailtForSerReq)
      .then(response => {
        this.setState({
          productCategory: response.data.data.productCategory,
          serviceRequestReasons: response.data.data.serviceReasonList
        });
      })
      .catch(error => {});
  }

  onEnterInvoiceTextChanged(value) {
    this.setState({
      showInvoiceDisclaimer: value.length == 0,
      selectedInvoice: value
    });
  }
  onInvoiceFileSelection(value) {
    this.setState({
      invoiceFile: value
    });
  }

  resetLoginValues() {
    this.setState({
      showLogin: false
    });
  }

  onTextareaInput(evt) {
    const val = evt.target.value;
    if (val === "" || validateFullName(val)) {
      this.setState({
        descriptionText: val,
        characterCount: this.state.characterLimit - val.length
      });
    }
  }

  getProductCategorySelection(value) {
    this.state.selectedProductCategory = value;
  }

  getServiceRequestReason(value) {
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

  onAddressChange(addressData) {
    this.state.guestAddress = addressData;
  }

  onSubmitForm() {
    this.refs.child.onSavebuttonClick();

    // let reason = "";
    // this.state.selectedReason.map((data) => {
    //   if (reason == "")
    //     reason = data
    //   else
    //     reason = reason + "," + data
    // })

    const param = {
      prodCategory: this.state.selectedProductCategory,
      prodDesc: this.state.descriptionText,
      partNumber: "",
      addressId: "",
      invoiceNo: this.state.selectedInvoice,
      invoiceURL: this.state.invoiceFile,
      serviceRequestReason: this.state.otherReason,
      // otherReason: this.state.otherReason,
      images: this.state.selectedImages,
      addressData: this.state.guestAddress
    };

    apiManager
      .post(saveServiceRequest, param)
      .then(response => {
        if (response.data.data && response.data.data.serviceRequestId) {
          alert(
            "Your service request has been submitted successfully. Our customer care agents will get intouch with you shortly."
          );
          document.location.href = "/";
        }
      })
      .catch(error => {});
  }

  render() {
    let isSaveBtnDisabled = true;
    //if(this.state.selectedProductCategory!="" && this.state.selectedReason.length>0  && this.state.selectedImages.length>0)
    if (
      this.state.selectedProductCategory != "" &&
      this.state.otherReason != "" &&
      this.state.selectedImages.length > 0
    ) {
      isSaveBtnDisabled = false;
    }

    return (
      <div className="container">
        <div className="guest-service service-request">
          <h1 class="heading">Service Request</h1>
          {this.renderRequestServiceMsg()}
          {this.renderProdcutCategory()}
          {this.renderTextField()}
          <p className="notification-title">
            *Please note that the service may be chargeable, in case of
            non-Godrej product
          </p>
          <div className="guest-border-box">
            <div className="guest-address-form">
              <AddAddressForm
                isFromServiceRequest={true}
                onAddressChange={this.onAddressChange.bind(this)}
                ref="child"
              />
            </div>
            <div className="invice-selection guest-type">
              <EnterInvoiceView
                type={"ser"}
                onInvoiceChange={this.onEnterInvoiceTextChanged.bind(this)}
                onInvoiceFile={this.onInvoiceFileSelection.bind(this)}
              />
              {this.state.showInvoiceDisclaimer ? (
                <div className="notification-title">
                  *Please note that the service may be chargeable, in case of
                  missing invoice details
                </div>
              ) : null}
            </div>
            {this.renderServiceRequestReason()}
            {this.renderUploadImage()}
            <div className="actionBtnWrapper">
              <button className="btn-cancel btn">Cancel</button>
              <button
                disabled={isSaveBtnDisabled}
                className="btn-save btn"
                onClick={this.onSubmitForm.bind(this)}
              >
                Submit
              </button>
            </div>
            {this.state.showLogin ? (
              <UserAccInfo
                fromWishlistPro
                resetCallbackPro={this.resetLoginValues.bind(this)}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  renderRequestServiceMsg() {
    if (getCookie("isLoggedIn") === "true") {
      return (
        <>
          <div className="request-service-msg">
            <p className="text">
              Go to ‘My Account’ > Orders and click on the ‘Request Service’
              button against the product you wish to get serviced. &nbsp;
              <Link
                className="guest-login-link"
                to={{ pathname: "/myAccount", state: { from: "myorder" } }}
              >
                {"View your past orders"}
              </Link>
            </p>
            <p>
              If you have made a store purchase, please fill the form shown blow
              to place a service request.
            </p>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="request-service-msg">
            <p className="text">
              Go to ‘My Account’ > Orders and click on the ‘Request Service’
              button against the product you wish to get serviced.{" "}
              <a
                className="guest-login-link"
                onClick={() =>
                  this.setState({ showLogin: !this.state.showLogin })
                }
              >
                {" Click here to log in and view your past orders"}
              </a>
            </p>
            <p className="text">
              If you have made a guest purchase online or at the store, please
              enter the form below to place a service request.
            </p>
          </div>
        </>
      );
    }
  }

  renderProdcutCategory() {
    return (
      <div className="product-category">
        <h4 className="heading">Product Details<span>*</span></h4>
        <Dropdown
          title="Please Select Product Category"
          data={this.state.productCategory}
          onSelection={this.getProductCategorySelection.bind(this)}
        />
      </div>
    );
  }

  renderTextField() {
    return (
      <div className="service-request-desc guest-type">
        <h5 className="heading">{this.props.title}</h5>
        <textarea
          className="text-area"
          onChange={evt => this.onTextareaInput(evt)}
          name="the-textarea"
          id="textareaDesc"
          maxlength={this.state.characterLimit}
          //placeholder="Please Specify"
          value={this.state.descriptionText}
          placeholder="Please enter product description"
          autofocus
          rows="4"
          cols="50"
        />
        <label className="label-text">
          {this.state.characterCount} Character
          {this.state.characterCount <= 1 ? "" : "s"} remaining
        </label>
      </div>
    );
  }

  renderServiceRequestReason() {
    return (
      <div className="service-request-reasons">
        <h4 className="heading">Reason For Service Request<span>*</span></h4>
        <Checkboxes
          data={this.state.serviceRequestReasons}
          title="Reason for Service Request"
          onSelection={this.getServiceRequestReason.bind(this)}
          onOtherText={this.onOtherReasonEnter.bind(this)}
        />
      </div>
    );
  }

  renderUploadImage() {
    return (
      <div className="add-img">
        <h4 className="heading">Add Image<span>*</span></h4>
        <UploadImage
          type={"ser"}
          onImageAddRemove={this.onImageAddRemove.bind(this)}
        />
      </div>
    );
  }
}
export default ServiceRequestFormGuest;
