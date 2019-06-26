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
import { addToCart, removeFromWishlist, wishlistIdCookie } from '../../../../public/constants/constants';
import apiManager from '../../../utils/apiManager';
import { updatetMinicart, updatetWishListCount, resetRemoveFromWishlistFlag } from '../../../actions/app/actions';
import { getUpdatedMinicartCount, getUpdatedWishlist, removeFromWishlistGlobalAPI } from '../../../utils/initialManager';
import {
	getCookie,
	getCorrespondingGiftlistId,
	getOnlyWishlistUniqueIds,
} from '../../../utils/utilityManager';

class ProductItem extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.onSwatchChange = this.onSwatchChange.bind(this)
		this.state = {
			data: this.props.dataPro
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

	moveToCartClicked = (e) => {
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
			})
			.catch(error => {
				console.log('AddToCart Error---', error);
			});
	};

	onSwatchChange(e,selectedSwatch) {
		e.preventDefault();
		const selectedItem = this.props.skuList.find((item) => item.swatchColor === selectedSwatch)
		this.setState({
			data: selectedItem
		})
	}

	render() {
		console.log('isFromWishlist  ----  ', this.props);
		var routePath = '/pdp/' + this.state.data.parentUniqueID + '/' + this.state.data.uniqueID;
		return (
			<li className="productlist">
				<div className="prdListData">
					<ItemImage
						data={this.state.data.thumbnail}
						uniqueId={this.state.data.uniqueID}
						parentUniqueId={this.state.data.parentUniqueID}
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
							<button className="btn-compare" onClick={this.moveToCartClicked.bind(this)}>Move To Cart</button> :
							this.props.isSearchPathPro.includes('/search') ? '' : <button className="btn-compare" onClick={this.handleClick.bind(this)}>Add to compare</button>}

						{this.props.isColorSwatchPro && this.props.swatchList.length > 1  ? <div class="inner-overlay">
							<ul class="colortheme clearfix">
								{this.props.swatchList.map(item => {
									var colorStyle = { backgroundColor: `rgb${item.colorCode}` };
									return (
										<li onClick={(e) => this.onSwatchChange(e, item.name)}  class={`list ${this.state.data.swatchColor === item.name ? 'active' : ''}`}>
											<span className='swatches-circle' style={colorStyle}></span>
										</li>
									)

								})}
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
