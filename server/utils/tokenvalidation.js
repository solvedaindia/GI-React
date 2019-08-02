const jwt = require('jwt-simple');
const crypto = require('crypto-js');
const encryptionKey = 'yqzSYsrLLYkJBya0P513QGqQq82CiojT';
const encodingKey = 'rVlJvxsARa0bDTwFeSrnoQCO7SPN0lFt';
const errorUtils = require('./errorutils');
const logger = require('./logger');

/* Encode WCS Payload to get Token */
exports.encodeToken = function encodeToken(payload) {
  const token = jwt.encode(payload, encodingKey);
  const encryptedToken = encryptToken(token);
  return encryptedToken;
};

/* Decode Token to get WCS Payload */
function decodeToken(inputToken) {
  const decryptedtoken = decryptToken(inputToken);
  const decoded = jwt.decode(decryptedtoken, encodingKey);
  return decoded;
}

/* Encrypt Encoded Token to Generate access_token */
function encryptToken(payload) {
  const encryptedToken = crypto.AES.encrypt(payload, encryptionKey).toString();
  return encryptedToken;
}

/* Decrypt access_token to generate Encoded Token */
function decryptToken(encryptedToken) {
  const decryptedToken = crypto.AES.decrypt(
    encryptedToken,
    encryptionKey,
  ).toString(crypto.enc.Utf8);
  return decryptedToken;
}

exports.validateSecureToken = function validateSecureToken(req, res, next) {
  // const headerToken = req.headers.access_token;
  if (req.url.indexOf('/payment/handlePayment') !== -1) {
    req.headers.storeId = '10151';
    return;
  }
  if (!req.headers.storeId || req.headers.storeId === '') {
    next(errorUtils.errorlist.storeid_missing);
  }
  try {
    if (req.url.indexOf('/token/guest') !== -1) {
      return;
    }
    if (!req.headers.access_token) {
      next(errorUtils.errorlist.token_missing);
      return;
    }
    const headerToken = req.headers.access_token;
    const decodedToken = decodeToken(headerToken); // Decode Access Token
    req.headers.WCToken = decodedToken.WCToken;
    req.headers.WCTrustedToken = decodedToken.WCTrustedToken;
    req.headers.userId = decodedToken.userId;
    req.headers.personalizationID = decodedToken.personalizationID;
    return;
  } catch (error) {
    logger.debug('Error In Decrypting access_token');
    next(errorUtils.errorlist.token_invalid);
  }
};
