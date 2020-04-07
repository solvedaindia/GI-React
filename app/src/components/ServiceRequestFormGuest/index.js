import React from 'react';
import { Link } from 'react-router-dom';
import { getCookie } from '../../utils/utilityManager';
import UserAccInfo from '../UserAccInfo/userAccInfo';
import Dropdown from '../ServiceRequestForm/dropdown';
import AddAddressForm from '../../components/MyAccountComponents/ManageAddress/addAddressForm';
import EnterInvoiceView from '../ServiceRequestForm/enterInvoiceView';
import Checkboxes from '../ServiceRequestForm/checkboxes';
import UploadImage from '../ServiceRequestForm/uploadImage';

class ServiceRequestFormGuest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      productCategory: ['Home Furniture', 'Office Furniture', 'Mattress', 'Décor'],
      serviceRequestReasons: ['Upholstery wear and tear', 'Broken locks or handles', 'Loose doors or hinges', 'Shelf or drawer issues', '	Missing screws and accessories', 'Surface chipping and cracks', 'Other'],
      characterCount: 50,
      characterLimit: 50
    };
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

  render() {
    return (
      <>
        <h4>Service Request</h4>
        {this.renderRequestServiceMsg()}
        {this.renderProdcutCategory()}
        {this.renderTextField()}
        <h6>Please note that the service may be chargeable, in case of non-Godrej product</h6>
        <AddAddressForm isFromServiceRequest={true} />
        <EnterInvoiceView />
        {this.renderServiceRequestReason()}
        {this.renderUploadImage()}
        <div className='actionBtnWrapper'>
          <button className='btn-cancel btn'>Cancel</button>
          <button disabled={this.state.isSaveBtnDisabled} className='btn-save btn'>Submit</button>
        </div>
        {this.state.showLogin ? <UserAccInfo fromWishlistPro resetCallbackPro={this.resetLoginValues.bind(this)} /> : null}
      </>
    );
  }

  renderRequestServiceMsg() {
    if (getCookie('isLoggedIn') === 'true') {
      return (
        <>
          Go to ‘My Account’ > Orders and click on the ‘Request Service’ button against the product you wish to get serviced.
          <Link className='' to={{ pathname: '/myAccount', state: { from: 'myorder' } }}>
            {' View your past orders'}
          </Link>
          <div>If you have made a store purchase, please fill the form shown blow to place a service request.</div>
        </>
      )
    }
    else {
      return (
        <>
          Go to ‘My Account’ > Orders and click on the ‘Request Service’ button against the product you wish to get serviced.
          <button className='' onClick={() => this.setState({ showLogin: !this.state.showLogin })}>
            {' Click here to log in and view your past orders'}
          </button>
          <div>If you have made a guest purchase online or at the store, please enter the form below to place a service request.</div>
        </>
      )
    }
  }

  renderProdcutCategory() {
    return (
      <div>
        <h4>Product Category</h4>
        <Dropdown title='Please Select Product Category' data={this.state.productCategory} onSelection={this.getProductCategorySelection.bind(this)} />
      </div>
    )
  }

  renderTextField() {
    return (
      <div>
        <h5>{this.props.title}</h5>
        <textarea onChange={() => this.onTextareaInput()} style={{ 'border-color': '#dfe0de', padding: '5px', outline: 'none', resize: 'none' }} name="the-textarea" id="textareaDesc" maxlength={this.state.characterLimit} placeholder="Please Specify" autofocus rows='4' cols='50'></textarea>
        <label>{this.state.characterCount} Character{this.state.characterCount <= 1 ? '' : 's'} remaining</label>
      </div>
    )
  }

  renderServiceRequestReason() {
    return (
      <div>
        <h4>Reason For Service Request</h4>
        <Checkboxes data={this.state.serviceRequestReasons} title='Reason for Service Request' onSelection={this.getServiceRequestReason.bind(this)} />
      </div>
    )
  }

  renderUploadImage() {
    return (
      <div>
        <h4>Add Image</h4>
        <UploadImage />
      </div>
    )
  }

}
export default ServiceRequestFormGuest;
