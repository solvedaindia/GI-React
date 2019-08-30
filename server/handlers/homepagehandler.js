const espotsHandler = require('./espotshandler');
const logger = require('../utils/logger.js');
const espots = require('../configs/espotnames');
const plpHandler = require('../handlers/plphandler');
const espotFilter = require('../filters/espotfilter');

/**
 * Get Homepage Body Static data from WCS Espots
 * @param storeId,access_token
 * @return 200,OK Homepage Body Static Data
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.getRecommendedProducts = function getRecommendedProducts(
  headers,
  callback,
) {
  logger.debug('Inside Homepage Product Recommendation');
  const espotName = espots.homepage.recommendedProducts;
  espotsHandler.getEspotsData(headers, espotName, (error1, res) => {
    if (error1) {
      callback(error1);
      return;
    }
    const espotRes = espotFilter.espotContent(res);
    if (
      espotRes.recommendationArray &&
      espotRes.recommendationArray.length > 0
    ) {
      const query = {
        pn: [],
        includepromotion: 'true',
      };
      espotRes.recommendationArray.forEach(product => {
        query.pn.push(product.partNumber);
      });
      plpHandler.productListByPartNumbers(headers, query, (error, response) => {
        if (!error) {
          espotRes.recommendationArray.forEach(recommendedProduct => {
            Object.assign(
              recommendedProduct,
              response[recommendedProduct.partNumber],
            );
          });
          callback(null, espotRes);
        } else {
          callback(null, espotRes);
        }
      });
    } else {
      callback(null, espotRes);
    }
  });
};
