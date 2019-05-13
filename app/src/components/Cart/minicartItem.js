import React from 'react';
import Price from '../GlobalComponents/productItem/price';

class MinicartItem extends React.Component {
  state = {};

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

  render() {
    console.log('MiniCart data --- ', this.props.dataPro);
    return (
      <>
        <div className="minicartList">
          <div className="imgBox">
            {/* <img src={require('../../../public/images/miniItem1.png')} className="imgfullwidth" /> */}
            <img
              src={`https://192.168.0.36:8443${this.props.dataPro.thumbnail}`}
              className="imgfullwidth"
            />
          </div>

          <div className="product-text">
            <p className="heading">{this.props.dataPro.productName}</p>
            <p className="description">
              ({this.props.dataPro.shortDescription})
            </p>
            {this.minicartPrice()}
            <p className="free-accessories">
              {' '}
              <span className="bold">10% Off</span>
              free accessories
            </p>
            <p className="quantity-shipping clearfix">
              <span className="quantity">
                Quantity
                <br />
                <span className="textval">{this.props.dataPro.quantity}</span>
              </span>
              <span className="shipping-charge">
                SHIPPING CHARGES
                <br />
                <span className="textval">
                  {Math.round(this.props.dataPro.shippingCharges)}
                </span>
              </span>
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default MinicartItem;
