const async = require('async');
const sortJsonArray = require('sort-json-array');
const errorUtils = require('../utils/errorutils');
const logger = require('../utils/logger.js');
const productUtil = require('../utils/productutil');
const promotionUtil = require('../utils/promotionutil');
const pincodeUtil = require('../utils/pincodeutil');
const pdpfilter = require('../filters/productdetailfilter');
const headerutil = require('../utils/headerutil.js');
const constants = require('../utils/constants');
const origin = require('../utils/origin.js');
const activityHandler = require('../handlers/activityhandler');

const notifyMessage = 'We’ll notify you when this product is back in stock';

/**
 * Function for PDP Data
 * @param {skuId}
 * @returns 200, will return Product Data for PDP
 * @throws ontexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.getProductDetails = function getProductDetailsData(
  req,
  callback,
) {
  logger.debug('Inside the GET PDP Data Method');
  if (!req.params.skuId) {
    logger.debug('GET PDP Data :: Invalid Params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }

  const reqHeaders = req.headers;
  const skuID = req.params.skuId;

  activityHandler.addRecentlyViewedProduct(reqHeaders, skuID);
  productUtil.productByProductID(skuID, reqHeaders, (err, result) => {
    if (err) {
      callback(err);
    } else {
      logger.debug('Got all the origin resposes From PDP API');
      if (result.catalogEntryView.length > 0) {
        if (result.catalogEntryView[0].catalogEntryTypeCode === 'ProductBean') {
          callback(null, {});
        } else {
          const productId = result.catalogEntryView[0].parentCatalogEntryID;
          const taskList = [
            productDetails.bind(null, reqHeaders, productId),
            productListByIDs,
            promotionDetails,
            mergePDPData,
          ];
          async.waterfall(taskList, (er, res) => {
            if (er) {
              callback(er);
            } else {
              callback(null, res);
            }
          });
        }
      } else {
        callback(null, {});
      }
    }
  });
};

/**
 * Function for pincode service ability
 * @param {pincode, partNumber, quantity, uniqueId}
 * @returns 200, will return pincode servicability, delivery data and experience at store data
 * @throws contexterror,badreqerror if storeid or access_token is invalid
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
              getExperienceStore.bind(null, reqHeaders, reqBody),
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

/**
 * Function for Notify Me API
 * @returns 200, will return a notification when the product is back in stock
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.setProductNotification = function productStockNotification(
  req,
  callback,
) {
  logger.debug('Inside the Notify Me API ');
  if (!req.body.email_id || !req.body.part_number || !req.body.pincode) {
    logger.debug('Notify Me API :: Invalid Params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }

  const reqHeader = headerutil.getWCSHeaders(req.headers);
  const reqBody = {
    emailId: req.body.email_id,
    partNumber: req.body.part_number,
    pinCode: req.body.pincode,
  };
  const originUrl = constants.notifyMe.replace(
    '{{storeId}}',
    req.headers.storeId,
  );
  origin.getResponse(
    'POST',
    originUrl,
    reqHeader,
    null,
    reqBody,
    null,
    '',
    response => {
      if (response.status === 200) {
        callback(null, { message: notifyMessage });
      } else {
        logger.debug('Error While calling Notify ME API');
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
};

/**
 * This Function will return shipping cahrge
 * @param {*} header
 * @param {*} reqParams
 * @param {*} callback
 */
function getShippingCharge(header, reqParams, callback) {
  pincodeUtil.getShippingCharge(header, reqParams, (err, result) => {
    if (err) {
      callback(null, 'Sipping charge not found');
    } else {
      callback(null, result);
    }
  });
}

/**
 * Function for Experience Store
 * @param {*} header
 * @param {*} reqParams
 * @param {*} callback
 * @returns this function will return experience store data
 */
function getExperienceStore(header, reqParams, callback) {
  pincodeUtil.experienceStore(header, reqParams, (err, result) => {
    if (err) {
      callback(null, 'Store not found');
    } else {
      callback(null, result);
    }
  });
}

/**
 * This function will return inventory status
 * @param {*} header
 * @param {*} reqParams
 * @param {*} callback
 */
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
 * This function will return product data
 * @param {*} header
 * @param {*} productID
 * @param {*} callback
 */
function productDetails(header, productID, callback) {
  productUtil.productByProductID(productID, header, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, header, result);
    }
  });
}

/**
 * This function will return product data on the basis of ProductIds
 * @param {*} header
 * @param {*} productData
 * @param {*} callback
 */
function productListByIDs(header, productData, callback) {
  const skuIds = [];
  if (productData.catalogEntryView.length > 0) {
    if (
      productData.catalogEntryView[0].sKUs &&
      productData.catalogEntryView[0].sKUs.length > 0
    ) {
      productData.catalogEntryView[0].sKUs.forEach(sku => {
        if (skuIds.indexOf(sku.uniqueID) === -1) {
          skuIds.push(sku.uniqueID);
        }
      });
    }
  }
  productUtil.getProductListByIDs(header, skuIds, (err, result) => {
    if (err) {
      callback(err);
    } else {
      if (result.length > 0) {
        result.forEach(sku => {
          if (sku.merchandisingAssociations.length > 0) {
            sku.merchandisingAssociations.forEach(element => {
              if (skuIds.indexOf(element.uniqueID) === -1) {
                skuIds.push(element.uniqueID);
              }
            });
          }
        });
      }
      callback(null, header, productData, result, skuIds);
    }
  });
}

/**
 * Function for Promotions Details
 * @param {*} header
 * @param {*} productData
 * @param {*} skuData
 * @param {*} skuIds
 * @param {*} callback
 */
