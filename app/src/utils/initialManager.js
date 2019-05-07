import React from 'react';
import apiManager from './apiManager';
import { connect } from 'react-redux';
import { updatetWishListCount } from '../actions/app/actions';
import {
  guestLoginAPI,
  storeId,
  accessToken,
  accessTokenCookie,
  wishlistDataCookie,
  wishListCountApi,
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
      const wishlistCount = response.data.data.wishlistItemArray[0].wishlistItemList.length
      console.log('Wishlist Count --- ',wishlistCount);
      wishlist.props.updatetWishListCount(wishlistCount);
    })
    .catch(error => {});
}
