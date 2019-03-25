const constants = require('../utils/constants');
const logger = require('../utils/logger.js');
const origin = require('../utils/origin.js');
const tokenGenerator = require('../utils/tokenvalidation.js');
const headerutil = require('../utils/headerutil.js');
const errorutils = require('../utils/errorutils.js');

/**
 * Get Guest Token from WCS
 * @param storeId
 * @return 200,OK with encrypted tokens as access_token
 * @throws contexterror,badreqerror if storeid is invalid
 */
module.exports.guestLogin = function guestLogin(headers, callback) {
  const guestLoginUrl = `${constants.login.replace(
    '{{storeId}}',
    headers.storeId,
  )}/guestidentity`;

  const guestLoginHeaders = {
    'cache-control': 'no-cache',
    'content-type': 'application/json',
  };
  origin.getResponse(
    'POST',
    guestLoginUrl,
    guestLoginHeaders,
    null,
    null,
    null,
    '',
    response => {
      if (response.status === 201) {
        const encryptedAccessToken = tokenGenerator.encodeToken(response.body);
        const guestLoginResponse = {
          access_token: encryptedAccessToken,
        };
        callback(null, guestLoginResponse);
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};

/**
 * Get Registered User Tokens from WCS
 * @param storeId,access_token
 * @return 200,OK with encrypted tokens as access_token
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.userLogin = function userLogin(params, headers, callback) {
  logger.debug('Call to get login api');
  if (!params.user_id || !params.password) {
    logger.debug('Registered User Login:::Invalid Params');
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  const reqHeaders = headerutil.getWCSHeaders(headers);

  const loginBody = {
    logonId: params.user_id,
    logonPassword: params.password,
  };

  const originLoginURL = `${constants.login.replace(
    '{{storeId}}',
    headers.storeId,
  )}/loginidentity`;

  origin.getResponse(
    'POST',
    originLoginURL,
    reqHeaders,
    null,
    loginBody,
    null,
    '',
    response => {
      if (response.status === 201) {
        const encryptedAccessToken = tokenGenerator.encodeToken(response.body);
        const loginResponseBody = {
          access_token: encryptedAccessToken,
        };
        callback(null, loginResponseBody);
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};

/**
 * Social Login
 * @param store_id, access_token, params
 * @returns
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.socialLogin = function sociallogin(params, headers, callback) {
  logger.debug('Call to get social login api');
  if (
    !params.first_name ||
    !params.last_name ||
    !params.authorization_provider ||
    !params.user_id ||
    !params.social_token ||
    !params.email_id
  ) {
    logger.debug('social login :: invalid params');
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  const loginHeaders = {
    'cache-control': 'no-cache',
    'content-type': 'application/json',
  };

  const socialLoginBody = {
    lastName: params.last_name,
    firstName: params.first_name,
    nickName: params.first_name,
    authorizationProvider: params.authorization_provider,
    id: params.email_id,
    accessToken: params.social_token,
    email: params.email_id,
  };

  const originLoginURL = constants.sociallogin.replace(
    '{{storeId}}',
    headers.store_id,
  );
  origin.getResponse(
    'POST',
    originLoginURL,
    loginHeaders,
    null,
    socialLoginBody,
    null,
    '',
    response => {
      if (response) {
        if (response.status === 201) {
          const encryptedAccessToken = tokenGenerator.encodeToken(
            response.body,
          );
          const loginResponseBody = {
            access_token: encryptedAccessToken,
          };
          callback(null, loginResponseBody);
        } else {
          callback(errorutils.handleWCSError(response));
        }
      } else {
        logger.debug('error in Social Login');
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};
