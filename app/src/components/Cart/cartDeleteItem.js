import React from 'react';
import { cartDeleteItemAPI, addToWishlist } from '../../../public/constants/constants';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import apiManager from '../../utils/apiManager';
import DeleteLogo from '../SVGs/deleteIcon';
import {WANT_TO_REMOVE } from '../../constants/app/cartConstants';
import {FROM_YOUR_CART } from '../../constants/app/cartConstants';
import {SAVE_FOR_LATER } from '../../constants/app/cartConstants';
import {REMOVE } from '../../constants/app/cartConstants';


class DeleteCartItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false
		}
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleMoveToWishList = this.handleMoveToWishList.bind(this);
	}

	handleChange() {
		this.handleDeleteItem();
	}
	handleDeleteItem() {
		const data = {
		orderItemId: this.props.orderItemId,
		};
		apiManager
		.post(cartDeleteItemAPI, data)
		.then(response => {
			this.props.getCartDetails();
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
	const data = {
		sku_id: this.props.uniqueID,
	};
	apiManager
		.post(addToWishlist, data)
		.then(response => {
			this.handleDeleteItem();
			this.handleClose();
			})
			.catch(error => {
			this.setState({
				error,
				isLoading: false,
			});
		});
	}
  	/* Handle Modal Close */
	handleClose() {
		this.setState({ show: false });
	}
	/* Handle Modal Show */
	handleShow() {
		this.setState({ show: true });
	}
	render() {
		const { productName } = this.props;
		return (
			<>
			<form className="delCartItem" onClick={this.handleShow}>
				<DeleteLogo width={16} height={16} />
			</form>
			<Modal className='modal deletItem' show={this.state.show} onHide={this.handleClose}>
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
			</>
		);
	}
}

export default DeleteCartItem;
