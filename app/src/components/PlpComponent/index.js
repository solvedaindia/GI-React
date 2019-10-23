/**
 *
 * PlpComponent
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';
import reducer from '../../containers/PlpContainer/reducer';
import saga from '../../containers/PlpContainer/saga';
import * as actionCreators from '../../containers/PlpContainer/actions';
import {
  getReleventReduxState,
  getOnlyWishlistUniqueIds,
  isMobile,
} from '../../utils/utilityManager';

import ProductItem from '../GlobalComponents/productItem/productItem';
import AdBanner from './AdBanner/adBanner';
import Sort from './Sorting/sort';
import LoadingIndicator from '../../utils/loadingIndicator';
import appCookie from '../../utils/cookie';

class PlpComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log("aaaaaaaaaa",'constructor');
    this.state = {
      plpItem: null,
      adBannerIndex: 12,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log("aaaaaaaaaa",'componentWillReceiveProps');
    console.log("aaaaaaaaaa p",nextProps);
    this.parsePLPData(nextProps, true);
  }

  componentDidMount() {
    console.log("aaaaaaaaaa",'componentDidMount');
    this.parsePLPData(this.props, false);
  }

  handleAddProduct = product => {
    let compdata = [];
    if (this.props.compData.length > 0) { 
      compdata = this.props.compData;
    } else if(appCookie.get('compareProduct')) { 
      compdata = JSON.parse(appCookie.get('compareProduct'));
    }
    
    const compPrd = compdata.find(prd => prd.skuId == product.skuId);
    const compCat = compdata.find(prd => prd.catId == this.props.catId);
    const masterProduct = compdata.find(prd => prd.masterCategoryID == product.masterCategoryID);
    if (compPrd) {
      alert(
        'Product already added in Compare tray. Please add another product',
      );
    } else if (compdata.length == 3) {
      alert(
        'You can add upto 3 products. Please remove a product to add another',
      );
    } else if (compdata.length > 0 && !compCat) {
      alert('Please select same category products');
    } 
    else if (compdata.length > 0 && !masterProduct && this.props.isSearchPathPro.includes('/search')) {
      alert('Selected product is from different category');
    } 
    else {
      if (this.props.compData.length === 0) {
        compdata.map(data => {
          this.props.addProduct(data);
        })
      }
      product.catId = this.props.catId;
      this.props.addProduct(product);
    }
  };

  parsePLPData(data) {
    if (data) {
      const wishlistArr = getOnlyWishlistUniqueIds();
      const plpData = data.plpDataPro;
      const item = plpData.map((item, index) => (
        <>
          {!this.props.showSkuPro ? 
            <ProductItem // Swatch level
              key={index}
              dataPro={item.skuList[0]}
              isInWishlist={wishlistArr.includes(item.skuList[0].uniqueID)}
              addProduct={this.handleAddProduct}
              compData={this.props.compData}
              isfromWishlistPro={this.props.isFromWishlistPro}
              history={this.props.history}
              isSearchPathPro={this.props.isSearchPathPro}
              isColorSwatchPro
              skuList={item.skuList}
              swatchList={item.swatchesData}
              isShareWishlistPro={this.props.isShareWishlistPro}
              coloumnLayout={this.props.coloumnLayout}
              moveToCartPopUpPro={this.props.moveToCartPopUpPro}
              plpBreadcrumbPro={this.props.plpBreadcrumbPro}
            /> :
            <ProductItem // Sku level
              key={index}
              dataPro={item}
              isInWishlist={wishlistArr.includes(item.uniqueID)}
              addProduct={this.handleAddProduct}
              compData={this.props.compData}
              isfromWishlistPro={this.props.isFromWishlistPro}
              history={this.props.history}
              isSearchPathPro={this.props.isSearchPathPro}
              swatchList={[]}
              isShareWishlistPro={this.props.isShareWishlistPro}
              coloumnLayout={this.props.coloumnLayout}
              moveToCartPopUpPro={this.props.moveToCartPopUpPro}
              plpBreadcrumbPro={this.props.plpBreadcrumbPro}
            />
          }
          <AdBanner indexPro={index + 1} />
        </>
      ));
      this.setState({ plpItem: item });
    }
  }



  render() {
    let coloumnLayout;
    if (this.props.coloumnLayout === 3 || this.props.isFromWishlistPro === true) {
      coloumnLayout = 'plp-products grid3';
      if (isMobile()) {
        coloumnLayout = 'plp-products grid2';
      }
    } 
    else {
      coloumnLayout = 'plp-products grid2';
      if (isMobile()) {
        coloumnLayout = 'plp-products grid1';
      }
    }
    return (
      <ul className={coloumnLayout}>{this.state.plpItem}</ul>
      
    );
  }
}

/* ----------------------------------------   REDUX HANDLERS   -------------------------------------  */
const mapDispatchToProps = dispatch => ({
  addProduct: product => dispatch(actionCreators.AddProduct(product)),
});

const mapStateToProps = state => {
  const stateObj = getReleventReduxState(state, 'plpContainer');
  return {
    bannerPosIndex: stateObj.adBannerPos,
    bannerCurrentIndex: stateObj.adBannerCurrentIndex,
    coloumnLayout: stateObj.columnLayout,
    compData: stateObj.compWidgetData,
    compCategories: stateObj.compCategories,
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'plpContainer', reducer });
const withSaga = injectSaga({ key: 'plpContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PlpComponent);
