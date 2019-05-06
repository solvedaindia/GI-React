import { getCookie } from '../../src/utils/utilityManager';
import { validateEmptyObject } from '../../src/utils/validationManager';

export const secureHttp = 'https';
export const port1 = '3001';
export const port2 = '8002';
export const port3 = '8443';
export const host1 = '192.168.0.36';
export const host = 'localhost';
export const accessTokenCookie = 'accessToken';
export const newsletterTokenCookie = 'newsletterToken';
export const wishlistDataCookie = 'wishlistData';
export const wishlistIdCookie = 'wishlistId';
export const isLoggedIn = false;
export const catID = '13503';
/* Header API */
export const headerApi1 = `${secureHttp}://${host}:${port2}/api/v1/header`;
export const headerApi2 = `${secureHttp}://${host}:${port1}/api/v1/header`;
export const headerStatic = `${secureHttp}://${host}:${port2}/api/v1/header_static_info`;

/* User Context API */
export const mwApi = `${secureHttp}://${host}:${port1}/api/v1/user-context`;
/* Categories API */
export const catApi = `${secureHttp}://${host}:${port1}/api/v1/categories/@top`;
/* Navigation API */
export const navigationApi = `${secureHttp}://${host}:${port2}/api/v1/categories/navigation`;
/* Wishlist Count API */
export const wishListCountApi = `${secureHttp}://${host}:${port2}/api/v1/secure/wishlist/itemcount`;
/* Add to Wishlist API */
export const addToWishlist = `${secureHttp}://${host}:${port2}/api/v1/secure/wishlist/additem`;
/* Remove from Wishlist API */
export const removeFromWishlist = `${secureHttp}://${host}:${port2}/api/v1/secure/wishlist/deleteitem`;
/* Cart Count API */
export const cartCountApi = `${secureHttp}://${host}:${port2}/api/v1/secure/cart/quantity`;
/* Auto Suggest API */
export const autoSuggestApi = `${secureHttp}://${host}:${port1}/api/v1/auto-suggest/`;
/* Homepage API Static */
export const homePageApi = `${secureHttp}://${host}:${port2}/api/v1/homebody`;
/* Homepage Layout API */
export const homePageLayoutAPI = `${secureHttp}://${host}:${port2}/api/v1/espots/GI_Homepage_Layout`;
/* Footer API */
export const footerApi = `${secureHttp}://${host}:${port2}/api/v1/footer`;
/* Generate OTP API */
export const generateOTPAPI = `${secureHttp}://${host}:${port2}/api/v1/otp/generate`;
/* Validate OTP API */
export const validateOTPAPI = `${secureHttp}://${host}:${port2}/api/v1/otp/validate`;
/* ForgotPassword API */
export const forgotPasswordAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/users/forgotpassword`;
/* Guest Login API */
export const guestLoginAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/token/guest`;
/* Logout API */
export const logoutAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/logout`;
/* Newsletter Subscription API */
export const newsletterAPI = `${secureHttp}://${host}:${port2}/api/v1/newsletter/subscribe`;
/* Newsletter Subscription Status API */
export const newsletterStatusAPI = `${secureHttp}://${host}:${port2}/api/v1/newsletter/status`;
/* store Id */
export const storeId = '10151';
/* Access Token */
export let accessToken = getTheAccessToken();
/* Facebook AppId */
export const facebookAppId = '248827646023949';
/* Google ClientId */
export const googleClientId =
  '380096657271-mr3mvob1u4ginpqf1jrrkiuv93fk3j3o.apps.googleusercontent.com';
/* Access Token API */
export const accessTokenAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/login/guest`;
/* Registration API */
export const registartionAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/signup`;
/* Auto Suggest API */
export const autoSuggestAPI = `${secureHttp}://${host}:${port2}/api/v1/search/autosuggest/`;
/* User Login API */
export const userLoginAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/login/user`;
/* PLP Sub-Category API */
export const plpSubCatAPI = `${secureHttp}://${host}:${port2}/api/v1/categories/subcategories/`;
/* Sub-Category API */
export const subCatAPI = `${secureHttp}://${host}:${port2}/api/v1/categories/subcategories/13009`;
/* Hero Banner Slider*/
export const heroSliderAPI = `${secureHttp}://${host}:${port2}/api/v1/espots/GI_Homepage_Hero_Banner`;
/* Featured Category */
export const featuredCatAPI = `${secureHttp}://${host}:${port2}/api/v1/activity/featuredcategories`;
/* Recently Viewed API */
export const recentlyViewedAPI = `${secureHttp}://${host}:${port2}/api/v1/activity/recentlyviewed`;
/* Best Seller */
export const bestSellerAPI = `${secureHttp}://${host}:${port2}/api/v1/activity/bestseller`;
/* ESPOT data API */
export const espotAPI = `${secureHttp}://${host}:${port2}/api/v1/espots/`;
/* Social Login API */
export const socialLoginAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/login/sociallogin`;
/* PLP API */
export const plpAPI = `${secureHttp}://${host}:${port2}/api/v1/productlist/bycategory/`;
/* Footer logo url */
export const footerLogoUrl = `${secureHttp}://${host1}:${port3}/wcsstore/GodrejInterioSAS/images/godrejInterio/logo-white.svg`;
/* PDP API */
export const pdpApi = `${secureHttp}://${host}:${port2}/api/v1/pdp/productData`;
/* PDP API */
export const pdpApi2 = `${secureHttp}://${host}:${port2}/api/v1/pdp/productDetails/`;

export const newMachineUrl = `${secureHttp}://${host1}:${port3}`;
export const store = 'wcsstore';
export const catalog = 'SolvedaCommerceCatalogAssetStore';

/* ------- constant functions ------- */
export function getTheAccessToken(tokenPro) {
  console.log('constantToke -----', tokenPro);
  if (validateEmptyObject(tokenPro)) {
    return (accessToken = tokenPro);
  }
  return (accessToken = getCookie(accessTokenCookie));
}
