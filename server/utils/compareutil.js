/* eslint-disable indent */
/* eslint-disable no-param-reassign */
const async = require('async');
// const origin = require('./origin');
// const constants = require('./constants');
// const originMethod = 'GET';
const errorUtils = require('./errorutils');
// const logger = require('./logger.js');
// const headerutil = require('./headerutil');
const productUtil = require('./productutil');
const kitfilter = require('../filters/kitfilter');
const bundlefilter = require('../filters/bundlefilter');
// const minEMI = require('./emiutil').getMinimumEmiValue;
const productDetailFilter = require('../filters/productdetailfilter');
const emiUtils = require('./emiutil');
const SwatchesData = require('../filters/productdetailfilter').getSwatchData;

module.exports.getCompareProducts = function getCompareProducts(
  headers,
  productIDs,
  callback,
) {
  productUtil.getProductListByIDs(headers, productIDs, (err, result) => {
    if (err) {
      callback(errorUtils.handleWCSError(err));
    } else {
      const data = [];
      const attPromises = [];
      result.forEach(element => {
        if (element.catalogEntryTypeCode === 'PackageBean') {
          data.push(kitCompareDataSummary(element));
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
          data.push(productCompareDataSummary(element));
        } else if (element.catalogEntryTypeCode === 'ItemBean') {
          productUtil.productByProductID(
            element.parentCatalogEntryID,
            headers,
            // eslint-disable-next-line no-shadow
            (err, result) => {
              if (err) {
                callback(err);
              } else if (
                result.catalogEntryView &&
                result.catalogEntryView.length > 0
              ) {
                data.push(
                  productCompareDataSummary(result.catalogEntryView[0]),
                );
              }
            },
          );
        } else {
          attPromises.push(
            new Promise((resolve, reject) => {
              element.swatches = SwatchesData(element.attributes);
              element.sKUs.forEach(sku => {
                const wt = sku.attributes.find(
                  att => att.identifier === 'NetWeight',
                );
                const ht = sku.attributes.find(
                  att => att.identifier === 'Height(cm)',
                );
                const dp = sku.attributes.find(
                  att => att.identifier === 'Depth(cm)',
                );

                sku.weight = wt && wt.values[0] ? wt.values[0].value : 'NA';
                sku.height = ht && ht.values[0] ? ht.values[0].value : 'NA';
                sku.depth = dp && dp.values[0] ? dp.values[0].value : 'NA';

                const finishColor = sku.attributes.find(
                  att => att.identifier === 'sc',
                );
                if (element.swatches && element.swatches.length > 0) {
                  element.swatches.forEach(swatch => {
                    if (swatch.name === finishColor.values[0].value) {
                      swatch.skuId = sku.uniqueID;
                    }
                  });
                }
                if (sku.UserData) {
                  sku.minimumEMI = sku.UserData[0].x_field1_i;
                }

                // console.log(sku.attributes);
                delete sku.attributes;
                delete sku.attachments;
                delete sku.longDescription;
                delete sku.hasSingleSKU;
                delete sku.resourceId;
                delete sku.catalogEntryTypeCode;
                delete sku.buyable;
                delete sku.masterCategoryId;
                delete sku.storeID;
                delete sku.parentCatalogGroupID;
                delete sku.UserData;
              });

              delete element.longDescription;
              delete element.price;
              delete element.hasSingleSKU;
              delete element.resourceId;
              delete element.partNumber;
              delete element.shortDescription;
              delete element.catalogEntryTypeCode;
              delete element.buyable;
              delete element.masterCategoryId;
              delete element.storeID;
              delete element.name;
              delete element.parentCatalogGroupID;
              delete element.numberOfSKUs;
              delete element.singleSKUCatalogEntryID;
              delete element.attachments;
              delete element.merchandisingAssociations;
              delete element.UserData;
              element.attributes = getComparableAttributes(element.attributes);
              data.push(element);
              resolve();
            }),
          );
        }
      });
      Promise.all(attPromises)
        .then(resu => {
          callback(null, resu);
        })
        .catch(error => {
          callback(error);
        });
    }
  });
};

