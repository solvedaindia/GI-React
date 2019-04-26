const async = require('async');
const errorUtils = require('../utils/errorutils');
const espotsHandler = require('./espotshandler');
const logger = require('../utils/logger.js');
const filter = require('../filters/filter');

/**
 * The function will return CLP Data
 * @param espot_name
 * @return CLP data
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
/* Get CLP Data from Espots */
module.exports.getClpData = function getClpData(req, callback) {
  if (!req.query.id || !req.body.espot_name) {
    logger.debug('Get CLP data :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  // const categoryID = req.query.id;
  const bodyEspots = req.body.espot_name;
  const reqHeaders = req.headers;
  async.map(
    bodyEspots,
    (espotName, cb) => {
      if (espotName !== '') {
        espotsHandler.getEspotsData(reqHeaders, espotName, cb);
      } else {
        cb(errorUtils.errorlist.invalid_params);
      }
    },
    (err, results) => {
      if (err) {
        logger.debug('Error while calling CLP data');
        callback(err);
        return;
      }
      logger.debug('Got all the origin resposes');
      logger.debug('Body JSON', JSON.stringify(results));
      callback(null, transformClpBody(results));
    },
  );
};

function transformClpBody(results) {
  const res = {};
  results.forEach(element => {
    const espotResult = filter.filterData('espotcontent', element);
    if (espotResult != null) {
      const keys = Object.keys(espotResult);
      keys.forEach(key => {
        res[key] = espotResult[key];
      });
    }
  });
  return res;
}

/* const espotName = 'GI_Header_Static_Data';
function getHeroBanner(headers, catId, callback) {
  espotsHandler.getEspotsData(headers, espotName, (err, response) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, response);
  });
}
function getSubCategories(headers, catId, callback) {
  callback(null, {});
}
function getInspirationData(headers, catId, callback) {
  espotsHandler.getEspotsData(headers, espotName, (err, response) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, response);
  });
}
function getTrendingProducts(headers, catId, callback) {
  espotsHandler.getEspotsData(headers, espotName, (err, response) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, response);
  });
}
function getFreshContent(headers, catId, callback) {
  espotsHandler.getEspotsData(headers, espotName, (err, response) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, response);
  });
}
function getGISolution(headers, catId, callback) {
  espotsHandler.getEspotsData(headers, espotName, (err, response) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, response);
  });
}

module.exports.getClpData = function getClpData(req, callback) {
  if (!req.params.catId) {
    callback(errorUtils.errorlist.invalid_params);
  }
  const categoryID = req.params.catId;
  const reqHeaders = req.headers;
  async.parallel(
    [
      getHeroBanner.bind(null, reqHeaders, categoryID),
      getSubCategories.bind(null, reqHeaders, categoryID),
      getInspirationData.bind(null, reqHeaders, categoryID),
      getTrendingProducts.bind(null, reqHeaders, categoryID),
      getFreshContent.bind(null, reqHeaders, categoryID),
      getGISolution.bind(null, reqHeaders, categoryID),
    ],
    (err, result) => {
      if (err) {
        console.log("Erorr>>",err);
        callback(err);
      } else {
        logger.debug('Got all the origin resposes');
        callback(null, result);
      }
    },
  );
};
 */
