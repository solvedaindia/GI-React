const apiconfig = require('./apiconfig.js');
const endPointURLConfig = apiconfig.getEndPoint();
const HostName = endPointURLConfig.hostname;
const searchHostName = endPointURLConfig.searchHostname;
// const storeID = global.wcsParams.storeId;

// production Resource URL
const prodSearchResourceUrl = `https://${searchHostName}/search/resources/store`;
const prodWcsResourceUrl = `https://${HostName}/wcs/resources/store`;

// export the CONSTANT URL
module.exports = Object.freeze({
  espotOriginURL: `${prodWcsResourceUrl}/{{storeId}}/espot/{{espotName}}`,
  categoryview: `${prodSearchResourceUrl}/{{storeId}}/categoryview/{{urlParam}}`,
  categoryViewByParentId: `${prodSearchResourceUrl}/{{storeId}}/categoryview/byParentCategory/{{categoryId}}`,
  categoryViewByCategoryId: `${prodSearchResourceUrl}/{{storeId}}/categoryview/byId/{{categoryId}}`,
  productViewByCategoryId: `${prodSearchResourceUrl}/{{storeId}}/productview/byCategory/{{categoryId}}?searchSource=E&searchType=101`,
  allSKUByCategoryId: `${prodSearchResourceUrl}/{{storeId}}/productview/byCategory/{{categoryId}}?{{queryUrl}}&searchSource=E&responseFormat=json&profileName=IBM_findProductsByCategory`,
  productViewByProductId: `${prodSearchResourceUrl}/{{storeId}}/productview/byId/{{productId}}?profileName=IBM_findProductByIds_Details`,
  productViewByProductIds: `${prodSearchResourceUrl}/{{storeId}}/productview/byIds?{{idQuery}}?profileName=IBM_findProductByIds_Details`,
  associatedPromotion: `${prodWcsResourceUrl}/{{storeId}}/associated_promotion?qProductId={{productId}}&q=byProduct`,
  storeLocatorByLocation: `${prodWcsResourceUrl}/{{storeId}}/storelocator/byLocation?responseFormat=json&city={{cityName}}&Type={{giStoreType}}&siteLevelStoreSearch=false`,
  storeLocatorByCoordinates: `${prodWcsResourceUrl}/{{storeId}}/storelocator/latitude/{{latitude}}/longitude/{{longitude}}?responseFormat=json&Type={{giStoreType}}&siteLevelStoreSearch=false`,
  login: `${prodWcsResourceUrl}/{{storeId}}`,
  userRegistration: `${prodWcsResourceUrl}/{{storeId}}/person?responseFormat=json&mode=self`,
  userDetails: `${prodWcsResourceUrl}/{{storeId}}/person/@self`,
  searchByTerm: `${prodSearchResourceUrl}/{{storeId}}/productview/bySearchTerm/{{searchTerm}}?{{queryUrl}}&responseFormat=json`,
  autoSuggest: `${prodSearchResourceUrl}/{{storeId}}/sitecontent/keywordSuggestionsByTerm/{{urlParam}}`,
  cartData: `${prodWcsResourceUrl}/{{storeId}}/cart`,
  mylistFetch: `${prodWcsResourceUrl}/{{storeId}}/wishlist/@self`,
  createWishlist: `${prodWcsResourceUrl}/{{storeId}}/wishlist`,
  editWishlist: `${prodWcsResourceUrl}/{{storeId}}/wishlist/{{wishlistid}}`,
  updateProfile: `${prodWcsResourceUrl}/{{storeId}}/person/@self?action=updateUserRegistration&responseFormat=json`,
  userContact: `${prodWcsResourceUrl}/{{storeId}}/person/@self/contact`,
  sociallogin: `${prodWcsResourceUrl}/{{storeId}}/loginidentity/oauth_validate?responseFormat=json`,
  otp: `${prodWcsResourceUrl}/{{storeId}}/GIOtp`,
  forgotPassword: `${prodWcsResourceUrl}/{{storeId}}/person/@self?responseFormat=json`,
  newsletterSubscription: `${prodWcsResourceUrl}/{{storeId}}/newsletter`,
  recentlyViewedEvent: `${prodWcsResourceUrl}/{{storeId}}/event`,
  pdp: `${prodSearchResourceUrl}/{{storeId}}/productview/byId/{{productId}}`,
  getPincode: `${prodWcsResourceUrl}/{{storeId}}/pincode/getpincode/{{userID}}`,
  updateDefaultPincode: `${prodWcsResourceUrl}/{{storeId}}/pincode/updatepincode`,
  storeDetails: `${prodWcsResourceUrl}/0/adminLookup?q=findByStoreIdentifier&storeIdentifier={{storeIdentifier}}`,
  emiData: `${prodWcsResourceUrl}/{{storeId}}/emilcalculation/getallbankemidetails/{{sellingprice}}`,
  minimumEmiValue: `${prodWcsResourceUrl}/{{storeId}}/emilcalculation/getminimumemidetails/{{sellingprice}}`,
  associatedMultiplePromotion: `${prodWcsResourceUrl}/{{storeId}}/associated_promotion?qProductId={{productId}}&q=byProduct&qIncludeChildItems=true&profileName=IBM_catalogEntryDetailed`,
  getCityAndState: `${prodWcsResourceUrl}/{{storeId}}/pincode/getCityState/{{pincode}}`,
  applyCartPromotion: `${prodWcsResourceUrl}/{{storeId}}/cart/@self/assigned_promotion_code`,
  removeCartPromotion: `${prodWcsResourceUrl}/{{storeId}}/cart/@self/assigned_promotion_code/{{promoCode}}`,
  findInvertory: `${prodWcsResourceUrl}/{{storeId}}/inventory/byPartNumber/{{partNumber}}?zipCode={{pinCode}}&quantity={{quantity}}&onlineStoreName=GodrejInterioESite`,
  getPromotionsList: `${prodWcsResourceUrl}/{{storeId}}/promotion?q=all`,
  getPromoCode: `${prodWcsResourceUrl}/{{storeId}}/custompromotion/getpromocode/{{promotionId}}`,
  pincodeServiceablity: `${prodWcsResourceUrl}/{{storeId}}/pincode/getServiceAbility/{{pincode}}`,
  saveGSTIN: `${prodWcsResourceUrl}/{{storeId}}/orderExt/saveOrderExtAttribute`,
  promotionByIDs: `${prodWcsResourceUrl}/{{storeId}}/custompromotion/fetchPromotionData?catEntryIds={{productIDs}}`,
  setSocialLoginPassword: `${prodWcsResourceUrl}/{{storeId}}/person/@self?responseFormat=json&action=updateUserRegistration`,
  shippingCharge: `${prodWcsResourceUrl}/{{storeId}}/GIShipCharge/getShippingCharge?pinCode={{pincode}}&uniqueId={{uniqueId}}`,
  userInfo: `${prodWcsResourceUrl}/{{storeId}}/usermanagement/getuserstatus/{{logonId}}`,
});
