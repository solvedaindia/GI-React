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
        if (err) {
            callback(errorUtils.handleWCSError(response));
        } else {

            var data = [];
            console.log("api called utils")
            var att_promises = [];
            result.forEach(element => {
                att_promises.push(new Promise((resolve, reject) => {
                    var skus = [];
                    var minemi_promises = [];
                    element.sKUs.forEach(sku => {
                        minemi_promises.push(new Promise((resolve, reject) => {
                            var selPriceObj = sku.price.find((obj) => {
                                return obj.description = "I"
                            })
                            if (selPriceObj.value) {
                                console.log(selPriceObj, headers, "this is selling price object")
                                minEMI(selPriceObj.value, headers, (err, data) => {
                                    if (err) {
                                        sku.minimumEMI = err;
                                        resolve();
                                    } else {
                                        sku.minimumEMI = data.minEMIValue;
                                        resolve();
                                    }
                                })
                            } else {
                                resolve();
                            }
                        }))
                    });

                    Promise.all(minemi_promises).then(() => {
                        element.attributes = getComparableAttributes(element.attributes)
                        data.push(element);
                        resolve();
                    }).catch((err) => {
                        callback(null, data);
                    })
                }))
            });
            Promise.all(att_promises).then(() => {
                callback(null, data);
            }).catch((err) => {
                callback(null, data)
            })
        }
    })
}

function getComparableAttributes(productAttribute) {
    const comparable = [];
    if (productAttribute && productAttribute.length > 0) {
        productAttribute.forEach(attribute => {
            if (attribute.comparable === true && attribute.associatedKeyword == "Specifications") {
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