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

  const originUrl = constants.saveOrderExtAttr.replace(
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

module.exports.bankList = function bankList(headers, callback) {
  const reqHeaders = headerutil.getWCSHeaders(headers);

  const getBankListURL = `${constants.getBankList.replace(
    '{{storeId}}',
    headers.storeId,
  )}`;

  origin.getResponse(
    'GET',
    getBankListURL,
    reqHeaders,
    null,
    null,
    null,
    '',
    response => {
      if (response.status === 200) {
        const resJson = {
          bankList: [],
        };
        resJson.bankList = response.body.BankList;
        callback(null, resJson);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
};

/**
 * function to store Discount in DB during the checkout process
 */
module.exports.storeDiscount = function storeDiscount(headers, orderSummary) {
  logger.debug('Inside store Discount value in WCS DB');

  const reqHeader = headerutil.getWCSHeaders(headers);
  const reqBody = {
    orderId: orderSummary.orderID,
    orderAttributes: [
      {
        attrName: 'productDiscount',
        attrValue: orderSummary.productDiscount,
      },
      {
        attrName: 'orderDiscount',
        attrValue: orderSummary.orderDiscount,
      },
    ],
  };

  const originUrl = constants.saveOrderExtAttr.replace(
    '{{storeId}}',
    headers.storeId,
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
        logger.debug('Discount Saved in WCS DB');
      } else {
        logger.errory('Error While saving Discount in DB');
      }
    },
  );
};
