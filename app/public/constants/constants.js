import { getCookie } from '../../src/utils/utilityManager';
import { validateEmptyObject } from '../../src/utils/validationManager';
export const secureHttp = 'https';
export const port1 = '';
export const port2 = process.env.envKeys.WEBSERVER_NODE_PORT || process.env.envKeys.SERVER_PORT;
export const imgHost = process.env.envKeys.IMAGE_ENDPOINT || window.location.hostname;
export const host = process.env.envKeys.WEBSERVER_IP || window.location.hostname;
export const accessTokenCookie = 'accessToken';
export const newsletterTokenCookie = 'newsletterToken';
export const wishlistDataCookie = 'wishlistData';
export const wishlistIdCookie = 'wishlistId';
export const isLoggedIn = false;
export const catID = '13503';
export const productTitleCharLimit = 35;
export const productDescriptionCharLimit = 25;
export const roomsEspotName = 'GI_Homepage_Explore_Rooms';
/* Header API */
export const headerApi1 = `${secureHttp}://${host}:${port2}/api/v1/header`;
export const headerApi2 = `${secureHttp}://${host}:${port1}/api/v1/header`;
export const headerStatic = `${secureHttp}://${host}:${port2}/api/v1/header_static_info`;
/* IP Data */
export const ipDataApi = 'https://api.ipdata.co?api-key=9d9101e52609b887345507736c6548c3c961d80a7b033cf26b2a2cac';
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
/* Cart Detail API */
export const cartDetailAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/cart/page`;
/* Cart Update API */
export const cartUpdateAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/cart/update`;
/* Cart Item Delet API */
export const cartDeleteItemAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/cart/remove`;
/* Cart Get Promotion API */
export const cartGetPromoAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/cart/promocode`;
/* Cart Apply Promotion API */
export const cartApplyPromoAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/cart/applypromotion`;
/* Cart Remove Promo Code API */
export const cartRemovePromoAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/cart/removepromotion/`;
/* Pincode Service API */
export const pinCodeServiceAPI = `${secureHttp}://${host}:${port2}/api/v1/pincode/serviceable/`;
/* Cart Count API */
export const cartCountApi = `${secureHttp}://${host}:${port2}/api/v1/secure/cart/quantity`;
/* Invoice API */
export const invoicAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/orders/invoice/{invoiceNo}`;
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
export const storeId = 'GodrejInterioESite';
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
/* Hero Banner Slider */
export const heroSliderAPI = `${secureHttp}://${host}:${port2}/api/v1/espots/GI_Homepage_Hero_Banner`;
/* wardrobes Banner Slider */
export const wardrobesBannerAPI = `${secureHttp}://${host}:${port2}/api/v1/espots/GI_WARDROBES_BANNER`;
/* wardrobes Hall Slider */
export const wardrobesHallAPI = `${secureHttp}://${host}:${port2}/api/v1/espots/GI_WARDROBES_HALL_OF_FAME `;
/* kitchens Banner Slider */
export const kitchenBannerAPI = `${secureHttp}://${host}:${port2}/api/v1/espots/GI_KITCHENS_BANNER`;
/* before after Slider */
export const beforeAfterApi = `${secureHttp}://${host}:${port2}/api/v1/espots/GI_BEFORE_AFTER_SLIDER `;
/* Always remember Hall Slider */
export const AlwaysRememberApi = `${secureHttp}://${host}:${port2}/api/v1/espots/GI_KITCHEN_PLANNING `;
/* kitchens Hall Slider */
export const kitchenHallAPI = `${secureHttp}://${host}:${port2}/api/v1/espots/GI_KITCHENS_HALL_OF_FAME `;
/*what goes in godrej kitchen Slider */
export const whatGoesKitchenAPI = `${secureHttp}://${host}:${port2}/api/v1/espots/GI_MODULAR_KITCHEN_SLIDER `;
/*  types of Wardrobes Slider */
export const typesOfWardrobesAPI = `${secureHttp}://${host}:${port2}/api/v1/espots/GI_TYPES_OF_MODULAR_WARDROBES `;
/* HomePage Track Order */
export const trackOrderMiniAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/orders/current`;
/* Featured Category */
export const featuredCatAPI = `${secureHttp}://${host}:${port2}/api/v1/activity/featuredcategories`;
/* Recently Viewed API */
export const recentlyViewedAPI = `${secureHttp}://${host}:${port2}/api/v1/activity/recentlyviewed`;
/* CLP THEME API */
export const clpThemeAPI = `${secureHttp}://${host}:${port2}/api/v1/clp/themes/`;
/* Best Seller */
export const bestSellerAPI = `${secureHttp}://${host}:${port2}/api/v1/activity/bestseller`;
/* Recommendation */
export const recommendationAPI = `${secureHttp}://${host}:${port2}/api/v1/homebody/recommendedproduct`;
/* ESPOT data API */
export const espotAPI = `${secureHttp}://${host}:${port2}/api/v1/espots/`;
/* Social Login API */
export const socialLoginAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/login/sociallogin`;
/* PLP API */
export const plpAPI = `${secureHttp}://${host}:${port2}/api/v1/productlist/bycategory/`;

