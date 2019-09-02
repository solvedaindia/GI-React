import React from 'react';
import { Route, NavLink, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import ItemImage from './image';
import RibbonTag from './ribbonTag';
import Price from './price';
import Promotions from './promotion';
import InStock from './inStock';
import Wishlist from './wishlist';
import Title from './title';
import {
  addToCart,
  removeFromWishlist,
  wishlistIdCookie,
} from '../../../../public/constants/constants';
import apiManager from '../../../utils/apiManager';
import {
  updatetMinicart,
  updatetWishListCount,
  resetRemoveFromWishlistFlag,
} from '../../../actions/app/actions';
import {
  getUpdatedMinicartCount,
  getUpdatedWishlist,
  removeFromWishlistGlobalAPI,
} from '../../../utils/initialManager';
import {
  getCookie,
  getCorrespondingGiftlistId,
  getOnlyWishlistUniqueIds,
  isMobile,
} from '../../../utils/utilityManager';

class ProductItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onSwatchChange = this.onSwatchChange.bind(this)
    this.state = {
      data: this.props.dataPro,
      colorSwatchSplit: this.props.swatchList.length > 4 ? this.props.swatchList.slice(0, 4) : [],
      colorSwatchFull: this.props.swatchList,
    };
  }

  handleClick(e) {
    e.preventDefault();
    const product = {
      title: this.state.data.productName,
      thumbnail: this.state.data.thumbnail,
      skuId: this.state.data.uniqueID,
      id: this.state.data.parentUniqueID,
      actualPrice: this.state.data.actualPrice,
      offerPrice: this.state.data.offerPrice,
    };
    this.props.addProduct(product);
  }

  moveToCartClicked = e => {
    e.preventDefault();

	  const data = {
	    orderItem: [
        {
	        sku_id: this.state.data.uniqueID,
	        quantity: '1',
        },
	    ],
	  };
    console.log('Move To Cart Clicked  ----  ', data);

	  apiManager
	    .post(addToCart, data)
	    .then(response => {
        console.log('Add to cart Data ---- ', response.data);
        getUpdatedMinicartCount(this);
        // this.props.updatetMinicart();
        removeFromWishlistGlobalAPI(this.state.data.uniqueID, this);
        this.props.moveToCartPopUpPro();
	    })
	    .catch(error => {
        console.log('AddToCart Error---', error);
      });
  };

  onSwatchChange(e, selectedSwatch) {
    e.preventDefault();
	  const selectedItem = this.props.skuList.find((item) => item.swatchColor === selectedSwatch)
	  this.setState({
	    data: selectedItem,
	  })
  }

  showAllSwatchColors = e => {
    e.preventDefault();
	  this.setState({
      colorSwatchSplit: [],
	  })
  };

  render() {
	  console.log('Color Swatch Split  ----  ', this.state.colorSwatchSplit, this.state.colorSwatchFull, );
	  var productname = String(this.state.data.productName).toLowerCase()
	  var routePath = `/pdp/furniture-${productname.split(' ').join('-')}/${this.state.data.uniqueID}`

	  var swatchFinalData;
    if (this.state.colorSwatchSplit.length !== 0) {
	    swatchFinalData = this.state.colorSwatchSplit;
	  }
	  else {
	    swatchFinalData = this.state.colorSwatchFull;
    }

    return (
	    <li className="productlist">
        <div className="prdListData">
          <ItemImage
	          data={this.props.coloumnLayout === 3 ? this.state.data.thumbnail : this.state.data.thumbnail2 }
            uniqueId={this.state.data.uniqueID}
            parentUniqueId={this.state.data.parentUniqueID}
            productname={this.state.data.productName}
          />
          <InStock isInStock={this.state.data.inStock} />
	        <RibbonTag data={this.state.data.ribbonText} />
	        <div className="product-text">
            <Title
              titlePro={this.state.data.productName}
	            descriptionPro={this.state.data.shortDescription}
	          />
	          <p className="price text">
	            <Price
                actualPrice={this.state.data.actualPrice}
                offerPrice={this.state.data.offerPrice}
	            />
            </p>
            <Promotions
	            promoData={this.state.data.promotionData}
              discount={this.state.data.discount}
	            emi={this.state.data.emiData} />
          </div>
	      </div>
	      <Link className="link" to={routePath}>
	        <div className="hoverBox">
            {this.props.isfromWishlistPro ? 
	            <button className={this.props.isShareWishlistPro ? 'btn-compare': isMobile() ? 'mov-to-cart' :  'btn-compare' } onClick={this.moveToCartClicked.bind(this)}> {this.props.isShareWishlistPro ? 'Add To Cart' : 'Move To Cart'}</button> :
	            <button className="btn-compare" onClick={this.handleClick.bind(this)}>Add to compare</button>}

	          {this.props.isColorSwatchPro && this.props.swatchList.length > 1 ? <div className="inner-overlay">
	            <ul className="colortheme clearfix">
                  {/* {this.state.colorSwatchSplit.length !== 0 ? 
									this.state.colorSwatchSplit.map(item => {
										var colorStyle = { backgroundColor: `rgb${item.colorCode}` };
										return (
											<li onClick={(e) => this.onSwatchChange(e, item.name)} class={`list ${this.state.data.swatchColor === item.name ? 'active' : ''}`}>
												<span className='swatches-circle' style={colorStyle}></span>
											</li>
										)
	
									}) : 
									this.state.colorSwatchFull.map(item => {
										var colorStyle = { backgroundColor: `rgb${item.colorCode}` };
										return (
											<li onClick={(e) => this.onSwatchChange(e, item.name)} class={`list ${this.state.data.swatchColor === item.name ? 'active' : ''}`}>
												<span className='swatches-circle' style={colorStyle}></span>
											</li>
										)
	
									}) } */}
                  {swatchFinalData.map(item => {
	                var colorStyle = { backgroundColor: `rgb${item.colorCode}` };
                    return (
	                  <li onClick={(e) => this.onSwatchChange(e, item.name)} className={`list ${this.state.data.swatchColor === item.name ? 'active' : ''}`}>
	                    <span className='swatches-circle' style={colorStyle}></span>
	                  </li>
	                )
	
	              }) }

	              {this.state.colorSwatchSplit.length !== 0 ? <button className='moreSwatch' onClick={this.showAllSwatchColors.bind(this)}>+ {this.state.colorSwatchFull.length - this.state.colorSwatchSplit.length} more</button> : null }
                </ul>
	          </div> : null}
          </div>
        </Link>
	      <Wishlist
          uniqueId={this.state.data.uniqueID}
          isInWishlistPro={this.props.isInWishlist}
	        isFromWishlistPro={this.props.isfromWishlistPro}
	        history={this.props.history}
        />
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
  { updatetMinicart, updatetWishListCount, resetRemoveFromWishlistFlag },
)(ProductItem);
// export default ProductItem;
