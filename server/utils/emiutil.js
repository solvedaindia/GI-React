const origin = require('./origin');
const constants = require('./constants');
const originMethod = 'GET';
const errorUtils = require('./errorutils');
const logger = require('./logger.js');
const headerutil = require('./headerutil');

module.exports.emiDataBySellingPrice = function getEmiDataBySellingPrice(
  sellingPrice,
  headers,
  callback,
) {
  if (!sellingPrice) {
    logger.debug('Get EMI Data by Selling Price :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }

  const originUrl = constants.emiData
    .replace('{{storeId}}', headers.storeId)
    .replace('{{sellingprice}}', sellingPrice);

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

module.exports.getMinimumEmiValue = function getMinimumEmiValueByPrice(
  sellingPrice,
  headers,
  callback,
) {
  if (!sellingPrice) {
    logger.debug('Get EMI Data by Selling Price :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }

  const originUrl = constants.minimumEmiValue
    .replace('{{storeId}}', headers.storeId)
    .replace('{{sellingprice}}', sellingPrice);

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
