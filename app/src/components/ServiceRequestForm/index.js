import React from 'react';
import Dropdown from './dropdown';
import UploadImage from './uploadImage';
import EnterInvoiceView from './enterInvoiceView';
import Checkboxes from './checkboxes';
import AddressLists from './addressLists';
import apiManager from '../../utils/apiManager';
import { getAddressListAPI } from '../../../public/constants/constants';
import AddressList from './addressLists';
import { ADD_NEW_ADD} from '../../constants/app/myAccountConstants';
import AddAddressForm from '../../components/MyAccountComponents/ManageAddress/addAddressForm';


class ServiceRequestForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categorySelectionData: ['Home Furniture', 'Office Furniture', 'Mattress', 'Décor'],
      invoiceSelectionData: ['Invoice 1', 'Invoice 2', 'Invoice 3', 'Invoice 4', 'Invoice 5', 'Add an invoice number'],
      serviceRequestReasons: ['Upholstery wear and tear', 'Broken locks or handles', 'Loose doors or hinges', 'Shelf or drawer issues', '	Missing screws and accessories', 'Surface chipping and cracks', 'Other'],
      addressListItem: null,
      addressData: null,
      isAddAddress:false,
      showEnterInvoice:false,
    };
  }

  componentDidMount() {
    this.getAddressListAPI();
  }

  getAddressListAPI() {
    apiManager
      .get(getAddressListAPI)
      .then(response => {
        this.setState({
          addressData: response.data.data.addressList
        })
      })
      .catch(error => {
      });
  }

  getCategorySelectionValue(value) {
    console.log('on Dropdown --- ', value)
  }

  getInvoiceValue(value,index) {
    if(this.state.invoiceSelectionData.length-1==index)
    {
      this.setState({
        showEnterInvoice: true,
      });
    }
    else{
      this.setState({
        showEnterInvoice: false,
      });
    }
  }

  getServiceRequestReason(value) {
    console.log('on Service Request --- ', value)
  }

  getSelectedAddress(value) {
    console.log('on Selected Address --- ', value)
  }
  addNewAddressBtnClicked() {
    this.setState({
      isAddAddress: !this.state.isAddAddress,
    });
  }

  render() {
    return (
      <div className="trackMyOrder">

        <div className="bottomDivider">
          <button className="backBtn" onClick={this.props.renderSelectionPro} >{`< Back`}</button>
        </div>

        {this.renderProductDetails()}
        {this.renderProductCategory()}
        {this.renderInvoice()}
        {this.renderEnterInvoice()}
        {this.renderServiceRequestReason()}
        {this.renderUploadImage()}
        {this.renderAddress()}
        {this.renderAddAddress()}

      </div>
    );
  }

  renderAddAddress() {
    return (
      <div className="manageAddressContainer">
        <ul className="itemList">{this.state.addressListItem}</ul>
        <div className="clearfix" />
        {this.state.isAddAddress ? (
          <AddAddressForm
            onCancel={this.addNewAddressBtnClicked.bind(this)}
            onUpdateActivity={this.getAddressListAPI.bind(this)}
            editAddressDataPro={this.state.editAddressData}

          />
        ) : (
          <button
            className="addNewAddress"
            onClick={this.addNewAddressBtnClicked.bind(this)}
          >
            <span className='icon'>+</span> {ADD_NEW_ADD}
          </button>
        )}
      </div>
    );
  }

  renderAddress() {
    return (
      <div>
        <h4>Address</h4>
        <AddressList data={this.state.addressData} onSelection={this.getSelectedAddress.bind(this)}/>
      </div>
    )
  }

  renderUploadImage() {
    return (
      <div>
        <h4>Add Image</h4>
        <UploadImage/>
      </div>
    )
  }

  renderProductCategory() {
    return (
      <div>
        <h4>Product Category</h4>
        <Dropdown title='Please select a product category' data={this.state.categorySelectionData} onSelection={this.getCategorySelectionValue.bind(this)} />
      </div>
    )
  }

  renderInvoice() {
    return (
      <div>
        <h4>Invoice Selection</h4>
        <Dropdown title='Select Invoice' data={this.state.invoiceSelectionData} onSelection={this.getInvoiceValue.bind(this)} />
      </div>
    )
  }

  renderEnterInvoice()
  {
    return(
      <>
      {
        this.state.showEnterInvoice &&
        (
          <EnterInvoiceView/>
        )       

      }
      </>
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

  renderProductDetails() {
    return (
      <>
        <div className="itemBox">
          <div className="orderProduct clearfix">
            <div className="orderimgbox clearfix">
              <div className="imgBox">
                <img src={require('../../../public/images/plpAssests/placeholder-image.png')} className="imgfullwidth" />
              </div>
              <div className="product-text">
                <p className="heading">Product Name</p>
                <p className="description">(Description)</p>
                <p className="price">
                  <span className="discount-price">₹ 202922</span>
                </p>
                <div className="quantity-shipping clearfix">
                  <div className="quantity">
                    <span className="heading">Quantity</span>
                    <span className="textval">2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

}
export default ServiceRequestForm;
