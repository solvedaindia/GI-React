const origin = require('./origin');
const constants = require('./constants');
const originMethod = 'GET';
const errorUtils = require('./errorutils');
const logger = require('./logger.js');
const headerutil = require('./headerutil');

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
  productID,
  headers,
  callback,
) {
  if (!productID) {
    logger.debug('Get Product Detail By Product ID :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const originUrl = constants.productViewByProductId
    .replace('{{storeId}}', headers.storeId)
    .replace('{{productId}}', productID);

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

module.exports.productByProductIDs = function getproductDetailsByProductIDs(
  productIDURL,
  headers,
  callback,
) {
  if (!productIDURL) {
    logger.debug('Get Product Detail By Product IDs :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const id = productIDURL;
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
        callback(null, response.body);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
};
