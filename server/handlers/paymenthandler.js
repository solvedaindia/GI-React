const constants = require('../utils/constants');
const headerutil = require('../utils/headerutil.js');
const errorutils = require('../utils/errorutils.js');
const origin = require('../utils/origin.js');

module.exports.createChecksum = function createChecksum(
  query,
  headers,
  callback,
) {
  const reqHeaders = headerutil.getWCSHeaders(headers);

  const createChecksumURL = `${constants.checksum.replace(
    '{{storeId}}',
    headers.storeId,
  )}?orderId=${query.orderId}&email=${query.email}&payMethodId=${query.payMethodId}&amount=${query.amount}&mobile=${query.mobile}&callbackUrl=${query.callbackUrl}`;

  origin.getResponse(
    'GET',
    createChecksumURL,
    reqHeaders,
    null,
    null,
    null,
    '',
    response => {
      if (response.status === 200) {
        callback(null, response);
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};

module.exports.verifyChecksum = function verifyChecksum(
  params,
  headers,
  callback,
) {
  const reqHeaders = headerutil.getWCSHeaders(headers);

  const verifyChecksumURL = `${constants.checksum.replace(
    '{{storeId}}',
    headers.storeId,
  )}`;

  const verifyChecksumBody = {
    orderId: params.orderid,
    email: params.email,
    paymethodId: params.paymethodid,
    amount: params.amount,
    customInfo: params.custominfo,
  };

  origin.getResponse(
    'POST',
    verifyChecksumURL,
    reqHeaders,
    null,
    verifyChecksumBody,
    null,
    '',
    response => {
      if (response.status === 200) {
        callback(null, response);
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};
