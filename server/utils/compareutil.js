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
                    element.swatches = SwatchesData(element.attributes);
                    element.sKUs.forEach(sku => {
                        minemi_promises.push(new Promise((resolve, reject) => {
                            var selPriceObj = sku.price[1];
                            if (selPriceObj.value) {
                                minEMI(selPriceObj.value, headers, (err, data) => {
                                    if (err) {
                                        resolve();
                                    } else {
                                        // var swatch = SwatchesData(sku.attributes);
                                        // var seatObj = sku.attributes.find((att) => {
                                        //     return att.uniqueID == "7000000000000010201";
                                        // });
                                        // if (seatObj && seatObj[0]) {
                                        //     swatch[0].size = seatObj.values[0].value;
                                        //     swatch[0].uid = sku.uniqueID;
                                        // }
                                        // swatches.push(swatch[0]);
                                        var wt = sku.attributes.find((att) => {
                                            return att.uniqueID == "7000000000000001002"
                                        })
                                        var ht = sku.attributes.find((att) => {
                                            return att.uniqueID == "7000000000000001011"
                                        })
                                        var dp = sku.attributes.find((att) => {
                                            return att.uniqueID == "7000000000000001012"
                                        })

                                        sku.weight = wt && wt.values[0] ? wt.values[0].value : 'NA';
                                        sku.height = ht && ht.values[0] ? ht.values[0].value : 'NA';
                                        sku.depth = dp && dp.values[0] ? dp.values[0].value : 'NA';
                                        sku.minimumEMI = data.minEMIValue;

                                        var finishColor = sku.attributes.find((att) => {
                                            return att.identifier == 'sc';
                                        })
                                        if (element.swatches && element.swatches.length > 0) {
                                            element.swatches.forEach((swatch) => {
                                                if (swatch.name == finishColor.values[0].value) {
                                                    swatch.skuId = sku.uniqueID
                                                }
                                            })
                                        }

                                        // console.log(sku.attributes);
                                        delete sku.attributes;
                                        delete sku.attachments;
                                        delete sku.longDescription;
                                        delete sku.hasSingleSKU;
                                        delete sku.resourceId;
                                        delete sku.partNumber;
                                        delete sku.catalogEntryTypeCode;
                                        delete sku.buyable;
                                        delete sku.masterCategoryId;
                                        delete sku.storeID;
                                        delete sku.parentCatalogGroupID;
                                        resolve();
                                    }
                                })
                            } else {
                                var wt = sku.attributes.find((att) => {
                                    return att.uniqueID == "7000000000000001002"
                                })
                                var ht = sku.attributes.find((att) => {
                                    return att.uniqueID == "7000000000000001011"
                                })
                                var dp = sku.attributes.find((att) => {
                                    return att.uniqueID == "7000000000000001012"
                                })

                                sku.weight = wt && wt.values[0] ? wt.values[0].value : 'NA';
                                sku.height = ht && ht.values[0] ? ht.values[0].value : 'NA';
                                sku.depth = dp && dp.values[0] ? dp.values[0].value : 'NA';
                                sku.minimumEMI = data.minEMIValue;

                                var finishColor = sku.attributes.find((att) => {
                                    return att.identifier == 'sc';
                                })
                                if (element.swatches && element.swatches.length > 0) {
                                    element.swatches.forEach((swatch) => {
                                        if (swatch.name == finishColor.values[0].value) {
                                            swatch.skuId = sku.uniqueID
                                        }
                                    })
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
                                console.log("no selling price object found");
                                resolve();
                            }
                        }))
                    });

                    Promise.all(minemi_promises).then(() => {
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
                        element.attributes = getComparableAttributes(element.attributes);
                        data.push(element);
                        resolve();
                    }).catch((err) => {
                        resolve();
                        // callback(null, data);
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