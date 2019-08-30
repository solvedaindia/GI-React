const constants = require('../utils/constants');
const logger = require('../utils/logger.js');
const origin = require('../utils/origin.js');
const origin2 = require('../utils/origin2.js');
const tokenGenerator = require('../utils/tokenvalidation.js');
const headerutil = require('../utils/headerutil.js');
const errorutils = require('../utils/errorutils.js');
const profileFilter = require('../filters/profilefilter');
const pincodeUtil = require('../utils/pincodeutil');
const otpHandler = require('./otphandler');

const defaultPincode = '122001';
const passwordChangeMessage = 'Password Changed Successfully';
const socialPasswordMessage = 'Password Successfully Reset';
const regexMobileNo = /^\d{10}$/; // Mobile Number
/**
 * Registeres User in WCS
 * @param storeId,access_token
 * @return 200,OK with encrypted tokens as access_token
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.registerUser = userRegistration;
async function userRegistration(params, headers, callback) {
  logger.debug('User Registration API');
  if (!params.name || !params.user_id || !params.password || !params.pincode) {
    logger.debug('User Registration:Invalid Params');
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  const reqHeader = headerutil.getWCSHeaders(headers);

  const reqBody = {
    firstName: params.name,
    logonId: params.user_id,
    logonPassword: params.password,
    logonPasswordVerify: params.password,
    x_otp: params.otp || '',
    zipCode: params.pincode || defaultPincode,
  };
  const originUserUrl = constants.userRegistration.replace(
    '{{storeId}}',
    headers.storeId,
  );

  try {
    const response = await origin2.getResponse(
      'POST',
      originUserUrl,
      reqHeader,
      reqBody,
    );
    const accessToken = tokenGenerator.encodeToken(response.body);
    const signupResponseBody = {
      access_token: accessToken,
      userDetails: {
        name: reqBody.firstName,
        pincode: reqBody.zipCode,
      },
    };
    callback(null, signupResponseBody);
  } catch (error) {
    logger.debug('Error is Signup');
    if (error.body.errors && error.body.errors.length > 0) {
      if (
        error.body.errors[0].errorKey === '_ERR_LOGONID_ALREDY_EXIST' ||
        error.body.errors[0].errorKey === 'ERROR_LOGONID_ALREADY_EXIST'
      ) {
        if (regexMobileNo.test(params.user_id)) {
          callback(errorutils.errorlist.user_exists_mobile);
        } else {
          callback(errorutils.errorlist.user_exists_email);
        }
      } else {
        callback(errorutils.handleWCSError(error));
      }
    }
  }
}

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
    headers.storeId,
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
        callback(null, {
          message: passwordChangeMessage,
        });
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
module.exports.getUserDetails = getUserDetails;

function getUserDetails(headers) {
  return new Promise((resolve, reject) => {
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
          resolve(profileFilter.userInfoDetails(response.body));
        } else {
          reject(errorutils.handleWCSError(response));
        }
      },
    );
  });
}

/**
 * Update User Details
 */
module.exports.updateUserDetails = function updateUserDetails(
  params,
  headers,
  callback,
) {
  if (
    !params.validateotp ||
    (params.validateotp !== 'false' && params.validateotp !== 'true')
  ) {
    callback(errorutils.errorlist.invalid_params);
    return;
  }
  logger.debug('Call to Update User Details');

  const reqBody = {};

  if (params.name) {
    reqBody.firstName = params.name;
  }

  if (params.field1 || params.field1 === '') {
    reqBody.userField1 = params.field1;
  }
  if (params.logonid) {
    reqBody.logonId = params.logonid;
  }

  if (params.validateotp === 'false') {
    updateProfile(reqBody, headers, callback);
  } else {
    if (!params.otp) {
      callback(errorutils.errorlist.invalid_params);
      return;
    }
    const validateOtpBody = {
      user_id: '',
      otp: params.otp,
    };

    if (regexMobileNo.test(params.logonid)) {
      validateOtpBody.user_id = params.logonid;
    } else if (regexMobileNo.test(params.field1)) {
      validateOtpBody.user_id = params.field1;
    } else {
      callback(errorutils.errorlist.invalid_params);
      return;
    }
    otpHandler.validateOtp(validateOtpBody, headers, (error, result) => {
      if (error) {
        callback(error);
        return;
      }
      updateProfile(reqBody, headers, callback);
    });
  }
};

