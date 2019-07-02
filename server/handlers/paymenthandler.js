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
  )}?orderId=${query.orderId}&email=${query.email}&payMethodId=${query.payMethodId}&amount=${query.amount}&mobile=${query.mobile}&callbackUrl=${query.callbackUrl}&BankID=${query.BankID}&paymentMode=${query.paymentMode}`;

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
        const resBody = {
          paymentStatus: '',
          orderPlaced: '',
        };
        if (response.body.response.paymentStatus === 'success') {
          const orderIdObj = {
            orderId: response.body.orderId,
          };
          checkout.checkout(headers, orderIdObj, (err, result) => {
            if (err) {
              resBody.paymentStatus = response.body.response.paymentStatus;
              resBody.orderPlaced = false;
              resBody.checkoutError = err;
              callback(null, resBody);
              return;
            }
            resBody.paymentStatus = response.body.response.paymentStatus;
            resBody.orderPlaced = true;
            resBody.orderID = result.orderID;
            callback(null, resBody);
          });
        } else {
          resBody.paymentStatus = response.body.response.paymentStatus;
          resBody.orderPlaced = false;
          callback(null, resBody);
        }
        // callback(null, response);
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};
