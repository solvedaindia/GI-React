const origin = require('../utils/origin');
const constants = require('../utils/constants');
const originMethod = 'GET';
const logger = require('../utils/logger.js');
const errorUtils = require('../utils/errorutils');
const headerUtil = require('../utils/headerutil');

/**
 *  Book a Consultant
 */
module.exports.bookConsultant = function bookConsultant(
  headers,
  queryBody,
  callback,
) {
  if (
    !queryBody ||
    !queryBody.name ||
    (!queryBody.email && !queryBody.mobileNumber) ||
    !queryBody.dropDownValue
  ) {
    logger.debug('Registered User Login:::Invalid Params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const reqHeaders = headerUtil.getWCSHeaders(headers);

  const bookConsultantUrl = `${constants.bookConsultant.replace(
    '{{storeId}}',
    headers.storeId,
  )}`;

  const bookConsultantBody = {
    name: queryBody.name,
    email: queryBody.email,
    mobileNumber: queryBody.mobileNumber,
    dropDownValue: queryBody.dropDownValue,
    message: queryBody.message,
  };

  const consultationDataObj = {
    consultationData: bookConsultantBody,
  };

  origin.getResponse(
    'POST',
    bookConsultantUrl,
    reqHeaders,
    null,
    consultationDataObj,
    null,
    '',
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
};

/**
 *  Get Consultant
 */

module.exports.getConsultant = function getConsultant(headers, callback) {
  const reqHeaders = headerUtil.getWCSHeaders(headers);

  const getConsultantUrl = `${constants.storeLocatorByPhysicalIdentifier.replace(
    '{{storeId}}',
    headers.storeId,
  )}`;

  origin.getResponse(
    originMethod,
    getConsultantUrl,
    reqHeaders,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        callback(null, response);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
};
