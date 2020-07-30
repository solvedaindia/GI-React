import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Dropdown from './dropdown';
import UploadImage from './uploadImage';
import EnterInvoiceView from './enterInvoiceView';
import Checkboxes from './checkboxes';
import AddressLists from './addressLists';
import apiManager from '../../utils/apiManager';
import { getAddressListAPI,getDetailtForSerReq,imagePrefix,saveServiceRequest } from '../../../public/constants/constants';
import AddressList from './addressLists';
import history from '../../utils/history'	
import { ADD_NEW_ADD,SERVICE_REQUEST} from '../../constants/app/myAccountConstants';
import AddAddressForm from '../../components/MyAccountComponents/ManageAddress/addAddressForm';
import '../../../public/styles/myAccount/service-request.scss';


class ServiceRequestForm extends React.Component {

  constructor(props) {
    super(props);
    const invoice=props.orderData.invoices?props.orderData.invoices:[];
        invoice.push("Other")
    this.state = {
      categorySelectionData: [],
      selectedCategory:"",
      invoiceSelectionData: invoice,
      selectedInvoice:"",
      inputInvoice:"",
      serviceRequestReasons: [],
      selectedReason:[],
      addressListItem: null,
      selectedAddress:null,
      addressData: null,
      isAddAddress:false,
      showEnterInvoice:false,
      invoiceFile:"",
      showInvoiceDisclaimer:true,
      isSaveBtnDisabled:true,
      selectedImages:[],
      otherReason:"",
      submitted:false,
    };
    //this.invoiceView=React.createRef();
    //this.imagesView=React.createRef();
  }

  componentDidMount() {
  //  this.getAddressListAPI();
    this.getDetailAPI()
    console.log("dataPro2",this.props.orderData);
    console.log("dataPro1",this.props.orderItemData);
    window.scrollTo(0,0)
  }
  getDetailAPI=()=>{

    apiManager
      .get(getDetailtForSerReq+this.props.orderItemData.partNumber+'&orderid='+this.props.orderData.orderID)
      .then(response => {
       // console.log(dataPro,response.data)
        
        let address=null;
        if(response.data.data.addressList && response.data.data.addressList.length>0)
        {
          address=response.data.data.addressList[0];
          console.log("Slected address",address)
        }
        this.setState({
          addressData: response.data.data.addressList,
          categorySelectionData:response.data.data.productCategory,
          serviceRequestReasons:response.data.data.serviceReasonList,
      //    invoiceSelectionData:response.data.data.invoiceList,
          selectedAddress:address,
        })
      })
      .catch(error => {
      });

  }

  getAddressListAPI(value) {
    const addresses=this.state.addressData;
    addresses.splice(0, 0, value);
    this.setState({
             addressData: addresses,
             selectedAddress:value
    })
    
    // apiManager
    //   .get(getAddressListAPI)
    //   .then(response => {
    //     let address=null;
    //     if(response.data.data.addressList && response.data.data.addressList.length>0)
    //     {
    //       address=response.data.data.addressList[0];
    //       console.log("Slected address",address)
    //     }
    //     this.setState({
    //       addressData: response.data.data.addressList,
    //       selectedAddress:address
    //     })
    //   })
    //   .catch(error => {
    //   });
  }

  getCategorySelectionValue(value) {
    this.setState(
      {
        selectedCategory:value,
      }
    )
  }

  getInvoiceValue(value,index) {
    //const flag=index==0 || this.state.invoiceSelectionData.length-1==index; 
    const flag=false || value==="Other" || value==="other";
    if(value==="Other" || value==="other")
    {
      this.setState({
        showEnterInvoice: true,
        showInvoiceDisclaimer:flag,
        selectedInvoice:"Other",
      });
    }
    else{
      this.setState({
        showEnterInvoice: false,
        inputInvoice:"",
        invoiceFile:"",
        showInvoiceDisclaimer:flag,
        selectedInvoice:value,
      });
    }
  }

  getServiceRequestReason(value) {
    this.setState({
      selectedReason:value
    })
  }

  getSelectedAddress(value) {
    console.log('on Selected Address --- ', value)
    this.setState({
      selectedAddress:value,
    })
  }

  addNewAddressBtnClicked() {
    console.log("addressData",this.state.addressData);
    this.setState({
      isAddAddress: !this.state.isAddAddress,
    });
  }

  onEnterInvoiceTextChanged(value)
  {
    this.setState({
      showInvoiceDisclaimer: value.length==0,
      inputInvoice:value,
    });
  }
  onInvoiceFileSelection(value)
  {
    this.setState({
      invoiceFile: value,
    });
  }
  onOtherReasonEnter(value)
  {
    
    this.setState({
      otherReason: value,
    });
  }

  onImageAddRemove(value)
  {
    console.log("SELECTEDIMAGE",value)
    this.setState({
      selectedImages: value,
    });
  }

