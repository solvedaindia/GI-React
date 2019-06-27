const constants = require('../utils/constants');
const headerutil = require('../utils/headerutil.js');
const errorutils = require('../utils/errorutils.js');
const origin = require('../utils/origin.js');
const checkout = require('../handlers/carthandler');

module.exports.initiateBDPayment = function initiateBDPayment(
  query,
  headers,
  callback,
) {
  const reqHeaders = headerutil.getWCSHeaders(headers);

  const initiateBDPaymentURL = `${constants.initiateBDPayment.replace(
    '{{storeId}}',
    headers.storeId,
  )}?orderId=${query.orderId}&email=${query.email}&payMethodId=${query.payMethodId}&amount=${query.amount}&mobile=${query.mobile}&callbackUrl=${query.callbackUrl}&BankID=${query.BankID}`;

  origin.getResponse(
    'GET',
    initiateBDPaymentURL,
    reqHeaders,
    null,
    null,
    null,
    '',
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};

module.exports.verifyBDPayment = function verifyBDPayment(
  params,
  headers,
  callback,
) {
  const reqHeaders = headerutil.getWCSHeaders(headers);

  const verifyBDPaymentURL = `${constants.verifyBDPayment.replace(
    '{{storeId}}',
    headers.storeId,
  )}`;

  const verifyBDPaymentBody = {
    orderId: params.orderId,
    email: params.email,
    payMethodId: params.payMethodId,
    amount: params.amount,
    customInfo: params.customInfo,
  };

  origin.getResponse(
    'POST',
    verifyBDPaymentURL,
    reqHeaders,
    null,
    verifyBDPaymentBody,
    null,
    '',
    response => {
      if (response.status === 200) {
        if (response.body.response.paymentStatus === 'success') {

        }
        callback(null, response.body.response);
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};