function getComparableAttributes(productAttribute) {
  const comparable = [];
  if (productAttribute && productAttribute.length > 0) {
    productAttribute.forEach(attribute => {
      if (
        attribute.comparable === true &&
        attribute.associatedKeyword === 'Specifications'
      ) {
        const att = {};
        att.name = attribute.name;
        att.uniqueID = attribute.uniqueID;
        att.value = attribute.values[0].value;
        comparable.push(att);
      }
    });
  }
  return comparable;
}

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
    productSummary.weight =
      descAttr.wt && descAttr.wt.values[0] ? descAttr.wt.values[0].value : 'NA';
    productSummary.height =
      descAttr.ht && descAttr.ht.values[0] ? descAttr.ht.values[0].value : 'NA';
    productSummary.depth =
      descAttr.dp && descAttr.dp.values[0] ? descAttr.dp.values[0].value : 'NA';
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
          mercProductSummary.weight =
            descAttr.wt && descAttr.wt.values[0] ?
            descAttr.wt.values[0].value :
            'NA';
          mercProductSummary.height =
            descAttr.ht && descAttr.ht.values[0] ?
            descAttr.ht.values[0].value :
            'NA';
          mercProductSummary.depth =
            descAttr.dp && descAttr.dp.values[0] ?
            descAttr.dp.values[0].value :
            'NA';
          mercProductSummary.actualPrice = mercPrice.actualPrice;
          mercProductSummary.offerPrice = mercPrice.offerPrice;
          compareDataSummary.sKUs.push(mercProductSummary);
        }
      });
    }
  }
  return compareDataSummary;
}

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
    productSummary.weight =
      descAttr.wt && descAttr.wt.values[0] ? descAttr.wt.values[0].value : 'NA';
    productSummary.height =
      descAttr.ht && descAttr.ht.values[0] ? descAttr.ht.values[0].value : 'NA';
    productSummary.depth =
      descAttr.dp && descAttr.dp.values[0] ? descAttr.dp.values[0].value : 'NA';
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
          mercProductSummary.weight =
            descAttr.wt && descAttr.wt.values[0] ?
            descAttr.wt.values[0].value :
            'NA';
          mercProductSummary.height =
            descAttr.ht && descAttr.ht.values[0] ?
            descAttr.ht.values[0].value :
            'NA';
          mercProductSummary.depth =
            descAttr.dp && descAttr.dp.values[0] ?
            descAttr.dp.values[0].value :
            'NA';
          compareDataSummary.sKUs.push(mercProductSummary);
        }
      });
    }
  }
  return compareDataSummary;
}

function productCompareDataSummary(element) {
  const compareDataSummary = {
    uniqueId: '',
    type: '',
    sKUs: [],
    attributes: [],
    swatches: [],
  };
  if (element) {
    compareDataSummary.uniqueId = element.uniqueID;
    compareDataSummary.type = 'product';
    // compareDataSummary.swatches.push(
    //   productDetailFilter.swatchAttributesForCompare(element),
    // );
    // const productSummary = productDetailFilter.productDetailSummary(element);
    // const descAttr = kitfilter.getDescriptiveAttributes(element);
    // productSummary.weight =
    //   descAttr.wt && descAttr.wt.values[0] ? descAttr.wt.values[0].value : 'NA';
    // productSummary.height =
    //   descAttr.ht && descAttr.ht.values[0] ? descAttr.ht.values[0].value : 'NA';
    // productSummary.depth =
    //   descAttr.dp && descAttr.dp.values[0] ? descAttr.dp.values[0].value : 'NA';
    // compareDataSummary.sKUs.push(productSummary);
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
        skuProductSummary.weight =
          descAttr.wt && descAttr.wt.values[0] ?
          descAttr.wt.values[0].value :
          'NA';
        skuProductSummary.height =
          descAttr.ht && descAttr.ht.values[0] ?
          descAttr.ht.values[0].value :
          'NA';
        skuProductSummary.depth =
          descAttr.dp && descAttr.dp.values[0] ?
          descAttr.dp.values[0].value :
          'NA';
        compareDataSummary.sKUs.push(skuProductSummary);
      });
    }
  }
  return compareDataSummary;
}

function getEmiValue(header, bundleCompareSummary, callback) {
  return minEmiValue(header, bundleCompareSummary, (err, res) => {
    if (err) {
      callback(null, err);
    } else {
      callback(null, res);
    }
  });
}

/** Function to find min EMI value for bundles */
module.exports.minEmiValue = minEmiValue;

function minEmiValue(header, bundleDataSummary, callback) {
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
      (errors, results) => {
        if (errors) {
          callback(errors, bundleDataSummary);
        }
        callback(null, results);
      },
    );
  }
}
