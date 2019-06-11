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
  reqHeaders,
  reqParams,
  callback,
) {
  logger.debug('Inside the GET PINCODE SERVICEABILITY API Method');
  if (
    !reqParams.pincode ||
    !reqParams.partnumber ||
    !reqParams.quantity ||
    !reqParams.uniqueid
  ) {
    logger.debug('GET PDP Data :: Invalid Params');
    callback(errorUtils.errorlist.invalid_params);
  }

  const reqBody = {
    pincode: reqParams.pincode,
    partNumber: reqParams.partnumber,
    quantity: reqParams.quantity,
    skuId: reqParams.uniqueid,
  };

  pincodeUtil.getPincodeServiceability(
    reqHeaders,
    reqBody.pincode,
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        logger.debug('Got all the origin resposes From Pincode Serviceability');
        const serviceability = result.serviceable;
        if (serviceability === true) {
          async.parallel(
            [
              findInventory.bind(null, reqHeaders, reqBody),
              getShippingCharge.bind(null, reqHeaders, reqBody),
            ],
            // eslint-disable-next-line no-shadow
            (err, result) => {
              if (err) {
                callback(errorUtils.handleWCSError(err));
              } else {
                callback(null, transformJson(result, serviceability));
              }
            },
          );
        } else {
          callback(null, transformJson('', serviceability));
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
      callback(null);
    } else {
      callback(null, result);
    }
  });
}

/** Find Inventory */
function findInventory(header, reqParams, callback) {
  pincodeUtil.findInventory(header, reqParams, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

/**
 * SKU Details Summary by Product ID and Swatch Color Identifier
 */
module.exports.getProductDetailByColor = function getProductDetailByColor(
  req,
  callback,
) {
  if (!req.params.productId || !req.query.coloridentifier) {
    logger.debug('GET SKU Details by Color :: Invalid Params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }

  const reqHeaders = req.headers;
  const productID = req.params.productId;
  const colorIdentifier = req.query.coloridentifier;
  let resJSON = {};

  productUtil.productByProductID(productID, reqHeaders, (err, result) => {
    if (err) {
      callback(errorUtils.handleWCSError(err));
    } else if (result.catalogEntryView && result.catalogEntryView.length > 0) {
      const skuArray = result.catalogEntryView[0].sKUs;
      const skuDetail = [];
      if (skuArray && skuArray.length > 0) {
        skuArray.forEach(sku => {
          const attributeArray = sku.attributes;
          attributeArray.forEach(attribute => {
            if (attribute.identifier === 'fc') {
              if (attribute.values[0].identifier === colorIdentifier) {
                skuDetail.push(sku);
              }
            }
          });
        });
      }
      if (skuDetail.length > 0) {
        promotionUtil.getPromotionData(
          skuDetail[0].uniqueID,
          reqHeaders,
          (error, promotionResult) => {
            if (error) {
              callback(error);
              return;
            }
            resJSON = pdpfilter.productDetailSummary(skuDetail[0]);
            const swatchColor = pdpfilter.getSwatchData(
              skuDetail[0].attributes,
            );
            if (swatchColor && swatchColor.length > 0) {
              resJSON.swatchColor = swatchColor[0].name;
            }
            resJSON.promotionData = pdpfilter.getSummaryPromotion(
              promotionResult,
            );
            callback(null, resJSON);
          },
        );
      } else {
        callback(null, resJSON);
      }
    } else {
      callback(null, resJSON);
    }
  });
};

/**
 * Product Details Summary
 */
module.exports.getProductDetailSummary = function getProductDetailSummary(
  req,
  callback,
) {
  if (!req.params.skuId) {
    logger.debug('GET SKU Details by Color :: Invalid Params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }

  const reqHeaders = req.headers;
  const productID = req.params.skuId;

  let resJSON = {};
  const productDetailTask = [
    productUtil.productByProductID.bind(null, productID, reqHeaders),
    promotionUtil.getPromotionData.bind(null, productID, reqHeaders),
  ];

  async.parallel(productDetailTask, (err, result) => {
    if (err) {
      callback(err);
      return;
    }
    logger.debug('Got all the origin resposes for SKU Detail Summary');
    if (result[0].catalogEntryView && result[0].catalogEntryView.length > 0) {
      resJSON = pdpfilter.productDetailSummary(result[0].catalogEntryView[0]);
      resJSON.promotionData = pdpfilter.getSummaryPromotion(result[1]);
    }

    callback(null, resJSON);
  });
};

/** Get Shipping Charge */
function getShippingCharge(header, reqParams, callback) {
  pincodeUtil.getShippingCharge(header, reqParams, (err, result) => {
    if (err) {
      callback(null, 'Sipping charge not found');
    } else {
      callback(null, result);
    }
  });
}

function transformJson(result, serviceability) {
  const pincodeData = {};
  pincodeData.pincodeServiceable = serviceability;
  if (result && result.length > 1) {
    pincodeData.inventoryStatus = result[0].inventoryStatus;
    pincodeData.deliveryDateAndTime = result[0].deliveryDate;
    /*   if (result[0].inventoryStatus !== 'Unavailable') {
      pincodeData.deliveryDateAndTime = '';
    } else {
      pincodeData.deliveryDateAndTime = '';
    } */
    pincodeData.shippingCharge = result[1].ShipCharge || '';
  }
  return pincodeData;
}
