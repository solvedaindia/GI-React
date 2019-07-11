import React from 'react';
import { connect } from 'react-redux';
import apiManager from './apiManager';
import {
  updatetWishListCount,
  updatetMinicart,
  resetRemoveFromWishlistFlag,
} from '../actions/app/actions';
import { getCookie, getCorrespondingGiftlistId } from './utilityManager';
import appCookie from './cookie';
import {
  guestLoginAPI,
  storeId,
  accessToken,
  accessTokenCookie,
  wishlistDataCookie,
  wishlistIdCookie,
  wishListCountApi,
  logoutAPI,
  cartCountApi,
  removeFromWishlist,
} from '../../public/constants/constants';
import { resolveTheWishlistData } from './utilityManager';

export function registerGuestUser(callback) {
  apiManager
    .post(guestLoginAPI, '')
    .then(response => {
      const guestData = response.data.data;
      const guestToken = guestData.access_token;
      document.cookie = `${accessTokenCookie}=${guestToken};path=/;expires=''`; /* accessTokenCookie + '=' + guestToken + ',' + ';path=/home'; */
      const json_str = JSON.stringify([]);
      document.cookie = `${wishlistDataCookie}=${json_str};path=/;expires=''`;
      callback(guestToken);
    })
    .catch(error => {
      console.log('guestError--', error);
      callback('');
    });
}

export function getUpdatedWishlist(wishlist) {
  console.log('getUpdatedWishlist');
  apiManager
    .get(wishListCountApi)
    .then(response => {
      resolveTheWishlistData(response.data.data);
      const wishlistCount =
        response.data.data.wishlistItemArray[0].wishlistItemList.length;
      console.log('Wishlist Count --- ', wishlistCount);
      wishlist.props.updatetWishListCount(wishlistCount);
      // wishlist.props.resetRemoveFromWishlistFlag(true)
    })
    .catch(error => {});
}

export function getUpdatedMinicartCount(minicart) {
  apiManager
    .get(cartCountApi)
    .then(response => {
      const count = response.data.data.cartTotalQuantity;
      minicart.props.updatetMinicart(count);
      // return count;
    })
    .catch(error => {
      // return null;
    });
}

export function logoutTheUser() {
  apiManager
    .post(logoutAPI)
    .then(response => {
      if (response.data.status === 'success') {
        resetTheCookiesAndData();
      }
      // alert('Newsletter Subscription - ' + data.status);
    })
    .catch(error => {
      console.log('newsError---', error);
    });
}

export function resetTheCookiesAndData() {
  // Reset all the user Cookies
  document.cookie = `${accessTokenCookie}=;path=/;expires=''`; /* accessTokenCookie + '=' + guestToken + ',' + ';path=/home'; */
  const json_str = JSON.stringify([]);
  document.cookie = `${wishlistDataCookie}=${json_str};path=/;expires=''`;
  document.cookie = `${wishlistIdCookie}=;path=/;expires=''`;
  document.cookie = `name=;path=/;expires=''`;
  appCookie.set('isLoggedIn', false, 365 * 24 * 60 * 60 * 1000);
  window.location.reload(); // In case you don't reload the page, make this use as guest user.
}

export function removeFromWishlistGlobalAPI(uniqueId, reference) {
  const data = {
    wishlist_id: getCookie(wishlistIdCookie),
    giftlistitem_id: getCorrespondingGiftlistId(uniqueId),
  };
  console.log('removeFromWishlistAPI', data);
  apiManager
    .post(removeFromWishlist, data)
    .then(response => {
      console.log('Add wishlit --- ', response.data);
      // this.setState({ wishlistCurrentImage: wishListRemovedImg });
      getUpdatedWishlist(reference);
      // reference.props.resetRemoveFromWishlistFlag(true); //Uncomment this line to show "Remove from wihslit" message on MyWishlist page
      // this.props.updatetWishListCount(6);
    })
    .catch(error => {
      console.log('newsError---', error);
    });
}
