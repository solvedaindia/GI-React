import React from 'react';
import apiManager from '../../../../utils/apiManager';
import { changePasswordAPI, imagePrefix } from '../../../../../public/constants/constants';
import OrderStatusBar from '../orderStatusBar';
import { CACELATION_WINDOW_CLOSE } from '../../../../../../app/src/constants/app/cancelConstants';

class RWDSingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dsNameTag: null,
      dsDateTag: null,
    };
  }

  componentDidMount() {
    this.filterDeliveryInstallationTags();
  }

  showOrderDetail() {
    this.props.orderDetailCallbackPro(this.props.orderCompleteDataPro);
  }

  trackOrderFromViewOrder(data) {
    this.props.viewOrderTrackCallbackPro(data)
  }

  filterDeliveryInstallationTags() {
    const shipmentData = this.props.orderDataPro.shipmentData[0];
    if (shipmentData && shipmentData.expectedDeliveryDate !== '') {
      this.setState({
        dsNameTag: 'Delivery on: ',
        dsDateTag: shipmentData.expectedDeliveryDate.split(',')[0] + ', ' + shipmentData.expectedDeliveryDate.split(',')[1]
      })
    }
    else if (shipmentData && shipmentData.expectedInstallationDate !== '') {
      if (shipmentData.installationDate === '') {
        this.setState({
          dsNameTag: 'Installation On: ',
          dsDateTag: shipmentData.expectedInstallationDate.split(',')[0] + ', ' + shipmentData.expectedInstallationDate.split(',')[1]
        })
      }
    }
  }

  render() {
    const productData = this.props.orderDataPro;
    return (
      <>
        <div className="itemBoxTrack clearfix">
          <div className='itemImg'>
            <img className='imgBox' src={productData.thumbnail !== '' ? `${imagePrefix}${productData.thumbnail}` : require('../../../../../public/images/plpAssests/placeholder-image.png')} alt='thumbnail'/>
          </div>
          <div className='itemInfo'>
            <div className='productName'>{productData.productName}</div>
            <div className='description'>{productData.shortDescription}</div>
            <div className='quantity'>Quantity: {this.props.isMultiTrackPro ? this.props.shipmentDataPro.quantity : productData.quantity}</div>
            <div className='price'>₹{productData.offerPrice}</div>
            <div className='deliveryTag'>
              <span>{this.state.dsNameTag}</span>
              <span>{this.state.dsDateTag}</span>
            </div>
            {/*Cance message condtion replaced by true */}
             {true && <div className='cancelation-text-info'>  
                  <span className="textval">{CACELATION_WINDOW_CLOSE}</span>
              </div>}
          </div>
        </div>
        <div className='clearfix'></div>
        <div className='orderStatus'>
          {this.props.isFromViewOrder ? null : <OrderStatusBar shipmentDataPro={this.props.isMultiTrackPro ? this.props.shipmentDataPro : productData.shipmentData[0]} customClassPro='trackorder-wrap' /> }
        </div>
        <div className='clearfix'/>
        <div className='orderBtn'>
          {!this.props.isMultiTrackPro ? productData.shipmentData.length > 1 ? <button className='btn-blackbg btn-block track-order-btn' onClick={this.trackOrderFromViewOrder.bind(this, productData)}>Track Order</button> 
            : !this.props.isFromViewOrder && this.props.hideViewDetail ? null 
            : <button className='btn-blackbg btn-block view-order-btn' onClick={this.showOrderDetail.bind(this)}>View Order Details</button> 
            : null}

            <button className="btn-borderwhite" style={{marginTop:'5px',width:'100%'}} onClick={evt => this.props.showCancelModal(productData,this.props.currentCompleteData)} >
              Cancel Item
            </button> 
            <button className="btn-borderwhite" style={{marginTop:'5px',width:'100%'}} onClick={evt => this.props.onReturn(productData,this.props.currentCompleteData)} >
              Return Item
            </button> 
            <button className="btn-borderwhite" style={{marginTop:'5px',width:'100%'}} onClick={evt => this.props.showServiceRequestForm(productData,this.props.currentCompleteData)} >
              Service Request
            </button> 
        </div>  
      
      </>
    );
  }
}

export default RWDSingleProduct;
