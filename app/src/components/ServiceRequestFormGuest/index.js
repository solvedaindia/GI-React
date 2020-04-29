import React from 'react';
import { Link } from 'react-router-dom';
import { getCookie } from '../../utils/utilityManager';
import apiManager from '../../utils/apiManager';
import { getDetailtForSerReq, saveServiceRequest } from '../../../public/constants/constants';
import UserAccInfo from '../UserAccInfo/userAccInfo';
import Dropdown from '../ServiceRequestForm/dropdown';
import AddAddressForm from '../../components/MyAccountComponents/ManageAddress/addAddressForm';
import EnterInvoiceView from '../ServiceRequestForm/enterInvoiceView';
import Checkboxes from '../ServiceRequestForm/checkboxes';
import UploadImage from '../ServiceRequestForm/uploadImage';
import '../../../public/styles/myAccount/service-request.scss';

class ServiceRequestFormGuest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      productCategory: [],
      descriptionText: '',
      serviceRequestReasons: [],
      characterCount: 50,
      characterLimit: 50,
      selectedInvoice:"",
    };
  }

  componentDidMount() {
    this.getDetailAPI()
  }

  getDetailAPI() {
    apiManager
      .get(getDetailtForSerReq)
      .then(response => {
        this.setState({
          productCategory:response.data.data.productCategory,
          serviceRequestReasons:response.data.data.serviceReasonList,
        })
      })
      .catch(error => {
      });

  }

  resetLoginValues() {
    this.setState({
      showLogin: false,
    });
  }

  onTextareaInput() {
    this.setState({
      descriptionText: document.getElementById('textareaDesc').value,
      characterCount: this.state.characterLimit - document.getElementById('textareaDesc').value.length,
    })
  }

  getProductCategorySelection(value) {
    console.log('on Dropdown --- ', value)
  }

  getServiceRequestReason(value) {
    console.log('on Service Request --- ', value)
  }

  onImageAddRemove(value) {
    // this.setState({
    //   selectedImages: value,
    // });
  }

  onAddressChange(value) {
    console.log('kdkdkd -- ',value.target.id, value.target.value);
  }

  onSubmitForm()
  { 
    console.log("dddddd")
      let invoice=this.state.selectedInvoice;
      if(this.state.selectedInvoice=="Other" && this.state.inputInvoice.length==12)
      {
        invoice=this.state.inputInvoice;
      }
      let reason="";
      this.state.serviceRequestReasons.map((data)=>{
        if(reason=="")
          reason=data
        else
          reason=reason+","+data
      })
      const param={
        prodCategory:this.state.productCategory,
        prodDesc:this.state.descriptionText,
        partNumber:'',
        addressId:'',
        invoiceNo:invoice,
        invoiceURL:"",
        serviceRequestReason:reason,
        otherReason:this.state.otherReason,
        images:["https://www.godrejinterio.com/imagestore/B2C/60124513SD00046/60124513SD00046_01_500x500.png"],
      }

      apiManager
      .post(saveServiceRequest,param)
      .then(response => {
        console.log("PostResponse",response);
        alert("Service request submitted successfully")
        this.props.renderServiceRequestPro();
      })
      .catch(error => {
        console.log("PostResponseError",error);
      });
      
  }

  render() {
    return (
      <div className='container'>
        <div className='guest-service service-request'>
          <h1 class="heading">Service Request</h1>
          {this.renderRequestServiceMsg()}
          {this.renderProdcutCategory()}
          {this.renderTextField()}
          <p className='notification-title'>*Please note that the service may be chargeable, in case of non-Godrej product</p>
          <div className='guest-border-box'>
            <div className='guest-address-form'>            
              <AddAddressForm isFromServiceRequest={true} onAddressChange={this.onAddressChange.bind(this)}/>
            </div>
            <div className='invice-selection guest-type'><EnterInvoiceView /></div>
            {this.renderServiceRequestReason()}
            {this.renderUploadImage()}
            <div className='actionBtnWrapper'>
              <button className='btn-cancel btn'>Cancel</button>
              <button disabled={this.state.isSaveBtnDisabled} className='btn-save btn' onClick={this.onSubmitForm.bind(this)}>Submit</button>
            </div>
            {this.state.showLogin ? <UserAccInfo fromWishlistPro resetCallbackPro={this.resetLoginValues.bind(this)} /> : null}
          </div>
        </div>
      </div>
    );
  }

  renderRequestServiceMsg() {
    if (getCookie('isLoggedIn') === 'true') {
      return (
        <>
          <div className='request-service-msg'>
            <p className='text'>Go to ‘My Account’ > Orders and click on the ‘Request Service’ button against the product you wish to get serviced. &nbsp;
          <Link className='guest-login-link' to={{ pathname: '/myAccount', state: { from: 'myorder' } }}>
                {'View your past orders'}
              </Link></p>
            <p>If you have made a store purchase, please fill the form shown blow to place a service request.</p>
          </div>
        </>
      )
    }
    else {
      return (
        <>
          <div className='request-service-msg'>
            <p className='text'>Go to ‘My Account’ > Orders and click on the ‘Request Service’ button against the product you wish to get serviced. <a className='guest-login-link' onClick={() => this.setState({ showLogin: !this.state.showLogin })}>
                {' Click here to log in and view your past orders'}
              </a></p>
            <p className='text'>If you have made a guest purchase online or at the store, please enter the form below to place a service request.</p>
          </div>
        </>
      )
    }
  }

  renderProdcutCategory() {
    return (
      <div className='product-category'>
        <h4 className='heading'>Product Details</h4>
        <Dropdown title='Please Select Product Category' data={this.state.productCategory} onSelection={this.getProductCategorySelection.bind(this)} />
      </div>
    )
  }

  renderTextField() {
    return (
      <div className='service-request-desc guest-type'>
        <h5 className='heading'>{this.props.title}</h5>
        <textarea className='text-area' onChange={() => this.onTextareaInput()} name="the-textarea" id="textareaDesc" maxlength={this.state.characterLimit} placeholder="Please Specify" autofocus rows='4' cols='50'></textarea>
        <label className='label-text'>{this.state.characterCount} Character{this.state.characterCount <= 1 ? '' : 's'} remaining</label>
      </div>
    )
  }

  renderServiceRequestReason() {
    return (
      <div className='service-request-reasons'>
        <h4 className='heading'>Reason For Service Request</h4>
        <Checkboxes data={this.state.serviceRequestReasons} title='Reason for Service Request' onSelection={this.getServiceRequestReason.bind(this)} />
      </div>
    )
  }

  renderUploadImage() {
    return (
      <div className='add-img'>
        <h4 className='heading'>Add Image</h4>
        <UploadImage onImageAddRemove={this.onImageAddRemove.bind(this)} />
      </div>

    )
  }

}
export default ServiceRequestFormGuest;
