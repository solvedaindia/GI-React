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
import Wishlist from '../GlobalComponents/productItem/wishlist';

import '../../../public/styles/pdpComponent/pdpComponent.scss';

class PdpComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			skuData: {},
			isLoading: true,
			selectedSku: {},
			dataVal: ''
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
			skuId = this.props.skuId.skuId;
		}

		this.props.data.skuData.map(skuLevelData => {
			if (skuId === skuLevelData.uniqueID) {
				this.getActualResolvedData(this.props.data.skuData, skuLevelData);
			}
		});
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
		this.props.historyData.push('/pdp/'+swatches[0].uniqueID);
	}

	/* handle selected swatches */
	handleSelectedSwatches(count) {
		let selectedSwatches = new Array();
		for (let i = 0; i < count + 1; i++) {
			const name = document.getElementsByClassName('radio' + i)[0].getAttribute('name');
			const getValue = document.querySelector('input[name = '+name+']:checked').value;
			selectedSwatches.push(getValue);
		}
		return selectedSwatches;
	}

	render() {
		const { isLoading } = this.state;

		return (
			<div className="galleryArea">
				{!isLoading ? (
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
								<div className="wishListDiv">WISHLIST <Wishlist uniqueId={this.state.skuData.uniqueID}/></div>
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
				) : (
					<div> Data is Loading..</div>
				)}    
				<Grid>
					<Row>           
						<ProductFeatures productFeature={this.props.data.productFeatures} />            
					</Row>
					<Row>
						<Col md={12} sm={12} xs={12}>
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