/* PDP API */
export const pdpApi = `${secureHttp}://${host}:${port2}/api/v1/pdp/productData`;
/* PDP API */
export const pdpApi2 = `${secureHttp}://${host}:${port2}/api/v1/pdp/productDetails/`;
/* Add To Cart API */
export const addToCart = `${secureHttp}://${host}:${port2}/api/v1/secure/cart/add`;
/* Minicart API */
export const minicartAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/cart/minicart`;
/* MyWishlist API */
export const myWishlistAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/wishlist/page`;
/* Change Password API */
export const changePasswordAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/users/changepassword`;
/* Get City State API */
export const cityStateAPI = `${secureHttp}://${host}:${port2}/api/v1/pincode/city/`;
/* Add Address API */
export const addAddressAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/users/address/add`;
/* Get Address List API */
export const getAddressListAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/users/address/list`;
/* Delete Address API */
export const deleteAddressAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/users/address/delete/`;
/* Update/SetAsDefault Address API */
export const updateAddressAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/users/address/update/`;
/* PDP API */
export const bankEmiApi = `${secureHttp}://${host}:${port2}/api/v1/emi/emidetails/`;
/* User Detail API */
export const userDetailAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/userinfo`;
/* Pincode API */
export const pinCodeAPI = `${secureHttp}://${host}:${port2}/api/v1/pdp/productavailability/`;
/* Find Inventory API */
export const findinventoryAPI = `${secureHttp}://${host}:${port2}/api/v1/pincode/findinventory/`;
/* Search Page API */
export const searchPageAPI = `${secureHttp}://${host}:${port2}/api/v1/productlist/bysearchterm/`;
/* User Detail Validate API */
export const userDetailValidateAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/userinfo/validate`;
/* User Detail Update API */
export const userDetailUpdateAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/userinfo/update`;
/* Store API */
export const storeAPI = `${secureHttp}://${host}:${port2}/api/v1/storelocator/bycoordinates`;
/* Store API City*/
export const storeCityAPI = `${secureHttp}://${host}:${port2}/api/v1/storelocator/bylocation`;
/* Store BY ID*/
export const storeById = `${secureHttp}://${host}:${port2}/api/v1/storelocator/byId`;
/* Google Map Key */
//export const mapKey = 'AIzaSyCqIhTMIITk2PXT2iuvgFNzuUGB7vQG4-M';
export const mapKey = 'AIzaSyBsrzy8y4BCLnpnqZ_MN0F6yTSIAa8Bg-I';
/* Notify Me API */
export const notifyMeAPI = `${secureHttp}://${host}:${port2}/api/v1/pdp/notifyme`;
/* Address List API */
export const addressListAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/users/address/list`;
/* Consultation form post API*/
export const consultFormApi = `${secureHttp}://${host}:${port2}/api/v1/static/bookconsultation`;
/* Consultation form dropdown get API*/
export const consultGetApi = `${secureHttp}://${host}:${port2}/api/v1/static/getconsultation`;
/* User data API */
export const userDataAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/users/`;
/* Order List API */
export const orderListAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/orders/list`;

/* Share Wishlist API */
export const shareWishlistAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/wishlist/externalpage/`;

/* Espot Names */
export const GI_PDP_Our_Promises = 'GI_PDP_Sample_Espot1';
export const GI_PDP_Promocode_TandC = 'GI_PDP_Promocode_TandC';

/* Compare API */
export const compareAPI = `${secureHttp}://${host}:${port2}/api/v1/compare/products`;
export const store = 'wcsstore';
export const PinToCityAPI = `${secureHttp}://${host}:${port2}/api/v1/pincode/city/`;
export const UserVerifyAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/checkout/userstatus/`;
export const OrderSummaryAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/cart/ordersummary`;
export const CreateCheckSumAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/payment/initiateBDPayment`;
export const AddAddressToCardAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/cart/addaddress`;
export const PreCheckoutAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/cart/precheckout`;
export const BankListAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/checkout/banklist`;
export const OrderDetailAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/orders/details`;
export const CheckoutAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/payment/checkout`;
export const minEMIAPI = `${secureHttp}://${host}:${port2}/api/v1/emi/minimumemivalue`;
export const SaveGSTAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/checkout/savegstin`;
export const shipModeAPI = `${secureHttp}://${host}:${port2}/api/v1/secure/cart/shipmodes`;
//export const catalog = 'SolvedaCommerceCatalogAssetStore';
export const catalog = 'GodrejInterioSAS';
export const imageStore = 'imagestore';
export const imagePrefix = `${secureHttp}://${imgHost}/${imageStore}`;

/* Footer logo url */
export const footerLogoUrl = `${imagePrefix}/images/godrejInterio/logo-white.svg`;

/* ------- constant functions ------- */
export function getTheAccessToken(tokenPro) {
    console.log('constantToke -----', tokenPro);
    if (validateEmptyObject(tokenPro)) {
        return (accessToken = tokenPro);
    }
    return (accessToken = getCookie(accessTokenCookie));
}