const async = require('async');
const errorUtils = require('../utils/errorutils');
const logger = require('../utils/logger.js');
const filter = require('../filters/filter');
const productUtil = require('../utils/productutil');
const promotionUtil = require('../utils/promotionutil');

module.exports.getProductList = function getProductList(req, callback) {
  if (!req.params.categoryId) {
    logger.debug('Get Category Carousel :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const categoryID = req.params.categoryId;
  const reqHeaders = req.headers;
  async.waterfall(
    [
      productList.bind(null, reqHeaders, categoryID),
      getProductDetails,
      getPromotionData,
      combineProductListData,
    ],
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        logger.debug('Got all the origin resposes for Product Listing');
        callback(null, result);
      }
    },
  );
};

/**
 *  Get Products List
 */
function productList(headers, categoryID, callback) {
  productUtil.productsByCategoryID(categoryID, headers, (err, result) => {
    if (err) {
      callback(err);
    } else {
      const facets = filter.filterData('productlist_facet', result.facetView);
      const uniqueIDs = filter.filterData(
        'productlist_id',
        result.catalogEntryView,
      );
      callback(null, headers, facets, uniqueIDs);
    }
  });
}

/**
 *  Get Products Details
 */
function getProductDetails(headers, facets, uniqueIDs, callback) {
  const hasSwatches = false;
  productUtil.productByProductIDs(uniqueIDs, headers, (err, result) => {
    if (err) {
      callback(err);
    } else {
      let productArray = [];
      if (hasSwatches === true) {
        productArray = filter.filterData(
          'productlist_withswatch',
          result.catalogEntryView,
        );
      }
      if (hasSwatches === false) {
        productArray = filter.filterData(
          'productlist_withoutswatch',
          result.catalogEntryView,
        );
      }
      callback(null, headers, facets, productArray);
    }
  });
}

/**
 *  Get Promotion Data
 */
function getPromotionData(headers, facets, productArray, callback) {
  if (productArray && productArray.length > 0) {
    async.map(
      productArray,
      (product, cb) => {
        promotionUtil.promotionData(
          product.uniqueID,
          headers,
          (error, promotionData) => {
            if (!error) {
              product.promotionData = promotionData.associatedPromotions;
              cb(null, product);
            } else {
              cb(error);
            }
          },
        );
      },
      (errors, results) => {
        if (errors) {
          callback(errors);
          return;
        }
        callback(null, facets, productArray);
      },
    );
  }
}

/* combine Product List Data */
function combineProductListData(facetData, productArray, callback) {
  const productListJSON = {
    facets: facetData,
    productList: productArray,
  };

  callback(null, productListJSON);
}
