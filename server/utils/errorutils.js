const logger = require('./logger.js');

const errorlist = {
  invalid_params: {
    status_code: 400,
    error_key: 'invalid_params',
    // error_message: 'Some params might be missing or invalid.',
    error_message:
      'One or more entries made are incorrect or require field(s) have been left empty',
  },
  token_invalid: {
    status_code: 401,
    error_key: 'token_invalid',
    error_message: 'Access Token is Invalid.Please enter a valid Access Token.',
  },
  store_invalid: {
    status_code: 401,
    error_key: 'store_invalid',
    error_message:
      'Store Identifier is Invalid.Please enter a valid Store Identifier.',
  },
  token_expired: {
    status_code: 401,
    error_key: 'token_expired',
    error_message: 'Access Token expired',
  },
  token_missing: {
    status_code: 400,
    error_key: 'token_missing',
    error_message: 'Access Token Missing',
  },
  storeid_missing: {
    status_code: 400,
    error_key: 'storeid_missing',
    error_message: 'Store ID Missing',
  },
  resource_not_found: {
    status_code: 404,
    error_key: 'resource_not_found',
    error_message: 'Requested resource not found',
  },
  unauthorized: {
    status_code: 401,
    error_key: 'unauthorized',
    error_message: 'User is Not authenticated.',
  },
  wcs_invalid_response: {
    status_code: 502,
    error_key: 'wcs_invalid_response',
    error_message: 'Invalid Response From WCS.',
  },
  user_exists: {
    status_code: 400,
    error_key: 'user_exists',
    error_message:
      'EmailID/Mobile Number entered is already registered with us .Please use forgot password link to reset password',
  },
  invalid_password_format: {
    status_code: 400,
    error_key: 'invalid_password_format',
    error_message:
      'Invalid Password. Password should have min 6 characters and atleast 1 number',
  },
  otp_incorrect: {
    status_code: 400,
    error_key: 'otp_incorrect',
    error_message: 'OTP entered is Incorrect.',
  },
  otp_incorrect_limit_exceed: {
    status_code: 400,
    error_key: 'otp_incorrect_limit_exceed',
    error_message: 'You have exceeded the maximum number of attempts 3.',
  },
  same_userid_password: {
    status_code: 400,
    error_key: 'invalid_password_format',
    error_message: 'userid and password cannot be same',
  },
  userid_invalid_format: {
    status_code: 400,
    error_key: 'userid_invalid_format',
    error_message: 'Please enter valid Email Id/Mobile number.',
  },
  invalid_promocode: {
    status_code: 400,
    error_key: 'invalid_promocode',
    error_message: 'Promo Code is Invalid',
  },
  user_does_not_exists: {
    status_code: 400,
    error_key: 'user_does_not_exist',
    error_message:
      'This account does not exist. Enter a valid mobile number or email address to proceed or create a new GI account',
  },
  mobile_exists: {
    status_code: 400,
    error_key: 'mobile_exists',
    error_message: 'This Mobile Number already exists',
  },
  email_exists: {
    status_code: 400,
    error_key: 'email_exists',
    error_message: 'This Email Address already exists',
  },
  invalid_credentials: {
    status_code: 400,
    error_key: 'invalid_credentials',
    error_message: 'LogonId or Password is incorrect',
  },
  invalid_address: {
    status_code: 400,
    error_key: 'invalid_address',
    error_message:
      'The address you selected is not valid for the contracts in your current order.',
  },
  account_locked: {
    status_code: 400,
    error_key: 'account_locked',
    error_message:
      'Your Account is temporarily locked. Please try again after 15 minutes.',
  },
  email_mobile_exists: {
    status_code: 400,
    error_key: 'email_mobile_exists',
    error_message: [
      'This Email Address already exists',
      'This Mobile Number already exists',
    ],
  },
  order_not_found: {
    status_code: 400,
    error_key: 'order_not_found',
    error_message: 'An order with reference to this orderId does not exist',
  },
  ERROR_IN_EMAIL_SEND: {
    status_code: 400,
    error_key: 'ERROR_IN_EMAIL_SEND',
    error_message: 'Error in sending mail to recipient.',
  },
};
module.exports.errorlist = errorlist;

