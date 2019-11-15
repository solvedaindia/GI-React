const async = require('async');
const errorUtils = require('../utils/errorutils');
const logger = require('../utils/logger.js');
const productUtil = require('../utils/productutil');
const kitfilter = require('../filters/kitfilter');
const bundlefilter = require('../filters/bundlefilter');
const productDetailFilter = require('../filters/productdetailfilter');
const emiUtils = require('../utils/emiutil');

/**
 * Function for Compare Page Data
 * @param {queryIds}
 * @returns 200, will return data for compare page
 * @throws ontexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.getCompareData = function getCompareData(req, callback) {
  logger.debug('Inside the Compare Data Method');
  if (!req.query.ids) {
    logger.debug('GET Compare Page Data :: Invalid Params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const reqHeaders = req.headers;
  const ids = req.query.ids.split(',');

  productUtil.getProductListByIDs(reqHeaders, ids, (err, result) => {
    if (err) {
      callback(errorUtils.handleWCSError(err));
    } else {
      const attPromises = [];
      result.forEach(element => {
        if (element.catalogEntryTypeCode === 'PackageBean') {
          attPromises.push(kitCompareDataSummary(element));
        } else if (element.catalogEntryTypeCode === 'BundleBean') {
          const bundleCompareSummary = bundleCompareDataSummary(element);
          const promise = new Promise((resolve, reject) => {
            getEmiValue(
              reqHeaders,
              bundleCompareSummary,
              (error, endResult) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(endResult);
                }
              },
            );
          });
          attPromises.push(promise);
        } else if (element.catalogEntryTypeCode === 'ProductBean') {
          attPromises.push(productCompareDataSummary(element, ''));
        } else if (element.catalogEntryTypeCode === 'ItemBean') {
          const promise = new Promise((resolve, reject) => {
            productByProductID(
              reqHeaders,
              element.parentCatalogEntryID,
              element,
              (error, endResult) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(endResult);
                }
              },
            );
          });
          attPromises.push(promise);
        }
      });
      Promise.all(attPromises)
        .then(resu => {
          callback(null, sortJsonOrder(resu, ids));
        })
        .catch(error => {
          logger.debug('Error in GET COMPARE PRODUCTS API', error);
          callback(error);
        });
    }
  });
};

/**
 * Function to return compare data summary for bundles
 * @param {*} element
 */
function bundleCompareDataSummary(element) {
  const compareDataSummary = {
    uniqueId: '',
    type: 'bundle',
    sKUs: [],
    swatches: [],
  };
  if (element) {
    compareDataSummary.uniqueId = element.uniqueID;
    const swatchAttr = bundlefilter.swatchAttributesForComparePage(element);
    compareDataSummary.swatches = compareDataSummary.swatches.concat(
      swatchAttr,
    );
    const Price = bundlefilter.bundleComponentsSummary(element, '');
    const productSummary = productSkuSummary(element);
    productSummary.actualPrice = Price.actualPrice;
    productSummary.offerPrice = Price.offerPrice;
    compareDataSummary.sKUs.push(productSummary);
    // bundle components
    if (
      element.merchandisingAssociations &&
      element.merchandisingAssociations.length > 0
    ) {
      element.merchandisingAssociations.forEach(attr => {
        if (
          attr.associationType === 'REPLACEMENT' &&
          attr.catalogEntryTypeCode === 'BundleBean'
        ) {
          // eslint-disable-next-line no-shadow
          const swatchAttr = bundlefilter.swatchAttributesForComparePage(attr);
          compareDataSummary.swatches = compareDataSummary.swatches.concat(
            swatchAttr,
          );
          const mercPrice = bundlefilter.bundleComponentsSummary(attr, '');
          const mercProductSummary = productSkuSummary(attr);
          mercProductSummary.actualPrice = mercPrice.actualPrice;
          mercProductSummary.offerPrice = mercPrice.offerPrice;
          compareDataSummary.sKUs.push(mercProductSummary);
        }
      });
    }
  }
  return compareDataSummary;
}

/**
 * Function to return compare data summary for kits
 * @param {*} element
 */
function kitCompareDataSummary(element) {
  const compareDataSummary = {
    uniqueId: '',
    type: 'kit',
    sKUs: [],
    swatches: [],
  };
  if (element) {
    compareDataSummary.uniqueId = element.uniqueID;
    compareDataSummary.swatches.push(
      kitfilter.swatchAttributesForComparePage(element),
    );
    compareDataSummary.sKUs.push(productSkuSummary(element));
    if (
      element.merchandisingAssociations &&
      element.merchandisingAssociations.length > 0
    ) {
      element.merchandisingAssociations.forEach(attr => {
        if (attr.associationType === 'REPLACEMENT') {
          compareDataSummary.swatches.push(
            kitfilter.swatchAttributesForComparePage(attr),
          );
          compareDataSummary.sKUs.push(productSkuSummary(attr));
        }
      });
    }
  }
  return compareDataSummary;
}

