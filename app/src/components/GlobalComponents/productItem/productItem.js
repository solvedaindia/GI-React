import React from 'react';
import ItemImage from './image';
import RibbonTag from './ribbonTag';
import Price from './price';
import Promotions from './promotion';
import InStock from './inStock';
import Wishlist from './wishlist';
import Title from './title';
import { addToCart } from '../../../../public/constants/constants';
import apiManager from '../../../utils/apiManager';

class ProductItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = () => {
    const compPrd = this.props.compData.find(
      prd => prd.id == this.props.data.uniqueID,
    );
    if (compPrd) {
      alert(
        'Product alreday added in compare. Please select different prodcut',
      );
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

  moveToCartClicked = () => {
    const data = {
      orderItem: [
        {
          sku_id: this.props.data.uniqueID,
          quantity: '1',
        },
      ],
    };
    console.log('Move To Cart Clicked  ----  ', data);

    apiManager
      .post(addToCart, data)
      .then(response => {
        console.log('Add to cart Data ---- ', response.data);
      })
      .catch(error => {
        console.log('AddToCart Error---', error);
      });
  };

  render() {
    console.log('isFromWishlist  ----  ', this.props.isfromWishlistPro);
    return (
      <li className="productlist">
        <div className="prdListData">
          <Wishlist
            uniqueId={this.props.data.uniqueID}
            isInWishlistPro={this.props.isInWishlist}
          />
          <InStock isInStock={this.props.data.inStock} />
        </div>
        <RibbonTag data={this.props.data.ribbonText} />
        <div className="product-text">
          <Title
            titlePro={this.props.data.productName}
            descriptionPro={this.props.data.shortDescription}
          />
          <p className="price text">
            <Price
              actualPrice={this.props.data.actualPrice}
              offerPrice={this.props.data.offerPrice}
            />
            {/* <p className="heading-description text">(Description)</p> */}
            <p className="price text">
              <Price
                actualPrice={this.props.data.actualPrice}
                offerPrice={this.props.data.offerPrice}
              />
            </p>
            <Promotions data={this.props.data.promotionData} />
          </p>
        </div>
        <div className="hoverBox">
          {this.props.isfromWishlistPro ? (
            <button className="btn-compare" onClick={this.moveToCartClicked}>
              Move To Cart
            </button>
          ) : (
            <button
              className="btn-compare"
              onClick={this.handleClick.bind(this)}
            >
              Add to compare
            </button>
          )}
        </div>
      </li>
    );
  }
}

export default ProductItem;
