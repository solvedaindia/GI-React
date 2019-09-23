import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Price from '../GlobalComponents/productItem/price';
import { imagePrefix } from '../../../public/constants/constants';
import {FREE } from '../../constants/app/cartConstants';
import {SHIPPING_CHARGES } from '../../constants/app/cartConstants';
import {OFF } from '../../constants/app/cartConstants';
import {QUANTITY } from '../../constants/app/cartConstants';
import {createPdpURL} from '../../utils/utilityManager';

class MinicartItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isFreeItem: this.props.dataPro.freeGift,
    };
  }
  

  minicartPrice() {
    const offerPrice = parseFloat(this.props.dataPro.offerPrice);
    const actualPrice = parseFloat(this.props.dataPro.actualPrice);
    let crossPriceItem;
    if (offerPrice < actualPrice) {
      crossPriceItem = <span className="priceno-discount">₹{actualPrice}</span>;
    }

    return (
      <p className="price">
        <span className="discount-price">₹{offerPrice}</span>
        {crossPriceItem}{' '}
      </p>
    );
  }

  shippingCharegeHandler() {
    const sCharge = Math.round(this.props.dataPro.shippingCharges);

    return (
      <>
        <span className="shipping-charge">{SHIPPING_CHARGES}<br /><span className="textval">{sCharge !== 0 ? sCharge : FREE}</span></span>
      </>
    );
  }

  onNavigationLink = () => {
    this.props.closeDropdownPro();
  }

  render() {

    let discountAccessoriesItem = null;
    if (this.props.dataPro.discount !== '') {
      const boldStr = <span className="bold">{this.props.dataPro.discount}%</span>
      discountAccessoriesItem = (
        <span className="free-accessories">{boldStr} {OFF} {this.props.dataPro.promotionData !== '' && this.props.dataPro.discount !== '' ? '&' : ''} {this.props.dataPro.promotionData !== '' ? this.props.dataPro.promotionData : null}</span>
      );
    }

    var productname = String(this.props.dataPro.productName).toLowerCase();
	var routePath = createPdpURL(this.props.dataPro.productName, this.props.dataPro.partNumber);
    return (
      <>
      
        <div className="minicartList">
          <a className="link" href={routePath} onClick={this.onNavigationLink}>
            <div className="imgBox">
              <img alt="My Cart" src={this.props.dataPro.thumbnail !== '' ? `${imagePrefix}${this.props.dataPro.thumbnail}` : require('../../../public/images/plpAssests/placeholder-image.png')} className="imgfullwidth" />
            </div>
          <div className="product-text">
            <p className="heading">{this.props.dataPro.productName}</p>
            <p className="description">
              ({this.props.dataPro.shortDescription})
            </p>
            {this.state.isFreeItem ? (<p className="price"><span className="discount-price">{FREE}</span></p>) : (this.minicartPrice())}
            {this.state.isFreeItem ? null : discountAccessoriesItem}
            <p className="quantity-shipping clearfix">
              <span className="quantity">
                {QUANTITY}
                <br />
                <span className="textval">{this.props.dataPro.quantity}</span>
              </span>
              {this.shippingCharegeHandler()}
            </p>
          </div>
          </a>
        </div>
      </>
    );
  }
}

export default withRouter(MinicartItem);
