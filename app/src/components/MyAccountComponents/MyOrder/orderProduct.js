import React from 'react';
import OrderStatusBar from './orderStatusBar';

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
    const shipmentData = this.props.prodctDataPro.shipmentData[0];
    console.log('ddkdkd -- ',shipmentData.expectedDeliveryDate, shipmentData.expectedInstallationDate);
    if (shipmentData.expectedDeliveryDate !== '') {
      console.log('Delivery -- ', this.props.prodctDataPro.expectedDeliveryDate)
      this.setState({
        dsNameTag: 'DELIVERY ON',
        dsDateTag: shipmentData.expectedDeliveryDate.split(',')[0]
      })
    }
    else if (shipmentData.expectedInstallationDate !== '') {
      console.log('Installation -- ',shipmentData.installationDate)
      if (shipmentData.installationDate === '') {
        this.setState({
          dsNameTag: 'INSTALLATION ON',
          dsDateTag: shipmentData.expectedInstallationDate.split(',')[1]
        })
      }
      
    }

  }

  render() {

    const productData = this.props.prodctDataPro;
    console.log('order Product --- ', this.props.allDataPro)
    return (
      <>
        <div className="clearfix" />
        <div className="orderProduct clearfix">
          <div className="orderimgbox clearfix">
            <div className="imgBox">
              <img src={productData.thumbnail !== '' ? `${imagePrefix}${this.props.dataPro.thumbnail}` : require('../../../../public/images/plpAssests/placeholder-image.png')} className="imgfullwidth" />
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
                {productData.shipmentData.length > 1 ? null :
                  <div className="delivery quantity">
                    <span className="heading">{this.state.dsNameTag}</span>
                    <span className="textval">{this.state.dsDateTag}</span>
                  </div>
                }
              </div>
            </div>
          </div>

          <div className="orderbtn">
            {/* <button className="btn-borderwhite btn-cancel">Cancel Order</button> // Not in Phase1 as Per BRD */}
            {productData.shipmentData.length > 1 ? <button className="btn-borderwhite" onClick={evt => this.props.proceedToTrackOrderPro(this.props.prodctDataPro)} >
              Track My Order
            </button> : null}

          </div>
          <div className='clearfix'></div>
          {productData.shipmentData.length === 1 ?
            <OrderStatusBar shipmentDataPro={productData.shipmentData[0]} customClassPro='trackorder-wrap'/>
            : null}
        </div>
      </>
    );
  }
}

export default ProductOrder;
