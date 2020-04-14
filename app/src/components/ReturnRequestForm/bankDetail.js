import React from "react";
import {
  IFSC_VALIDATION,
  ACCOUNT_NUMBER_VALIDATION,
  NAME_VALIDATION,
  ACCOUNT_NUMBER_CONFIRM_VALIDATION
} from "../../constants/app/myAccountConstants";

class BankDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      AccountNumber: "",
      AcoountNumberConfirm: "",
      ifscCode: "",
      ifscCodeValid: true
    };
    this.handleBankDetail = this.handleBankDetail.bind(this);
    this.isDigit = this.isDigit.bind(this);
    this.isAlpha = this.isAlpha.bind(this);
    this.isDigitOrAlpha = this.isDigitOrAlpha.bind(this);
    this.isIfscCodeStandard = this.isIfscCodeStandard.bind(this);
  }
  debugger;
  isDigitOrAlpha(e) {
    if (
      !(
        (e.which > 47 && e.which < 58) ||
        (e.which > 64 && e.which < 91) ||
        (e.which > 96 && e.which < 123)
      )
    ) {
      e.preventDefault();
      //   console.log(isSaveBtnDisabled);
    }
  }
  isDigit(e) {
    if (!(e.which > 47 && e.which < 58)) {
      e.preventDefault();
      //   console.log(isSaveBtnDisabled);
    }
  }
  isAlpha(e) {
    if (!((e.which > 64 && e.which < 91) || (e.which > 96 && e.which < 123))) {
      e.preventDefault();
      //   console.log(isSaveBtnDisabled);
    }
  }

  isIfscCodeStandard() {
    const { ifscCode } = this.state;
    let ifscCodeverify = ifscCode.split("");

    let reg = /^[A-Z|a-z]{4}0[0-9]{6}$/;

    if (ifscCode.match(reg)) {
      this.setState({ ifscCodeValid: true });
      return true;
    } else {
      this.setState({ ifscCodeValid: false });
      // document.getElementById("ifsc").focus();
      return false;
    }
  }

  isInputDataValid() {
    const { Name, AccountNumber, AcoountNumberConfirm, ifscCode } = this.state;
    if (
      Name !== "" &&
      AccountNumber !== "" &&
      AccountNumber === AcoountNumberConfirm &&
      ifscCode !== ""
    )
      return true;

    return false;
  }

  validate() {
    this.isIfscCodeStandard();
    this.props.handleInputValidation(this.isInputDataValid());
  }

  handleBankDetail(e) {
    switch (e.target.name) {
      case "name":
        this.setState({ Name: e.target.value }, this.validate);
        break;
      case "accountNo":
        this.setState({ AccountNumber: e.target.value }, this.validate);
        break;
      case "accountNoConfirm":
        this.setState({ AcoountNumberConfirm: e.target.value }, this.validate);
        break;
      case "ifscCode":
        this.setState({ ifscCode: e.target.value }, this.validate);
        break;
    }
  }

  render() {
    const {
      Name,
      AccountNumber,
      AcoountNumberConfirm,
      ifscCode,
      ifscCodeValid
    } = this.state;

    return (
      <>
        <h4 className="heading">Bank Account Details</h4>

        <div className="bankDetails">
          <label>
            Name*
            <input
              type="text"
              name="name"
              maxLength="100"
              onKeyPress={this.isAlpha}
              onChange={this.handleBankDetail}
            />
            <br />
            {Name === "" && NAME_VALIDATION}
          </label>
          <br />
          <label>
            Account Number*
            <input
              type="text"
              name="accountNo"
              maxLength="20"
              onKeyPress={this.isDigit}
              onChange={this.handleBankDetail}
            />
            <br />
            {AccountNumber === "" && ACCOUNT_NUMBER_VALIDATION}
          </label>
          <br />
          <label>
            Confirm Account Number*
            <input
              type="text"
              id="AccNoConfirm"
              name="accountNoConfirm"
              maxLength="20"
              onKeyPress={this.isDigit}
              onChange={this.handleBankDetail}
            />
            <br />
            {AccountNumber != AcoountNumberConfirm &&
              ACCOUNT_NUMBER_CONFIRM_VALIDATION}
          </label>
          <br />
          <label>
            IFSC Code*
            <input
              id="ifsc"
              type="text"
              name="ifscCode"
              maxLength="11"
              onKeyPress={this.isDigitOrAlpha}
              onChange={this.handleBankDetail}
              placeholder=""
            />
            <br />
            {ifscCodeValid === false && IFSC_VALIDATION}
          </label>
        </div>
      </>
    );
  }
}
export default BankDetails;
