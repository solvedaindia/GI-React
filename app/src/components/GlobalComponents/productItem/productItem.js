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
import { updatetMinicart } from '../../../actions/app/actions';
import { connect } from 'react-redux';
import { getUpdatedMinicartCount } from '../../../utils/initialManager';

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
      "orderItem": [
        {
          "sku_id": this.props.data.uniqueID,
          "quantity": "1"
        }
      ]
    }
    console.log('Move To Cart Clicked  ----  ',data);
    
    apiManager.post(addToCart, data)
      .then(response => {
        console.log('Add to cart Data ---- ', response.data);
        getUpdatedMinicartCount(this)
        //this.props.updatetMinicart();
      })
      .catch(error => {
        console.log('AddToCart Error---', error);
      });
  }

  render() {
    console.log('isFromWishlist  ----  ', this.props)
    return (
      <li className="productlist">
        <div className="prdListData">
          {/* <Wishlist
            uniqueId={this.props.data.uniqueID}
            isInWishlistPro={this.props.isInWishlist}
          /> */}
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
          <Wishlist
            uniqueId={this.props.data.uniqueID}
            isInWishlistPro={this.props.isInWishlist}
            history={this.props.history}
          />
          <button className="btn-compare" onClick={this.handleClick}>
            Add to compare
          </button>
        </div>
      </li>
    );
  }
}

function mapStateToProps(state) {
  return {
    // default: state.default
  };
}

export default connect(
  mapStateToProps,
  { updatetMinicart },
)(ProductItem);
// export default ProductItem;