function promotionDetails(header, productData, skuData, skuIds, callback) {
  promotionUtil.getMultiplePromotionData(skuIds, header, (err, result) => {
    if (err) {
      callback(null, productData, skuData, '');
    } else {
      callback(null, productData, skuData, result);
    }
  });
}

/**
 * Function for merging PDP data
 * @param {*} prodData
 * @param {*} skuData
 * @param {*} promoData
 * @param {*} callback
 * @return this function will merge productData, skuData and promoData and return PDP data
 */
function mergePDPData(prodData, skuData, promoData, callback) {
  const productDataSummary = {
    uniqueID: '',
    type: 'product',
    defAttributes: [],
    skuData: [],
    productDetails: [],
    productFeatures: [],
    purchaseGuide: [],
    keywords: [],
  };

  if (prodData.catalogEntryView.length > 0) {
    const productData = prodData.catalogEntryView[0];
    productDataSummary.uniqueID = productData.uniqueID;
    const attributes = pdpfilter.getAttributes(productData);
    productDataSummary.defAttributes = pdpfilter.getDefAttributes(
      attributes.defining,
    );
    productDataSummary.skuData = getSkuData(skuData, promoData);
    productDataSummary.productDetails = pdpfilter.getProductDetails(
      attributes,
      productData,
    );
    productDataSummary.productFeatures = pdpfilter.getProductFeatures(
      attributes,
    );
    productDataSummary.purchaseGuide = pdpfilter.getPurchaseGuide(productData);
    productDataSummary.keywords = pdpfilter.getKeywords(productData.keyword);
  }
  callback(null, productDataSummary);
}

/**
 * Function for transforming JSON strcuture for Pincode Serviceability API
 * @param {*} result
 * @param {*} serviceability
 */
function transformJson(result, serviceability) {
  const pincodeData = {};
  pincodeData.pincodeServiceable = serviceability;
  if (result && result.length > 0) {
    pincodeData.inventoryStatus = result[0].inventoryStatus || '';
    pincodeData.deliveryDateAndTime = result[0].deliveryDate || '';
    pincodeData.shippingCharge = result[1].ShipCharge || '';
    pincodeData.experienceStore = transformExperienceStore(result[2]);
    // pincodeData.experienceStore = transformExperienceStore(experienceStore);
  }
  return pincodeData;
}

/**
 * Function for SKU Data
 * @param {*} bodyData
 * @param {*} promotions
 */
function getSkuData(bodyData, promotions) {
  const skuData = [];
  if (bodyData && bodyData.length > 0) {
    bodyData.forEach(sku => {
      const skuDataJson = pdpfilter.productDetailSummary(sku);
      delete skuDataJson.promotionData;
      const attachment = pdpfilter.getAttachments(sku);
      const attributes = pdpfilter.getAttributes(sku);
      const mercAssociations = getMercAssociationsData(sku, promotions);
      skuDataJson.defAttributes = pdpfilter.getDefAttributes(
        attributes.defining,
      );
      skuDataJson.attachments = attachment || '';
      const associatedPromo = [];
      if (promotions[sku.uniqueID]) {
        promotions[sku.uniqueID].forEach(promo => {
          associatedPromo.push({
            name: promo.name,
            description: promo.description || '',
            promocode: promo.promoCode,
          });
        });
      }
      skuDataJson.promotions = associatedPromo;
      skuDataJson.similarProducts = mercAssociations.similarProducts;
      skuDataJson.combos = mercAssociations.combosYouMayLike;
      skuData.push(skuDataJson);
    });
  }
  return skuData;
}

/**
 * Function for Merchendising Associations data
 * @param {*} bodyData
 * @param {*} promotions
 */
function getMercAssociationsData(bodyData, promotions) {
  const mercAssociations = {};
  const similarProductsData = [];
  const combosYouLikeData = [];
  if (
    bodyData.merchandisingAssociations &&
    bodyData.merchandisingAssociations.length > 0
  ) {
    bodyData.merchandisingAssociations.forEach(sku => {
      // eslint-disable-next-line no-param-reassign
      // sku.promotionData = promotions[sku.uniqueID];
      if (sku.associationType === 'X-SELL') {
        const similarProducts = pdpfilter.productDetailSummary(sku);
        similarProducts.promotionData = pdpfilter.getSummaryPromotion(
          promotions[sku.uniqueID],
        );
        similarProductsData.push(similarProducts);
      } else if (sku.associationType === 'UPSELL') {
        const combosData = pdpfilter.productDetailSummary(sku);
        combosData.promotionData = pdpfilter.getSummaryPromotion(
          promotions[sku.uniqueID],
        );
        combosYouLikeData.push(combosData);
      }
    });
  }
  mercAssociations.similarProducts = similarProductsData;
  mercAssociations.combosYouMayLike = combosYouLikeData;
  return mercAssociations;
}

/**
 * Function for JSON Experience Store Data
 * @param {*} bodyData
 */
function transformExperienceStore(bodyData) {
  // eslint-disable-next-line no-shadow
  const experienceStore = [];
  if (bodyData.storeList) {
    bodyData.storeList.sort(
      (a, b) =>
        parseInt(b.DistanceFromShipToAddress, 10) -
        parseInt(a.DistanceFromShipToAddress, 10),
    );
    // eslint-disable-next-line no-param-reassign
    bodyData.storeList = sortJsonArray(
      bodyData.storeList,
      'DistanceFromShipToAddress',
      'des',
    );
    bodyData.storeList.forEach(store => {
      if (store.IsAvailable === 'Y') {
        experienceStore.push({
          distanceFromShipToAddress: store.DistanceFromShipToAddress,
          name: store.Description,
          address: store.AddressLine1,
          distanceMode: store.DistanceUOM,
          availablilty: store.IsAvailable,
        });
      }
    });
  }
  return experienceStore;
}
