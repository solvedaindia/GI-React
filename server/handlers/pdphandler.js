const async = require('async');
const errorUtils = require('../utils/errorutils');
const logger = require('../utils/logger.js');
const productUtil = require('../utils/productutil');
const promotionUtil = require('../utils/promotionutil');
const pincodeUtil = require('../utils/pincodeutil');
const pdpfilter = require('../filters/productdetailfilter');

/**
 * Function for PLP Data
 * @param
 * @returns
 * @throws
 */
module.exports.getProductDetails = function getProductDetailsData(
  req,
  callback,
) {
  logger.debug('Inside the GET PDP Data Method');
  if (!req.params.productId) {
    logger.debug('GET PDP Data :: Invalid Params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }

  const reqHeaders = req.headers;
  const productID = req.params.productId;

  // productUtil.productByProductID(productID, reqHeaders, (err, result) => {
  //   if (err) {
  //     callback(errorUtils.handleWCSError(err));
  //   } else {
  //     logger.debug('Got all the origin resposes for Product Detail');
  //     callback(null, productSummaryJson(reqHeaders, result));
  //   }
  // });

  // callback(null, transformJSON(prodDetails));
  async.parallel(
    [
      productDetails.bind(null, reqHeaders, productID),
      // promotionDetails.bind(null, reqHeaders, productID),
    ],
    (err, result) => {
      if (err) {
        callback(errorUtils.handleWCSError(err));
      } else {
        logger.debug('Got all the origin resposes for Product Detail');
        callback(null, pdpfilter.productDataSummary(result));
      }
    },
  );
};

/**
 * Function for pincode service ability
 * @param
 * @returns
 * @throws
 */
module.exports.getPincodeServiceability = function getPincodeServiceability(
  req,
  callback,
) {
  logger.debug('Inside the GET PINCODE SERVICEABILITY API Method');
  if (!req.body.pincode && !req.body.sku_partNumber && !req.body.quantity) {
    logger.debug('GET PDP Data :: Invalid Params');
    callback(errorUtils.errorlist.invalid_params);
  }

  const reqHeaders = req.headers;
  const reqBody = {
    pincode: req.body.pincode,
    partNumber: req.body.sku_partNumber,
    quantity: req.body.quantity,
  };

  pincodeUtil.getPincodeServiceability(
    reqHeaders,
    reqBody.pincode,
    (err, result) => {
      if (err) {
        callback(errorUtils.handleWCSError(err));
      } else {
        logger.debug('Got all the origin resposes From Pincode Serviceability');
        // callback(null, result);
        if (result.serviceAbilityFlag === true) {
          // async.parallel(
          //   [findInventory.bind(null, reqHeaders, reqBody)],
          //   // eslint-disable-next-line no-shadow
          //   (err, result) => {
          //     if (err) {
          //       callback(errorUtils.handleWCSError(err));
          //     } else {
          //       logger.debug(
          //         'Got all the origin resposes From Find Inventory API',
          //       );
          //       callback(null, result);
          //     }
          //   },
          // );
        }
      }
    },
  );
};

module.exports.getAssociatedProducts = function associatedProducts(
  req,
  callback,
) {
  logger.debug('Inside the Associated Products data Method');
  if (!req.params.skuId) {
    logger.debug('GET PDP Data :: Invalid Params');
    callback(errorUtils.errorlist.invalid_params);
  }

  const reqHeaders = req.headers;
  const skuID = req.params.skuId;

  productUtil.productByProductID(skuID, reqHeaders, (err, result) => {
    if (err) {
      callback(errorUtils.handleWCSError(err));
    } else {
      logger.debug('Got all the origin resposes for Product Detail');
      callback(null, result);
    }
  });
};

/** Product Details */
function productDetails(header, productID, callback) {
  productUtil.productByProductID(productID, header, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

/** Promotions Details */
function promotionDetails(header, ProductID, callback) {
  promotionUtil.getMultiplePromotions(ProductID, header, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

/** Find Inventory */
function findInventory(header, reqParams, callback) {
  productUtil.findInventory(header, reqParams, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