  onSubmitForm()
  { 
      console.log("this.state.selectedInvoice",this.state.selectedInvoice,invoice=this.state.inputInvoice)
      let invoice=this.state.selectedInvoice;
      if(this.state.selectedInvoice=="Other" && this.state.inputInvoice.length==12)
      {
        invoice=this.state.inputInvoice;
      }
      // let reason="";
      // this.state.selectedReason.map((data)=>{
      //   if(reason=="")
      //     reason=data
      //   else
      //     reason=reason+","+data
      // })

      let address=null;
      if(this.state.selectedAddress.addressID==="")
      {
        address=this.state.selectedAddress;
      } 


      const param={
        prodCategory:this.state.selectedCategory,
        prodDesc:this.props.orderItemData.productName,
        partNumber:this.props.orderItemData.partNumber,
        addressId:this.state.selectedAddress.addressID,
        addressData:address,
        invoiceNo:invoice,
        invoiceURL:this.state.invoiceFile,
        serviceRequestReason:this.state.otherReason,
        //otherReason:this.state.otherReason,
        images:this.state.selectedImages,
      }

      apiManager
      .post(saveServiceRequest,param)
      .then(response => {
        console.log("PostResponse",response);
        alert("Service request submitted successfully")
        this.props.renderServiceRequestPro();
        history.replace({ pathname: '/myAccount', state: {from:'serviceRequest'}}); 
      })
      .catch(error => {
        console.log("PostResponseError",error);
      //  alert("Error Service request submitted successfully")
       // this.props.renderServiceRequestPro();
      });
      
  }

  onCancelPress()
  {
      this.setState({
        submitted:true,
      })
     // alert("aaaaaaa");
     this.props.renderServiceRequestPro();
  }

  render() 
  {
    let isSaveBtnDisabled=true;
   // if(this.state.selectedCategory!="" && this.state.selectedReason.length>0  && this.state.selectedImages.length>0)
   if(this.state.selectedCategory!="" && this.state.otherReason!=""  && this.state.selectedImages.length>0)
    {
      isSaveBtnDisabled=false;
    }
    return (
      <div className="trackMyOrder service-request">
        <div className="bottomDivider">
          <button className="backBtn" onClick={this.onCancelPress.bind(this)} >{`< Back`}</button>
        </div>
        <div className="ongoingOrder">{SERVICE_REQUEST}</div>
        {this.renderProductDetails()}
        {this.renderProductCategory()}
        {this.renderInvoice()}
        {this.renderServiceRequestReason()}
        {this.renderUploadImage()}
        {this.renderAddress()}
        {this.renderAddAddress()}

        <div className='actionBtnWrapper'>
            <button  className='btn-cancel btn' onClick={this.onCancelPress.bind(this)} >Cancel</button>
            <button  disabled={isSaveBtnDisabled} className='btn-save btn' onClick={this.onSubmitForm.bind(this)}>Submit</button>
          </div>

      </div>
    );
  }

  renderAddAddress() {
    return (
      <div className="manageAddressContainer">
        <ul className="itemList">{this.state.addressListItem}</ul>
        <div className="add-service-address clearfix" />
        {this.state.isAddAddress ? (
          <AddAddressForm
            onCancel={this.addNewAddressBtnClicked.bind(this)}
            onUpdateActivity={this.getAddressListAPI.bind(this)}
            editAddressDataPro={this.state.editAddressData}
            fromRequestFor={true}
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
      <div class='get-selected-address'>
        <h4 className='heading'>Address</h4>
        <AddressList data={this.state.addressData} onSelection={this.getSelectedAddress.bind(this)}/>
      </div>
    )
  }

  renderUploadImage() {
    return (
      <div className='add-img'>
        <h4 className='heading'>Add Image</h4>
        <UploadImage submitted={this.state.submitted} type={"ser"} onImageAddRemove={this.onImageAddRemove.bind(this)}/>
      </div>
    )
  }

  renderProductCategory() {
    return (
      <div className='product-category'>
        <h4 className='heading'>Product Category</h4>
        <Dropdown title='Please select a product category' data={this.state.categorySelectionData} onSelection={this.getCategorySelectionValue.bind(this)} />
      </div>
    )
  }

  renderInvoice() {
    return (
      <div className='invice-selection'>
        <h4 className='heading'>Invoice Selection</h4>
        <Dropdown title='Select Invoice' data={this.state.invoiceSelectionData} 
              onSelection={this.getInvoiceValue.bind(this)} />
        {
        this.state.showEnterInvoice &&
        (
          <EnterInvoiceView submitted={this.state.submitted} type={"ser"} onInvoiceChange={this.onEnterInvoiceTextChanged.bind(this)} onInvoiceFile={this.onInvoiceFileSelection.bind(this)}/>
        )       

        }
        {this.state.showInvoiceDisclaimer  ? <div className='notification-title'>Please note that the service may be chargeable, in case of missing invoice details</div> : null}
      </div>
    )
  }

  renderServiceRequestReason() {
    return (
      <div className='service-request-reasons'>
        <h4 className='heading'>Reason For Service Request</h4>
        <Checkboxes data={this.state.serviceRequestReasons} title='Reason for Service Request' onSelection={this.getServiceRequestReason.bind(this)}
          onOtherText={this.onOtherReasonEnter.bind(this)} />
      </div>
    )
  }

  renderProductDetails() {
    const productData = this.props.orderItemData;
    return (
      <>
       
        <div className="itemBox">
          <div className="orderProduct clearfix">
            <div className="orderimgbox clearfix">
              <div className="imgBox">
                <img alt={productData.productName}
                      src={productData.thumbnail !== '' ? `${imagePrefix}${productData.thumbnail}` : require('../../../public/images/plpAssests/placeholder-image.png')} className="imgfullwidth" />
              </div>
              <div className="product-text">
                <p className="heading">{productData.productName}</p>
                <p className="description">{productData.shortDescription}</p>
                <p className="price">
                  <span className="discount-price">₹{productData.offerPrice}</span>
                </p>
                <div className="quantity-shipping clearfix">
                  <div className="quantity">
                    <span className="heading">Quantity: </span>
                    <span className="textval">{productData.quantity}</span>
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
export default connect(withRouter)(ServiceRequestForm);
