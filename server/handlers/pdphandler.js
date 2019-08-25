const async = require('async');
const sortJsonArray = require('sort-json-array');
const errorUtils = require('../utils/errorutils');
const logger = require('../utils/logger.js');
const productUtil = require('../utils/productutil');
const promotionUtil = require('../utils/promotionutil');
const pincodeUtil = require('../utils/pincodeutil');
const emiUtils = require('../utils/emiutil');
const pdpfilter = require('../filters/productdetailfilter');
const imagefilter = require('../filters/imagefilter');
const kitfilter = require('../filters/kitfilter');
const bundlefilter = require('../filters/bundlefilter');
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
      if (result.catalogEntryView && result.catalogEntryView.length > 0) {
        if (result.catalogEntryView[0].catalogEntryTypeCode === 'ProductBean') {
          callback(null, {});
        } else if (
          result.catalogEntryView[0].catalogEntryTypeCode === 'PackageBean'
        ) {
          const kitIds = getKitIds(result);
          const taskList = [
            kitDetailsByIds.bind(null, reqHeaders, result, kitIds),
            productCompAndMercAssocIds,
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
        } else if (
          result.catalogEntryView[0].catalogEntryTypeCode === 'BundleBean'
        ) {
          const bundleIds = getBundleIds(result);
          const taskList = [
            bundleDetailsByIds.bind(null, reqHeaders, result, bundleIds),
            productCompAndMercAssocIds,
            promotionDetails,
            mergeBundleData,
            minEmiValue,
          ];
          async.waterfall(taskList, (er, res) => {
            if (er) {
              callback(er);
            } else {
              callback(null, res);
            }
          });
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
              pincodeUtil.findInventory.bind(null, reqHeaders, reqBody),
              pincodeUtil.getShippingCharge.bind(null, reqHeaders, reqBody),
              getExperienceStore.bind(null, reqHeaders, reqBody),
            ],
            // eslint-disable-next-line no-shadow
            (err, result) => {
              if (err) {
                callback(err);
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
  if (productData.catalogEntryView && productData.catalogEntryView.length > 0) {
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
          if (
            sku.merchandisingAssociations &&
            sku.merchandisingAssociations.length > 0
          ) {
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
 * Function to return components and merchendising assoc Ids
 * @param {*} header
 * @param {*} productData
 * @param {*} productsData
 * @param {*} productIds
 * @param {*} callback
 */
function productCompAndMercAssocIds(
  header,
  productData,
  productsData,
  productIds,
  callback,
) {
  if (productsData && productsData.length > 0) {
    productsData.forEach(product => {
      if (
        product.catalogEntryTypeCode === 'BundleBean' &&
        product.components &&
        product.components.length > 0
      ) {
        product.components.forEach(element => {
          if (productIds.indexOf(element.uniqueID) === -1) {
            productIds.push(element.uniqueID);
          }
        });
      }
      if (
        product.merchandisingAssociations &&
        product.merchandisingAssociations.length > 0
      ) {
        product.merchandisingAssociations.forEach(element => {
          if (
            element.associationType === 'X-SELL' ||
            element.associationType === 'UPSELL'
          ) {
            if (productIds.indexOf(element.uniqueID) === -1) {
              productIds.push(element.uniqueID);
            }
          }
        });
      }
    });
  }
  callback(null, header, productData, productsData, productIds);
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
      callback(null, header, productData, skuData, '');
    } else {
      callback(null, header, productData, skuData, result);
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
function mergePDPData(header, prodData, skuData, promoData, callback) {
  const productDataSummary = {
    uniqueID: '',
    type: 'product',
    defAttributes: [],
    skuData: [],
    productFeatures: [],
    purchaseGuide: [],
    keywords: [],
  };

  if (prodData.catalogEntryView && prodData.catalogEntryView.length > 0) {
    const productData = prodData.catalogEntryView[0];
    productDataSummary.uniqueID = productData.uniqueID;
    const attributes = pdpfilter.getAttributes(productData);
    productDataSummary.defAttributes = pdpfilter.getDefAttributes(
      attributes.defining,
    );
    productDataSummary.skuData = getSkuData(skuData, promoData);
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
  const pincodeData = {
    pincodeServiceable: serviceability,
    inventoryStatus: '',
    deliveryDateAndTime: '',
    shippingCharge: '',
    experienceStore: [],
  };
  if (result && result.length > 0) {
    pincodeData.inventoryStatus = result[0].inventoryStatus;
    pincodeData.deliveryDateAndTime = result[0].deliveryDate;
    pincodeData.shippingCharge = result[1].shippingCharge;
    pincodeData.experienceStore = transformExperienceStore(result[2]);
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
      const attachment = imagefilter.getProductImages(sku);
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
      skuDataJson.productDetails = pdpfilter.getProductDetails(attributes);
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
 * Function for Experience Store Data JSON
 * @param {*} bodyData
 */
function transformExperienceStore(bodyData) {
  // eslint-disable-next-line no-shadow
  const experienceStore = [];
  if (bodyData.storeList && bodyData.storeList.length > 0) {
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
          storeId: store.STLOC_ID || '',
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

/**
 * Function for returning Kits
 * @param {*} bodyData
 */
function getKitIds(bodyData) {
  const kitIds = [];
  if (bodyData.catalogEntryView && bodyData.catalogEntryView.length > 0) {
    kitIds.push(bodyData.catalogEntryView[0].uniqueID);
    if (
      bodyData.catalogEntryView[0].merchandisingAssociations &&
      bodyData.catalogEntryView[0].merchandisingAssociations.length > 0
    ) {
      bodyData.catalogEntryView[0].merchandisingAssociations.forEach(
        element => {
          if (
            kitIds.indexOf(element.uniqueID) === -1 &&
            element.associationType === 'REPLACEMENT'
          ) {
            kitIds.push(element.uniqueID);
          }
        },
      );
    }
  }
  return kitIds;
}

/**
 * Function for return bundleIds
 * @param {} header
 * @param {*} kitData
 * @param {*} kitIds
 * @param {*} callback
 */
function getBundleIds(bodyData) {
  const bundleIds = [];
  if (bodyData.catalogEntryView && bodyData.catalogEntryView.length > 0) {
    bundleIds.push(bodyData.catalogEntryView[0].uniqueID);
    if (
      bodyData.catalogEntryView[0].merchandisingAssociations &&
      bodyData.catalogEntryView[0].merchandisingAssociations.length > 0
    ) {
      bodyData.catalogEntryView[0].merchandisingAssociations.forEach(
        element => {
          if (
            bundleIds.indexOf(element.uniqueID) === -1 &&
            element.associationType === 'REPLACEMENT' &&
            element.catalogEntryTypeCode === 'BundleBean'
          ) {
            bundleIds.push(element.uniqueID);
          }
        },
      );
    }
  }
  return bundleIds;
}

/**
 * This function will return kit data using kit Ids
 */
function kitDetailsByIds(header, kitData, kitIds, callback) {
  productUtil.getProductListByIDs(header, kitIds, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, header, kitData, result, kitIds);
    }
  });
}

/** Function will return bundle data using bundleIds */
function bundleDetailsByIds(header, bundleData, bundleIds, callback) {
  productUtil.getProductListByIDs(header, bundleIds, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, header, bundleData, result, bundleIds);
    }
  });
}

/**
 * Function for transforming Kit Data Json
 * @param {*} bodyData
 */
function transformKitData(headers, kitData, subKitData, promoData, callback) {
  const kitDataSummary = {
    type: 'kit',
    swatchAttributes: [],
    kitData: [],
  };
  if (subKitData && subKitData.length > 0) {
    subKitData.forEach(bodyData => {
      const attributes = pdpfilter.getAttributes(bodyData);
      const mercAssociations = getMercAssociationsData(bodyData, promoData);
      const swatchAttribute = kitfilter.getSwatchAttibute(bodyData);
      const kitDataJSON = pdpfilter.productDetailSummary(bodyData);
      kitDataJSON.swatchAttributes = [];
      kitDataJSON.swatchAttributes.push(swatchAttribute);
      if (kitDataJSON.swatchAttributes.length > 0) {
        kitDataJSON.swatchAttributes = kitfilter.filterSwatchAtrributes(
          kitDataJSON.swatchAttributes,
        );
      }
      const associatedPromo = [];
      if (promoData[bodyData.uniqueID]) {
        promoData[bodyData.uniqueID].forEach(promo => {
          associatedPromo.push({
            name: promo.name,
            description: promo.description || '',
            promocode: promo.promoCode,
          });
        });
      }
      kitDataJSON.promotions = associatedPromo;
      kitDataJSON.attachments = imagefilter.getProductImages(bodyData);
      kitDataJSON.productDetails = pdpfilter.getProductDetails(attributes);
      kitDataJSON.productFeatures = pdpfilter.getProductFeatures(attributes);
      kitDataJSON.similarProducts = mercAssociations.similarProducts;
      kitDataJSON.combos = mercAssociations.combosYouMayLike;
      kitDataJSON.keywords = pdpfilter.getKeywords(bodyData.keyword);
      kitDataSummary.swatchAttributes.push(swatchAttribute);
      kitDataSummary.kitData.push(kitDataJSON);
    });

    if (kitDataSummary.swatchAttributes.length > 0) {
      kitDataSummary.swatchAttributes = kitfilter.filterSwatchAtrributes(
        kitDataSummary.swatchAttributes,
      );
    }
  }
  callback(null, kitDataSummary);
}

/** Function to merge bundle data */
function mergeBundleData(header, key1, subBundleData, promoData, callback) {
  const bundleDataSummary = {
    type: 'bundle',
    swatchAttributes: [],
    bundleData: [],
  };
  if (subBundleData && subBundleData.length > 0) {
    subBundleData.forEach(bodyData => {
      const componentsSummary = bundlefilter.bundleComponentsSummary(
        bodyData,
        promoData,
      );
      const attributes = pdpfilter.getAttributes(bodyData);
      const mercAssociations = getMercAssociationsData(bodyData, promoData);
      const bundleDataJSON = pdpfilter.productDetailSummary(bodyData);
      bundleDataJSON.actualPrice = componentsSummary.actualPrice || '';
      bundleDataJSON.offerPrice = componentsSummary.offerPrice || '';
      bundleDataJSON.swatchAttributes = [];
      const swatchAttributes = bundlefilter.getSwatchAttributes(bodyData);
      if (Array.isArray(swatchAttributes) && swatchAttributes.length > 0) {
        swatchAttributes.forEach(attr => {
          bundleDataSummary.swatchAttributes.push(attr);
          bundleDataJSON.swatchAttributes.push(attr);
        });
      }
      if (bundleDataJSON.swatchAttributes.length > 0) {
        bundleDataJSON.swatchAttributes = kitfilter.filterSwatchAtrributes(
          bundleDataJSON.swatchAttributes,
        );
      }
      const associatedPromo = [];
      if (promoData[bodyData.uniqueID]) {
        promoData[bodyData.uniqueID].forEach(promo => {
          associatedPromo.push({
            name: promo.name,
            description: promo.description || '',
            promocode: promo.promoCode,
          });
        });
      }
      bundleDataJSON.promotions = associatedPromo;
      bundleDataJSON.attachments = imagefilter.getProductImages(bodyData);
      bundleDataJSON.productDetails = pdpfilter.getProductDetails(attributes);
      bundleDataJSON.productFeatures = pdpfilter.getProductFeatures(attributes);
      bundleDataJSON.itemInThisBundle = componentsSummary.itemInThisBundle;
      bundleDataJSON.similarProducts = mercAssociations.similarProducts;
      bundleDataJSON.keywords = pdpfilter.getKeywords(bodyData.keyword);
      bundleDataSummary.bundleData.push(bundleDataJSON);
    });

    if (bundleDataSummary.swatchAttributes.length > 0) {
      bundleDataSummary.swatchAttributes = kitfilter.filterSwatchAtrributes(
        bundleDataSummary.swatchAttributes,
      );
    }
  }
  callback(null, header, bundleDataSummary);
}

/** Function to find min EMI value for bundles */
module.exports.minEmiValue = minEmiValue;
function minEmiValue(header, bundleDataSummary, callback) {
  if (bundleDataSummary.bundleData && bundleDataSummary.bundleData.length > 0) {
    async.map(
      bundleDataSummary.bundleData,
      (element, cb) => {
        emiUtils.getMinimumEmiValue(
          element.offerPrice,
          header,
          (error, result) => {
            if (!error) {
              // eslint-disable-next-line no-param-reassign
              element.emiData = result.minEMIValue;
              cb(null, element);
            } else {
              // eslint-disable-next-line no-param-reassign
              element.emiData = '';
              cb(null, element);
            }
          },
        );
      },
      errors => {
        if (errors) {
          callback(null, bundleDataSummary);
          return;
        }
        callback(null, bundleDataSummary);
      },
    );
  } else {
    callback(null, bundleDataSummary);
  }
}
