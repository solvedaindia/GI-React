const jwt = require('jwt-simple');
const crypto = require('crypto-js');
const secretKey = 'kMk0Fx61ONmocvic9GfIg2W97MsoOcSa';
const errorUtils = require('./errorutils');
const logger = require('./logger');
// HS256 secrets are typically 128-bit random strings, for example hex-encoded:
// var secret = Buffer.from('fe1a1915a379f3be5394b64d14794932', 'hex')

/* Generate access_token */
exports.encodeToken = function encodeToken(payload) {
  const token = jwt.encode(payload, secretKey);
  const encryptedToken = encryptToken(token);
  return encryptedToken;
};

/* Decode access_token */
function decodeToken(inputToken) {
  const decryptedtoken = decryptToken(inputToken);
  const decoded = jwt.decode(decryptedtoken, secretKey);
  return decoded;
}

/* encrypt access_token */
function encryptToken(payload) {
  const encryptedToken = crypto.AES.encrypt(payload, secretKey).toString();
  return encryptedToken;
}

/* Decrypt access_token */
function decryptToken(encryptedToken) {
  const decryptedToken = crypto.AES.decrypt(encryptedToken, secretKey).toString(
    crypto.enc.Utf8,
  );
  return decryptedToken;
}

exports.validateSecureToken = function validateSecureToken(req, res, next) {
  const headerToken = req.headers.access_token;
  try {
    if (
      req.url.indexOf('/token/guest') !== -1
      // req.url.indexOf('/otp/generate') !== -1 ||
      // req.url.indexOf('/footer') !== -1
    ) {
      return;
    }
    if (!headerToken) {
      next(errorUtils.errorlist.token_missing);
      return;
    }

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
