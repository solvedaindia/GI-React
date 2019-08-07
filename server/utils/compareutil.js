/* eslint-disable no-param-reassign */
// const async = require('async');
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
      console.log('api called utils');
      const attPromises = [];
      result.forEach(element => {
        if (element.catalogEntryTypeCode === 'PackageBean') {
          console.log('in kit func');
          const compareDataSummary = {
            uniqueId: '',
            type: '',
            sKUs: [],
            attributes: [],
            swatches: [],
          };
          compareDataSummary.uniqueId = element.uniqueID;
          compareDataSummary.type = 'kit';
          compareDataSummary.swatches.push(
            kitfilter.swatchAttributesForCompare(element),
          );
          compareDataSummary.sKUs.push(kitfilter.kitSummaryForCompare(element));
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
                compareDataSummary.sKUs.push(
                  kitfilter.kitSummaryForCompare(attr),
                );
              }
            });
          }
          data.push(compareDataSummary);
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
        .then(() => {
          console.log('then called');
          callback(null, data);
        })
        .catch(error => {
          console.log('catch called', error);
          callback(null, data);
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
