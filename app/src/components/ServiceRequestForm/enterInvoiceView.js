import React from "react";
import Input from "../Primitives/input";
import { regexInvoice } from "../../utils/validationManager";
import { getCookie, isMobile } from "../../utils/utilityManager";
import {
  storeId,
  accessToken,
  accessTokenCookie
} from "../../../public/constants/constants";

class EnterInvoiceView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: "",
      invoiceNumber: "",
      upload: "",
      fileName: "",
      isUploadBtnDisabled: true
    };
    this.handleInput = this.handleInput.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    this.setState({
      upload: ""
    });
  }
  onSelection = (value, index) => {};
  handleInput = event => {
    const flag = regexInvoice.test(event.target.value);

    if (event.target.value.length == 12) {
      this.setState({
        invoiceNumber: event.target.value,
        isUploadBtnDisabled: !flag,
        errorMessage: flag ? "" : "Invoice number is invalid",
        error: !flag
      });
    } else {
      this.setState({
        invoiceNumber: event.target.value,
        isUploadBtnDisabled: true,
        errorMessage: flag ? "" : "Invoice number is invalid",
        error: !flag
      });
    }
    this.props.onInvoiceChange(event.target.value);
  };
  onFileSelected = event => {
    const fsize = event.target.files[0].size;
    const file = Math.round(fsize / 1024);
    if (file > 10240) {
      // alert("File size is too Big, please select a image less than 10mb");
      this.setState({
        error: true,
        errorMessage: "File is too large (max 10 MB)"
      });
      event.target.value = null;
      return;
    } else if (
      !(
        event.target.files[0].type === "image/png" ||
        event.target.files[0].type === "image/jpeg" ||
        event.target.files[0].type === "image/jpg" ||
        event.target.files[0].type === "application/pdf"
      )
    ) {
      //alert("File format not supported!");
      this.setState({
        error: true,
        errorMessage: "File type is not supported"
      });
      event.target.value = null;
      return;
    }
    //upload file task
    // this.props.onInvoiceFile(event.target.files[0])
    this.onRemoveImage();
    this.uploadImageToSerer(event.target.files[0]);
  };

  uploadImageToSerer(file) {
    var myHeaders = new Headers();
    myHeaders.append("access_token", getCookie(accessTokenCookie));
    var formdata = new FormData();
    formdata.append("userid", getCookie("userID"));
    formdata.append("typeid", this.props.type);
    formdata.append("file", file, file.name);
    this.setState({
      fileName: file.name
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };
    fetch("/imageupload", requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result);
        const imageUrl = res.fileUrl;
        this.setState({
          upload: imageUrl
        });
        this.props.onInvoiceFile(imageUrl);
      })
      .catch(error => {
        updateArray("error", index);
      });
  }

  onUploadInvoice = () => {
    if (this.state.fileName === "") {
      const uploadInvoice = document.getElementById("uploadInvoice");
      uploadInvoice.click();
    } else {
      this.setState({
        fileName: ""
      });
      document.getElementById("uploadInvoice").value = "";
    }
  };
  onRemoveImage() {
    if (this.state.upload === "") {
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("public_key", "some_key");

    var formdata = new FormData();
    formdata.append("nameFile", this.state.upload);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };

    fetch("/imagedelete", requestOptions)
      .then(response => response.text())
      .then(result => {
        if (flag === undefined) {
          this.updateArrayAfterRemove(index);
        }
      })
      .catch(error => {});
  }

  componentWillUnmount() {
    // if(this.props.submitted===true)
    // {
    //   return;
    // }
    // this.onRemoveImage();
  }

  render() {
    return (
      <div className="form-BgContainer addAddressContainer upload-invoiceno">
        <div className="row">
          <div className="col-md-6">
            <div className="form-div clearfix div-error">
              <input
                onKeyPress={this.onKeyPress}
                inputType="text"
                title="Invoice Number"
                name="invoice"
                id="invoice"
                placeholder="Enter invoice number"
                value={this.state.invoiceNumber}
                onChange={this.handleInput}
                maxLength={12}
                isAutoFocus={true}
                className="form-control invoiceNumber"
              />
              <p id="invoiceFile" className="invoiceNotes my-1">
                {this.state.fileName}
              </p>
            </div>
          </div>
          <div className="col-md-6 upload-invoice">
            <button
              onClick={this.onUploadInvoice.bind(this)}
              disabled={this.state.isUploadBtnDisabled}
              className="btn-save btn"
            >
              {this.state.fileName === "" ? " Upload Invoice" : "Remove"}
            </button>
            <input
              type="file"
              id="uploadInvoice"
              onChange={this.onFileSelected.bind(this)}
              accept="image/png, image/jpeg, application/pdf"
              style={{ display: "none" }}
            />
          </div>
          {isMobile() && (
            <div className="col-md-6">
              {this.state.error ? (
                <div className="error-msg">{this.state.errorMessage}</div>
              ) : null}
              {this.props.invoiceFileError ? (
                <div className="error-msg">
                  {"Please upload a scanned copy of your invoice"}
                </div>
              ) : null}
            </div>
          )}
        </div>

        {!isMobile() && (
          <div>
            {this.state.error ? (
              <div className="error-msg">{this.state.errorMessage}</div>
            ) : null}
            {this.props.invoiceFileError ? (
              <div className="error-msg">
                {"Please upload a scanned copy of your invoice"}
              </div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}
export default EnterInvoiceView;
