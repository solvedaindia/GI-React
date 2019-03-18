import React from 'react';
import axios from "axios";
import { wishListCountApi, storeId, accessToken } from '../../../public/constants/constants';
import WishlistLogo from '../SVGs/wishlist';

class wishListCount extends React.Component{
    state = {
        wishListCount:'',
        isLoading: true,
        errors: null
    };

    getWishListCount() {
        axios
		.get(wishListCountApi, { 'headers': { 'store_id': storeId, 'access_token': accessToken } })
		.then(response => {
            var count = response.data.data.wishlistTotalItems;
			this.setState({
                wishListCount: count == '0' ? '' : (response.data.data.wishlistTotalItems),
				isLoading: false
            });
            console.log('@##*@*(&#(#', count);
		})
		.catch(error => this.setState({ error, isLoading: false }));
    }

    componentDidMount() {
        this.getWishListCount();
    }

    render() {
        const { isLoading, wishListCount } = this.state;
        return (
            <li className='icons'>
                {!isLoading ? <span className='wishListCount'>{wishListCount}</span>: (
                    <p className='error'>No Category Found</p>
                )}
                <WishlistLogo />
            </li>
        );
    }
}  

export default wishListCount;
