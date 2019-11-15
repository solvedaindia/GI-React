const async = require('async');
const logger = require('../utils/logger.js');
const origin = require('../utils/origin');
const constants = require('../utils/constants');
const originMethod = 'GET';
const errorutils = require('../utils/errorutils.js');
const headerUtils = require('../utils/headerutil');
const espotFilter = require('../filters/espotfilter');

/**
 * Get data from WCS Espot by Name
 * @param storeId,access_token
 * @return Espot Response
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
exports.getEspotsData = espotData;
function espotData(headers, espotName, callback) {
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
}

/**
 * Get data from WCS Espot by Multiple Espot Names
 * @param storeId,access_token
 * @return Espot Response
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
exports.getMultipleEspotsData = function getMultipleEspotsData(req, callback) {
  if (!req.query.espotname) {
    callback(errorutils.errorlist.invalid_params);
    return;
  }
  const espotNames = [];
  if (Array.isArray(req.query.espotname)) {
    req.query.espotname.forEach(espotname => {
      espotNames.push(espotname);
    });
  } else {
    espotNames.push(req.query.espotname);
  }

  async.map(
    espotNames,
    (espotName, cb) => {
      espotData(req.headers, espotName, (err, res) => {
        if (err || !res) {
          cb(null, '');
        } else {
          cb(null, res);
        }
      });
    },
    (error, espotArray) => {
      const resJSON = {};
      if (espotArray && espotArray.length > 0) {
        espotArray.forEach((espot, index) => {
          resJSON[espotNames[index]] = espotFilter.espotContent(espot);
        });
      }
      callback(null, resJSON);
    },
  );
};
