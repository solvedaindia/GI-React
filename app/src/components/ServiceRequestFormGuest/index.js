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
import ProgressButton from "../Button/progressButton";
import history from "../../utils/history";

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
      selectedProductCategory: "",
      selectedReason: [],
      otherReason: "",
      guestAddress: undefined,
      isSaveBtnDisabled: true,
      selectedImages: [],
      invoiceFile: "",
      invoiceFileError: false,
      showInvoiceDisclaimer: true,

      isProcessing: false,
      errorImageMessage: undefined,
      errorProductCategory: undefined,
      errorProdcuctDesp: undefined,
      errorReason: undefined
      //This field is required
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
      selectedInvoice: value,
      invoiceFileError: false
    });
  }
  onInvoiceFileSelection(value) {
    this.setState({
      invoiceFile: value,
      invoiceFileError: false
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
        characterCount: this.state.characterLimit - val.length,
        errorProdcuctDesp: undefined,
        guestAddress: undefined
      });
    }
  }

  getProductCategorySelection(value) {
    // this.state.selectedProductCategory = value;
    this.setState({
      selectedProductCategory: value,
      errorProductCategory: undefined,
      guestAddress: undefined
    });
  }

  getServiceRequestReason(value) {
    this.setState({
      selectedReason: value
    });
  }

  onOtherReasonEnter(value) {
    this.setState({
      otherReason: value,
      errorReason: undefined,
      guestAddress: undefined
    });
  }

  onImageAddRemove(value) {
    this.setState({
      selectedImages: value,
      errorImageMessage: undefined,
      guestAddress: undefined
    });
  }
  onImageError(value) {
    this.setState({
      errorImageMessage: value
    });
  }

  onAddressChange(addressData) {
    this.state.guestAddress = addressData;
    console.log("onAddressChange", addressData);
  }

  validateForm() {
    let flag = true;
    if (this.state.selectedProductCategory === "") {
      this.setState({
        errorProductCategory: "This is a required field"
      });
      const element = document.getElementById("product-category");
      if (element) element.scrollIntoView();
      flag = false;
    }
    if (this.state.descriptionText === "") {
      this.setState({
        errorProdcuctDesp: "This is a required field"
      });
      const element = document.getElementById("product-category");
      if (element && flag) element.scrollIntoView();
      flag = false;
    }
    if (this.state.guestAddress === undefined) {
      const element = document.getElementById("guest-address-form");
      if (element && flag) element.scrollIntoView();
      flag = false;
    }
    if (this.state.selectedInvoice != "" && this.state.invoiceFile === "") {
      this.setState({
        invoiceFileError: true
      });
      const element = document.getElementById("invoice");
      if (element && flag) element.scrollIntoView();
      flag = false;
    }
    if (this.state.otherReason === "") {
      this.setState({
        errorReason: "This is a required field"
      });
      const element = document.getElementById("service-request-reasons");
      if (element && flag) element.scrollIntoView();
      flag = false;
    }
    if (this.state.selectedImages.length === 0) {
      this.setState({
        errorImageMessage: "Uploading at least one product image is mandatory"
      });
      const element = document.getElementById("add-image");
      if (element && flag) element.scrollIntoView();
      flag = false;
    }

    return flag;
  }

  onSubmitForm() {
    this.state.guestAddress = undefined;
    this.refs.child.onSavebuttonClick();

    if (this.state.isProcessing) {
      return;
    }
    if (!this.validateForm()) {
      return;
    }

    this.setState({
      isProcessing: true
    });

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
    // if (
    //   this.state.selectedProductCategory != "" &&
    //   this.state.otherReason != "" &&
    //   this.state.selectedImages.length > 0
    // ) {
    //   isSaveBtnDisabled = false;
    // }

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
            <div className="guest-address-form" id="guest-address-form">
              <AddAddressForm
                isFromServiceRequest={true}
                onAddressChange={this.onAddressChange.bind(this)}
                ref="child"
              />
            </div>
            <div className="invice-selection guest-type">
              <EnterInvoiceView
                type={"ser"}
                invoiceFileError={this.state.invoiceFileError}
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
              <button
                className="btn-cancel btn"
                onClick={() => {
                  history.goBack();
                }}
              >
                Cancel
              </button>
              <ProgressButton
                styleClassName="btn-save btn"
                title={"Submit"}
                onClickEvent={this.onSubmitForm.bind(this)}
                isProcessing={false}
              />
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
              Go to ‘My Account’ {">"} Orders and click on the ‘Request Service’
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
              Go to ‘My Account’ {">"} Orders and click on the ‘Request Service’
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
        <h4 className="heading" id="product-category">
          Product Details
          <span>*</span>
        </h4>
        <Dropdown
          title="Please Select Product Category"
          data={this.state.productCategory}
          error={this.state.errorProductCategory}
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
        {/* <label className="label-text">
          {this.state.characterCount} Character
          {this.state.characterCount <= 1 ? "" : "s"} remaining
        </label> */}
        {this.state.errorProdcuctDesp && (
          <div className="error-msg">{this.state.errorProdcuctDesp}</div>
        )}
      </div>
    );
  }

  renderServiceRequestReason() {
    return (
      <div className="service-request-reasons">
        <h4 className="heading" id="service-request-reasons">
          Reason For Service Request
          <span>*</span>
        </h4>
        <Checkboxes
          data={this.state.serviceRequestReasons}
          title="Reason for Service Request"
          error={this.state.errorReason}
          onSelection={this.getServiceRequestReason.bind(this)}
          onOtherText={this.onOtherReasonEnter.bind(this)}
        />
      </div>
    );
  }

  renderUploadImage() {
    return (
      <>
        <div className="add-img">
          <h4 className="heading" id="add-image">
            Add Image
            <span>*</span>
          </h4>
          <UploadImage
            type={"ser"}
            onImageError={this.onImageError.bind(this)}
            onImageAddRemove={this.onImageAddRemove.bind(this)}
          />
        </div>
        {this.state.errorImageMessage && (
          <div className="error-msg">{this.state.errorImageMessage}</div>
        )}
      </>
    );
  }
}
export default ServiceRequestFormGuest;
