const logger = require('../utils/logger.js');
const origin = require('../utils/origin');
const constants = require('../utils/constants');
const errorutils = require('../utils/errorutils.js');
const productUtil = require('../utils/productutil');
const categoryUtil = require('../utils/categoryutil');
const espotNames = require('../configs/espotnames');
const espotHandler = require('./espotshandler');

const bestSellingTitle = 'Best Selling Products';
const recentlyViewedTitle = 'Recently Viewed';

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
  let uniqueId = productID;
  productUtil.productDetailByPartNumber(productID, headers, (err, res) => {
    if (res && res.uniqueID) {
      uniqueId = res.uniqueID;
    }
    const originUrl = `${constants.recentlyViewedEvent.replace(
      '{{storeId}}',
      headers.storeId,
    )}`;

    const reqBody = {
      productId: uniqueId,
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
          logger.debug('Added to recently viewed');
        } else {
          logger.debug('Error while Calling Add to Recently Viewed');
        }
      },
    );
  });
};

/**
 * Get Recommended Product Data from WCS Activity
 * @param storeId,access_token
 * @return Activity Response
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
exports.getRecommendedProducts = getRecommendedProducts;
function getRecommendedProducts(headers, activityName, callback) {
  if (!activityName) {
    logger.debug('Get Recommended Products - Invalid Params');
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  if (headers.category_id) {
    activityName = `${activityName}/category/${headers.category_id}`;
  }

  espotHandler.getEspotsData(headers, activityName, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    const recommendedProduct = {
      productCount: 0,
      productList: [],
    };
    if (
      result.MarketingSpotData[0].baseMarketingSpotActivityData &&
      result.MarketingSpotData[0].baseMarketingSpotActivityData.length > 0
    ) {
      const productIds = [];
      const resJson = result.MarketingSpotData[0].baseMarketingSpotActivityData;
      resJson.forEach(product => {
        productIds.push(product.productId);
      });
      productUtil.productByProductIDs(productIds, headers, (error, results) => {
        if (error) {
          callback(error);
          return;
        }
        recommendedProduct.productCount = results.productCount;
        recommendedProduct.productList = results.productList;
        callback(null, recommendedProduct);
      });
    } else {
      callback(null, recommendedProduct);
    }
  });
}

/**
 * Get Best Seller Products for Homepage
 * @return Recently Viewed Products if Exists else return Best Seller
 */
exports.getBestSellerProducts = function getBestSeller(req, callback) {
  getRecommendedProducts(
    req.headers,
    espotNames.recentlyViewed,
    (err1, result1) => {
      const resJSON = {
        title: '',
        productCount: 0,
        productList: [],
      };
      if (err1) {
        callback(err1);
        return;
      }
      if (result1.productCount === 0) {
        getRecommendedProducts(
          req.headers,
          espotNames.bestSeller,
          (err2, result2) => {
            if (err2) {
              callback(err2);
              return;
            }
            resJSON.title = bestSellingTitle;
            resJSON.productCount = result2.productCount;
            resJSON.productList = result2.productList;
            callback(null, resJSON);
          },
        );
      } else {
        resJSON.title = recentlyViewedTitle;
        resJSON.productCount = result1.productCount;
        resJSON.productList = result1.productList;
        callback(null, resJSON);
      }
    },
  );
};

/**
 * Get Category Recommendation Data
 * @param storeId,access_token
 * @return Activity Response
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
exports.getRecommendedCategories = function getRecommendedCategories(
  headers,
  activityName,
  callback,
) {
  if (!activityName) {
    logger.debug('Get Recommended Categories - Invalid Params');
    callback(errorutils.errorlist.invalid_params);
    return;
  }
  espotHandler.getEspotsData(headers, activityName, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    let categoryList = [];
    if (
      result.MarketingSpotData[0].baseMarketingSpotActivityData &&
      result.MarketingSpotData[0].baseMarketingSpotActivityData.length > 0
    ) {
      const categoryIDs = [];
      const catJson = result.MarketingSpotData[0].baseMarketingSpotActivityData;
      catJson.forEach(category => {
        categoryIDs.push(category.categoryId);
      });
      categoryUtil.categoryListByIDs(categoryIDs, headers, (error, results) => {
        if (error) {
          callback(error);
          return;
        }
        categoryList = results;
        callback(null, categoryList);
      });
    } else {
      callback(null, categoryList);
    }
  });
};
