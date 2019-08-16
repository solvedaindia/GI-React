const constants = require('../utils/constants');
const logger = require('../utils/logger.js');
const origin = require('../utils/origin.js');
const origin2 = require('../utils/origin2.js');
const tokenGenerator = require('../utils/tokenvalidation.js');
const headerutil = require('../utils/headerutil.js');
const errorutils = require('../utils/errorutils.js');
const userHandler = require('./usershandler');

/**
 * Get Guest Token from WCS
 * @param storeId
 * @return 200,OK with encrypted tokens as access_token
 * @throws contexterror,badreqerror if storeid is invalid
 */
/* module.exports.guestLogin = guestLogin;
async function guestLogin(headers, callback) {
  const guestLoginUrl = `${constants.login.replace(
    '{{storeId}}',
    headers.storeId,
  )}/guestidentity`;

  const guestLoginHeaders = {
    'cache-control': 'no-cache',
    'content-type': 'application/json',
  };
  try {
    const response = await origin2.getResponse(
      'POST',
      guestLoginUrl,
      guestLoginHeaders,
      null,
    );
    const encryptedAccessToken = tokenGenerator.encodeToken(response.body);
    const guestLoginResponse = {
      access_token: encryptedAccessToken,
    };
    callback(null, guestLoginResponse);
  } catch (error) {
    callback(errorutils.handleWCSError(error));
  }
}
 */

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
module.exports.userLogin = userLogin;
async function userLogin(params, headers, callback) {
  logger.debug('Call to get login api');
  if (!params.user_id || !params.password) {
    logger.debug('Registered User Login:::Invalid Params');
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  const reqHeaders = headerutil.getWCSHeaders(headers)

  const loginBody = {
    logonId: params.user_id,
    logonPassword: params.password,
  };

  const originLoginURL = `${constants.login.replace(
    '{{storeId}}',
    headers.storeId,
  )}/loginidentity`;

  try {
    const response = await origin2.getResponse(
      'POST',
      originLoginURL,
      reqHeaders,
      loginBody,
    );
    const encryptedAccessToken = tokenGenerator.encodeToken(response.body);
    const loginResponseBody = {
      access_token: encryptedAccessToken,
    };
    const userDetailHeader = headers;
    userDetailHeader.WCToken = response.body.WCToken;
    userDetailHeader.WCTrustedToken = response.body.WCTrustedToken;
    try {
      const userDetails = await userHandler.getUserDetails(userDetailHeader);
      loginResponseBody.userDetails = {};
      loginResponseBody.userDetails.name = userDetails.name;
      loginResponseBody.userDetails.pincode = userDetails.pincode;
      callback(null, loginResponseBody);
    } catch (err) {
      callback(null, loginResponseBody);
    }
  } catch (error) {
    callback(errorutils.handleWCSError(error));
  }
}

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

  const loginHeaders = headerutil.getWCSHeaders(headers);

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
    headers.storeId,
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
