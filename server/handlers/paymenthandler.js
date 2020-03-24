const constants = require('../utils/constants');
const headerutil = require('../utils/headerutil.js');
const errorutils = require('../utils/errorutils.js');
const origin = require('../utils/origin.js');
const checkout = require('../handlers/carthandler');
const logger = require('../utils/logger.js');

/* Initiate Payment */
module.exports.initiateBDPayment = function initiateBDPayment(
  params,
  headers,
  callback,
) {
  logger.info('Entering Initiate BD Payment');
  if (
    !params.orderId ||
    (!params.email && !params.mobile) ||
    !params.payMethodId ||
    !params.amount ||
    !params.callbackUrl ||
    !params.paymentMode ||
    !params.billing_address_id
  ) {
    logger.error('Initiate BD Payment:::Invalid Order Related Params');
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  if (
    params.paymentMode === 'NET_BANKING' ||
    params.paymentMode === 'PAYTM' ||
    params.paymentMode === 'PHONEPE'
  ) {
    if (!params.BankID) {
      logger.error(
        'Initiate BD Payment:::Invalid Bank ID for the respective payment mode',
      );
      callback(errorutils.errorlist.invalid_params);
      return;
    }
  }

  const initiateBDPaymentURL = `${constants.initiateBDPayment.replace(
    '{{storeId}}',
    headers.storeId,
  )}`;
  const reqHeaders = headerutil.getWCSHeaders(headers);
  const initiateBDPaymentBody = {
    orderId: params.orderId,
    email: params.email,
    payMethodId: params.payMethodId,
    amount: params.amount,
    mobile: params.mobile,
    callbackUrl: params.callbackUrl,
    BankID: params.BankID,
    paymentMode: params.paymentMode,
    billing_address_id: params.billing_address_id,
  };
  logger.info('Calling Initiate BD Payment WCS API');
  origin.getResponse(
    'POST',
    initiateBDPaymentURL,
    reqHeaders,
    null,
    initiateBDPaymentBody,
    null,
    '',
    response => {
      if (response.status === 200) {
        logger.info('Call to Initiate BD Payment API successful');
        callback(null, response.body);
      } else {
        logger.error('Call to Initiate BD Payment API failed');
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};

/* Verify Payment Checksum */
module.exports.verifyChecksum = function verifyChecksum(
  headers,
  reqBody,
  callback,
) {
  logger.info('Entering Verify Checksum');
  if (!reqBody.msg) {
    logger.error('Verify Payment:::Invalid Params');
    callback(errorutils.errorlist.invalid_params);
    return;
  }
  const verifyBDPaymentURL = `${constants.verifyBDPayment.replace(
    '{{storeId}}',
    headers.storeId,
  )}`;

  const verifyBDPaymentBody = {
    customInfo: reqBody.msg,
  };

  logger.info('Calling Update PI & Verify CheckSum WCS API');
  origin.getResponse(
    'POST',
    verifyBDPaymentURL,
    null,
    null,
    verifyBDPaymentBody,
    null,
    '',
    response => {
      if (response.status === 200) {
        logger.info('Call to Update PI & Verify CheckSum API successful');
        const resBody = {
          paymentStatus: '',
        };
        logger.info(
          'Payment status received from WCS is ',
          response.body.response.paymentStatus,
        );
        if (response.body.response.paymentStatus === 'success') {
          resBody.paymentStatus = response.body.response.paymentStatus;
          resBody.orderID = response.body.orderId;
          callback(null, resBody);
        } else {
          resBody.paymentStatus = response.body.response.paymentStatus;
          callback(null, resBody);
        }
      } else {
        logger.error('Call to Update PI & Verify CheckSum API failed');
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};

/* Checkout API */
module.exports.confirmCheckout = function confirmCheckout(
  params,
  headers,
  callback,
) {
  const orderIdObj = {
    orderId: params.orderId,
  };
  const resBody = {};
  checkout.checkout(headers, orderIdObj, (err, result) => {
    if (err) {
      resBody.orderPlaced = false;
      resBody.checkoutError = err;
      callback(null, resBody);
      return;
    }
    resBody.orderPlaced = true;
    callback(null, resBody);
  });
};
