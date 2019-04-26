const async = require('async');
const espotsHandler = require('./espotshandler');
const logger = require('../utils/logger.js');
const espots = require('../configs/espotnames');
const filter = require('../filters/filter');
const footerEspot = espots.footer;

/**
 * Get Footer data from WCS Espots
 * @param storeId,access_token
 * @return 200,OK Footer JSON Data
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.getFooterData = function footerData(headers, callback) {
  async.map(
    footerEspot,
    (espotName, cb) => {
      espotsHandler.getEspotsData(headers, espotName, cb);
    },
    (err, results) => {
      if (err) {
        callback(err);
        return;
      }
      logger.debug('Got all the origin resposes');
      const resJson = {};
      results.forEach(element => {
        const espotParserResult = filter.filterData('espotcontent', element); // Espot Data Filteration
        if (espotParserResult != null) {
          Object.assign(resJson, espotParserResult);
          /*  const keys = Object.keys(espotParserResult);
          keys.forEach(key => {
            resJson[key] = espotParserResult[key];
          }); */
        }
      });
      callback(null, resJson);
    },
  );
};
