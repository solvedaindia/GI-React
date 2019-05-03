import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  wishListCountApi,
  storeId,
  accessToken,
} from '../../../public/constants/constants';
import WishlistLogo from '../SVGs/wishlist';
import appCookie from '../../utils/cookie';
import { resolveTheWishlistData, getCookie, getReleventReduxState } from '../../utils/utilityManager';
import UserAccInfo from '../UserAccInfo/userAccInfo';


class wishListCount extends React.Component {
  state = {
    wishListCount: '',
    isLoading: true,
    errors: null,
    isWelcomeBack: false
  };

  getWishListCount() {
    axios
      .get(wishListCountApi, {
        headers: { store_id: storeId, access_token: accessToken },
      })
      .then(response => {
        resolveTheWishlistData(response.data.data);
        const count = response.data.data.wishlistTotalItems;
        this.setState({
          wishListCount:
            count == '0' ? '1' : response.data.data.wishlistTotalItems,
          isLoading: false,
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  handleWLCount() {
    if (getCookie('isLoggedIn') === 'true') {
      alert('Take user to wishlist page')
    } else {

      this.setState({ isWelcomeBack: true });
    }

    // const token = appCookie.get('isLoggedIn');
    // console.log('Testest', token);
    // appCookie.get('isLoggedIn')
    //   ? alert('Take user to wishlist page')
    //   : this.setState({isWelcomeBack: true})
  }

  componentWillReceiveProps(nextProps) {
    console.log('Wishlist -- componentWillReceiveProps -- ',nextProps.wishlistUpdatedCount)
    this.setState({
      wishListCount: nextProps.wishlistUpdatedCount,
    });
  }

  componentDidMount() {
    this.getWishListCount();
  }

  render() {
    const { isLoading, wishListCount } = this.state;
    return (
      <>
        <li className="icons" onClick={this.handleWLCount.bind(this)}>
          {!isLoading ? (
            <span className="wishListCount">{wishListCount}</span>
          ) : (
              <p className="error">No Category Found</p>
            )}
          <WishlistLogo />

        </li>
        {this.state.isWelcomeBack ? <UserAccInfo fromWishlistPro={true} /> : null}
      </>
    );
  }
}

function mapStateToProps(state) {
  const stateObj = getReleventReduxState(state, 'global');
  const wishlistCount = getReleventReduxState(stateObj, 'wishlistCount')
  console.log('Its Globale',wishlistCount);
  return {
    wishlistUpdatedCount: wishlistCount
  };
}


export default connect(mapStateToProps)(wishListCount);

//export default wishListCount;
