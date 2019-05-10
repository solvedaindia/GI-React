import React from 'react';
import ItemImage from './image';
import RibbonTag from './ribbonTag';
import Price from './price';
import Promotions from './promotion';
import InStock from './inStock';
import Wishlist from './wishlist';
import Title from './title';

class ProductItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = () => {
    var compPrd = this.props.compData.find(prd => prd.id == this.props.data.uniqueID)
    if(compPrd) {
      alert("Product alreday added in compare. Please select different prodcut");

    } else {
      const product = {
        title: this.props.data.productName,
        thumbnail: this.props.data.thumbnail,
        id: this.props.data.uniqueID,
        actualPrice: this.props.data.actualPrice,
        offerPrice: this.props.data.offerPrice,
      };
      this.props.addProduct(product);
    }
  };

  render() {
    return (
      <li className="productlist">
        <div className="prdListData">
          <Wishlist
            uniqueId={this.props.data.uniqueID}
            isInWishlistPro={this.props.isInWishlist}
          />
          <div className="imgBox">
            <ItemImage
              data={this.props.data.thumbnail}
              uniqueId={this.props.data.uniqueID}
            />
            <InStock isInStock={this.props.data.inStock} />
          </div>
          <RibbonTag data={this.props.data.ribbonText} />
          <div className="product-text">
            <Title
              titlePro={this.props.data.productName}
              descriptionPro={this.props.data.shortDescription}
            />
            {/* <p className="heading-description text">(Description)</p> */}
            <p className="price text">
              <Price
                actualPrice={this.props.data.actualPrice}
                offerPrice={this.props.data.offerPrice}
              />
            </p>
            <Promotions data={this.props.data.promotionData} />
          </div>
        </div>
        <div className="hoverBox">
          <button className="btn-bg" onClick={this.handleClick}>
            Add to compare
          </button>
        </div>
      </li>
    );
  }
}

export default ProductItem;
