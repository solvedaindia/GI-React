import React from 'react';
import apiManager from '../../../../utils/apiManager';
import { changePasswordAPI, imagePrefix } from '../../../../../public/constants/constants';
import OrderStatusBar from '../orderStatusBar';

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
    if (shipmentData.expectedDeliveryDate !== '') {
      this.setState({
        dsNameTag: 'DELIVERY ON',
        dsDateTag: shipmentData.expectedDeliveryDate.split(',')[0]
      })
    }
    else if (shipmentData.expectedInstallationDate !== '') {
      if (shipmentData.installationDate === '') {
        this.setState({
          dsNameTag: 'INSTALLATION ON',
          dsDateTag: shipmentData.expectedInstallationDate.split(',')[1]
        })
      }
    }
  }

  render() {
    const productData = this.props.orderDataPro;
    console.log('dddd -- ',productData.shipmen)
    return (
      <>
        <div className="itemBoxTrack clearfix">
          <div className='itemImg'>
            <img className='imgBox' src={productData.thumbnail !== '' ? `${imagePrefix}${productData.thumbnail}` : require('../../../../../public/images/plpAssests/placeholder-image.png')} />
          </div>
          <div className='itemInfo'>
            <div className='productName'>{productData.productName}</div>
            <div className='description'>{productData.shortDescription}</div>
            <div className='quantity'>{this.props.isMultiTrackPro ? this.props.shipmentDataPro.quantity : productData.quantity}</div>
            <div className='price'>{productData.offerPrice}</div>
            <div className='deliveryTag'>
              <span>{this.state.dsNameTag}</span>
              <span>{this.state.dsDateTag}</span>
            </div>
          </div>
        </div>
        <div className='clearfix'></div>
        <div className='orderStatus'>
          {this.props.isFromViewOrder ? null : <OrderStatusBar shipmentDataPro={this.props.isMultiTrackPro ? this.props.shipmentDataPro : productData.shipmentData[0]} customClassPro='trackorder-wrap' /> }
        </div>
        <div className='clearfix'/>
        <div className='orderBtn'>
          {!this.props.isMultiTrackPro ? productData.shipmentData.length > 1 ? <button className='btn-blackbg btn-block track-order-btn' onClick={this.trackOrderFromViewOrder.bind(this, productData)}>Track Order</button> : this.props.isFromViewOrder ? null : <button className='btn-blackbg btn-block view-order-btn' onClick={this.showOrderDetail.bind(this)}>View Order Details</button> : null}
        </div>  
      </>
    );
  }
}

export default RWDSingleProduct;
