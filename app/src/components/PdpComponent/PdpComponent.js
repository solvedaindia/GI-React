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
		window.addEventListener('scroll', this.handleScroll);		
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

    const defaultPincodeData = {
      pincodeServiceable: null,
    };

    this.setState({
      selectedSku: skuDataArr,
      isLoading: false,
      skuData: resolvedSkuData,
      pincodeData: defaultPincodeData
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
          isLoading: false,
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
          isLoading: false,
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
 // handleScroll function start
 handleScroll() {	
  var Pdpstickyheader = document.getElementById('Pdpstickybar'); 
  var box1=163;
  var box2 = document.getElementById("priceId").offsetTop;
  var box3 = document.getElementById("box3").offsetTop;
  var headeroffset=document.getElementById("Pdpstickybar").getBoundingClientRect().top;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
  var scrollbox1;


  var scrollbox1=box1-scrollTop;
  var scrollbox2=box2-scrollTop;
  var scrollbox3=box3-scrollTop;

  
  if(scrollbox1 <= headeroffset){
    document.getElementById("Pdpstickybar").classList.add('slidedown');			
    setTimeout(() => {			
    document.getElementById("topdiv1").classList.add('slideUpPrice');
    document.getElementById("topdiv1").style.cssText = "opacity: 1;";			
  }, 100);
  }
  
  if(scrollbox1 > headeroffset){			
    setTimeout(() => {	
    document.getElementById("Pdpstickybar").classList.remove('slidedown');
    document.getElementById("topdiv1").classList.remove('slideUpPrice');	
    document.getElementById("topdiv1").style.cssText = "opacity: 0;"
    document.getElementById("box1").style.cssText = "opacity: 1;";	
  }, 10);
  }

  /*------BOX2
  -------------------*/
  if(scrollbox2 <= headeroffset){	
    setTimeout(() => {	
    document.getElementById("topdiv2").classList.add('slideUpPriceoffer');
    document.getElementById("topdiv2").style.cssText = "opacity: 1; transition:opacity 1s ease-in-out";
  }, 0);
  }
  
  if(scrollbox2 > headeroffset){		
    document.getElementById("topdiv2").classList.remove('slideUpPriceoffer');
    document.getElementById("topdiv2").style.cssText = "opacity: 0;"					
  }

  /*------BOX3
  -------------------*/
  if(scrollbox3<= headeroffset){	
    document.getElementById("topdiv3").classList.add('slideUpCart');
    document.getElementById("topdiv3").style.cssText = "opacity: 1; transition:opacity 1s ease-in-out";
  }
  
  if(scrollbox3> headeroffset){		
    document.getElementById("topdiv3").classList.remove('slideUpCart');
    document.getElementById("topdiv3").style.cssText = "opacity: 0;"					
  }

  // header 
  var header = document.getElementById("header");
  var sticky = header.offsetTop;		
  if (window.pageYOffset > sticky) 
  {
    header.classList.add("sticky");
  } 			
  else {
    header.classList.remove("sticky");
  }
}
// handleScroll function End
  render() {
    const { isLoading } = this.state;
    const wishlistArr = getOnlyWishlistUniqueIds();
    const isAddToCart = appCookie.get('isPDPAddToCart');
    return (

      <>
			{!isLoading  &&
			<>
				{ isAddToCart !== 'true' &&			
			<div className='Pdpstickybar sticky slideup clearfix' id='Pdpstickybar'>			  
			    <div className='pdpstickyItem clearfix'>				   
					<div className="product" id="topdiv1" style={{opacity: '0'}}>
                       <div className='productId'>
						 <span className='text'>Product ID:</span> 
						 <span className='text'>{this.state.skuData.partNumber}</span>
						</div>

						<h4 className='heading'>
							{this.state.skuData.productName}
						</h4>
						<div className='lockerText'>Locker, Mirror, OHU & Drawer in Royal Ivory Colour</div>
					</div>
					
					<div className='cartofferprice-wrap'>
					<div className='PriceofferCart'>
					   <div className='divpriceOffer' id="topdiv2">
							<Price priceData={this.state.skuData} sticky={true}/>
							<div className="accessories-offer">							
								<span><span className='bold'>{this.state.skuData.discount}% OFF</span> <br/>& free accessories</span>
							</div>
						</div>
						<div className='addtoCart' id="topdiv3">
							<AddToCart 
								skuData={this.state.skuData}
								sticky={true}
								pinCodeData={this.state.pincodeData}
								handleAddtocart={this.handleAddtocart.bind(this)} 
							/>
						</div>
					</div>
					</div>
			    </div>
			</div>
				}
			</>
			}
      <div className="galleryArea">
        {!isLoading ? (
          <>            
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
      </>
    );
  }
}

export default PdpComponent;
