const constants = require('../utils/constants');
const logger = require('../utils/logger.js');
const origin = require('../utils/origin.js');
const tokenGenerator = require('../utils/tokenvalidation.js');
const headerutil = require('../utils/headerutil.js');
const errorutils = require('../utils/errorutils.js');
const profileFilter = require('../filters/profilefilter');
const pincodeUtil = require('../utils/pincodeutil');

const defaultPincode = '122001';
const passwordChangeMessage = 'Password Changed Successfully';

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
    zipCode: params.pincode || defaultPincode,
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
    userField2: params.current_password,
  };

  const originUserURL = constants.updateProfile.replace(
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
      if (response.status === 200) {
        callback(null, { message: passwordChangeMessage });
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
 * Update User Details
 */
module.exports.updateUserDetails = function updateUserDetails(
  params,
  headers,
  callback,
) {
  logger.debug('Call to Update User Details');

  const reqHeader = headerutil.getWCSHeaders(headers);
  let firstname = '';
  let lastname = '';
  const reqBody = {};

  if (params.name) {
    if (params.name.indexOf(' ') > 0) {
      firstname = params.name.substr(0, params.name.indexOf(' '));
      lastname = params.name.substring(params.name.indexOf(' ') + 1).trim();
    } else {
      firstname = params.name;
    }
    reqBody.firstName = firstname;
    reqBody.lastName = lastname;
  }

  if (params.field1) {
    reqBody.userField1 = params.field1;
  }
  if (params.logonid) {
    reqBody.logonId = params.logonid;
  }

  const originUrl = constants.updateProfile.replace(
    '{{storeId}}',
    headers.store_id,
  );
  origin.getResponse(
    'PUT',
    originUrl,
    reqHeader,
    null,
    reqBody,
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
        const resJson = {
          addressList: [],
        };
        if (response.body.contact && response.body.contact.length > 0) {
          response.body.contact.forEach(addressElement => {
            resJson.addressList.push(profileFilter.userAddress(addressElement));
          });
        }
        callback(null, resJson);
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};

/**
 * This function will Delete User Address by Nick Name
 */
module.exports.deleteAddress = function deleteUserAddress(req, callback) {
  logger.debug('Call to Delete User Address API');

  if (!req.params.nickname) {
    callback(errorutils.errorlist.invalid_params);
    return;
  }
  const nickName = req.params.nickname;

  const origindetailURL = `${constants.userContact.replace(
    '{{storeId}}',
    req.headers.storeId,
  )}/${nickName}`;

  const reqHeader = headerutil.getWCSHeaders(req.headers);
  origin.getResponse(
    'DELETE',
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

/**
 * This function will Create User Address
 */
module.exports.createAddress = function createAddress(headers, body, callback) {
  logger.debug('Call to Create User Address');

  if (
    !body.name ||
    !body.pincode ||
    !body.phone_number ||
    !body.address ||
    !body.city ||
    !body.state ||
    !body.default
  ) {
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  const reqParams = body;

  const origindetailURL = `${constants.userContact.replace(
    '{{storeId}}',
    headers.storeId,
  )}`;

  let firstname = '';
  let lastname = '';
  if (reqParams.name.indexOf(' ') > 0) {
    firstname = reqParams.name.substr(0, reqParams.name.indexOf(' '));
    lastname = reqParams.name.substring(reqParams.name.indexOf(' ') + 1).trim();
  } else {
    firstname = reqParams.name;
  }
  const addressNickName = `${headers.userId}_${Date.now()}`;
  const reqBody = {
    contact: [
      {
        firstName: firstname,
        lastName: lastname,
        zipCode: reqParams.pincode,
        phone1: reqParams.phone_number,
        email1: reqParams.email_id,
        addressLine: [],
        city: reqParams.city,
        state: reqParams.state,
        primary: 'false',
        nickName: addressNickName,
      },
    ],
    userId: headers.userId,
  };
  if (reqParams.default === 'true') {
    reqBody.contact[0].primary = 'true';
  }
  reqBody.contact[0].addressLine.push(reqParams.address);
  const reqHeader = headerutil.getWCSHeaders(headers);

  origin.getResponse(
    'POST',
    origindetailURL,
    reqHeader,
    null,
    reqBody,
    null,
    '',
    response => {
      if (response.status === 200 || response.status === 201) {
        const resJson = {
          addressID: response.body.addressId,
          nickName: addressNickName,
        };
        if (body.default && body.pincode && body.default === 'true') {
          pincodeUtil.setDefaultPincode(headers, body.pincode, (err, res) => {
            if (err) {
              resJson.defaultPincodeUpdated = false;
            } else {
              resJson.defaultPincodeUpdated = true;
            }
            callback(null, resJson);
          });
        } else {
          callback(null, resJson);
        }
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};

/**
 * This function will Update User Address using Nick Name
 */
module.exports.updateAddress = function updateAddress(req, callback) {
  logger.debug('Call to Update User Address');

  if (!req.params.nickname) {
    callback(errorutils.errorlist.invalid_params);
    return;
  }
  const reqParams = req.body;
  if (
    !reqParams.name ||
    !reqParams.pincode ||
    !reqParams.phone_number ||
    !reqParams.address ||
    !reqParams.city ||
    !reqParams.state ||
    !reqParams.default
  ) {
    callback(errorutils.errorlist.invalid_params);
    return;
  }
  const addressNickName = req.params.nickname;

  const origindetailURL = `${constants.userContact.replace(
    '{{storeId}}',
    req.headers.storeId,
  )}/${addressNickName}`;

  const reqBody = {
    zipCode: reqParams.pincode,
    phone1: reqParams.phone_number,
    email1: reqParams.email_id || '',
    city: reqParams.city,
    state: reqParams.state,
    primary: reqParams.default,
  };

  if (reqParams.address) {
    reqBody.addressLine = [];
    reqBody.addressLine.push(reqParams.address);
  }
  if (reqParams.name) {
    let firstname = '';
    let lastname = '';
    if (reqParams.name.indexOf(' ') > 0) {
      firstname = reqParams.name.substr(0, reqParams.name.indexOf(' '));
      lastname = reqParams.name
        .substring(reqParams.name.indexOf(' ') + 1)
        .trim();
    } else {
      firstname = reqParams.name;
    }
    reqBody.firstName = firstname;
    reqBody.lastName = lastname;
  }

  const reqHeader = headerutil.getWCSHeaders(req.headers);

  origin.getResponse(
    'PUT',
    origindetailURL,
    reqHeader,
    null,
    reqBody,
    null,
    '',
    response => {
      if (response.status === 200 || response.status === 201) {
        const resJson = {
          addressID: response.body.addressId,
          nickName: addressNickName,
        };
        if (
          reqParams.default &&
          reqParams.pincode &&
          reqParams.default === 'true'
        ) {
          pincodeUtil.setDefaultPincode(
            req.headers,
            reqParams.pincode,
            (err, res) => {
              if (err) {
                resJson.defaultPincodeUpdated = false;
              } else {
                resJson.defaultPincodeUpdated = true;
              }
              callback(null, resJson);
            },
          );
        } else {
          callback(null, resJson);
        }
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

/**
 * Set Password (Social Login) API
 * @param
 * @param
 * @returns
 * @throws
 */
module.exports.setSocialPassword = function setPasswordForSocialLogin(
  params,
  headers,
  callback,
) {
  logger.debug('call to set password (Social Login) API');

  if (!params.new_password) {
    logger.debug('invalid params in set password API');
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  const reqHeaders = headerutil.getWCSHeaders(headers);
  const reqBody = {
    logonPassword: params.new_password,
    logonPasswordVerify: params.new_password,
    userField1: headers.userId,
    sociallogin: 'true',
  };

  const originUrl = constants.setSocialLoginPassword.replace(
    '{{storeId}}',
    headers.store_id,
  );

  origin.getResponse(
    'PUT',
    originUrl,
    reqHeaders,
    null,
    reqBody,
    null,
    '',
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        logger.debug('set password (Social Login) API');
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};
