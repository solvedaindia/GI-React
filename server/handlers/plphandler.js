const async = require('async');
const errorUtils = require('../utils/errorutils');
const logger = require('../utils/logger.js');
const filter = require('../filters/filter');
const productUtil = require('../utils/productutil');
const promotionUtil = require('../utils/promotionutil');
const constants = require('../utils/constants');
const headerUtil = require('../utils/headerutil');
const origin = require('../utils/origin');
const plpfilter = require('../filters/productlistfilter');
const pdpfilter = require('../filters/productdetailfilter');
const categoryHandler = require('../handlers/categoryhandler');

module.exports.getProductList = function getProductList(req, callback) {
  if (!req.params.categoryId) {
    logger.debug('Get Category Carousel :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const categoryID = req.params.categoryId;
  const reqHeader = req.headers;
  const reqQuery = req.query;
  const catalogID = reqHeader.catalog_id || 10601;

  const pageSize = Number(reqQuery.pagesize) || 18;
  const pageNumber = Number(reqQuery.pagenumber) || 1;
  const orderBy = Number(reqQuery.orderby) || 0;
  const currency = 'USD';
  let queryUrl = `pageSize=${pageSize}&pageNumber=${pageNumber}&orderBy=${orderBy}&currency=${currency}`;
  let facetUrl = '';
  if (reqQuery.facet) {
    const differentFacetArray = encodeURIComponent(req.query.facet).split(
      '%2C',
    );
    differentFacetArray.forEach(sameFacet => {
      const sameFacetArray = sameFacet.split('%20');
      facetUrl += '&facet=';
      sameFacetArray.forEach(differentFacet => {
        facetUrl += `${differentFacet}+`;
      });
    });
    queryUrl += `${facetUrl}`;
  }

  const reqUrl = constants.allSKUByCategoryId
    .replace('{{storeId}}', reqHeader.storeId)
    .replace('{{categoryId}}', categoryID)
    .replace('{{queryUrl}}', queryUrl)
    .replace('{{catalogID}}', catalogID);

  let plpTask = [];

  if (reqHeader.cat_details === 'true') {
    plpTask = [
      getCategoryDetails.bind(null, reqHeader, categoryID, reqUrl),
      productList,
      getPromotionData,
    ];
  } else if (reqHeader.sku_display === 'false') {
    callback(null, {});
    return;
    // plpTask = [productList.bind(null, reqHeader, reqUrl)];
  } else {
    plpTask = [
      productList.bind(null, reqHeader, reqUrl, null, true),
      getPromotionData,
    ];
  }

  async.waterfall(plpTask, (err, result) => {
    if (err) {
      callback(err);
    } else {
      logger.debug('Got all the origin resposes for Product Listing');
      callback(null, result);
    }
  });
};

function getCategoryDetails(reqHeader, categoryID, reqUrl, callback) {
  if (reqHeader.cat_details === 'true') {
    categoryHandler.getCategoryDetails(reqHeader, categoryID, (err, result) => {
      if (err) {
        callback(err);
      } else if (result.displaySkus === true) {
        callback(null, reqHeader, reqUrl, result, true);
      } else {
        callback(null, reqHeader, reqUrl, result, false);
      }
    });
  }
}

/**
 *  Get Products List
 */
function productList(headers, reqUrl, categoryDetails, skuFlag, callback) {
  let plpUrl = '';
  if (skuFlag === true) {
    plpUrl = `${reqUrl}&searchType=${101}`;
  } else {
    plpUrl = `${reqUrl}&searchType=${1}`;
  }
  const reqHeader = headerUtil.getWCSHeaders(headers);
  origin.getResponse(
    'GET',
    plpUrl,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        const productListJson = {
          categoryDetails: {},
        };
        if (categoryDetails) {
          productListJson.categoryDetails = categoryDetails;
        }
        productListJson.productCount = response.body.recordSetTotal;
        productListJson.facetData = plpfilter.facetData(
          response.body.facetView,
        );

        const productListArray = [];
        if (
          response.body.catalogEntryView &&
          response.body.catalogEntryView.length > 0
        ) {
          const catalogArray = response.body.catalogEntryView;
          catalogArray.forEach(product => {
            productListArray.push(pdpfilter.productDetailSummary(product));
          });
        }
        productListJson.productList = productListArray;
        callback(null, headers, productListJson);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}

/**
 *  Get Products List
 */
/* function productList(headers, categoryID, callback) {
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
 */

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
function getPromotionData(headers, productListJson, callback) {
  //  const productArray = productListJson.productList;
  if (productListJson.productList && productListJson.productList.length > 0) {
    async.map(
      productListJson.productList,
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
        callback(null, productListJson);
      },
    );
  }
}
