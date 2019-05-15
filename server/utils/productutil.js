const async = require('async');
const origin = require('./origin');
const constants = require('./constants');
const originMethod = 'GET';
const errorUtils = require('./errorutils');
const logger = require('./logger.js');
const headerutil = require('./headerutil');
const promotionUtil = require('./promotionutil');
const productDetailFilter = require('../filters/productdetailfilter');

module.exports.productsByCategoryID = function getProductByCategoryID(
  categoryID,
  headers,
  callback,
) {
  if (!categoryID) {
    logger.debug('Get Product By Category ID :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const originUrl = constants.productViewByCategoryId
    .replace('{{storeId}}', headers.storeId)
    .replace('{{categoryId}}', categoryID);

  const reqHeader = headerutil.getWCSHeaders(headers);

  origin.getResponse(
    originMethod,
    originUrl,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
};

module.exports.productByProductID = function getproductDetailsByProductID(
  ProductID,
  headers,
  callback,
) {
  logger.debug('Inside Product details by id method');
  if (!ProductID) {
    logger.debug('Get Product Detail By Product ID :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const originUrl = constants.pdp
    .replace('{{storeId}}', headers.storeId)
    .replace('{{productId}}', ProductID);

  // const originUrl =
  //   'https://192.168.0.36:3738/search/resources/store/10151/productview/TEST_PDP';
  const reqHeader = headerutil.getWCSHeaders(headers);
  origin.getResponse(
    originMethod,
    originUrl,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
};

/**
 * Get ProductView By IDS
 * @param storeId,access_token,Product ID Array
 * @return Product List with Promotion Data
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.productByProductIDs = function getproductDetailsByProductIDs(
  productIDs,
  headers,
  callback,
) {
  if (!productIDs || productIDs.length === 0) {
    logger.debug('Get Product Detail By Product IDs :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }

  const productListTask = [
    getProductListByIDs.bind(null, headers, productIDs),
    getPromotionData.bind(null, headers, productIDs),
  ];
  async.parallel(productListTask, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, transformJson(result));
    }
  });
};

function getProductListByIDs(headers, productIDs, callback) {
  let id = '';
  if (productIDs && productIDs.length > 0) {
    productIDs.forEach(productID => {
      id += `id=${productID}&`;
    });
  }
  const originUrl = constants.productViewByProductIds
    .replace('{{storeId}}', headers.storeId)
    .replace('{{idQuery}}', id);

  const reqHeader = headerutil.getWCSHeaders(headers);
  origin.getResponse(
    originMethod,
    originUrl,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        const productList = [];
        if (
          response.body.catalogEntryView &&
          response.body.catalogEntryView.length > 0
        ) {
          /*  response.body.catalogEntryView.forEach(product => {
            productList.push(productDetailFilter.productDetailSummary(product));
          }); */
          callback(null, response.body.catalogEntryView);
        } else {
          callback(null, productList);
        }
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}

/* Get Promotion Data for All The Products */
function getPromotionData(headers, productIDs, callback) {
  const promotionArray = [];
  async.map(
    productIDs,
    (productId, cb) => {
      promotionUtil.getPromotionData(productId, headers, (error, promotion) => {
        if (!error) {
          const promotionJson = {
            uniqueID: productId,
            promotionData: promotion,
          };
          cb(null, promotionJson);
        } else {
          cb(error);
        }
      });
    },
    (errors, results) => {
      if (errors) {
        callback(errors);
        return;
      }
      results.forEach(result => {
        promotionArray.push(result);
      });
      callback(null, promotionArray);
    },
  );
}

/* Merge Product Details and Promotion Data */
function transformJson(result) {
  const productListArray = result[0];
  const promotionJson = result[1];
  const productListing = [];

  productListArray.forEach(product => {
    let productDetail = {};
    const productPromotion = promotionJson.filter(
      promotion => promotion.uniqueID === product.uniqueID,
    );
    // eslint-disable-next-line no-param-reassign
    product.promotionData = productPromotion[0].promotionData;
    productDetail = productDetailFilter.productDetailSummary(product);
    productListing.push(productDetail);
  });
  const resJson = {
    productCount: productListing.length,
    productList: productListing,
  };
  return resJson;
}
