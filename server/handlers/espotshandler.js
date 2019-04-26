const logger = require('../utils/logger.js');
const origin = require('../utils/origin');
const constants = require('../utils/constants');
const originMethod = 'GET';
const errorutils = require('../utils/errorutils.js');
const headerUtils = require('../utils/headerutil');

/**
 * Get data from WCS Espot by Name
 * @param storeId,access_token
 * @return Espot Response
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
exports.getEspotsData = function espotData(headers, espotName, callback) {
  const reqHeaders = headerUtils.getWCSHeaders(headers);
  const espotURL = `${constants.espotOriginURL
    .replace('{{storeId}}', headers.storeId)
    .replace('{{espotName}}', espotName)}`;
  origin.getResponse(
    originMethod,
    espotURL,
    reqHeaders,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        logger.debug('Error while calling Espot API');
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};
