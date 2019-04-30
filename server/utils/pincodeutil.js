const origin = require('./origin');
const constants = require('./constants');
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
