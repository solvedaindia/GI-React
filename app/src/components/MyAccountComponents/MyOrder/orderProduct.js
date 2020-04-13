import React from 'react';
import OrderStatusBar from './orderStatusBar';
import { imagePrefix } from '../../../../public/constants/constants';
import { CACELATION_WINDOW_CLOSE } from '../../../../../app/src/constants/app/cancelConstants';

class ProductOrder extends React.Component {
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

  onTrackOrderClick() {
    this.props.proceedToTrackOrderPro(this.props.allDataPro);
  }

  filterDeliveryInstallationTags() {
    if (this.props.prodctDataPro.shipmentData) {
      const shipmentData = this.props.prodctDataPro.shipmentData[0];
      if (shipmentData !== undefined) {


        if (shipmentData.expectedDeliveryDate !== '') {
          this.setState({
            dsNameTag: 'DELIVERY ON',
            dsDateTag: shipmentData.expectedDeliveryDate.split(',')[1]
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
    }
  }

  render() {

    const productData = this.props.prodctDataPro;
    return (
      <>
        <div className="clearfix" />
        <div className={this.props.totalItems-1 === this.props.itemIndex? "orderProduct clearfix removeBorder" : "orderProduct clearfix"}>
          <div className="orderimgbox clearfix">
            <div className="imgBox">
              <img  alt={productData.productName} src={productData.thumbnail !== '' ? `${imagePrefix}${productData.thumbnail}` : require('../../../../public/images/plpAssests/placeholder-image.png')} className="imgfullwidth" />
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
                  <span className="textval">{productData.quantity}</span>
                </div>
                {productData.shipmentData && productData.shipmentData.length > 1 ? null :
                  <div className="delivery quantity">
                    <span className="heading">{this.state.dsNameTag}</span>
                    <span className="textval">{this.state.dsDateTag}</span>
                  </div>
                }
              </div>
              {/*Cance message condtion replaced by true */}
              {true && <div>  
                  <span className="textval">{CACELATION_WINDOW_CLOSE}</span>
              </div>}
            </div>
          </div>

          <div className="orderbtn">
            {/* <button className="btn-borderwhite btn-cancel">Cancel Order</button> // Not in Phase1 as Per BRD */}
            {productData.shipmentData && productData.shipmentData.length > 1 ? <button className="btn-borderwhite" onClick={evt => this.props.proceedToTrackOrderPro(this.props.prodctDataPro)} >
              Track My Order
            </button> : null}

            <button className="btn-borderwhite" onClick={evt => this.props.proceedToTrackOrderPro(this.props.prodctDataPro)} >
              Service Request
            </button> 
        
            <button className="btn-borderwhite cancel-item" onClick={evt => this.props.showCancelModal(this.props.prodctDataPro)} >
              Cancel Item
            </button> 

          </div>
          <div className='clearfix'></div>
          {productData.shipmentData && productData.shipmentData.length === 1 ?
            <OrderStatusBar shipmentDataPro={productData.shipmentData[0]} customClassPro='trackorder-wrap' />
            : null}
        </div>
      </>
    );
  }
}

export default ProductOrder;
