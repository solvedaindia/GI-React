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
import AddToCart from './addToCart';
import Price from './price';
import MobileDiscountAndPrice from './mobileComponents/discountAndPrice';
import MobileProductFeatures from './mobileComponents/productFeatures';
import MobilePurchaseGuideGuide from './mobileComponents/purchaseGuide';
import MobileProductDetail from './mobileComponents/productDetail';
import MobileQuantityAndPincode from '../PdpComponent/mobileComponents/quantityAndPincode';
import WishlistAndShare from './wishlistAndShare';
import appCookie from '../../utils/cookie';
import apiManager from '../../utils/apiManager';
import { pinCodeAPI, pinCodeAPIBundle, breadcrumbAPI } from '../../../public/constants/constants';
import { isMobile } from '../../utils/utilityManager';
import Breadcrumb from '../../components/Breadcrumb/breadcrumb';
import {PRODUCT_ID} from '../../constants/app/pdpConstants';

import '../../../public/styles/pdpComponent/pdpComponent.scss';
import { array } from 'prop-types';

class PdpComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			skuData: {},
			isLoading: true,
			selectedSku: {},
			dataVal: '',
			pincodeData: '',
			breadcrumbData: null,
		};
	}

	componentDidMount() {
		if (this.props.historyData.location.state != undefined) {
			this.setState({
				breadcrumbData: this.props.historyData.location.state.breadcrumbData,
			});
			appCookie.set('tempPincode', '', 365 * 24 * 60 * 60 * 1000);
		}
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

		if(this.props.data.type === 'product') {
			this.props.data.skuData.map(skuLevelData => {
				if (skuId === skuLevelData.uniqueID) {
					this.getActualResolvedData(this.props.data.skuData, skuLevelData, this.props.data.type);
				}
			});
		} else if(this.props.data.type === 'kit') {
			this.props.data.kitData.map(skuLevelData => {
				if (skuId === skuLevelData.uniqueID) {
					this.getActualResolvedData(this.props.data.kitData, skuLevelData, this.props.data.type);
				}
			});
		} else if(this.props.data.type === 'bundle') {
			this.props.data.bundleData.map(skuLevelData => {
				if (skuId === skuLevelData.uniqueID) {
					this.getActualResolvedData(this.props.data.bundleData, skuLevelData, this.props.data.type);
				}
			});
		}
	}

	/*check filter count */
	checkArrayFilter(uniqueIdArray, matchValue) {
		  let dataArray = Array();
			for(let i = 0; i < uniqueIdArray.length; i++) {
				 if (uniqueIdArray[i] === matchValue) {
					dataArray.push(matchValue);
				 }
			}
			return dataArray.length;
	}
	

	/* get actual resolve data  */
	getActualResolvedData(data, resolvedSkuData, type) {
		const skuDataArr = [];
		const uniqueId = [];
		if (type === 'product') {
			resolvedSkuData.defAttributes.map(dataVal => {
			data.map(skuLevelData => {
				skuLevelData.defAttributes.map(attributeValue => {
					if (dataVal.values[0].name.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s/g, '') === attributeValue.values[0].name.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '').replace(/\s/g, '')) {
						uniqueId.push(skuLevelData.uniqueID);
						const getValueLength = this.checkArrayFilter(uniqueId, skuLevelData.uniqueID);
						if (getValueLength >= (resolvedSkuData.defAttributes.length - 1)) {
							skuDataArr.push(skuLevelData);
						}							
					}
				});
			});
		});
		} else if (type === 'kit' || type === 'bundle') {
			resolvedSkuData.swatchAttributes.map(dataVal => {
			data.map(skuLevelData => {
				skuLevelData.swatchAttributes.map(attributeValue => {
					if (dataVal.values[0].name === attributeValue.values[0].name && uniqueId.indexOf(skuLevelData.uniqueID) === -1) {
						skuDataArr.push(skuLevelData);
						uniqueId.push(skuLevelData.uniqueID)
					}
				});
			});
			});
		}

		const defaultPincodeData = {
			pincodeServiceable: null,
		};

		if (this.props.historyData.location.state === undefined) { 
			this.callBreadcrumbAPI(resolvedSkuData.uniqueID);
		}
		this.setState({
			selectedSku: skuDataArr,
			isLoading: false,
			skuData: resolvedSkuData,
			pincodeData: defaultPincodeData
		});

		this.callPinCodeAPI(resolvedSkuData, type);
	}

	/* handle swatches */
	handleSwatches(count) {
		let swatches = new Array();
		let productSkuData;
		if (this.props.data.type === 'kit') {
			productSkuData = this.props.data.kitData;
		} else if (this.props.data.type === 'product') {
			productSkuData = this.props.data.skuData;
		} else if (this.props.data.type === 'bundle') {
			productSkuData = this.props.data.bundleData;
		}

		const selectedSwatches = this.handleSelectedSwatches(count);
		for (let j = 0; j < selectedSwatches.length; j++) {
			swatches = new Array();
			productSkuData.map(skuLevelData => {
				if (this.props.data.type === 'kit' || this.props.data.type === 'bundle') {
					skuLevelData.swatchAttributes.map((attributeValue, index) => {
						if (selectedSwatches[j] === attributeValue.values[0].name) {
						swatches.push(skuLevelData);
						}
					});

				} else if (this.props.data.type === 'product') {
					skuLevelData.defAttributes.map((attributeValue, index) => {
						if (selectedSwatches[j] === attributeValue.values[0].name) {
						swatches.push(skuLevelData);
						}
					});

				}
			});
			productSkuData = swatches;
		}
		this.getResolveSkuData(swatches[0].uniqueID);
	}

	/* handle selected swatches */
	handleSelectedSwatches(count) {
		const selectedSwatches = new Array();
		for (let i = 0; i < count; i++) {
			const name = document.getElementsByClassName(`radio${i}`)[0].getAttribute('name');
			const getValue = document.querySelector(`input[name = ${name}]:checked`).value;
			selectedSwatches.push(getValue);
		}
		return selectedSwatches;
	}

	/* get pincode API params */
	getPincodeApiParams(resolvedSkuData, type) {
		let partnumber = [];
		let quantity = [];
		let uniqueid = [];
		let dataParams;
		if (resolvedSkuData.itemInThisBundle && type === 'bundle') {
			resolvedSkuData.itemInThisBundle.map((data) => {
				partnumber.push(data.partNumber);
				quantity.push(data.quantity);
				uniqueid.push(data.uniqueID);
				
				 dataParams = {
					params: {
					partnumber: partnumber.toString(),
					quantity: quantity.toString(),
					uniqueid: uniqueid.toString(),
					},
				};
			})
		} else {
			 dataParams = {
				params: {
				partnumber: resolvedSkuData.partNumber,
				quantity: 1,
				uniqueid: resolvedSkuData.uniqueID,
				},
			};
		}

		return dataParams;

	}

	callPinCodeAPI(resolvedSkuData, type) {
		let callPincodeApi;
		if (type === 'bundle') {
			callPincodeApi = pinCodeAPIBundle;
		} else {
			callPincodeApi = pinCodeAPI;
		}
		let pincodeVal = appCookie.get('pincode');
		if (appCookie.get('tempPincode') && appCookie.get('tempPincode') !== "") {
			pincodeVal = appCookie.get('tempPincode');
		}

		const dataParams = this.getPincodeApiParams(resolvedSkuData, type);

		apiManager.get(callPincodeApi + pincodeVal, dataParams).then(response => {
			this.setState({
				isLoading: false,
				pincodeData: response.data.data,
			});
		}).catch(error => {
			const defaultPincodeData = {
				pincodeServiceable: false,
				inventoryStatus: '',
				shippingCharge: '',
				error: 'Not a valid pincode',
			};

			this.setState({
				isLoading: false,
				pincodeData: defaultPincodeData,
			});
		});

		if (this.props.matchParams.skuId !== resolvedSkuData.uniqueID) {
			this.props.historyData.push(
				`/pdp/furniture-${resolvedSkuData.productName
				.toLowerCase()
				.replace(/ /g, '-')}/${resolvedSkuData.uniqueID}`,
			);
		}
	}

	handleAddtocart(ispincode) {
		this.getResolveSkuData();
		if (!ispincode) {
			window.scrollTo(0, 0);
		}
	}

	getAttributeTypeData(props) {
		let attributeData;
		if(props.type === 'kit' || props.type === 'bundle') {
			attributeData =  props.swatchAttributes;
		} else if (props.type === 'product') {
			attributeData =  props.defAttributes;
		}
		return attributeData;
	}

	/* call BreadcrumbAPI */
	callBreadcrumbAPI(itemUniqueID) {
		const dataParams = {
			params: {
				itemid: itemUniqueID,
			},
		};

		apiManager.get(breadcrumbAPI , dataParams).then(response => {
			this.setState({
				breadcrumbData: response.data.data.breadCrumbData,
			})
		}).catch(error => {
		});
	}

 // handleScroll function start
 handleScroll() {	
  var Pdpstickyheader = document.getElementById('Pdpstickybar'); 
  var box1=168;
  if (document.getElementById("priceId") && document.getElementById("box3")) {
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
}
// handleScroll function End
  render() { 
    const { isLoading } = this.state;
	let isSticky = true;
	let stateAttr = {};

	if (!isLoading) {
		if (this.props.data.type === 'product') {
			stateAttr = this.state.skuData.defAttributes
		} else if (this.props.data.type !== 'product') {
			stateAttr = this.state.skuData.swatchAttributes;
		}
	}

	let breadcrumbItem = null;
	
	if (this.state.breadcrumbData !== null && this.props.data !== null && this.props.data !== '' && this.state.breadcrumbData !== undefined && this.state.breadcrumbData.length !== 0) {
		breadcrumbItem = (
			<Breadcrumb pdpBreadcrumbPro={this.state.breadcrumbData} productNamePro={this.state.skuData.productName} />
		);
	}
	
	const attrTypeData = this.getAttributeTypeData(this.props.data);
    return (
      <>
			{!isLoading &&
			<>
			{breadcrumbItem}
				{ isSticky === true &&			
			<div className='Pdpstickybar sticky slideup clearfix' id='Pdpstickybar'>			  
			    <div className='pdpstickyItem clearfix'>				   
					<div className="product" id="topdiv1" style={{opacity: '0'}}>
                       <div className='productId'>
						 <span className='text'>{PRODUCT_ID} </span> 
						 <span className='text'>{this.state.skuData.partNumber}</span>
						</div>

						<h1 className='heading'>
							{this.state.skuData.productName}
						</h1>
						<div className='lockerText'>{this.state.skuData.shortDescription}</div>
					</div>
					<div className='cartofferprice-wrap'>
					<div className='PriceofferCart'>
					   <div className='divpriceOffer' id="topdiv2">
							<Price priceData={this.state.skuData} sticky={true}/>
							<div className="accessories-offer">		
								<span>{this.state.skuData.discount > 1 && <><span className='bold'>{this.state.skuData.discount}% OFF</span> <br/></>}{ this.state.skuData.promotions.length > 0 && this.state.skuData.promotions[0].name && <>{parseInt(this.state.skuData.discount) > 1 && '& '}{this.state.skuData.promotions[0].name}</>}</span>
							</div>
						</div>
						<div className='addtoCart' id="topdiv3">
							<AddToCart 
								skuData={this.state.skuData}
								sticky={true}
								pinCodeData={this.state.pincodeData}
                handleAddtocart={this.handleAddtocart.bind(this)}
                history={this.props.historyData}
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
              <Col className="no-paddingLeft img-gallery-box" md={7} sm={12} xs={12}>
                <div className="GalleryBox">
                  <Productimageandvideo
                    skuData={this.state.skuData}
                    activeData={false}
                  />
                </div>
              </Col>
              <Col className='pdpDetails' md={4} sm={12} xs={12}>
                <div className="GallerytextBox">
                  <Row>
                    <Col md={12} sm={12} xs={12}>
                    { !isMobile() && <Col md={7} sm={6} xs={12} className="product">
                         <span className="text">Product ID: </span> 
                        <span className="text">
                          {this.state.skuData.partNumber}
                        </span>
                      </Col>}

                      {isMobile() && <Col md={6} sm={12} xs={12} className="product-sku">
                        <span className="text">
                          {this.state.skuData.partNumber}
                        </span>
                      </Col>}
                      { !isMobile() &&
                        <WishlistAndShare skuData={this.state.skuData} historyData={this.props.historyData}/>
                      }
                    </Col>
                  </Row>
                  <ProductNameDescription productData={this.state.skuData} />
                  {isMobile() &&
                    <div className='wishlist-share'>
                      <WishlistAndShare skuData={this.state.skuData} historyData={this.props.historyData}/>
                      </div>
				  }
                  <ProductDefAttriutes
										defAttributes={attrTypeData}
                    selectedAttribute={stateAttr}
										allselectedData={this.state.selectedSku}
										resolvedSku={this.state.skuData}
                    handleOptionData={this.handleSwatches.bind(this)}
                  />
									{ isMobile() &&
                  <MobileQuantityAndPincode
                    skuData={this.state.skuData}
                    sticky={false}
                    pinCodeData={this.state.pincodeData}
                    handleAddtocart={this.handleAddtocart.bind(this)}
										history={this.props.historyData}
										defAttributes={attrTypeData}
										espotPromo={this.props.espotPromo}
                  />
									}
									{ !isMobile() &&
									<>
                  <ProductInfo
                    productData={this.state.skuData}
                    defAttributes={attrTypeData}
										pinCodeData={this.state.pincodeData}
										espotPromo={this.props.espotPromo}
                  />
                  <AddToCart
                    skuData={this.state.skuData}
                    sticky={false}
                    pinCodeData={this.state.pincodeData}
                    handleAddtocart={this.handleAddtocart.bind(this)}
                    history={this.props.historyData}
                  />
									</>
									}
                  { isMobile() && <Row className='add-to-cart-floater'>
                      <Col md={6} sm={12} xs={12} className="product">
                          <div className='product-price-detail'>
                            <MobileDiscountAndPrice 
                            skuData={this.state.skuData}
                          /></div>
                          <AddToCart
                          skuData={this.state.skuData}
                          isMobile={true}
                          pinCodeData={this.state.pincodeData}
													handleAddtocart={this.handleAddtocart.bind(this)}
													history={this.props.historyData}
                        /> 
                      </Col>
                  </Row>}
                  
                </div>
              </Col>
            </Row>
          </>
        ) : (
          <div />
        )}
        <Grid>
          <Row>
          {!isMobile() ? (
			  <>
			  { this.props.data.type === 'product' ? (
				  <ProductFeatures productFeatureData={this.props.data} />
			  ) : (
				  <>{ !isLoading && this.props.data.type !== 'product' && <ProductFeatures productFeatureData={this.state.skuData}/>}</>
			  )}
		  	</>
            ) : (
				<>
				{this.props.data.type === 'product' ? (
					<MobileProductFeatures productFeatureData={this.props.data}/> 
				) : (
					<>{ !isLoading && this.props.data.type !== 'product' && <MobileProductFeatures productFeatureData={this.state.skuData}/>}</>
				)}
				</>
            )
          }
          </Row>
          <Row>
            <Col md={12} sm={12} xs={12} className="purchase-guide-box">
            {!isMobile() ? (
				<>
					{ this.props.data.type === 'product' ? (
						<PurchaseGuide purchaseGuide={this.props.data} />
					) : (
						<>{ !isLoading && this.props.data.type !== 'product' && <PurchaseGuide purchaseGuide={this.state.skuData}/>}</>
					)}
				</>
            ) : ( 
				<>
					{this.props.data.type === 'product' ? (
						<MobilePurchaseGuideGuide purchaseGuide={this.props.data}/>
					) : (
						<>{ !isLoading && this.props.data.type !== 'product' && <MobilePurchaseGuideGuide purchaseGuide={this.state.skuData}/>}</>
					)}
				</>
            )}
            </Col>
          </Row>
          <Row>
            <Col md={12} sm={12} xs={12}>
              {!isMobile() ? (
								<>
									{ !isLoading && 
										<ProductDetail productDetail={this.state.skuData} />
									}
								</>
              ) : (
							<>
								{!isLoading && 
									<MobileProductDetail productDetail={this.state.skuData} />
								}
							</>
            	)
              }
            </Col>
          </Row>
          <Row>
		  		{ this.props.data.type === 'product' ? (
					<ProductKeywords productKeywords={this.props.data} />
				) : (
					<>{ !isLoading && this.props.data.type !== 'product' && <ProductKeywords productKeywords={this.state.skuData}/>}</>
				)}
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