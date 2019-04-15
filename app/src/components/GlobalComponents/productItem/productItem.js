import React from 'react';
import ItemImage from './image';
import RibbonTag from './ribbonTag';
import Price from './price';
import Promotions from './promotion';
import InStock from './inStock';

class ProductItem extends React.Component {
  render() {
    return (
      <li className="productlist">
        <div className="imgBox">
          <ItemImage data={this.props.data.thumbnail} />
          <InStock isInStock={this.props.data.inStock} />
        </div>
        <RibbonTag data={this.props.data.ribbonText} />
        <div className="product-text">
          <p className="heading text">{this.props.data.productName}</p>
          <p className="price text">
            <Price
              actualPrice={this.props.data.actualPrice}
              offerPrice={this.props.data.offerPrice}
            />
          </p>
          <Promotions data={this.props.data.promotionData} />
        </div>
      </li>
    );
  }
}

export default ProductItem;
