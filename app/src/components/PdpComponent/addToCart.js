import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import apiManager from '../../utils/apiManager';
import { getUpdatedMinicartCount } from '../../utils/initialManager';
import { addToCart } from '../../../public/constants/constants';
import { updatetMinicart, updatetWishListCount, resetRemoveFromWishlistFlag } from '../../actions/app/actions';

class addToCartComponent extends React.Component {
	moveToCartClicked = () => {
		alert('added to cart');
		let quantity = '1';
		if (!this.props.sticky) {
			quantity = document.getElementById('quantity').value;
		}
		
		const data = {
			"orderItem": [
				{
					"sku_id": this.props.skuId,
					"quantity": quantity
				}
			]
		}

		apiManager.post(addToCart, data).then(() => {
			getUpdatedMinicartCount(this)
		}).catch(error => {
			console.log('AddToCart Error---', error);
		});
	}

	productQuantity = (type) => {
		let quantity = document.getElementById('quantity').value;
		if (type === false && quantity > 1) {
			document.getElementById('quantity').value = Number(quantity)-Number(1);
		} else if (type === true) {
			document.getElementById('quantity').value = Number(quantity)+Number(1);
		}
	}


	render() {
		return(
			<>
				<div className="addCart">
					{ !this.props.sticky && (
					<>
						<Button className="btn" onClick={() => this.productQuantity(false)}>-</Button>
						<input className='btn' id='quantity' type='text' readOnly value='1' />
						<Button className="btn" onClick={() => this.productQuantity(true)}>+</Button>
					</>
					)}
					<Button className="btn addcartbtn" onClick={this.moveToCartClicked}>Add to Cart</Button>
				</div>
			</>
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
  )(addToCartComponent);

