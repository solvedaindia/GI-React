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

/**
 * Function to return userStatus (status of un-registered/registered users using Mobile/Email)
 */
module.exports.userstatus = function getUserStatus(req, callback) {
  logger.debug('Inside User Status API');
  if (!req.params.logonId) {
    logger.debug('Invalid Params : user status API');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }

  const reqHeader = headerutil.getWCSHeaders(req.headers);
  const originUrl = constants.userStatus
    .replace('{{storeId}}', req.headers.storeId)
    .replace('{{logonId}}', req.params.logonId);

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
        logger.debug('Error While calling User Status API');
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
};

/**
 * Function for reserve inventory API
 */
module.exports.reserveInventory = function setReserveInventory(req, callback) {
  logger.debug('Inside Reserve Inventory API');
  if (!req.body.order_id) {
    logger.debug('Invalid Params : Reserve Inventory API');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }

  const reqHeader = headerutil.getWCSHeaders(req.headers);
  const reqBody = {
    orderId: req.body.order_id,
  };
  const originUrl = constants.reserveInventory.replace(
    '{{storeId}}',
    req.headers.storeId,
  );

  origin.getResponse(
    'PUT',
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
        logger.debug('Error While Set Reserve Inventory API');
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
};
