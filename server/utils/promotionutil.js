const origin = require('./origin');
const constants = require('./constants');
const errorUtils = require('./errorutils');
const logger = require('./logger.js');
const headerutil = require('./headerutil');

/* Get Promotion Data Based on Product/SKU ID */
module.exports.getPromotionData = getPromotionData;
function getPromotionData(productID, headers, callback) {
  if (!productID) {
    logger.debug('Get Promotion Data :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const originUrl = constants.associatedPromotion
    .replace('{{storeId}}', headers.storeId)
    .replace('{{productId}}', productID);

  const reqHeader = headerutil.getWCSHeaders(headers);

  origin.getResponse(
    'GET',
    originUrl,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        callback(null, response.body.associatedPromotions);
      } else {
        logger.debug('Error While Calling Promotion API');
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}

/* Apply Promotion To Cart */
module.exports.applyCartPromotion = applyPromoCode;
function applyPromoCode(headers, body, callback) {
  if (!body.orderId || !body.promoCode) {
    logger.debug('Apply Promotion To Cart :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const originUrl = constants.applyCartPromotion.replace(
    '{{storeId}}',
    headers.storeId,
  );

  const reqBody = {
    orderId: body.orderId,
    promoCode: body.promoCode,
  };

  const reqHeader = headerutil.getWCSHeaders(headers);

  origin.getResponse(
    'POST',
    originUrl,
    reqHeader,
    null,
    reqBody,
    null,
    null,
    response => {
      if (response.status === 201) {
        callback(null, response.body);
      } else {
        logger.debug('Error While Calling Apply Promo Code API');
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}

/* Remove Promotion from Cart */
module.exports.removeCartPromotion = removePromoCode;
function removePromoCode(headers, params, callback) {
  if (!params.promoCode) {
    logger.debug('Removing Promotion Data from Cart :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const originUrl = constants.removeCartPromotion
    .replace('{{storeId}}', headers.storeId)
    .replace('{{promoCode}}', params.promoCode);

  const reqHeader = headerutil.getWCSHeaders(headers);

  origin.getResponse(
    'DELETE',
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
        logger.debug('Error While Calling Removing Promotion API from Cart');
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}

module.exports.getMultiplePromotions = getMultiplePromotions;
function getMultiplePromotions(productID, headers, callback) {
  if (!productID) {
    logger.debug('Get Promotion Data :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
  }

  const originUrl = constants.associatedMultiplePromotion
    .replace('{{storeId}}', headers.storeId)
    .replace('{{productId}}', productID);

  const reqHeader = headerutil.getWCSHeaders(headers);

  origin.getResponse(
    'GET',
    originUrl,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        callback(null, response);
      } else {
        logger.debug('Error While Calling Promotion API');
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}

module.exports.getPublicPromotions = getPublicPromotions;
function getPublicPromotions(productID, headers, callback) {
  if (!productID) {
    logger.debug('Get Public Promotion Data :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
  }

  const originUrl = constants.associatedPublicPromotion
    .replace('{{storeId}}', headers.storeId)
    .replace('{{productId}}', '');

  const reqHeader = headerutil.getWCSHeaders(headers);

  origin.getResponse(
    'GET',
    originUrl,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        callback(null, response);
      } else {
        logger.debug('Error While Calling Promotion API');
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}

/**
 * Get PromotionID List
 */
module.exports.getPromotionsList = function getPromotionsList(
  headers,
  callback,
) {
  const originUrl = constants.getPromotionsList.replace(
    '{{storeId}}',
    headers.storeId,
  );

  const reqHeader = headerutil.getWCSHeaders(headers);

  origin.getResponse(
    'GET',
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
 * Get promocode by promotionId
 */
module.exports.getPromoCode = function getPromoCodeById(
  promotionId,
  headers,
  callback,
) {
  if (!promotionId) {
    logger.debug('Get Promo Code :: Invalid Params');
    callback(errorUtils.errorlist.invalid_params);
  }

  const originUrl = constants.getPromoCode
    .replace('{{storeId}}', headers.storeId)
    .replace('{{promotionId}}', promotionId);

  const reqHeader = headerutil.getWCSHeaders(headers);

  origin.getResponse(
    'GET',
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
