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
    logger.debug('GET PDP Data :: Invalid Params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const reqHeaders = req.headers;
  const ids = req.query.ids.split(',');

  getCompareProducts(reqHeaders, ids, (err, result) => {
    if (err) {
      logger.debug('Error in Compare Data API');
      callback(errorUtils.handleWCSError(err));
    } else {
      logger.debug('Got all the origin resposes for Product Detail');
      callback(null, result);
    }
  });
};

/**
 * Function to return compare data for all productIds
 * @param {*} headers
 * @param {*} productIDs
 * @param {*} callback
 */
function getCompareProducts(headers, productIDs, callback) {
  productUtil.getProductListByIDs(headers, productIDs, (err, result) => {
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
            getEmiValue(headers, bundleCompareSummary, (error, endResult) => {
              if (error) {
                reject(error);
              } else {
                resolve(endResult);
              }
            });
          });
          attPromises.push(promise);
        } else if (element.catalogEntryTypeCode === 'ProductBean') {
          attPromises.push(productCompareDataSummary(element));
        } else if (element.catalogEntryTypeCode === 'ItemBean') {
          const promise = new Promise((resolve, reject) => {
            productByProductID(
              headers,
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
          callback(null, resu);
        })
        .catch(error => {
          logger.debug('catch called', error);
          callback(error);
        });
    }
  });
}

/**
 * Function to return compare data summary for bundles
 * @param {*} element
 */
function bundleCompareDataSummary(element) {
  const compareDataSummary = {
    uniqueId: '',
    type: '',
    sKUs: [],
    attributes: [],
    swatches: [],
  };
  if (element) {
    compareDataSummary.uniqueId = element.uniqueID;
    compareDataSummary.type = 'bundle';
    const swatchAttr = bundlefilter.swatchAttributesForCompare(element);
    if (swatchAttr.length > 0) {
      swatchAttr.forEach(sw => {
        compareDataSummary.swatches.push(sw);
      });
    }
    const Price = bundlefilter.bundleComponentsSummary(element, '');
    const productSummary = productDetailFilter.productDetailSummary(element);
    const descAttr = kitfilter.getDescriptiveAttributes(element);
    const productDimension = productDimensionSummary(descAttr);
    productSummary.weight = productDimension.weight;
    productSummary.height = productDimension.height;
    productSummary.depth = productDimension.depth;
    productSummary.actualPrice = Price.actualPrice;
    productSummary.offerPrice = Price.offerPrice;
    compareDataSummary.sKUs.push(productSummary);

    if (element.attributes && element.attributes.length > 0) {
      compareDataSummary.attributes = kitfilter.getComparableAttributes(
        element,
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
          const swatchAttr = bundlefilter.swatchAttributesForCompare(attr);
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
          const descAttr = kitfilter.getDescriptiveAttributes(attr);
          // eslint-disable-next-line no-shadow
          const productDimension = productDimensionSummary(descAttr);
          mercProductSummary.weight = productDimension.weight;
          mercProductSummary.height = productDimension.height;
          mercProductSummary.depth = productDimension.depth;
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
    type: '',
    sKUs: [],
    attributes: [],
    swatches: [],
  };
  if (element) {
    compareDataSummary.uniqueId = element.uniqueID;
    compareDataSummary.type = 'kit';
    compareDataSummary.swatches.push(
      kitfilter.swatchAttributesForCompare(element),
    );
    const productSummary = productDetailFilter.productDetailSummary(element);
    const descAttr = kitfilter.getDescriptiveAttributes(element);
    const productDimension = productDimensionSummary(descAttr);
    productSummary.weight = productDimension.weight;
    productSummary.height = productDimension.height;
    productSummary.depth = productDimension.depth;
    compareDataSummary.sKUs.push(productSummary);
    if (element.attributes) {
      compareDataSummary.attributes = kitfilter.getComparableAttributes(
        element,
      );
    }
    if (
      element.merchandisingAssociations &&
      element.merchandisingAssociations.length > 0
    ) {
      element.merchandisingAssociations.forEach(attr => {
        if (attr.associationType === 'REPLACEMENT') {
          compareDataSummary.swatches.push(
            kitfilter.swatchAttributesForCompare(attr),
          );
          const mercProductSummary = productDetailFilter.productDetailSummary(
            attr,
          );
          // eslint-disable-next-line no-shadow
          const descAttr = kitfilter.getDescriptiveAttributes(attr);
          // eslint-disable-next-line no-shadow
          const productDimension = productDimensionSummary(descAttr);
          mercProductSummary.weight = productDimension.weight;
          mercProductSummary.height = productDimension.height;
          mercProductSummary.depth = productDimension.depth;
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
    type: '',
    sKUs: [],
    attributes: [],
    swatches: [],
  };
  if (element) {
    compareDataSummary.uniqueId = skuId;
    compareDataSummary.type = 'product';
    if (element.attributes) {
      compareDataSummary.attributes = kitfilter.getComparableAttributes(
        element,
      );
    }
    if (element.sKUs && element.sKUs.length > 0) {
      element.sKUs.forEach(sku => {
        compareDataSummary.swatches.push(
          productDetailFilter.swatchAttributesForCompare(sku),
        );
        const skuProductSummary = productDetailFilter.productDetailSummary(sku);
        const descAttr = kitfilter.getDescriptiveAttributes(sku);
        const productDimension = productDimensionSummary(descAttr);
        skuProductSummary.weight = productDimension.weight;
        skuProductSummary.height = productDimension.height;
        skuProductSummary.depth = productDimension.depth;
        compareDataSummary.sKUs.push(skuProductSummary);
      });
    }
  }
  return compareDataSummary;
}

/**
 * Function to return product dimensions
 * @param {*} descAttr
 */
function productDimensionSummary(descAttr) {
  const productDimension = {};
  productDimension.weight =
    descAttr.wt && descAttr.wt.values[0] ? descAttr.wt.values[0].value : 'NA';
  productDimension.height =
    descAttr.ht && descAttr.ht.values[0] ? descAttr.ht.values[0].value : 'NA';
  productDimension.depth =
    descAttr.dp && descAttr.dp.values[0] ? descAttr.dp.values[0].value : 'NA';
  return productDimension;
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
