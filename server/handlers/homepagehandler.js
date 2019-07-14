const async = require('async');
const espotsHandler = require('./espotshandler');
const logger = require('../utils/logger.js');
const espots = require('../configs/espotnames');
const productUtil = require('../utils/productutil');
const promotionUtil = require('../utils/promotionutil');
const espotFilter = require('../filters/espotfilter');
const productDetailFilter = require('../filters/productdetailfilter');
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
  const espotName = espots.homepage.recommendedProducts;
  let resJson = {};
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
      async.map(
        espotRes.recommendationArray,
        (product, cb) => {
          productUtil.productDetailByPartNumber(
            product.partNumber,
            headers,
            cb,
          );
        },
        (error2, productList) => {
          if (error2) {
            callback(error2);
            return;
          }
          resJson = espotRes;
          if (productList && productList.length > 0) {
            const productListing = [];
            const productIds = [];
            productList.forEach(product => {
              productIds.push(product.uniqueID);
            });
            promotionUtil.getMultiplePromotionData(
              productIds,
              headers,
              (error3, promotionData) => {
                if (error3) {
                  callback(error3);
                  return;
                }
                productList.forEach(product => {
                  let productDetail = {};
                  productDetail = productDetailFilter.productDetailSummary(
                    product,
                  );
                  productDetail.promotionData = productDetailFilter.getSummaryPromotion(
                    promotionData[productDetail.uniqueID],
                  );
                  for (
                    let index = 0;
                    index < espotRes.recommendationArray.length;
                    index += 1
                  ) {
                    if (
                      espotRes.recommendationArray[index].partNumber ===
                      productDetail.partNumber
                    ) {
                      Object.assign(
                        productDetail,
                        espotRes.recommendationArray[index],
                      );
                      break;
                    }
                  }
                  productListing.push(productDetail);
                });
                resJson.recommendationArray = productListing;
                callback(null, resJson);
              },
            );
          }
        },
      );
    }
  });
};
