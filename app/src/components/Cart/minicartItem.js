import React from 'react';
import { Route, NavLink, Link } from 'react-router-dom';
import Price from '../GlobalComponents/productItem/price';
import { imagePrefix } from '../../../public/constants/constants';

class MinicartItem extends React.Component {
  state = {
    isFreeItem: this.props.dataPro.freeGift,
  };

  minicartPrice() {
    const offerPrice = parseFloat(this.props.dataPro.offerPrice);
    const actualPrice = parseFloat(this.props.dataPro.actualPrice);
    let crossPriceItem;

    if (offerPrice < actualPrice) {
      crossPriceItem = <span className="priceno-discount">{actualPrice}</span>;
    }

    return (
      <p className="price">
        <span className="discount-price">{offerPrice}</span>
        {crossPriceItem}{' '}
      </p>
    );
  }

  shippingCharegeHandler() {
    const sCharge = Math.round(this.props.dataPro.shippingCharges);

    return (
      <>
        <span className="shipping-charge">SHIPPING CHARGES<br /><span className="textval">{sCharge !== 0 ? sCharge : 'Free'}</span></span>
        {/* {sCharge !== 0 ? <span className="shipping-charge">SHIPPING CHARGES<br /><span className="textval">{sCharge}</span></span> : null} */}
      </>
    );
  }

  onNavigationLink = () => {
    this.props.closeDropdownPro();
  }

  render() {
    console.log('MiniCart ITEM --- ', this.state.isFreeItem);

    let discountAccessoriesItem = null;
    if (this.props.dataPro.discount !== '') {
      const boldStr = <span className="bold">{this.props.dataPro.discount}%</span>
      discountAccessoriesItem = (
        <span className="free-accessories">{boldStr} Off {this.props.dataPro.promotionData !== '' && this.props.dataPro.discount !== '' ? '&' : ''} {this.props.dataPro.promotionData !== '' ? this.props.dataPro.promotionData : null}</span>
      );
    }

    var routePath = '/pdp/' + this.props.dataPro.parentUniqueID + '/' + this.props.dataPro.uniqueID;

    return (
      <>
        <div className="minicartList">
          <Link className="link" to={routePath} onClick={this.onNavigationLink}>
            <div className="imgBox">
              {/* <img src={require('../../../public/images/miniItem1.png')} className="imgfullwidth" /> */}
              <img src={this.props.dataPro.thumbnail !== '' ? `${imagePrefix}${this.props.dataPro.thumbnail}` : require('../../../public/images/plpAssests/placeholder-image.png')} onError={require('../../../public/images/plpAssests/placeholder-image.png')} className="imgfullwidth" />
            </div>
          </Link>
          <div className="product-text">
            <Link className="link" to={routePath} onClick={this.onNavigationLink}>
              <p className="heading">{this.props.dataPro.productName}</p>
            </Link>
            <p className="description">
              ({this.props.dataPro.shortDescription})
            </p>
            {this.state.isFreeItem ? (<p className="price"><span className="discount-price">Free</span></p>) : (this.minicartPrice())}

            {this.state.isFreeItem ? null : discountAccessoriesItem}

            <p className="quantity-shipping clearfix">
              <span className="quantity">
                Quantity
                <br />
                <span className="textval">{this.props.dataPro.quantity}</span>
              </span>
              {this.shippingCharegeHandler()}
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default MinicartItem;
