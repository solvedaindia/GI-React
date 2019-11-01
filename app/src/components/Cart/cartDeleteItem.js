import React from 'react';
import { cartDeleteItemAPI, addToWishlist } from '../../../public/constants/constants';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import apiManager from '../../utils/apiManager';
import DeleteLogo from '../SVGs/deleteIcon';
import {WANT_TO_REMOVE } from '../../constants/app/cartConstants';
import {FROM_YOUR_CART } from '../../constants/app/cartConstants';
import {SAVE_FOR_LATER } from '../../constants/app/cartConstants';
import {REMOVE } from '../../constants/app/cartConstants';
import UserAccInfo from '../UserAccInfo/userAccInfo';
import {getCookie} from '../../utils/utilityManager';
import appCookie from '../../utils/cookie';


class DeleteCartItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			wishlistPopup: null,
			isWelcomeBack: false,
			isCartModal: false,
		}
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleMoveToWishList = this.handleMoveToWishList.bind(this);
		this.addToWishlistApi = this.addToWishlistApi.bind(this);
	}

	componentDidMount(){
		if(getCookie('isLoggedIn') === 'true' && getCookie('wishListUniqueId') !== undefined && getCookie('wishListUniqueId') !== null && getCookie('wishListUniqueId') !== ''){
			this.addToWishlistApi();
		}
	}

	handleChange() {
		this.handleDeleteItem();
	}
	handleDeleteItem() {
		const data = {
		orderItemId: this.props.orderItemId,
		};
		console.log('order ID -----', this.props.orderItemId)
		apiManager
		.post(cartDeleteItemAPI, data)
		.then(response => {
				// this.props.getCartDetails();
			this.handleClose();
		})
		.catch(error => {
			this.setState({
			error,
			isLoading: false,
			});
		});
	}
	handleMoveToWishList() {
		if(getCookie('isLoggedIn') === 'true') {
			appCookie.set('saveForLaterClicked', false , 365 * 24 * 60 * 60 * 1000);
			appCookie.set('orderItemId', this.props.orderItemId , 365 * 24 * 60 * 60 * 1000);
			this.setState({isWelcomeBack: false, isCartModal: true});
		} else if(getCookie('isLoggedIn') !== 'true'){
			appCookie.set('saveForLaterClicked', true , 365 * 24 * 60 * 60 * 1000);
			console.log('order ID -----', this.props.orderItemId)
			appCookie.set('orderItemId', this.props.orderItemId , 365 * 24 * 60 * 60 * 1000);
			this.handleClose();
			this.setState({isWelcomeBack: true, isCartModal: false})
		}
		appCookie.set('wishListUniqueId', this.props.uniqueID , 365 * 24 * 60 * 60 * 1000);
		this.handleDeleteItem();
		this.addToWishlistApi();
	}
  	/* Handle Modal Close */
	handleClose() {
		this.setState({ show: false });
	}
	/* Handle Modal Show */
	handleShow() {
		this.setState({ show: true, isCartModal: false });
	}

	addToWishlistApi(){
		if(getCookie('isLoggedIn') !== 'true') {
			return;
		}
		const data = {
			sku_id: this.props.uniqueID,
		};
		apiManager
			.post(addToWishlist, data)
			.then(response => {
				// this.handleDeleteItem();
				// this.handleClose();
				appCookie.set('wishListUniqueId', '' , 365 * 24 * 60 * 60 * 1000);
				appCookie.set('saveForLaterClicked', false , 365 * 24 * 60 * 60 * 1000);
				// this.props.getCartDetails();
				window.location.reload();
				})
				.catch(error => {
				this.setState({
					error,
					isLoading: false,
				});
		});
	}

	resetLoginValues() {
		this.setState({
			isWelcomeBack: false,
		});
	  }

	render() {
		const { productName } = this.props;
		return (
			<>
			<form className="delCartItem" onClick={this.handleShow}>
				<DeleteLogo width={16} height={16} />
			</form>

			{this.state.isWelcomeBack ? <UserAccInfo fromWishlistPro resetCallbackPro={this.resetLoginValues.bind(this)} /> : 
		
		<Modal className='modal deletItem' isCartModal={this.setState.isCartModal} show={this.state.show} onHide={this.handleClose}>
		<Modal.Body>
			<Button className="close" onClick={this.handleClose}></Button>
			<Row>
				<Col xs={12} md={12}>
					<div className='del_modal'>
						<h4 className='heading'>{WANT_TO_REMOVE}</h4>
						<p className='itemDelInfo'>
							{productName}
						</p>
						<h4 className='heading'>{FROM_YOUR_CART}</h4>
						<div className='userAction'> 
							<button className='btn delete' onClick={this.handleMoveToWishList}>
							{SAVE_FOR_LATER}
							</button>
							<button className='btn wishList' onClick={this.handleChange} >
								{REMOVE}
							</button>
						</div>
					</div>
				</Col>
			</Row>         
		</Modal.Body>
	</Modal>
		}
			</>
		);
	}
}

export default DeleteCartItem;
