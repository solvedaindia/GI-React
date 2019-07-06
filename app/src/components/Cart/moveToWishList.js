import React from 'react';
import {
	addToWishlist
} from '../../../public/constants/constants';
import apiManager from '../../utils/apiManager';
import MoveToWishListLogo from '../SVGs/moveToWishlistIcon';

class MoveToWishList extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			uniqueID: props.uniqueID
		};
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(event) {
	  this.handleMoveToWishList();
	}
	handleMoveToWishList() {
		const data = {
			uniqueID: this.props.uniqueId,
    	};
		apiManager
		.post(addToWishlist, data)
		.then(response => {
			this.props.getCartDetails()
            console.log('@@@@ Cart Wishlist @@@', response.data.data);
        })
        // .then(response => {
        //     this.setState({
        //         quantity: qty,
        //         isLoading: false,
		// 	});
		// 	this.props.getCartDetails()
        //     console.log('@@@@ Cart Wishlist @@@', response.data.data);
        // })
        .catch(error => {
            this.setState({
            error,
            isLoading: false,
            });
        });
	}
    render() {
      return (
        <form className='moveItem' onClick={this.handleChange}>
			<MoveToWishListLogo width={19} height={16}/>
        </form>
      );
    }
  }
  
  export default MoveToWishList;