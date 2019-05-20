const origin = require('./origin');
const constants = require('./constants');
const headerutil = require('./headerutil');
const originMethod = 'GET';
const errorUtils = require('./errorutils');
const logger = require('./logger.js');

/**
 *  Get User Pincode
 */
module.exports.getPincode = getPincode;
function getPincode(headers, userID, callback) {
  if (!userID) {
    logger.debug('Get User Pincode :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const originUrl = constants.getPincode
    .replace('{{storeId}}', headers.storeId)
    .replace('{{userID}}', userID);

  origin.getResponse(
    originMethod,
    originUrl,
    null,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        const pincodeRes = {
          pincode: response.body.zipCode || '',
        };
        callback(null, pincodeRes);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}

module.exports.getCityAndState = function getStateAndCity(
  pinCode,
  headers,
  callback,
) {
  if (!pinCode) {
    logger.debug('GET City&State :: Invalid Params');
    callback(errorUtils.errorlist.invalid_params);
  }

  const originUrl = constants.getCityAndState
    .replace('{{storeId}}', headers.storeId)
    .replace('{{pincode}}', pinCode);

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
