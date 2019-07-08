import React from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import Productimageandvideo from './productImagesAndVideos';
import ProductNameDescription from './pdpNameDescription';
import ProductDefAttriutes from './productdefAttributes';
import ProductInfo from './productInfo';
import PdpEspot from './pdpEspot';
import ProductFeatures from './productFeatures';
import PurchaseGuide from './purchaseGuide';
import ProductDetail from './productDetail';
import ProductKeywords from './productKeywords';
import SimilarCombosProducts from './similarAndCombosProducts';
import SocialMedia from '../../utils/socialMedia';
import Wishlist from '../GlobalComponents/productItem/wishlist';
import { getOnlyWishlistUniqueIds } from '../../utils/utilityManager';
import AddToCart from './addToCart';
import Price from './price';
import appCookie from '../../utils/cookie';
import apiManager from '../../utils/apiManager';
import { pinCodeAPI } from '../../../public/constants/constants';

import '../../../public/styles/pdpComponent/pdpComponent.scss';
const shareImg = <img src={require('../../../public/images/share.svg')} />;

class PdpComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      skuData: {},
      isLoading: true,
      selectedSku: {},
      dataVal: '',
      pincodeData: '',
    };
  }

  componentDidMount() {
    this.getResolveSkuData();
  }

  /* get sku resolved data */
  getResolveSkuData(resolvedSkuId = null) {
    let skuId;
    if (resolvedSkuId) {
      skuId = resolvedSkuId;
    } else {
      skuId = this.props.matchParams.skuId;
    }

    this.props.data.skuData.map(skuLevelData => {
      if (skuId === skuLevelData.uniqueID) {
        this.getActualResolvedData(this.props.data.skuData, skuLevelData);
      }
    });
  }

  /* get actual resolve data  */
  getActualResolvedData(data, resolvedSkuData) {
    const selectedValue = resolvedSkuData.defAttributes[0].values[0].name;
    const skuDataArr = [];
    data.map(skuLevelData => {
      skuLevelData.defAttributes.map(attributeValue => {
        if (selectedValue === attributeValue.values[0].name) {
          skuDataArr.push(skuLevelData);
        }
      });
    });

    this.callPinCodeAPI(skuDataArr, resolvedSkuData);
  }

  /* handle swatches */
  handleSwatches(count) {
    let swatches = new Array();
    let productSkuData = this.props.data.skuData;
    const selectedSwatches = this.handleSelectedSwatches(count);
    for (let j = 0; j < selectedSwatches.length; j++) {
      swatches = new Array();
      productSkuData.map(skuLevelData => {
        skuLevelData.defAttributes.map((attributeValue, index) => {
          if (selectedSwatches[j] === attributeValue.values[0].name) {
            swatches.push(skuLevelData);
          }
        });
      });
      productSkuData = swatches;
    }
    this.getResolveSkuData(swatches[0].uniqueID);
  }

  /* handle selected swatches */
  handleSelectedSwatches(count) {
    const selectedSwatches = new Array();
    for (let i = 0; i < count + 1; i++) {
      const name = document
        .getElementsByClassName(`radio${i}`)[0]
        .getAttribute('name');
      const getValue = document.querySelector(`input[name = ${name}]:checked`)
        .value;
      selectedSwatches.push(getValue);
    }
    return selectedSwatches;
  }

  callPinCodeAPI(skuDataArr, resolvedSkuData) {
    const dataParams = {
      params: {
        partnumber: resolvedSkuData.partNumber,
        quantity: 1,
        uniqueid: resolvedSkuData.uniqueID,
      },
    };

    apiManager
      .get(pinCodeAPI + appCookie.get('pincode'), dataParams)
      .then(response => {
        this.setState({
          selectedSku: skuDataArr,
          isLoading: false,
          skuData: resolvedSkuData,
          pincodeData: response.data.data,
        });
      })
      .catch(error => {
        console.log('PDP Pin Code API Error =>', error);
        const defaultPincodeData = {
          pincodeServiceable: false,
          inventoryStatus: 'unavailable',
          shippingCharge: 0,
          error: 'Not a valid pincode',
        };
        this.setState({
          selectedSku: skuDataArr,
          isLoading: false,
          skuData: resolvedSkuData,
          pincodeData: defaultPincodeData,
        });
      });

    this.props.historyData.push(
      `/pdp/furniture-${resolvedSkuData.productName
        .toLowerCase()
        .replace(/ /g, '-')}/${resolvedSkuData.uniqueID}`,
    );
  }

  handleAddtocart(ispincode) {
    this.getResolveSkuData();
    if (!ispincode) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { isLoading } = this.state;
    const wishlistArr = getOnlyWishlistUniqueIds();
    const isAddToCart = appCookie.get('isPDPAddToCart');
    return (
      <div className="galleryArea">
        {!isLoading ? (
          <>
            {isAddToCart === 'true1' && (
              <Row>
                <Col md={7} sm={12} xs={12}>
                  <div className="product">
                    <span className="text">Product ID: </span>
                    <span className="text">
                      {this.state.skuData.partNumber}
                    </span>
                    <h4 className="heading">
                      {this.state.skuData.productName}
                    </h4>
                  </div>
                </Col>
                <Col md={4} sm={12} xs={12}>
                  <Price priceData={this.state.skuData} />
                  <div className="accessories-offer">
                    <div className="offerbg text"> % </div>
                    <div className="discount-off text">
                      {this.state.skuData.discount}% OFF & free accessories{' '}
                    </div>
                  </div>
                  <AddToCart
                    skuData={this.state.skuData}
                    sticky
                    pinCodeData={this.state.pincodeData}
                    handleAddtocart={this.handleAddtocart.bind(this)}
                  />
                </Col>
              </Row>
            )}
            <Row className="no-margin">
              <Col className="no-paddingLeft" md={7} sm={12} xs={12}>
                <div className="GalleryBox">
                  <Productimageandvideo
                    skuData={this.state.skuData}
                    activeData={false}
                  />
                </div>
              </Col>
              <Col md={4} sm={12} xs={12}>
                <div className="GallerytextBox">
                  <Row>
                    <Col md={12} sm={12} xs={12}>
                      <Col md={6} sm={12} xs={12} className="product">
                        <span className="text">Product ID: </span>
                        <span className="text">
                          {this.state.skuData.partNumber}
                        </span>
                      </Col>
                      <Col md={6} sm={12} xs={12} className="product-share">
                        <div className="share">
                          SHARE <div className="share-btn">{shareImg}</div>
                          <SocialMedia
                            productName={this.state.skuData.productName}
                          />
                        </div>
                        <div className="wishListDiv">
                          WISHLIST{' '}
                          <Wishlist
                            uniqueId={this.state.skuData.uniqueID}
                            isInWishlistPro={wishlistArr.includes(
                              this.state.skuData.uniqueID,
                            )}
                          />
                        </div>
                      </Col>
                    </Col>
                  </Row>
                  <ProductNameDescription productData={this.state.skuData} />
                  <ProductDefAttriutes
                    defAttributes={this.props.data.defAttributes}
                    selectedAttribute={this.state.skuData.defAttributes}
                    allselectedData={this.state.selectedSku}
                    handleOptionData={this.handleSwatches.bind(this)}
                  />
                  <ProductInfo
                    productData={this.state.skuData}
                    defAttributes={this.props.data.defAttributes}
                    pinCodeData={this.state.pincodeData}
                  />
                  <AddToCart
                    skuData={this.state.skuData}
                    sticky={false}
                    pinCodeData={this.state.pincodeData}
                    handleAddtocart={this.handleAddtocart.bind(this)}
                  />
                </div>
              </Col>
            </Row>
          </>
        ) : (
          <div />
        )}
        <Grid>
          <Row>
            <ProductFeatures productFeatureData={this.props.data} />
          </Row>
          <Row>
            <Col md={12} sm={12} xs={12} className="purchase-guide-box">
              <PurchaseGuide purchaseGuide={this.props.data} />
            </Col>
          </Row>
          <Row>
            <Col md={12} sm={12} xs={12}>
              <ProductDetail productDetail={this.props.data} />
            </Col>
          </Row>
          <Row>
            <ProductKeywords productKeywords={this.props.data} />
          </Row>
          <Row>
            {!isLoading ? (
              <SimilarCombosProducts
                similarCombosProducts={this.state.skuData}
              />
            ) : (
              <div />
            )}
          </Row>
        </Grid>
        <PdpEspot espot={this.props.espot} />
      </div>
    );
  }
}

export default PdpComponent;
