const async = require('async');
const espotsHandler = require('./espotshandler');
const logger = require('../utils/logger.js');
const espots = require('../configs/espotnames');
const filter = require('../filters/filter');
const headerEspot = espots.header;

/**
 * Get Header Static data from WCS Espots
 * @param storeId,access_token
 * @return 200,OK Header Static Data
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.getHeaderData = function headerData(headers, callback) {
  async.map(
    headerEspot,
    (espotName, cb) => {
      espotsHandler.getEspotsData(headers, espotName, cb);
    },
    (err, results) => {
      if (err) {
        callback(err);
        return;
      }
      logger.debug('Got all the origin resposes');
      logger.debug('Header Data', JSON.stringify(results));
      const resJson = {};
      results.forEach(element => {
        const espotParserResult = filter.filterData('espotcontent', element); // Espot Data Filteration
        if (espotParserResult != null) {
          const keys = Object.keys(espotParserResult);
          keys.forEach(key => {
            resJson[key] = espotParserResult[key];
          });
        }
      });
      callback(null, resJson);
    },
  );
};
