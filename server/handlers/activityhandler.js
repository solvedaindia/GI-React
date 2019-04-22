const logger = require('../utils/logger.js');
const origin = require('../utils/origin');
const constants = require('../utils/constants');
const errorutils = require('../utils/errorutils.js');
const headerUtils = require('../utils/headerutil');
const productUtil = require('../utils/productutil');
const categoryUtil = require('../utils/categoryutil');
const espotNames = require('../configs/espotnames');

/**
 * Get data from WCS Activity
 * @param storeId,access_token
 * @return Activity Response
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
exports.getRecentlyViewedProduct = function getRecentlyViewedProduct(
  headers,
  callback,
) {
  const reqHeaders = headerUtils.getWCSHeaders(headers);
  const activityUrl = `${constants.espotOriginURL
    .replace('{{storeId}}', headers.storeId)
    .replace('{{espotName}}', espotNames.recentlyViewed)}`;
  origin.getResponse(
    'GET',
    activityUrl,
    reqHeaders,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        const recentlyViewedProducts = {
          productCount: 0,
          productList: [],
        };
        if (
          response.body.MarketingSpotData[0].baseMarketingSpotActivityData &&
          response.body.MarketingSpotData[0].baseMarketingSpotActivityData
            .length > 0
        ) {
          const recentlyViewedProductIDs = [];
          const recentlyViewedJSON =
            response.body.MarketingSpotData[0].baseMarketingSpotActivityData;
          recentlyViewedJSON.forEach(recentlyViewedProduct => {
            recentlyViewedProductIDs.push(recentlyViewedProduct.productId);
          });
          productUtil.productByProductIDs(
            recentlyViewedProductIDs,
            headers,
            (err, result) => {
              if (err) {
                callback(err);
                return;
              }
              recentlyViewedProducts.productCount = result.length;
              recentlyViewedProducts.productList = result;
              callback(null, recentlyViewedProducts);
            },
          );
        } else {
          callback(null, recentlyViewedProducts);
        }
      } else {
        logger.debug('Error while calling Recently Viewed Activity');
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};

/**
 * Add Product to Recently Viewed
 * @param storeId,access_token
 * @return Success
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
exports.addRecentlyViewedProduct = function addRecentlyViewedProduct(
  headers,
  productID,
  callback,
) {
  if (!productID) {
    callback(errorutils.errorlist.invalid_params);
    return;
  }
  const originUrl = `${constants.recentlyViewedEvent.replace(
    '{{storeId}}',
    headers.storeId,
  )}`;

  const reqBody = {
    productId: productID,
    personalizationID: headers.personalizationID,
  };
  const reqHeader = {
    'content-type': 'application/json',
  };
  origin.getResponse(
    'POST',
    originUrl,
    reqHeader,
    null,
    reqBody,
    null,
    null,
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        logger.debug('Error while Calling Add to Recently Viewed');
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};

/**
 * Get Best Seller Products Data By Category
 * @param storeId,access_token
 * @return Best Seller Product List
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
exports.getBestSellerProducts = function getBestSellerProducts(
  headers,
  categoryID,
  callback,
) {
  if (!categoryID) {
    callback(errorutils.errorlist.invalid_params);
    return;
  }
  const reqHeaders = headerUtils.getWCSHeaders(headers);
  /* const bestSellerUrl = `${constants.espotOriginURL
    .replace('{{storeId}}', headers.storeId)
    .replace('{{espotName}}', bestSellerActivity)}/category/16013`;
   */
  const bestSellerUrl = `https://192.168.0.39/wcs/resources/store/10151/espot/${
    espotNames.bestSeller
  }/category/${categoryID}`;
  origin.getResponse(
    'GET',
    bestSellerUrl,
    reqHeaders,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        logger.debug('Error while calling Best Seller Activity');
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};

/**
 * Get Featured Categories
 * @param storeId,access_token
 * @return Activity Response
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
exports.getFeaturedCategories = function getFeaturedCategories(
  headers,
  callback,
) {
  const reqHeaders = headerUtils.getWCSHeaders(headers);
  const featuredCategoryUrl = `${constants.espotOriginURL
    .replace('{{storeId}}', headers.storeId)
    .replace('{{espotName}}', espotNames.featuredCategories)}`;

  origin.getResponse(
    'GET',
    featuredCategoryUrl,
    reqHeaders,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        let categoryList = [];
        if (
          response.body.MarketingSpotData[0].baseMarketingSpotActivityData &&
          response.body.MarketingSpotData[0].baseMarketingSpotActivityData
            .length > 0
        ) {
          const categoryIDs = [];
          const categoryJSON =
            response.body.MarketingSpotData[0].baseMarketingSpotActivityData;
          categoryJSON.forEach(category => {
            categoryIDs.push(category.categoryId);
          });
          categoryUtil.categoryListByIDs(
            categoryIDs,
            headers,
            (err, result) => {
              if (err) {
                callback(err);
                return;
              }
              categoryList = result;
              callback(null, categoryList);
            },
          );
        } else {
          callback(null, categoryList);
        }
      } else {
        logger.debug('Error while calling Featured Category Activity API');
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};
