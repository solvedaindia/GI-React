/**
 *
 * PlpComponent
 *
 */

import React from 'react';
// Redux Imports
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
} from '../../utils/utilityManager';

import ProductItem from '../GlobalComponents/productItem/productItem';
import AdBanner from './AdBanner/adBanner';
import Sort from './Sorting/sort';
import LoadingIndicator from '../../utils/loadingIndicator';

class PlpComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plpItem: null,
      adBannerIndex: 12,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.parsePLPData(nextProps, true);
  }

  componentDidMount() {
    this.parsePLPData(this.props, false);
  }

  handleAddProduct = product => {
    const compPrd = this.props.compData.find(prd => prd.id == product.id);
    const compCat = this.props.compData.find(
      prd => prd.catId == this.props.catId,
    );
    if (compPrd) {
      alert(
        'Product alreday added in Compare tray. Please add another product',
      );
    } else if (this.props.compData.length == 3) {
      alert(
        'You can add upto 3 products. Please remove a product to add another',
      );
    } else if (this.props.compData.length > 0 && !compCat) {
      alert('Please select same category products');
    } else {
      product.catId = this.props.catId;
      this.props.addProduct(product);
    }
  };

  parsePLPData(data) {
    console.log('isFromWishlist ---- ',this.props.isfromWishlistPro);
    
    if (data) {
      const wishlistArr = getOnlyWishlistUniqueIds();
      const plpData = data.plpDataPro;
      const item = plpData.map((item, index) => (
        <>
          <ProductItem
            key={index}
            data={item}
            isInWishlist={wishlistArr.includes(item.uniqueID)}
            addProduct={this.handleAddProduct}
            compData={this.props.compData}
            isfromWishlistPro={this.props.isFromWishlistPro}
            history={this.props.history}
          />
          <AdBanner indexPro={index + 1} />
          {/* {index === this.props.bannerPosIndex ? <AdBanner indexPro={index} dataPro={isAdBanner ? data.adBannerDataPro[0] : null} /> : null } */}
        </>
      ));
      // this.initialize(plpData);
      this.setState({ plpItem: item });
    }
  }

  /*
  initialize(plpData) {
    var coloumnLayout;
    if (this.props.coloumnLayout === 3) {
      coloumnLayout = 'plp-products grid3';
    }
    else {
      coloumnLayout = 'plp-products grid2';
    }


    var reduxValue = this.props.bannerPosIndex
    var ddd = [];
    var actualItem = [];
    plpData.forEach(function (item, index) {
      console.log('end===',ddd);
      //console.log('mmmm===',actualItem);
      if (index+1 === reduxValue) {
        ddd.push(<ProductItem key={index} data={item} />);
       
        actualItem.push(
          <>
            <ul className={coloumnLayout}>{ddd}</ul>
            <AdBanner key={'banner'+index} indexPro={index+1} />
          </>
        )
        
        ddd = [];
        
      }
      else {
        ddd.push(<ProductItem key={index} data={item} />);
      }


    })
    actualItem.push(
      <>
        <ul className={coloumnLayout}>{ddd}</ul>
        
      </>
    )

    this.setState({ plpItem: actualItem });

  }
*/

  render() {
    let coloumnLayout;
    if (this.props.coloumnLayout === 3) {
      coloumnLayout = 'plp-products grid3';
    } else {
      coloumnLayout = 'plp-products grid2';
    }

    return (
      // <div className="row no-padding">
      <ul className={coloumnLayout}>{this.state.plpItem}</ul>
      // </div>
      //
    );
  }
}

/* ----------------------------------------   REDUX HANDLERS   -------------------------------------  */
const mapDispatchToProps = dispatch => ({
  addProduct: product => dispatch(actionCreators.AddProduct(product)),
  // onAdBannerIndexUpdate: (currentIndex) => dispatch(actionCreators.adBannerAction(currentIndex)),
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
