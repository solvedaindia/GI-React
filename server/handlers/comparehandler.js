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
 * @param {queryIds}s
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
          attPromises.push(productCompareDataSummary(element));
        } else if (element.catalogEntryTypeCode === 'ItemBean') {
          const promise = new Promise((resolve, reject) => {
            productByProductID(
              reqHeaders,
              element.parentCatalogEntryID,
              element.uniqueID,
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
    attributes: [],
    swatches: [],
  };
  if (element) {
    compareDataSummary.uniqueId = element.uniqueID;
    const swatchAttr = bundlefilter.swatchAttributesForComparePage(element);
    if (swatchAttr.length > 0) {
      swatchAttr.forEach(sw => {
        compareDataSummary.swatches.push(sw);
      });
    }
    const Price = bundlefilter.bundleComponentsSummary(element, '');
    const productSummary = productDetailFilter.productDetailSummary(element);
    const descAttr = productDetailFilter.getDescriptiveAttributes(element);
    productSummary.dimensionThumbnail = descAttr.dimensionThumbnail;
    productSummary.width = descAttr.width;
    productSummary.height = descAttr.height;
    productSummary.depth = descAttr.depth;
    productSummary.actualPrice = Price.actualPrice;
    productSummary.offerPrice = Price.offerPrice;
    compareDataSummary.sKUs.push(productSummary);

    if (element.attributes && element.attributes.length > 0) {
      compareDataSummary.attributes = productDetailFilter.getComparableAttributes(
        element.attributes,
      );
    }
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
          if (swatchAttr.length > 0) {
            swatchAttr.forEach(sw => {
              compareDataSummary.swatches.push(sw);
            });
          }
          const mercPrice = bundlefilter.bundleComponentsSummary(attr, '');
          const mercProductSummary = productDetailFilter.productDetailSummary(
            attr,
          );
          // eslint-disable-next-line no-shadow
          const descAttr = productDetailFilter.getDescriptiveAttributes(attr);
          mercProductSummary.dimensionThumbnail = descAttr.dimensionThumbnail;
          mercProductSummary.width = descAttr.width;
          mercProductSummary.height = descAttr.height;
          mercProductSummary.depth = descAttr.depth;
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
    attributes: [],
    swatches: [],
  };
  if (element) {
    compareDataSummary.uniqueId = element.uniqueID;
    compareDataSummary.swatches.push(
      kitfilter.swatchAttributesForComparePage(element),
    );
    const productSummary = productDetailFilter.productDetailSummary(element);
    const descAttr = productDetailFilter.getDescriptiveAttributes(element);
    productSummary.dimensionThumbnail = descAttr.dimensionThumbnail;
    productSummary.width = descAttr.width;
    productSummary.height = descAttr.height;
    productSummary.depth = descAttr.depth;
    compareDataSummary.sKUs.push(productSummary);
    if (element.attributes && element.attributes.length > 0) {
      compareDataSummary.attributes = productDetailFilter.getComparableAttributes(
        element.attributes,
      );
    }
    if (
      element.merchandisingAssociations &&
      element.merchandisingAssociations.length > 0
    ) {
      element.merchandisingAssociations.forEach(attr => {
        if (attr.associationType === 'REPLACEMENT') {
          compareDataSummary.swatches.push(
            kitfilter.swatchAttributesForComparePage(attr),
          );
          const mercProductSummary = productDetailFilter.productDetailSummary(
            attr,
          );
          // eslint-disable-next-line no-shadow
          const descAttr = productDetailFilter.getDescriptiveAttributes(attr);
          mercProductSummary.dimensionThumbnail = descAttr.dimensionThumbnail;
          mercProductSummary.width = descAttr.width;
          mercProductSummary.height = descAttr.height;
          mercProductSummary.depth = descAttr.depth;
          compareDataSummary.sKUs.push(mercProductSummary);
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
function productCompareDataSummary(element, skuId) {
  const compareDataSummary = {
    uniqueId: '',
    type: 'product',
    sKUs: [],
    swatches: [],
  };
  if (element) {
    compareDataSummary.uniqueId = skuId;
    if (element.sKUs && element.sKUs.length > 0) {
      element.sKUs.forEach(sku => {
        const varData = productDetailFilter.swatchAttributesForCompare(sku);
        const index = compareDataSummary.swatches.findIndex(
          e => e.name === varData.name,
        );
        if (index === -1) {
          compareDataSummary.swatches.push(varData);
        }
        const skuProductSummary = productDetailFilter.productDetailSummary(sku);
        const descAttr = productDetailFilter.getDescriptiveAttributes(sku);
        if (sku.attributes && sku.attributes.length > 0) {
          skuProductSummary.attributes = productDetailFilter.getComparableAttributes(
            sku.attributes,
          );
        }
        skuProductSummary.dimensionThumbnail = descAttr.dimensionThumbnail;
        skuProductSummary.width = descAttr.width;
        skuProductSummary.height = descAttr.height;
        skuProductSummary.depth = descAttr.depth;
        compareDataSummary.sKUs.push(skuProductSummary);
      });
    }
  }
  return compareDataSummary;
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
function productByProductID(headers, productId, skuId, callback) {
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
          productCompareDataSummary(result.catalogEntryView[0], skuId),
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
