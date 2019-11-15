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
  imagePrefix,
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
  createPdpURL,
  createSEOPdpURL,
  isMobile,
} from '../../../utils/utilityManager';
import { ADD_TO_COMPARE } from '../../../constants/app/footerConstants';


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
      masterCategoryID: this.state.data.masterCategoryID,
    };
    this.props.addProduct(product);
  }

  moveToCartClicked = e => {
    e.preventDefault();
    
    const productType = this.state.data.type;

    var data;
    if (productType === 'BundleBean') {
      let orderItem = Array();
      this.state.data.bundleComponents.map(bundleData => {
        orderItem.push({ sku_id: bundleData.uniqueID, quantity: bundleData.quantity.toString() })
      });
      data = {
        orderItem
      };

    }
    else {
      data = {
        orderItem: [
          {
            sku_id: this.state.data.uniqueID,
            quantity: '1',
          },
        ],
      };
    }

    apiManager
      .post(addToCart, data)
      .then(response => {
        getUpdatedMinicartCount(this);
        // this.props.updatetMinicart();
        removeFromWishlistGlobalAPI(this.state.data.uniqueID, this);
        this.props.moveToCartPopUpPro();
      })
      .catch(error => {
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
    var routePath = createSEOPdpURL(this.state.data.productName, this.state.data.shortDescription, this.state.data.partNumber);
    var swatchFinalData;
    if (this.state.colorSwatchSplit.length !== 0) {
      swatchFinalData = this.state.colorSwatchSplit;
    }
    else {
      swatchFinalData = this.state.colorSwatchFull;
    }
    const userAgent = window.navigator.userAgent.toLowerCase();
    const compareButton = /ipad/.test( userAgent ) ? null : <button className="btn-compare" onClick={this.handleClick.bind(this)}>{ADD_TO_COMPARE}</button>;
    return (
      <li className="productlist">
        <div className="prdListData">
          <ItemImage
            data={this.props.coloumnLayout === 3 ? this.state.data.thumbnail : this.state.data.thumbnail2}
            uniqueId={this.state.data.uniqueID}
            partNumber={this.state.data.partNumber}
            productName={this.state.data.productName}
            shortDescription={this.state.data.shortDescription}
            breadcrumbDataPro={this.props.plpBreadcrumbPro}
            isSearchPathPro={this.props.isSearchPathPro}
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
        <Link className="link" to={{ pathname: routePath, state: this.props.isSearchPathPro.includes('/furniture') ? { breadcrumbData: this.props.plpBreadcrumbPro } : undefined}}>
          <div className="hoverBox">
            {this.props.isfromWishlistPro ?
              <button className={this.props.isShareWishlistPro ? 'btn-compare' : isMobile() ? 'mov-to-cart' : 'btn-compare'} onClick={this.moveToCartClicked.bind(this)}><b>{this.props.isShareWishlistPro ? 'Add To Cart' : 'Move To Cart'}</b></button> :
              compareButton}

            {this.props.isColorSwatchPro && this.props.swatchList.length > 1 ? <div className="inner-overlay">
              <ul className="colortheme clearfix">

                {swatchFinalData.map(item => {
                  var colorStyle = { backgroundColor: `rgb${item.colorCode}` };
                  var checkedType = false;
									var radioButtonHtml;
									var name = '';
									var imgUrl = '';
									colorStyle = {
										display: "block",
									}
									var circle = 'display:block';
									var isRadio = false;
                  var boxClass = '';
                  if (item.colorCode) {
										circle = 'circle';
										colorStyle = {
											backgroundColor: `rgb${item.colorCode}`,
                    };
                  }
                  else if (item.facetImage) {
										circle = 'circleImg';
										imgUrl = item.facetImage;
										name = <img className="imgCircle" src={`${imagePrefix}${imgUrl}`} />;
									}
                  return (
                    <li onClick={(e) => this.onSwatchChange(e, item.name)} className={`list ${this.state.data.swatchColor === item.name ? 'active' : ''}`}>
                <span className={name==''?'swatches-circle':'swatches-circle-img'} style={colorStyle}>{name}</span>
                    </li>
                  )

                })}

                {this.state.colorSwatchSplit.length !== 0 ? <button className={isMobile() ?'moreSwatchForMobile':'moreSwatch'} onClick={this.showAllSwatchColors.bind(this)}>+ {this.state.colorSwatchFull.length - this.state.colorSwatchSplit.length} more</button> : null}
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
  };
}

export default connect(
  mapStateToProps,
  { updatetMinicart, updatetWishListCount, resetRemoveFromWishlistFlag },
)(ProductItem);
