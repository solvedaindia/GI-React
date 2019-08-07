const async = require('async');
const errorUtils = require('../utils/errorutils');
const logger = require('../utils/logger.js');
const compareUtil = require('../utils/compareutil');
const productUtil = require('../utils/productutil');
const promotionUtil = require('../utils/promotionutil');
const kitfilter = require('../filters/kitfilter');
const bundlefilter = require('../filters/bundlefilter');

module.exports.getCompareData = function getCompareData(req, callback) {
  logger.debug('Inside the GET PDP Data Method');
  if (!req.query.ids) {
    logger.debug('GET PDP Data :: Invalid Params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  console.log(req.query, 'this is query');
  const reqHeaders = req.headers;
  const ids = req.query.ids.split(',');

  compareUtil.getCompareProducts(reqHeaders, ids, (err, result) => {
    if (err) {
      callback(errorUtils.handleWCSError(err));
    } else {
      logger.debug('Got all the origin resposes for Product Detail');
      console.log(result);
      callback(null, result);
    }
  });
};

module.exports.getKitCompareData = function getKitCompareData(req, callback) {
  logger.debug('Inside the Kit Compare Data Method');
  if (!req.query.ids) {
    logger.debug('GET KIT Compare Data :: Invalid Params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const reqHeaders = req.headers;
  const ids = req.query.ids.split(',');

  const taskList = [
    kitDetailsByIds.bind(null, reqHeaders, ids),
    promotionDetails,
    transformKitData,
  ];
  async.waterfall(taskList, (er, res) => {
    if (er) {
      callback(er);
    } else {
      callback(null, res);
    }
  });
};

function kitDetailsByIds(header, kitIds, callback) {
  productUtil.getProductListByIDs(header, kitIds, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, header, result, kitIds);
    }
  });
}

function promotionDetails(header, kitData, kitIds, callback) {
  promotionUtil.getMultiplePromotionData(kitIds, header, (err, result) => {
    if (err) {
      callback(null, kitData, '');
    } else {
      callback(null, kitData, result);
    }
  });
}

function transformKitData(comparableData, promoData, callback) {
  const compareData = [];
  if (comparableData && comparableData.length > 0) {
    comparableData.forEach(element => {
      const compareDataSummary = {
        uniqueId: '',
        type: '',
        sKUs: [],
        attributes: [],
        swatches: [],
      };
      compareDataSummary.uniqueId = element.uniqueID;
      // for kits
      if (element.catalogEntryTypeCode === 'PackageBean') {
        compareDataSummary.type = 'kit';
        compareDataSummary.swatches.push(
          kitfilter.swatchAttributesForCompare(element),
        );
        compareDataSummary.kitData.push(
          kitfilter.kitSummaryForCompare(element),
        );
        compareDataSummary.attributes = kitfilter.getComparableAttributes(
          element,
        );
        if (
          element.merchandisingAssociations &&
          element.merchandisingAssociations.length > 0
        ) {
          element.merchandisingAssociations.forEach(attr => {
            if (attr.associationType === 'REPLACEMENT') {
              compareDataSummary.swatches.push(
                kitfilter.swatchAttributesForCompare(attr),
              );
              compareDataSummary.kitData.push(
                kitfilter.kitSummaryForCompare(attr),
              );
            }
          });
        }
      }
      // for bundle
      if (element.catalogEntryTypeCode === 'BundleBean') {
        compareDataSummary.type = 'bundle';
        // compareDataSummary.swatches.push(
        //   kitfilter.swatchAttributesForCompare(element),
        // );
        compareDataSummary.kitData.push(
          kitfilter.kitSummaryForCompare(element),
        );
        compareDataSummary.attributes = kitfilter.getComparableAttributes(
          element,
        );
        if (
          element.merchandisingAssociations &&
          element.merchandisingAssociations.length > 0
        ) {
          element.merchandisingAssociations.forEach(attr => {
            if (attr.associationType === 'REPLACEMENT') {
              compareDataSummary.swatches.push(
                kitfilter.swatchAttributesForCompare(attr),
              );
              compareDataSummary.kitData.push(
                kitfilter.kitSummaryForCompare(attr),
              );
            }
          });
        }
      }
      compareData.push(compareDataSummary);
    });
  }
  callback(null, compareData);
}
