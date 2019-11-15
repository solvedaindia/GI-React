import React from 'react';
import WishListCount from '../../components/Wishlist/wishlist';
import CartCount from '../Cart/cart';
import UserAccInfo from '../UserAccInfo/userAccInfo';
import '../../../public/styles/headerContainer/headerRight.scss';
import { getReleventReduxState, isMobile } from '../../utils/utilityManager';
import { connect } from 'react-redux';


class SearchBar extends React.Component {
    state = {
        isLoading: true,
        errors: null,
        showlogin: false,
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            isLoading: false,
        })
    }

    userInfoCallback() {
        this.setState({
            showlogin: true,
        })
    }

    render() {
        return (
            <ul className='rightSide'>
                {isMobile() ? <WishListCount/> : <WishListCount userInfoCallbackPro={this.userInfoCallback.bind(this)}/> }
                <CartCount />
                <UserAccInfo fromWishlistPro={this.state.showlogin} showUserInfo={true}/>
            </ul>
        );
    }
}

function mapStateToProps(state) {
    const stateObj = getReleventReduxState(state, 'global');
    const updatedUsername = getReleventReduxState(stateObj, 'userName');

    return {
        reduxUserName: updatedUsername,
    };
}

export default connect(mapStateToProps)(SearchBar);
//export default SearchBar;