const constants = require('../utils/constants');
const headerutil = require('../utils/headerutil.js');
const errorutils = require('../utils/errorutils.js');
const logger = require('../utils/logger.js');
const origin = require('../utils/origin.js');

/**
 * call to logout API
 * @param headers : wctoken and wctrustedtoken
 * @returns : return success if logout successful
 * @throws : notoken or tokenexpired in case of wctokens expired or missing
 */
module.exports.logout = function logout(headers, callback) {
  logger.debug('Call to logout API');
  const reqHeaders = headerutil.getWCSHeaders(headers);

  const originLoginURL = `${constants.login.replace(
    '{{storeId}}',
    headers.storeId,
  )}/loginidentity/@self`;
  origin.getResponse(
    'DELETE',
    originLoginURL,
    reqHeaders,
    null,
    null,
    null,
    '',
    response => {
      if (response) {
        if (response.status === 200) {
          callback(null, { message: 'Logout Successful' });
        } else {
          callback(errorutils.handleWCSError(response));
        }
      } else {
        logger.error('Error while calling logout API', response.status);
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};
