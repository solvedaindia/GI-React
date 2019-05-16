import React from 'react';
import { connect } from 'react-redux';
import apiManager from './apiManager';
import { updatetWishListCount, updatetMinicart } from '../actions/app/actions';
import { getCookie } from './utilityManager';
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
  cartCountApi
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
    })
    .catch(error => {});
}

export function getUpdatedMinicartCount(minicart) {
  apiManager
  .get(cartCountApi)
  .then(response => {
    const count = response.data.data.cartTotalQuantity;
    minicart.props.updatetMinicart(count);
    //return count;
  })
  .catch(error => {
    //return null;
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
  appCookie.set('isLoggedIn', false, 365 * 24 * 60 * 60 * 1000);
  window.location.reload(); // In case you don't reload the page, make this use as guest user.
}
