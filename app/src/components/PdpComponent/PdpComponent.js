import React from 'react';
import { Row, Col,Grid } from 'react-bootstrap';
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
import SocialMedia from './socialMedia';
import Wishlist from '../GlobalComponents/productItem/wishlist';
import { getOnlyWishlistUniqueIds } from '../../utils/utilityManager';
import AddToCart from './addToCart';
import axios from 'axios';

import '../../../public/styles/pdpComponent/pdpComponent.scss';
const shareImg = (
	<img
	  src={require('../../../public/images/share.svg')}
	/>
  );

class PdpComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			skuData: {},
			isLoading: true,
			selectedSku: {},
			dataVal: '',
			image3D: null
		};
	}

	componentDidMount() {
		this.getResolveSkuData();
		this.check3DApi('56121403SD00013', 1);
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
	/* 3D Animation POC */
	check3DApi(item_id, flag) { 
    	//insert user details here  
		var username = "3d@godrejinterio.com";
		var password = "godrej@123";
		var API_KEY = "AH44GH67";
		var item_id = '56121403SD00013';
		axios({
			type: "GET",
			url: "http://disha3d.com/API/API.php",
			params: {'user': username, 'password': password, 'API_KEY': API_KEY, 'prodid': item_id}
		})
		.then(response => {
			console.log('@@@@Its a 3D Test API React@@@@', response.data);
			this.setState({
				image3D: response.data,
			});
		})
		.catch((err) => {
			console.log('@@@ Jquery dependent 3D Error @@@', err);
		})
	} 
	/* get actual resolve data  */
	async getActualResolvedData(data, resolvedSkuData) {

		const selectedValue = resolvedSkuData.defAttributes[0].values[0].name;
		let skuDataArr = [];
		data.map(skuLevelData => {
			skuLevelData.defAttributes.map((attributeValue) => {
				if(selectedValue === attributeValue.values[0].name) {
					skuDataArr.push(skuLevelData);
				}
			})
		});

		this.setState({
			selectedSku: skuDataArr,
			isLoading: false,
			skuData: resolvedSkuData,
		});
	}

	/* handle swatches */
	async handleSwatches(count) {
		let swatches = new Array();
		let productSkuData = this.props.data.skuData;
		const selectedSwatches = await this.handleSelectedSwatches(count);
		for(let j = 0 ; j < selectedSwatches.length; j++) {
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
		this.props.historyData.push('/pdp/'+this.props.matchParams.productId+'/'+swatches[0].uniqueID);
	}

	/* handle selected swatches */
	handleSelectedSwatches(count) {
		let selectedSwatches = new Array();
		for (let i = 0; i < count + 1; i++) {
			const name = document.getElementsByClassName('radio' + count)[0].getAttribute('name');
			const getValue = document.querySelector('input[name = '+name+']:checked').value;
			selectedSwatches.push(getValue);
		}
		return selectedSwatches;
	}

	render() {
		const { isLoading, image3D } = this.state;
		const wishlistArr = getOnlyWishlistUniqueIds();

		return (
			<div className="galleryArea">
				{!isLoading ? (
					<>
					{/* <Row>
						<Col md={7} sm={12} xs={12}>
							<div className="product">
								<span className='text'>Product ID:</span> 
								<span className='text'>{this.state.skuData.partNumber}</span>
								<h4 className='heading'>
									{this.state.skuData.productName}
								</h4>
							</div>
						</Col>
						<Col md={4} sm={12} xs={12}>
							<AddToCart skuId={this.state.skuData.uniqueID} sticky={true} />
						</Col>
					</Row> */}
					<Row className="no-margin">
						<Col className="no-paddingLeft" md={7} sm={12} xs={12}>
							<div className="GalleryBox">
								<Productimageandvideo
									imagesAndVideos={this.state.skuData.attachments}
									ribbonText={this.state.skuData.ribbon}
									activeData={false}
								/>
							</div>
						</Col>
						<Col md={4} sm={12} xs={12}>
							<div className="GallerytextBox">
								<Row>
									<Col md={12} sm={12} xs={12}>
										<Col md={6} sm={12} xs={12} className="product">
											<span className='text'>Product ID:</span> 
											<span className='text'>{this.state.skuData.partNumber}</span>
										</Col>
										<Col md={6} sm={12} xs={12} className="product-share">
											<div className='share'>SHARE <div className='share-btn'>{shareImg}</div><SocialMedia/></div>
											<div className='wishListDiv'>WISHLIST <Wishlist uniqueId={this.state.skuData.uniqueID} isInWishlistPro={wishlistArr.includes(this.state.skuData.uniqueID)}/></div>
										</Col>
									</Col>
								</Row>
								<ProductNameDescription
									productData={this.state.skuData}
								/>
								<ProductDefAttriutes 
									defAttributes={this.props.data.defAttributes} 
									selectedAttribute={this.state.skuData.defAttributes}
									allselectedData={this.state.selectedSku}
									handleOptionData={this.handleSwatches.bind(this)}
								/>
								<ProductInfo
									productData={this.state.skuData}
									defAttributes={this.props.data.defAttributes}
									PdpEspot={this.props.espot.data}
								/>
							</div>
						</Col>
					</Row>
					</>
				) : (
					<div> Data is Loading..</div>
				)}    
				<Grid>
					<Row>           
						<ProductFeatures productFeature={this.props.data.productFeatures} />            
					</Row>
					<div className='3D'>
						<iframe id="3diframe" src={image3D} width="100%" height="580" frameBorder="0" allowFullScreen/>
					</div>
					<Row>
						<Col md={12} sm={12} xs={12} className="purchase-guide-box">
							<PurchaseGuide purchaseGuide={this.props.data.purchaseGuide} />
						</Col>
					</Row>
					<Row>
						<Col md={12} sm={12} xs={12}>
							<ProductDetail productDetail={this.props.data.productDetails} />
						</Col>
					</Row>
					<Row>            
						<ProductKeywords productKeywords={this.props.data.keywords} />            
					</Row>
					<Row>
						{!isLoading ? (
							<SimilarCombosProducts 
								similarProducts={this.state.skuData.similarProducts}
								combos={this.state.skuData.combos}
							/>
						) : (
							<div> Data is Loading..</div>
						)}
					</Row>
				</Grid>        
				<PdpEspot espot={this.props.espot.data} />   
			</div>
		);
	}
}

export default PdpComponent;
