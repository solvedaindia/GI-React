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

  filterDeliveryInstallationTags() {

    const shipmentData = this.props.orderDataPro.shipmentData[0];
    console.log('ssssdkdkd --- ', shipmentData)
    if (shipmentData.expectedDeliveryDate !== '') {
      this.setState({
        dsNameTag: 'DELIVERY ON',
        dsDateTag: shipmentData.expectedDeliveryDate.split(',')[0]
      })
    }
    else if (shipmentData.expectedInstallationDate !== '') {
      console.log('Installation -- ', shipmentData.installationDate)
      if (shipmentData.installationDate === '') {
        this.setState({
          dsNameTag: 'INSTALLATION ON',
          dsDateTag: shipmentData.expectedInstallationDate.split(',')[1]
        })
      }
    }
  }

  render() {
    console.log('triccc -- ', this.props.orderDataPro);
    const productData = this.props.orderDataPro;
    return (
      <>
        <div className="itemBoxTrack clearfix">

          <div className='itemImg'>
            <img className='imgBox' src={productData.thumbnail !== '' ? `${imagePrefix}${productData.thumbnail}` : require('../../../../../public/images/plpAssests/placeholder-image.png')} />
          </div>

          <div className='itemInfo'>
            <div className='productName'>{productData.productName}</div>
            <div className='description'>{productData.shortDescription}</div>
            <div className='quantity'>{productData.quantity}</div>
            <div className='price'>{productData.offerPrice}</div>
            <div className='deliveryTag'>
              <span>{this.state.dsNameTag}</span>
              <span>{this.state.dsDateTag}</span>
            </div>
          </div>

        </div>
        <div className='clearfix'></div>
        <div className='orderStatus'>
          <OrderStatusBar shipmentDataPro={productData.shipmentData[0]} customClassPro='trackorder-wrap' />
        </div>

      </>
    );
  }
}

export default RWDSingleProduct;
