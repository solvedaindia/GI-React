import React from 'react';
import { Link } from 'react-router-dom';
import { getCookie, getCorrespondingGiftlistId, getOnlyWishlistUniqueIds } from '../../../utils/utilityManager';
import { getUpdatedWishlist } from '../../../utils/initialManager';
import WelcomeBack from '../../WelcomeBack/index'
import axios from 'axios';
import { storeId, accessToken, addToWishlist, removeFromWishlist, wishlistIdCookie } from '../../../../public/constants/constants';

const wishlistAddedImg = (
  <img src={require('../../../../public/images/plpAssests/wishlist_added.svg')} />
);
const wishListRemovedImg = (
  <img src={require('../../../../public/images/plpAssests/wishlist_blank.svg')} />
);
class Wishlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlistCurrentImage: wishListRemovedImg,
    };
  }

  onWishlistClick() {
    const wishlistArr = getOnlyWishlistUniqueIds();

    console.log('isWishlist Added --- ',this.props.isInWishlistPro)
    if (getCookie('isLoggedIn') === 'true') {
      if (wishlistArr.includes(this.props.uniqueId)) {
        this.removeFromWishlistAPI();
      }
      else {
        this.addToWishlistAPI();
      }
    }
    else {
      //Show login Pop up
      alert('Please Login');
    }
  }

  addToWishlistAPI() {
    let data = {
      'sku_id': this.props.uniqueId,
    }
    axios.post(addToWishlist, data, { 'headers': { 'store_id': storeId, 'access_token': accessToken } }).then(response => {
      this.setState({ wishlistCurrentImage: wishlistAddedImg })
      getUpdatedWishlist();
    }).catch(error => {
      console.log('newsError---', error);
    });
  }

  removeFromWishlistAPI() {
    let data = {
      'wishlist_id': getCookie(wishlistIdCookie),
      'giftlistitem_id': getCorrespondingGiftlistId(this.props.uniqueId),
    }
    axios.post(removeFromWishlist, data, { 'headers': { 'store_id': storeId, 'access_token': accessToken } }).then(response => {
      console.log('Add wishlit --- ', response.data);
      this.setState({ wishlistCurrentImage: wishListRemovedImg })
      getUpdatedWishlist();
    }).catch(error => {
      console.log('newsError---', error);
    });
  }

  componentDidMount() {
    this.setState({
      wishlistCurrentImage: this.props.isInWishlistPro ? wishlistAddedImg : wishListRemovedImg
    })
  }

  render() {
    return (
      <>
        <button onClick={this.onWishlistClick.bind(this)} className='wishlistBtn'>{this.state.wishlistCurrentImage}</button>
      </>
    )
  }
}

export default Wishlist;
