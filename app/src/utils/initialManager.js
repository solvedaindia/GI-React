import React from 'react';
import axios from 'axios';
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
  axios
    .post(guestLoginAPI, '', {
      headers: { store_id: storeId, access_token: accessToken },
    })
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
  axios
    .get(wishListCountApi, {
      headers: { store_id: storeId, access_token: accessToken },
    })
    .then(response => {
      resolveTheWishlistData(response.data.data);
      const wishlistCount = response.data.data.wishlistItemArray[0].wishlistItemList.length
      console.log('Wishlist Count --- ',wishlistCount);
      wishlist.props.updatetWishListCount(wishlistCount);
    })
    .catch(error => {});
}
