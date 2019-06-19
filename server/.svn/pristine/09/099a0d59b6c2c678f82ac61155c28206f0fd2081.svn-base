const async = require('async');
const espotsHandler = require('./espotshandler');
const logger = require('../utils/logger.js');
const espots = require('../configs/espotnames');
const filter = require('../filters/filter');
const espotFilter = require('../filters/espotfilter');
const homebodyEspot = espots.homebody;

/**
 * Get Homepage Body Static data from WCS Espots
 * @param storeId,access_token
 * @return 200,OK Homepage Body Static Data
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.getBodyData = function getHomeBody(headers, callback) {
  async.map(
    homebodyEspot,
    (espotName, cb) => {
      espotsHandler.getEspotsData(headers, espotName, cb);
    },
    (err, results) => {
      if (err) {
        callback(err);
        return;
      }
      logger.debug('Got all the origin resposes');
      const resJson = {
        GI_Homepage_Static_Content: espotFilter.espotContent(results[0]) || '',
      };
      /* results.forEach(element => {
        const espotParserResult = filter.filterData('espotcontent', element); // Espot Data Filteration
        if (espotParserResult != null) {
          const keys = Object.keys(espotParserResult);
          keys.forEach(key => {
            resJson[key] = espotParserResult[key];
          });
        }
      }); */
      callback(null, resJson);
    },
  );
};
