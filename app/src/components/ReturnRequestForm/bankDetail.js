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
    this.bankDetailsToParent = this.bankDetailsToParent.bind(this);
  }
  // debugger;
  isDigitOrAlpha(e) {
    if (
      !(
        (e.which > 47 && e.which < 58) ||
        (e.which > 64 && e.which < 91) ||
        (e.which > 96 && e.which < 123)
      )
    ) {
      e.preventDefault();
    }
  }
  isDigit(e) {
    if (!(e.which > 47 && e.which < 58)) {
      e.preventDefault();
    }
  }
  isAlpha(e) {
    if (!((e.which > 64 && e.which < 91) || (e.which > 96 && e.which < 123))) {
      e.preventDefault();
    }
  }

  isIfscCodeStandard() {
    const { ifscCode } = this.state;
    let ifscCodeverify = ifscCode.split("");

    let reg = /^[A-Z|a-z]{4}0[0-9]{6}$/;

    if (ifscCode.match(reg)) {
      this.setState({ ifscCodeValid: true },this.bankDetailsToParent);
      return true;
    } else {
      this.setState({ ifscCodeValid: false });
      // document.getElementById("ifsc").focus();
      return false;
    }
  }

  bankDetailsToParent() {
    this.props.onSubmit(this.state);
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
    const {
      Name,
      AccountNumber,
      AcoountNumberConfirm,
      ifscCode,
      ifscCodeValid
    } = this.state;
    this.isIfscCodeStandard();
    this.props.handleInputValidation(this.isInputDataValid());
    if(Name !== '' && AccountNumber !== '' && AcoountNumberConfirm !== '' && ifscCode !== '' && ifscCodeValid === true)
    this.props.onSubmit(this.state);
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
        <div className="bank-detail-form">
          <div className='row'>
          <div className='col-sm-12 col-md-12 form-wrapper'>
          <label htmlFor='ac-user-name' className='label-text'>
            Name*
          </label>
          <input
            id='ac-user-name'
              type="text"
              name="name"
              maxLength="100"
              onKeyPress={this.isAlpha}
              onChange={this.handleBankDetail}
              className='form-control'
            />
            <span className='label-info-text'>{Name === "" && NAME_VALIDATION}</span>
            </div>

            <div className='col-sm-12 col-md-12 form-wrapper'>
          <label htmlFor='ac-number' className='label-text'>
            Account Number*
            </label>
            <input
              id='ac-number'
              type="text"
              name="accountNo"
              maxLength="20"
              onKeyPress={this.isDigit}
              onChange={this.handleBankDetail}
              className='form-control'
            />
            
            <span className='label-info-text'>{AccountNumber === "" && ACCOUNT_NUMBER_VALIDATION}</span>
            </div>
          
            <div className='col-sm-12 col-md-12 form-wrapper'>
          <label htmlFor='conf-ac-number' className='label-text'>
            Confirm Account Number*
          </label>
          <input
            id='conf-ac-number'
              type="text"
              id="AccNoConfirm"
              name="accountNoConfirm"
              maxLength="20"
              onKeyPress={this.isDigit}
              onChange={this.handleBankDetail}
              className='form-control'
            />
              <span className='label-info-text'>{AccountNumber != AcoountNumberConfirm &&
              ACCOUNT_NUMBER_CONFIRM_VALIDATION}</span>
          </div>
          
          <div className='col-sm-12 col-md-12 form-wrapper'>
          <label htmlFor='ifsc' className='label-text'>
            IFSC Code*
          </label>
          <input
              id="ifsc"
              type="text"
              name="ifscCode"
              maxLength="11"
              onKeyPress={this.isDigitOrAlpha}
              onChange={this.handleBankDetail}
              placeholder=""
              className='form-control'
            />
             <span className='label-info-text'>{ifscCodeValid === false && IFSC_VALIDATION}</span>
          </div>
          </div>
        </div>
      </>
    );
  }
}
export default BankDetails;
