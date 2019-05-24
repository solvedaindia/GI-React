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
		const data = {
			"orderItem": [
			{
				//"sku_id": this.props.data.uniqueID,
				"sku_id": "22952",
				"quantity": "1"
			}
			]
		}

		apiManager.post(addToCart, data).then(() => {
			getUpdatedMinicartCount(this)
		}).catch(error => {
			console.log('AddToCart Error---', error);
		});
	}

	// incrementQuantity = () => { alert();
	//     let quantity = document.getElementById('quantity');
	//     let getVal = quantity.value;
	//     quantity.value = getVal+1;
	// }


	render() {
		return(
			<>
				<div className="addCart">
					<Button className="btn" onClick={this.decrementQuantity}>-</Button>
					<input className='btn' id='quantity' type='text' readOnly value='1' />
					<Button className="btn" onClick={this.incrementQuantity}>+</Button>
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

