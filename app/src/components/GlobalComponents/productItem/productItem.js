import React from 'react';
import ItemImage from './image';
import RibbonTag from './ribbonTag';
import Price from './price';
import Promotions from './promotion';

class ProductItem extends React.Component {
  render() {
    console.log('myyyyy---', this.props.data);
    return (
      <li className="col-xl-4 col-lg-4 col-md-4 col-sm-6 productlist">
        <div className="imgBox">
          <ItemImage data={this.props.data.imageSrc} />
          <button className="btn-outofStock">Out of Stock</button>
        </div>
        <RibbonTag data={this.props.data.ribbonText} />
        <div className="product-text">
          <p className="heading text">{this.props.data.productName}</p>
          <p className="price text">
            {/* <Price actualPrice={this.props.data.actualPrice} offerPrice={this.props.data.offerPrice}/> */}
            <span className="discount-price"> 24,700</span>{' '}
            <span className="priceno-discount">26,000</span>
          </p>
          <Promotions data={this.props.data.promotionData} />
        </div>
      </li>
    );
  }
}

export default ProductItem;
