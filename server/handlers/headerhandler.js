const async = require('async');
const espotsHandler = require('./espotshandler');
const logger = require('../utils/logger.js');
const espots = require('../configs/espotnames');
const filter = require('../filters/filter');
const espotFilter = require('../filters/espotfilter');
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
      const resJson = {
        Header_Static_Links: espotFilter.espotContent(results[0]) || '',
      };
      /*      results.forEach(element => {
        const espotParserResult = filter.filterData('espotcontent', element); // Espot Data Filteration
        if (espotParserResult != null) {
          Object.assign(resJson, espotParserResult);
        }
      }); */
      callback(null, resJson);
    },
  );
};
