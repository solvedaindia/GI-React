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
            callback(errorUtils.handleWCSError(err));
        } else {

            var data = [];
            console.log("api called utils")
            var att_promises = [];
            result.forEach(element => {
                att_promises.push(new Promise((resolve, reject) => {
                    element.swatches = SwatchesData(element.attributes);
                    element.sKUs.forEach(sku => {
                        var wt = sku.attributes.find((att) => {
                            return att.identifier == "NetWeight"
                        })
                        var ht = sku.attributes.find((att) => {
                            return att.identifier == "Height(cm)"
                        })
                        var dp = sku.attributes.find((att) => {
                            return att.identifier == "Depth(cm)"
                        })

                        sku.weight = wt && wt.values[0] ? wt.values[0].value : 'NA';
                        sku.height = ht && ht.values[0] ? ht.values[0].value : 'NA';
                        sku.depth = dp && dp.values[0] ? dp.values[0].value : 'NA';

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

                }));
            });
            Promise.all(att_promises).then(() => {
                console.log("then called");
                callback(null, data);
            }).catch((err) => {
                console.log("catch called");
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