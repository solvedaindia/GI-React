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
		this.state = {};
	}

	handleClick(e) {
		e.preventDefault();
		const product = {
			title: this.props.data.productName,
			thumbnail: this.props.data.thumbnail,
			skuId: this.props.data.uniqueID,
			id: this.props.data.parentUniqueID,
			actualPrice: this.props.data.actualPrice,
			offerPrice: this.props.data.offerPrice,
		};
		this.props.addProduct(product);
	}
	// constructor(props) {
	// 	super(props);
	// 	this.state = {};
	// }

	// handleClick = () => {
	// 	const compPrd = this.props.compData.find(
	// 		prd => prd.id == this.props.data.uniqueID,
	// 	);
	// 	if (compPrd) {
	// 		alert(
	// 			'Product alreday added in compare. Please select different prodcut',
	// 		);
	// 	} else {
	// 		const product = {
	// 			title: this.props.data.productName,
	// 			thumbnail: this.props.data.thumbnail,
	// 			id: this.props.data.uniqueID,
	// 			actualPrice: this.props.data.actualPrice,
	// 			offerPrice: this.props.data.offerPrice,
	// 		};
	// 		this.props.addProduct(product);
	// 	}
	// };

	moveToCartClicked = (e) => {
		e.preventDefault();

		const data = {
			orderItem: [
				{
					sku_id: this.props.data.uniqueID,
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
				removeFromWishlistGlobalAPI(this.props.data.uniqueID, this);
			})
			.catch(error => {
				console.log('AddToCart Error---', error);
			});
	};

	render() {
		console.log('isFromWishlist  ----  ', this.props);
		var routePath = '/pdp/' + this.props.data.parentUniqueID + '/' + this.props.data.uniqueID;
		return (
			<li className="productlist">
				<div className="prdListData">
					{/* <Wishlist
					uniqueId={this.props.data.uniqueID}
					isInWishlistPro={this.props.isInWishlist}
				/> */}
					{/* <div className="imgBox"> */}
					<ItemImage
						data={this.props.data.thumbnail}
						uniqueId={this.props.data.uniqueID}
						parentUniqueId={this.props.data.parentUniqueID}
					/>
					<InStock isInStock={this.props.data.inStock} />
					{/* </div> */}
					<RibbonTag data={this.props.data.ribbonText} />
					<div className="product-text">
						<Title
							titlePro={this.props.data.productName}
							descriptionPro={this.props.data.shortDescription}
						/>
						{/* <p className="heading-description text">(Description)</p> */}
						<p className="price text">
							<Price
								actualPrice={this.props.data.actualPrice}
								offerPrice={this.props.data.offerPrice}
							/>
						</p>
						<Promotions
							promoData={this.props.data.promotionData}
							discount={this.props.data.discount}
							emi={this.props.data.emiData} />

					</div>
				</div>
				<Link className="link" to={routePath}>
					<div className="hoverBox">

						{this.props.isfromWishlistPro ?
							<button className="btn-compare" onClick={this.moveToCartClicked.bind(this)}>Move To Cart</button> :
							<button className="btn-compare" onClick={this.handleClick.bind(this)}>Add to compare</button>}

					</div>
				</Link>
				<Wishlist
					uniqueId={this.props.data.uniqueID}
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
