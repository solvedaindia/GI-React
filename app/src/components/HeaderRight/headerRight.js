import React from 'react';
import WishListCount from '../../components/Wishlist/wishlist';
import CartCount from '../Cart/cart';
import UserAccInfo from '../UserAccInfo/userAccInfo';
import '../../../public/styles/headerContainer/headerRight.scss';

class SearchBar extends React.Component{
    state = {
        isLoading: true,
        errors: null
    };
    render() {
        return (
            <ul className='rightSide'>
                <WishListCount />
                <CartCount />
                <UserAccInfo />
            </ul>
        );
    }
} 

export default SearchBar;