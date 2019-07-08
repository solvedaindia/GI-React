import React from 'react';
import {
	addToWishlist,
	cartDeleteItemAPI
} from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';
import MoveToWishListLogo from '../SVGs/moveToWishlistIcon';

class MoveToWishList extends React.Component {
    constructor(props) {
		super(props);
      this.handleMoveToWishList = this.handleMoveToWishList.bind(this);
    }
  
	removeFromCart() {
		const data = {  
			orderItemId: this.props.orderItemId
		}
		apiManager
		.post(cartDeleteItemAPI, data)
		.then(() => {
			this.props.getCartDetails()
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
			this.removeFromCart();
            console.log('@@@@ Cart Wishlist @@@', response.data.data);
        })
        .catch(error => {
            this.setState({
            error,
            isLoading: false,
            });
		});
	}
    render() {
      return (
        <div className='moveItem' onClick={this.handleMoveToWishList}>
			<MoveToWishListLogo width={19} height={16}/>
        </div>
      );
    }
  }
  
  export default MoveToWishList;