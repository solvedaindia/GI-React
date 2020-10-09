import React from "react";
import { connect } from "react-redux";
import apiManager from "./apiManager";
import {
  updatetWishListCount,
  updatetMinicart,
  resetRemoveFromWishlistFlag
} from "../actions/app/actions";
import { getCookie, getCorrespondingGiftlistId } from "./utilityManager";
import appCookie from "./cookie";
import {
  guestLoginAPI,
  accessTokenCookie,
  wishlistDataCookie,
  wishlistIdCookie,
  wishListCountApi,
  logoutAPI,
  cartCountApi,
  removeFromWishlist
} from "../../public/constants/constants";
import { resolveTheWishlistData } from "./utilityManager";

export function registerGuestUser(callback) {
  apiManager
    .post(guestLoginAPI, "")
    .then(response => {
      const guestData = response.data.data;
      const guestUserID = guestData.userID;
      const guestToken = guestData.access_token;
      // document.cookie = `${accessTokenCookie}=${guestToken};path=/;expires=''`;
      //  document.cookie = `userID=${guestUserID};path=/;expires=''`;
      appCookie.set(accessTokenCookie, guestToken, 365 * 24 * 60 * 60 * 1000);
      appCookie.set("userID", guestUserID, 365 * 24 * 60 * 60 * 1000);

      const json_str = JSON.stringify([]);
      //document.cookie = `${wishlistDataCookie}=${json_str};path=/;expires=''`;
      appCookie.set(wishlistDataCookie, json_str, 365 * 24 * 60 * 60 * 1000);
      callback(guestToken);
    })
    .catch(error => {
      callback("");
    });
}

export function getUpdatedWishlist(wishlist) {
  apiManager
    .get(wishListCountApi)
    .then(response => {
      resolveTheWishlistData(response.data.data);
      const wishlistCount =
        response.data.data.wishlistItemArray[0].wishlistItemList.length;
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
    })
    .catch(error => {
      // return null;
    });
}

export function logoutTheUser() {
  apiManager
    .post(logoutAPI)
    .then(response => {
      if (response.data.status === "success") {
        resetTheCookiesAndData();
      }
    })
    .catch(error => {});
}

export function resetTheCookiesAndData() {
  // Reset all the user Cookies
  document.cookie = `${accessTokenCookie}=;path=/;expires=''`;
  const json_str = JSON.stringify([]);
  document.cookie = `${wishlistDataCookie}=${json_str};path=/;expires=''`;
  document.cookie = `${wishlistIdCookie}=;path=/;expires=''`;
  document.cookie = `name=;path=/;expires=''`;
  document.cookie = `loginID=;path=/;expires=''`;
  appCookie.set("isLoggedIn", false, 365 * 24 * 60 * 60 * 1000);
  appCookie.set(`adrID=;path=/;expires=''`);
  //appCookie.set('pincodeUpdated', false, 365 * 24 * 60 * 60 * 1000);
  // appCookie.set('pincode', '', 365 * 24 * 60 * 60 * 1000);
  //window.location.reload(); // In case you don't reload the page, make this use as guest user.
  document.location.href = "/";
}

export function removeFromWishlistGlobalAPI(uniqueId, reference) {
  const data = {
    wishlist_id: getCookie(wishlistIdCookie),
    giftlistitem_id: getCorrespondingGiftlistId(uniqueId)
  };
  apiManager
    .post(removeFromWishlist, data)
    .then(response => {
      getUpdatedWishlist(reference);
    })
    .catch(error => {});
}
