const async = require('async');
const errorUtils = require('../utils/errorutils');
const logger = require('../utils/logger.js');
const promotionUtil = require('../utils/promotionutil');
const constants = require('../utils/constants');
const headerUtil = require('../utils/headerutil');
const origin = require('../utils/origin');
const plpfilter = require('../filters/productlistfilter');
const pdpfilter = require('../filters/productdetailfilter');
const categoryUtil = require('../utils/categoryutil');
const plpconfig = require('../configs/plpconfig');

/* Get Product List By Category ID with All the Data including Promotion, Category Details */
module.exports.getProductsByCategory = function getProductsByCategory(
  req,
  callback,
) {
  if (!req.params.categoryId) {
    logger.debug('Get Product List by Category :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const categoryID = req.params.categoryId;
  const reqHeader = req.headers;

  const queryUrl = getQueryUrl(req);

  const productListUrl = constants.allSKUByCategoryId
    .replace('{{storeId}}', reqHeader.storeId)
    .replace('{{categoryId}}', categoryID)
    .replace('{{queryUrl}}', queryUrl);

  let plpTask = [
    getProductList.bind(null, reqHeader, productListUrl, null),
    getPromotionData,
  ];

  if (reqHeader.cat_details === 'true') {
    plpTask = [
      getCategoryDetails.bind(null, reqHeader, categoryID, productListUrl),
      getProductList,
      getPromotionData,
    ];
  }
  async.waterfall(plpTask, (err, result) => {
    if (err) {
      callback(err);
    } else {
      logger.debug('Got all the resposes for Product List By Category');
      callback(null, result);
    }
  });
};

/* Get Product List By Search Term with All the Data including Promotion Data */
module.exports.getProductsBySearchTerm = function getProductsBySearch(
  req,
  callback,
) {
  if (!req.params.searchterm) {
    logger.debug('Get Product List By Search Term :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }

  const reqHeader = req.headers;
  const queryUrl = getQueryUrl(req);

  const productListUrl = constants.searchByTerm
    .replace('{{storeId}}', reqHeader.storeId)
    .replace('{{searchTerm}}', req.params.searchterm)
    .replace('{{queryUrl}}', queryUrl);

  const plpTask = [
    getProductList.bind(null, reqHeader, productListUrl, null),
    getPromotionData,
  ];

  async.waterfall(plpTask, (err, result) => {
    if (err) {
      callback(err);
    } else {
      logger.debug('Got all the resposes for Product List By Search Term');
      callback(null, result);
    }
  });
};

/* Create Query Url for Product List */
function getQueryUrl(req) {
  const reqHeader = req.headers;
  const reqQuery = req.query;
  const pageSize = Number(reqQuery.pagesize) || plpconfig.pageSize;
  const pageNumber = Number(reqQuery.pagenumber) || plpconfig.pageNumber;
  const orderBy = Number(reqQuery.orderby) || plpconfig.orderBy;
  const currency = plpconfig.currencyType;

  let queryUrl = `pageSize=${pageSize}&pageNumber=${pageNumber}&orderBy=${orderBy}&catalogId=${
    reqHeader.catalogId
  }`;
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
  return queryUrl;
}

/* Get Category Details */
function getCategoryDetails(headers, categoryID, productListUrl, callback) {
  categoryUtil.getCategoryDetails(headers, categoryID, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    const categoryDetail = result;
    const reqHeaders = headers;
    if (categoryDetail.displaySkus === true) {
      reqHeaders.sku_display = true;
    }
    if (categoryDetail.displaySkus === false) {
      reqHeaders.sku_display = false;
    }
    callback(null, reqHeaders, productListUrl, categoryDetail);
  });
}

/**
 *  Get Products List
 */
function getProductList(headers, productListUrl, categoryDetail, callback) {
  let searchType = 101;
  if (headers.sku_display === false) {
    searchType = 101;
  }

  // eslint-disable-next-line no-param-reassign
  productListUrl += `&searchType=${searchType}`;

  const reqHeader = headerUtil.getWCSHeaders(headers);
  origin.getResponse(
    'GET',
    productListUrl,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        const productListJson = {
          productCount: 0,
          facetData: [],
          productList: [],
        };

        if (categoryDetail) {
          productListJson.categoryDetails = categoryDetail;
        }

        if (response.body.metaData.spellcheck) {
          productListJson.spellCheck = response.body.metaData.spellcheck;
        }

        productListJson.productCount = response.body.recordSetTotal;
        productListJson.facetData = plpfilter.facetData(
          response.body.facetView,
          headers.catalogId,
        );
        productListJson.productList = response.body.catalogEntryView;
        callback(null, headers, productListJson);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}

/**
 *  Get Promotion Data
 */
function getPromotionData(headers, productListJson, callback) {
  if (productListJson.productList && productListJson.productList.length > 0) {
    async.map(
      productListJson.productList,
      (product, cb) => {
        let productDetail = product;
        promotionUtil.getPromotionData(
          productDetail.uniqueID,
          headers,
          (error, promotionData) => {
            if (!error) {
              productDetail.promotionData = promotionData; // Add Promotion Data to Product Details
              productDetail = pdpfilter.productDetailSummary(productDetail); // Filter Product Details
              cb(null, productDetail);
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
        productListJson.productList = results;
        callback(null, productListJson);
      },
    );
  } else {
    callback(null, productListJson);
  }
}