function updateProfile(reqBody, headers, callback) {
  const reqHeader = headerutil.getWCSHeaders(headers);
  const originUrl = constants.updateProfile.replace(
    '{{storeId}}',
    headers.storeId,
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
}

/**
 * Validate User Details
 */
module.exports.validateUserDetails = function validateUserDetails(
  params,
  headers,
  callback,
) {
  if (!params.field1 && !params.logonid) {
    callback(errorutils.errorlist.invalid_params);
    return;
  }
  logger.debug('Call to Update User Details');

  const reqHeader = headerutil.getWCSHeaders(headers);
  const reqBody = {};

  if (params.field1) {
    reqBody.userField1 = params.field1;
  }
  if (params.logonid) {
    reqBody.logonId = params.logonid;
  }

  const originUrl = constants.validateProfile.replace(
    '{{storeId}}',
    headers.storeId,
  );
  origin.getResponse(
    'POST',
    originUrl,
    reqHeader,
    null,
    reqBody,
    null,
    '',
    response => {
      if (response.status === 200) {
        const otpBody = {
          user_id: '',
        };
        let otpGenration = false;
        if (regexMobileNo.test(params.logonid)) {
          otpBody.user_id = params.logonid;
          otpGenration = true;
        } else if (regexMobileNo.test(params.field1)) {
          otpBody.user_id = params.field1;
          otpGenration = true;
        }
        if (otpGenration === true) {
          otpHandler.generateOtp(otpBody, headers, (error, result) => {
            if (error) {
              callback(error);
              return;
            }
            const res = {
              message: 'Validation Successful',
              optSent: true,
            };
            callback(null, res);
          });
        } else {
          const res = {
            message: 'Validation Successful',
            optSent: false,
          };
          callback(null, res);
        }
      } else if (response.body.errors && response.body.errors.length > 0) {
        if (response.body.errors[0].errorKey === 'ERROR_USER_EXISTS') {
          if (response.body.errors[0].errorParameters.length === 1) {
            if (response.body.errors[0].errorParameters[0] === 'logonId') {
              if (regexMobileNo.test(params.logonid)) {
                callback(errorutils.errorlist.mobile_exists);
              } else {
                callback(errorutils.errorlist.email_exists);
              }
            } else if (
              response.body.errors[0].errorParameters[0] === 'userField1'
            ) {
              if (regexMobileNo.test(params.field1)) {
                callback(errorutils.errorlist.mobile_exists);
              } else {
                callback(errorutils.errorlist.email_exists);
              }
            }
          } else if (response.body.errors[0].errorParameters.length === 2) {
            callback(errorutils.errorlist.email_mobile_exists);
          }
        }
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
        const addressList = response.body.contact;
        if (addressList && addressList.length > 0) {
          addressList.forEach((addressElement, i) => {
            const filteredAddress = profileFilter.userAddress(addressElement);
            if (filteredAddress.isDefault === true) {
              resJson.addressList.push(filteredAddress);
              addressList.splice(i, 1);
            }
          });
          addressList.sort(
            (a, b) =>
              parseInt(b.nickName.split('_')[1], 10) -
              parseInt(a.nickName.split('_')[1], 10),
          );
          addressList.forEach(addressElement => {
            const filteredAddress = profileFilter.userAddress(addressElement);
            resJson.addressList.push(filteredAddress);
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
  const addressNickName = `${headers.userId}_${Date.now()}`;
  const reqBody = {
    contact: [
      {
        firstName: reqParams.name,
        zipCode: reqParams.pincode,
        phone1: reqParams.phone_number,
        email1: reqParams.email_id,
        addressLine: [],
        city: reqParams.city,
        state: reqParams.state,
        primary: 'false',
        nickName: addressNickName,
        country: 'IN',
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
    country: 'IN',
    primary: reqParams.default,
  };

  if (reqParams.address) {
    reqBody.addressLine = [];
    reqBody.addressLine.push(reqParams.address);
  }
  if (reqParams.name) {
    reqBody.firstName = reqParams.name;
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
    headers.storeId,
  );
  const reqHeaders = headerutil.getWCSHeaders(headers);

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
    userField1: null,
    sociallogin: 'true',
  };

  const originUrl = constants.updateProfile.replace(
    '{{storeId}}',
    headers.storeId,
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
        callback(null, {
          message: socialPasswordMessage,
        });
      } else {
        logger.debug('set password (Social Login) API');
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};
