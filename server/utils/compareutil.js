const async = require('async');
const origin = require('./origin');
const constants = require('./constants');
const originMethod = 'GET';
const errorUtils = require('./errorutils');
const logger = require('./logger.js');
const headerutil = require('./headerutil');
const productUtil = require('./productutil');

module.exports.getCompareProducts = function getCompareProducts(headers, productIDs, callback) {

    productUtil.getProductListByIDs(headers, productIDs, (err, result) => {
      if(err) {
        callback(errorUtils.handleWCSError(response));
      } else {

        var data = [];
        result.forEach(element => {
          var skus = [];
          element.sKUs.forEach(sku => {
            sku.attributes = getComparableAttributes(sku.attributes)
          });
          
          data.push(element)
        });
        callback(null, data);
      }
    })
  }

  function getComparableAttributes(productAttribute) {
    const comparable = [];
    if (productAttribute && productAttribute.length > 0) {
      productAttribute.forEach(attribute => {
        if (attribute.comparable === true) {
          var att = {};
          att.name = attribute.name;
          att.uniqueID = attribute.uniqueID;
          att.value = attribute.values[0].value;
          comparable.push(att);
        }
      });
    }
    return comparable;
  }