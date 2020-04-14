import React from 'react';
import { Link } from 'react-router-dom';
import { getCookie } from '../../utils/utilityManager';
import apiManager from '../../utils/apiManager';
import { getDetailtForSerReq } from '../../../public/constants/constants';
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
      serviceRequestReasons: [],
      characterCount: 50,
      characterLimit: 50
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

  render() {
    return (
      <div className='container'>
        <div className='guest-service service-request'>
          <h1 class="heading">Service Request</h1>
          {this.renderRequestServiceMsg()}
          {this.renderProdcutCategory()}
          {this.renderTextField()}
          <div className='guest-address-form'>
            <h6 className='heading'>Please note that the service may be chargeable, in case of non-Godrej product</h6>
            <AddAddressForm isFromServiceRequest={true} />
          </div>
          <div className='invice-selection guest-type'><EnterInvoiceView /></div>
          {this.renderServiceRequestReason()}
          {this.renderUploadImage()}
          <div className='actionBtnWrapper'>
            <button className='btn-cancel btn'>Cancel</button>
            <button disabled={this.state.isSaveBtnDisabled} className='btn-save btn'>Submit</button>
          </div>
          {this.state.showLogin ? <UserAccInfo fromWishlistPro resetCallbackPro={this.resetLoginValues.bind(this)} /> : null}
        </div>
      </div>
    );
  }

  renderRequestServiceMsg() {
    if (getCookie('isLoggedIn') === 'true') {
      return (
        <>
          <div className='request-service-msg'>
            <p className='text'>Go to ‘My Account’ > Orders and click on the ‘Request Service’ button against the product you wish to get serviced.
          <Link className='' to={{ pathname: '/myAccount', state: { from: 'myorder' } }}>
                {' View your past orders'}
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
            <p className='text'>Go to ‘My Account’ > Orders and click on the ‘Request Service’ button against the product you wish to get serviced.
          <br /><button className='btn guest-login-btn' onClick={() => this.setState({ showLogin: !this.state.showLogin })}>
                {' Click here to log in and view your past orders'}
              </button></p>
            <p>If you have made a guest purchase online or at the store, please enter the form below to place a service request.</p>
          </div>
        </>
      )
    }
  }

  renderProdcutCategory() {
    return (
      <div className='product-category'>
        <h4>Product Category</h4>
        <Dropdown title='Please Select Product Category' data={this.state.productCategory} onSelection={this.getProductCategorySelection.bind(this)} />
      </div>
    )
  }

  renderTextField() {
    return (
      <div className='service-request-desc'>
        <h5>{this.props.title}</h5>
        <textarea className='text-area' onChange={() => this.onTextareaInput()} name="the-textarea" id="textareaDesc" maxlength={this.state.characterLimit} placeholder="Please Specify" autofocus rows='4' cols='50'></textarea>
        <label className='label-text'>{this.state.characterCount} Character{this.state.characterCount <= 1 ? '' : 's'} remaining</label>
      </div>
    )
  }

  renderServiceRequestReason() {
    return (
      <div className='service-request-reasons'>
        <h4>Reason For Service Request</h4>
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
