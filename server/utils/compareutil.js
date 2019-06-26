const async = require('async');
const origin = require('./origin');
const constants = require('./constants');
const originMethod = 'GET';
const errorUtils = require('./errorutils');
const logger = require('./logger.js');
const headerutil = require('./headerutil');
const productUtil = require('./productutil');
const minEMI = require('./emiutil').getMinimumEmiValue;
const SwatchesData = require('../filters/productdetailfilter').getSwatchData

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
                    var swatches = [];
                    element.sKUs.forEach(sku => {
                        minemi_promises.push(new Promise((resolve, reject) => {
                            var selPriceObj = sku.price[1];
                            if (selPriceObj.value) {
                                minEMI(selPriceObj.value, headers, (err, data) => {
                                    if (err) {
                                        resolve();
                                    } else {
                                        var swatch = SwatchesData(sku.attributes);
                                        var seatObj = sku.attributes.find((att) => {
                                            return att.uniqueID == "7000000000000010201";
                                        });
                                        if (seatObj && seatObj[0]) {
                                            swatch[0].size = seatObj.values[0].value;
                                            swatch[0].uid = sku.uniqueID;
                                        }
                                        swatches.push(swatch[0]);
                                        sku.minimumEMI = data.minEMIValue;
                                        // delete sku.attributes;
                                        delete sku.attachments;
                                        delete sku.longDescription;
                                        resolve();
                                    }
                                })
                            } else {
                                console.log("no selling price object found");
                                resolve();
                            }
                        }))
                    });

                    Promise.all(minemi_promises).then(() => {
                        delete element.longDescription;
                        delete element.price;
                        element.swatch = SwatchesData(element.attributes);
                        element.swatches = swatches;
                        element.attributes = getComparableAttributes(element.attributes);
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
                callback(null, data);
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