module.exports.handleWCSError = function handleWCSError(response) {
  const statusCode = response.status;
  const errBody = response.body;
  if (!statusCode) {
    logger.error(`No Error code specify from WCS${JSON.stringify(errBody)}`);
    return errorlist.wcs_invalid_response;
  }
  if (statusCode >= 400 && statusCode < 500) {
    if (statusCode === 400) {
      if (
        errBody.errors[0].errorKey === '_ERR_FINDER_EXCEPTION' ||
        errBody.errors[0].errorKey === '_ERR_ORDER_WRONG_STATUS' ||
        errBody.errors[0].errorKey === '_ERR_INVALID_INPUT' ||
        errBody.errors[0].errorKey === 'ERROR_RESEND_OTP_COUNT' ||
        errBody.errors[0].errorKey === 'ERROR_OTP_TIMEOUT' ||
        // errBody.errors[0].errorKey === 'ERROR_USER_DOES_NOT_EXIST' ||
        errBody.errors[0].errorKey === '_ERR_NUMBER_FORMAT_EXCEPTION' ||
        errBody.errors[0].errorKey === '_ERR_DELETE_REGISTER_ADDRESS' ||
        errBody.errors[0].errorKey === '_ERR_GENERIC' ||
        errBody.errors[0].errorKey === '_ERR_FORMAT_ORDERIDS_NOT_CORRECT' ||
        errBody.errors[0].errorKey === '_ERR_USER_AUTHORITY' ||
        // errBody.errors[0].errorKey === 'ERR_PROMOTION_CODE_DUPLICATED' ||
        errBody.errors[0].errorKey === 'ERROR_RECORD_ALREADY_EXISTS' ||
        // errBody.errors[0].errorKey === '_ERR_INVALID_ADDR' ||
        errBody.errors[0].errorKey === '_ERR_COULD_NOT_AUTHENTICATE' ||
        errBody.errors[0].errorKey === '_ERR_INVALID_PI_TOTAL_AMOUNT' ||
        errBody.errors[0].errorKey === '_ERR_COMMAND_EXCEPTION' ||
        errBody.errors[0].errorKey === '_ERR_ORDER_UNLOCKED' ||
        errBody.errors[0].errorKey === 'ERROR_EMAIL_INVALID'
      ) {
        return {
          status_code: 400,
          error_key: errBody.errors[0].errorKey,
          error_message: errBody.errors[0].errorMessage,
        };
      }
      if (errBody.errors[0].errorKey === 'ERR_PROMOTION_CODE_DUPLICATED') {
        return {
          status_code: 400,
          error_key: 'ERR_PROMOTION_CODE_DUPLICATED',
          error_message: 'You have entered a duplicate promotion code.',
        };
      }
      if (errBody.errors[0].errorKey === '_ERR_LOGIN_NOT_ALLOWED_NOW') {
        return {
          status_code: 400,
          error_key: 'login_not_allowed',
          error_message: errBody.errors[0].errorMessage,
        };
      }
      if (
        errBody.errors[0].errorKey === '_ERR_AUTHENTICATION_REUSEOLD_PASSWORD'
      ) {
        return {
          status_code: 400,
          error_key: 'previously_used_password',
          error_message: errBody.errors[0].errorMessage,
        };
      }
      if (errBody.errors[0].errorKey === 'ERROR_INCORRECT_OTP') {
        return errorlist.otp_incorrect;
      }
      if (errBody.errors[0].errorKey === '_ERR_INVALID_ADDR') {
        return errorlist.invalid_address;
      }
      if (errBody.errors[0].errorKey === 'ERROR_IN_EMAIL_SEND') {
        return errorlist.ERROR_IN_EMAIL_SEND;
      }
      if (errBody.errors[0].errorKey === 'ERROR_UPDATING_MOBILE') {
        return errorlist.mobile_exists;
      }
      if (errBody.errors[0].errorKey === 'ERR_PROMOTION_CODE_INVALID') {
        return errorlist.invalid_promocode;
      }
      if (errBody.errors[0].errorKey === '_ERR_MISSING_CMD_PARAMETER') {
        return errorlist.invalid_params;
      }
      if (errBody.errors[0].errorKey === '_ERR_AUTHENTICATION_ERROR') {
        return errorlist.invalid_credentials;
      }
      if (errBody.errors[0].errorKey === '_ERR_PERSON_ACCOUNT_DISABLED') {
        return errorlist.account_locked;
      }
      if (
        errBody.errors[0].errorKey ===
        '_ERR_AUTHENTICATION_USERIDMATCH_PASSWORD'
      ) {
        return errorlist.same_userid_password;
      }
      if (errBody.errors[0].errorKey === 'ERROR_OTP_RETRIES') {
        return errorlist.otp_incorrect_limit_exceed;
      }
      if (
        errBody.errors[0].errorKey ===
          '_ERR_AUTHENTICATION_MINIMUMLENGTH_PASSWORD' ||
        errBody.errors[0].errorKey ===
          '_ERR_AUTHENTICATION_MINIMUMDIGITS_PASSWORD' ||
        errBody.errors[0].errorKey ===
          '_ERR_AUTHENTICATION_MINIMUMLETTERS_PASSWORD'
      ) {
        return errorlist.invalid_password_format;
      }
      if (
        errBody.errors[0].errorKey === '_ERR_LOGONID_ALREDY_EXIST' ||
        errBody.errors[0].errorKey === 'ERROR_LOGONID_ALREADY_EXIST' ||
        errBody.errors[0].errorKey === 'ERROR_USER_EXISTS'
      ) {
        return errorlist.user_exists;
      }
      if (
        errBody.errors[0].errorKey === 'CWXBB1012E' ||
        errBody.errors[0].errorKey === 'CWXBB1011E'
      ) {
        return errorlist.token_expired;
      }
      if (errBody.errors[0].errorKey === 'TOKEN_VALIDATION_FAIL') {
        return {
          status_code: 400,
          error_key: 'social_token_expired',
          error_message: 'Social Token Expired',
        };
      }
      if (errBody.errors[0].errorKey === '_ERR_BAD_PARMS') {
        return {
          status_code: 400,
          error_key: 'current_password_incorrect',
          error_message: 'Your current password is incorrect',
        };
      }
      if (
        errBody.errors[0].errorKey === 'ERR_USER_INVALID_FORMAT' ||
        errBody.errors[0].errorKey === 'ERROR_MOBILE_EMAIL_INVALID'
      ) {
        return errorlist.userid_invalid_format;
      }
      if (errBody.errors[0].errorKey === 'ERR_NO_DATA_FOUND') {
        return {
          status_code: 400,
          error_key: 'minimum_amount_for_emi',
          error_message: 'Minimum amount to avail the EMI is INR 1500.',
        };
      }
      if (errBody.errors[0].errorKey === 'ERROR_PINCODE_DOES_NOT_EXIST') {
        return {
          status_code: 400,
          error_key: 'invalid_pincode',
          error_message: 'Not a valid pincode',
        };
      }
      if (
        errBody.errors[0].errorKey === 'ERROR_USER_DOES_NOT_EXISTS' ||
        errBody.errors[0].errorKey === 'ERROR_USER_DOES_NOT_EXIST'
      ) {
        return errorlist.user_does_not_exists;
      }
      if (errBody.errors[0].errorKey === '_ERR_ORDER_NOT_FOUND') {
        return errorlist.order_not_found;
      }
      return (
        wcsErrorList.error_400[errBody.errors[0].errorKey] ||
        errorlist.invalid_params
      );
    }
    if (statusCode === 401) {
      if (
        errBody.errors[0].errorKey === '_ERR_EXPIRED_ACTIVITY_TOKEN' ||
        errBody.errors[0].errorKey === '_ERR_INVALID_COOKIE' ||
        errBody.errors[0].errorKey === '_ERR_ACTIVITY_TOKEN' ||
        errBody.errors[0].errorKey === '_ERR_TERMINATED_ACTIVITY_TOKEN'
      ) {
        return errorlist.token_expired;
      }
      return (
        wcsErrorList.error_401[errBody.errors[0].errorKey] ||
        errorlist.unauthorized
      );
    }
    if (statusCode === 404) {
      return {
        status_code: 404,
        error_key: 'Resource_Not_Found',
        error_message: errBody || '',
      };
    }
    if (statusCode === 403) {
      return {
        status_code: 403,
        error_key: errBody.errors[0].errorKey,
        error_message: errBody.errors[0].errorMessage || '',
      };
    }
    return errorlist.invalid_params;
  }
  return errorlist.wcs_invalid_response;
};

