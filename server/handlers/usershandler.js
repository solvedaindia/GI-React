const constants = require('../utils/constants');
const logger = require('../utils/logger.js');
const origin = require('../utils/origin.js');
const tokenGenerator = require('../utils/tokenvalidation.js');
const headerutil = require('../utils/headerutil.js');
const errorutils = require('../utils/errorutils.js');
const profileFilter = require('../filters/profilefilter');

/**
 * Registeres User in WCS
 * @param storeId,access_token
 * @return 200,OK with encrypted tokens as access_token
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.registerUser = function userRegister(params, headers, callback) {
  logger.debug('User Registration API');
  if (!params.name || !params.user_id || !params.password) {
    logger.debug('User Registration:Invalid Params');
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  const reqHeader = headerutil.getWCSHeaders(headers);

  let firstname = '';
  let lastname = '';
  if (params.name.indexOf(' ') > 0) {
    firstname = params.name.substr(0, params.name.indexOf(' '));
    lastname = params.name.substring(params.name.indexOf(' ') + 1).trim();
  } else {
    firstname = params.name;
  }
  const reqBody = {
    firstName: firstname,
    logonId: params.user_id,
    logonPassword: params.password,
    logonPasswordVerify: params.password,
    x_otp: params.otp || '',
    zipCode: params.pincode || '122001',
  };
  /*   if (params.otp) {
    reqBody.x_otp = params.otp;
  }
 */
  if (lastname !== '') {
    reqBody.lastName = lastname;
  }
  const originUserUrl = constants.userRegistration.replace(
    '{{storeId}}',
    headers.storeId,
  );

  origin.getResponse(
    'POST',
    originUserUrl,
    reqHeader,
    null,
    reqBody,
    null,
    '',
    response => {
      if (response.status === 201) {
        const accessToken = tokenGenerator.encodeToken(response.body);
        const signupResponseBody = {
          access_token: accessToken,
          userDetails: {
            firstName: reqBody.firstName,
            lastName: reqBody.lastName,
            pincode: reqBody.zipCode,
          },
        };
        callback(null, signupResponseBody);
      } else {
        logger.error(
          `signup error ${JSON.stringify(response.body)}`,
          'Error',
          null,
        );
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};

/**
 * Change user password
 * @param current_password
 * @param new_password
 * @returns
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.changeUserPassword = function changeUserPassword(
  params,
  headers,
  callback,
) {
  logger.debug('Call to change password api');
  if (!params.current_password || !params.new_password) {
    logger.debug('Change User Password : invalid params');
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  const reqHeader = headerutil.getWCSHeaders(headers);

  const reqBody = {
    logonPassword: params.new_password,
    logonPasswordVerify: params.new_password,
    userField1: params.current_password,
  };

  const originUserURL = constants.changePassword.replace(
    '{{storeId}}',
    headers.store_id,
  );
  origin.getResponse(
    'PUT',
    originUserURL,
    reqHeader,
    null,
    reqBody,
    null,
    '',
    response => {
      if (response) {
        if (response.status === 200) {
          callback(null, { message: 'Password Changed Successfully' });
        } else {
          callback(errorutils.handleWCSError(response));
        }
      } else {
        logger.debug('error in userdetails while change password');
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};

/**
 * Get user details
 */
module.exports.getUserDetails = function getUserDetails(headers, callback) {
  logger.debug('Call to get userDetails api');
  const originUserDetailURL = constants.userDetails
    .replace('{{storeId}}', headers.storeId)
    .replace('{{userId}}', headers.userId);
  const reqHeader = headerutil.getWCSHeaders(headers);
  origin.getResponse(
    'GET',
    originUserDetailURL,
    reqHeader,
    null,
    null,
    null,
    '',
    response => {
      if (response.status === 200) {
        if (headers.profile === 'summary') {
          callback(null, profileFilter.userInfoSummary(response.body));
          return;
        }
        callback(null, profileFilter.userInfoDetails(response.body));
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};

/**
 * This function will return user address
 */
module.exports.getUserAddress = function getUserAddress(headers, callback) {
  logger.debug('Call to get user contact api');

  const origindetailURL = constants.userContact.replace(
    '{{storeId}}',
    headers.storeId,
  );
  const reqHeader = headerutil.getWCSHeaders(headers);
  origin.getResponse(
    'GET',
    origindetailURL,
    reqHeader,
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

module.exports.getNotifications = function getNotifications(headers, callback) {
  logger.debug('Call to get user contact api');
  callback(null, { message: 'WCS Integration Pending to get Notifictaions' });
};

module.exports.getGiftCards = function getGiftCards(headers, callback) {
  logger.debug('Call to get user contact api');
  callback(null, {
    message: 'WCS Integration Pending to get GiftCard Details',
  });
};

module.exports.getGodrejCredit = function getGodrejCredit(headers, callback) {
  logger.debug('Call to get user contact api');
  callback(null, {
    message: 'WCS Integration Pending to get Godrej Credit Details',
  });
};

/**
 * Forgot Password API
 * @param user_id
 * @param otp
 * @param new_password
 * @returns
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.forgotPassword = function forgotPassword(
  params,
  headers,
  callback,
) {
  logger.debug('Call to Forgot Password API');

  if (!params.user_id || !params.otp || !params.new_password) {
    logger.debug('invalid params in Forgot Password');
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  const originUserUrl = constants.forgotPassword.replace(
    '{{storeId}}',
    headers.store_id,
  );
  const reqHeaders = headerutil.getWCSHeaders(headers);

  // `${params.user_id}_IBM_${params.otp}`
  const forgotPasswordBody = {
    logonId: params.user_id,
    resetPassword: 'true',
    challengeAnswer: '-',
    state: 'passwdconfirm',
    xcred_validationCode: params.otp,
    logonPassword: params.new_password,
    xcred_logonPasswordVerify: params.new_password,
  };

  origin.getResponse(
    'PUT',
    originUserUrl,
    reqHeaders,
    null,
    forgotPasswordBody,
    null,
    '',
    response => {
      if (response) {
        if (response.status === 200) {
          callback(null, response.body);
        } else {
          logger.debug('error in forgot password API');
          callback(errorutils.handleWCSError(response));
        }
      } else {
        callback(errorutils.wcsErrorList.wcs_invalid_response);
      }
    },
  );
};
