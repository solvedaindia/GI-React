const async = require('async');
const origin = require('../utils/origin');
const constants = require('../utils/constants');
const originMethod = 'GET';
const errorUtils = require('../utils/errorutils');
const espotsHandler = require('./espotshandler');
const logger = require('../utils/logger.js');
const filter = require('../filters/filter');
const headerutil = require('../utils/headerutil');

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
        logger.error('Error while calling CLP data');
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

module.exports.getCategoryCarousel = function getCategoryCarousel(
  req,
  callback,
) {
  if (!req.query.id) {
    logger.debug('Get Category Carousel :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
  }
  const categoryID = req.query.id;
  const reqHeaders = req.headers;
  categoryViewByCategoryId(reqHeaders, categoryID, (err, result) => {
    if (err) {
      callback(err);
    } else {
      logger.debug('Got all the origin resposes');
      const categoryCarousel = {
        type: 'categorycarousel',
        carouselData: [],
      };
      const catlogGrupView = result.catalogGroupView;
      if (catlogGrupView && catlogGrupView.length > 0) {
        async.map(
          catlogGrupView,
          (subCategory, cb) => {
            const subCatData = filter.filterData('categorydetail', subCategory); // Category Detail Filter
            productViewByCategoryId(
              reqHeaders,
              subCatData.uniqueID,
              (error, productViewResult) => {
                if (!error) {
                  subCatData.productCount =
                    productViewResult.catalogEntryView.length || 0; // Product Count
                  cb(null, subCatData);
                } else {
                  cb(error);
                }
              },
            );
          },
          (errors, results) => {
            results.forEach(element => {
              categoryCarousel.carouselData.push(element);
            });
            if (errors) {
              callback(errors);
              return;
            }
            callback(null, categoryCarousel);
          },
        );
      } else {
        callback(null, categoryCarousel);
      }
    }
  });
};

/**
 *  Get sub categories by category id
 */
function categoryViewByCategoryId(header, categoryID, callback) {
  const originUrl = constants.categoryViewByParentId
    .replace('{{storeId}}', header.storeId)
    .replace('{{categoryId}}', categoryID);

  const reqHeader = headerutil.getWCSHeaders(header);

  origin.getResponse(
    originMethod,
    originUrl,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}

/**
 *  Get Products List by category id
 */
function productViewByCategoryId(header, categoryID, callback) {
  const originUrl = constants.productViewByCategoryId
    .replace('{{storeId}}', header.storeId)
    .replace('{{categoryId}}', categoryID);

  const reqHeader = headerutil.getWCSHeaders(header);

  origin.getResponse(
    originMethod,
    originUrl,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}
