const origin = require('./origin');
const constants = require('./constants');
const originMethod = 'GET';
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
    originMethod,
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
