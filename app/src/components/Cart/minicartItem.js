import React from 'react';
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
        {sCharge !== 0 ? (
          <span className="shipping-charge">
            SHIPPING CHARGES
            <br />
            <span className="textval">{sCharge}</span>
          </span>
        ) : null}
      </>
    );
  }

  render() {
    console.log('MiniCart ITEM --- ', this.state.isFreeItem);
    return (
      <>
        <div className="minicartList">
          <div className="imgBox">
            {/* <img src={require('../../../public/images/miniItem1.png')} className="imgfullwidth" /> */}
            <img
              src={`${imagePrefix}${this.props.dataPro.thumbnail}`}
              className="imgfullwidth"
            />
          </div>

          <div className="product-text">
            <p className="heading">{this.props.dataPro.productName}</p>
            <p className="description">
              ({this.props.dataPro.shortDescription})
            </p>
            {this.state.isFreeItem ? (
              <p className="price">
                <span className="discount-price">Free</span>
              </p>
            ) : (
              this.minicartPrice()
            )}
            {this.state.isFreeItem ? null : (
              <p className="free-accessories">
                {' '}
                <span className="bold">10% Off</span>
                free accessories
              </p>
            )}

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
