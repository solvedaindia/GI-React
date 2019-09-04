import React from 'react';
import apiManager from '../../../../utils/apiManager';
import { espotAPI } from '../../../../../public/constants/constants';
import '../../../../../public/styles/myAccount/trackMyOrder.scss';
import OrderItem from '../orderItem';
import OrderStatusBar from '../orderStatusBar';
import {imagePrefix} from '../../../../../public/constants/constants';

class TrackOrderProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerCareDetail: null,
      dsNameTag: null,
      dsDateTag: null,
    };
  }

  componentDidMount() {
    this.filterDeliveryInstallationTags();
  }

  getCustomerCareDetails() {
    apiManager.get(`${espotAPI}GI_TRACK_ORD_CONTACT`)
      .then(response => {
        const { data } = response || {};
        this.setState({
          customerCareDetail: data && data.data,
        });
      })
      .catch(error => { });
  }

  filterDeliveryInstallationTags() {
    const shipmentData = this.props.shipmentDataPro;
    if (shipmentData.expectedDeliveryDate !== '') {
      this.setState({
        dsNameTag: 'Delivery on: ',
        dsDateTag: shipmentData
      })
    }
    else if (shipmentData.expectedInstallationDate !== '') {
        this.setState({
          dsNameTag: 'Installation On: ',
          dsDateTag: shipmentData
        })
    }

  }

  render() {
    const productData = this.props.prodctDataPro;
    return (
      <>
        <div className="clearfix" />
         <div className="itemBox">
           <div className="orderProduct clearfix">
          <div className="orderimgbox clearfix">
            <div className="imgBox">
              <img src={productData.thumbnail !== '' ? `${imagePrefix}${productData.thumbnail}` : require('../../../../../public/images/plpAssests/placeholder-image.png')} className="imgfullwidth" />
            </div>

            <div className="product-text">
              <p className="heading">{productData.productName}</p>
              <p className="description">({productData.shortDescription})</p>
              <p className="price">
                <span className="discount-price">₹{productData.offerPrice}</span>
              </p>
              <div className="quantity-shipping clearfix">
                <div className="quantity">
                  <span className="heading">Quantity</span>
                  <span className="textval">{this.props.shipmentDataPro.quantity}</span>
                </div>

                <div className="delivery quantity">
                <span className="heading">{this.state.dsNameTag}</span>
                <span className="textval">{this.state.dsDateTag}</span>
                </div>

              </div>
            </div>
          </div>
          <div className="clearfix"></div>
          <OrderStatusBar shipmentDataPro={this.props.shipmentDataPro} customClassPro='trackorder-wrap' />
        </div>
         </div>
      </>
    );
  }
}

export default TrackOrderProduct;