const wcsErrorList = {
  error_400: {
    _ERR_GIFTLIST_ITEM_NOT_FOUND: {
      status_code: 400,
      error_key: '_ERR_GIFTLIST_ITEM_NOT_FOUND',
      error_message: 'Gift List Item Doesnt Exist',
    },
    _ERR_DELETE_OR_UPDATE_NON_EXIST_GIFT_LIST: {
      status_code: 400,
      error_key: '_ERR_DELETE_OR_UPDATE_NON_EXIST_GIFT_LIST',
      error_message: 'WishList Doesnt Exist',
    },
    _ERR_GIFTLIST_ITEM_CATENTRYDETAIL_MISSING: {
      status_code: 400,
      error_key: '_ERR_GIFTLIST_ITEM_CATENTRYDETAIL_MISSING',
      error_message: 'Product Catentry details missing',
    },
    _ERR_GIFTLIST_ITEM_CATALOGENTRY_INVALID: {
      status_code: 400,
      error_key: '_ERR_GIFTLIST_ITEM_CATALOGENTRY_INVALID',
      error_message: 'Product Catentry details invalid',
    },
    ERROR_USER_DOES_NOT_EXIST_ON_FORGOT_PASSWORD: {
      status_code: 400,
      error_key: 'invalid_user_id',
      error_message: 'You are not registered with Godrej Interio.',
    },
  },
  error_401: {
    _ERR_INVALID_COOKIE: {
      status_code: 401,
      error_key: '_ERR_INVALID_COOKIE',
      error_message:
        'An invalid cookie was received for the user, your logonId may be in use by another user.',
    },
  },
  error_500: {
    ERR_INTERNAL_SERVER_ERROR: {
      status_code: 500,
      error_key: 'ERR_INTERNAL_SERVER_ERROR',
      error_message:
        'CWXFR0230E: Internal server error. Details will be stored within the server logs.',
    },
  },
};