/**
 * Function to return compare data summary for products
 * @param {*} element
 * @param {*} skuId
 */
function productCompareDataSummary(element, skuData) {
  const compareDataSummary = {
    uniqueId: '',
    type: 'product',
    sKUs: [],
    swatches: [],
  };
  if (element && skuData) {
    compareDataSummary.uniqueId = skuData.uniqueID || '';
    const varData = productDetailFilter.swatchAttributesForCompare(skuData);
    compareDataSummary.swatches.push(varData);
    compareDataSummary.sKUs.push(productSkuSummary(skuData));
    if (element.sKUs && element.sKUs.length > 0) {
      element.sKUs.forEach(sku => {
        // eslint-disable-next-line no-shadow
        const varData = productDetailFilter.swatchAttributesForCompare(sku);
        const index1 = compareDataSummary.swatches.findIndex(
          e => e.name === varData.name,
        );
        const index2 = compareDataSummary.swatches.findIndex(
          e => e.seatCapacity === varData.seatCapacity,
        );
        if (index1 === -1 && index2 !== -1) {
          compareDataSummary.swatches.push(varData);
          compareDataSummary.sKUs.push(productSkuSummary(sku));
        }
      });
    }
  }
  return compareDataSummary;
}

/**
 * Function to retun sku summary for products, kits and bundles
 * @param {*} sku
 */
function productSkuSummary(sku) {
  let skuSummary = {};
  if (sku) {
    skuSummary = productDetailFilter.productDetailSummary(sku);
    const descAttr = productDetailFilter.getDescriptiveAttributes(sku);
    const compareAttrs = productDetailFilter.getComparableAttributes(
      sku.attributes,
    );
    skuSummary.attributes = [];
    skuSummary.attributes = skuSummary.attributes.concat(compareAttrs);
    skuSummary.dimensionThumbnail = descAttr.dimensionThumbnail;
    skuSummary.width = descAttr.width;
    skuSummary.height = descAttr.height;
    skuSummary.depth = descAttr.depth;
  }
  return skuSummary;
}

/**
 * Function to return EMI data for bundles
 * @param {*} header
 * @param {*} bundleCompareSummary
 * @param {*} callback
 */
function getEmiValue(header, bundleCompareSummary, callback) {
  try {
    return minEmiValue(header, bundleCompareSummary, (err, res) => {
      if (err) {
        logger.debug('Error in GET EMI Value for Bundle');
      } else {
        callback(null, res);
      }
    });
  } catch (e) {
    // eslint-disable-next-line no-undef
    logger.debug('Error in Async Function');
    return bundleCompareSummary;
  }
}

/**
 * Function to return product details by Id
 * @param {*} headers
 * @param {*} productId
 * @param {*} callback
 */
function productByProductID(headers, productId, sku, callback) {
  try {
    return productUtil.productByProductID(productId, headers, (err, result) => {
      if (err) {
        logger.debug('Error in Getching Product');
      } else if (
        result.catalogEntryView &&
        result.catalogEntryView.length > 0
      ) {
        callback(
          null,
          productCompareDataSummary(result.catalogEntryView[0], sku),
        );
      }
    });
  } catch (e) {
    // eslint-disable-next-line no-undef
    logger.debug('Error in Async Function');
    return e;
  }
}

/**
 * Function to calculate minimum EMI value for bundles
 * @param {*} header
 * @param {*} bundleDataSummary
 * @param {*} callback
 */
// eslint-disable-next-line consistent-return
function minEmiValue(header, bundleDataSummary, callback) {
  try {
    if (bundleDataSummary.sKUs && bundleDataSummary.sKUs.length > 0) {
      return async.map(
        bundleDataSummary.sKUs,
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
            callback(errors, bundleDataSummary);
          }
          callback(null, bundleDataSummary);
        },
      );
    }
  } catch (e) {
    logger.debug('Error in minEmiVal function', e);
    return e;
  }
}

/** Function to short JSON object */
function sortJsonOrder(resp, ids) {
  try {
    const result = resp
      .map(res => {
        const n = ids.indexOf(res.uniqueId);
        // eslint-disable-next-line no-param-reassign
        ids[n] = '';
        return [n, res];
      })
      .sort()
      .map(j => j[1]);
    return result;
  } catch (e) {
    logger.debug('Error in JSON Parsing', e);
    return resp;
  }
}
