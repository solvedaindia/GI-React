const logger = require('../utils/logger.js');
const constants = require('../utils/constants');
const origin = require('../utils/origin.js');
const headerutil = require('../utils/headerutil.js');
const errorUtils = require('../utils/errorutils');

/**
 * function to store GSTIN in DB during the checkout process
 */
module.exports.storeGSTINValue = function storeGSTINValueInDB(req, callback) {
  logger.debug('Inside store GSTIN value in DB');
  if (!req.body.order_id && !req.body.gst_number) {
    logger.debug('Invalid Params : store GSTIN value in DB');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const reqHeader = headerutil.getWCSHeaders(req.headers);
  const reqBody = {
    orderId: req.body.order_id,
    orderAttributes: [
      {
        attrName: 'gstin',
        attrValue: req.body.gst_number,
      },
    ],
  };

  const originUrl = constants.saveGSTIN.replace(
    '{{storeId}}',
    req.headers.storeId,
  );
  origin.getResponse(
    'POST',
    originUrl,
    reqHeader,
    null,
    reqBody,
    null,
    '',
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        logger.debug('Error While saving GSTIN in DB');
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
};
