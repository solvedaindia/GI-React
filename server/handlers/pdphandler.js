const async = require('async');
const errorUtils = require('../utils/errorutils');
const logger = require('../utils/logger.js');
const productUtil = require('../utils/productutil');
const promotionUtil = require('../utils/promotionutil');
const prodDetails = require('../configs/pdpjsonV2');

/**
 * Function for PLP Data
 * @param
 * @returns
 * @throws
 */
module.exports.getProductDetails = function getProductDetails(req, callback) {
  logger.debug('Inside the GET PDP Data Method');
  // if (!req.params.productId) {
  //   logger.debug('GET PDP Data :: Invalid Params');
  //   callback(errorUtils.errorlist.invalid_params);
  //   return;
  // }

  const reqHeaders = req.headers;
  const productID = req.params.productId;

  callback(null, transformJSON(prodDetails));
  // async.parallel(
  //   [
  //     productDetails.bind(null, reqHeaders, productID),
  //     promotionDetails.bind(null, reqHeaders, productID),
  //   ],
  //   (err, result) => {
  //     if (err) {
  //       callback(err);
  //     } else {
  //       logger.debug('Got all the origin resposes for Product Detail');
  //       //logger.debug('>>>>>>>222222>>>>>>>'+JSON.stringify(prodDetails));
  //       callback(null, transformBodyJSONResult(prodDetails));
  //     }
  //   },
  // );
};

/** Product Details */
function productDetails(header, ProductID, callback) {
  productUtil.productByProductID(ProductID, header, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

/** Promotions Details */
function promotionDetails(header, ProductID, callback) {
  promotionUtil.promotionData(ProductID, header, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

function transformJSON(bodyData) {
  const transformPDPJSON = {};
  const productData = productSummary(bodyData.catalogEntryView[0]);
  transformPDPJSON.productData = productData;
  return transformPDPJSON;
}

function productSummary(productData) {
  const productDataSummary = {};
  const productDetailsAttributes = [];
  const productDetailsJSON = {};
  productDataSummary.uniqueID = productData.uniqueID;
  productDataSummary.productName = productData.name;
  productDataSummary.partNumber = productData.partNumber;
  productDataSummary.parentCatalogEntryID = productData.parentCatalogEntryID;
  if (productData.price && productData.price.length > 0) {
    productData.price.forEach(price => {
      if (price.usage === 'Display') {
        productDataSummary.actualPrice = price.value;
      }
      if (price.usage === 'Offer') {
        productDataSummary.offerPrice = price.value;
      }
    });
  }
  const attributes = getAttributes(productData.attributes);
  // if (attributes.defining && attributes.defining.length > 0) {
  //   attributes.defining.forEach(defining => {
  //     if (defining.identifier === 'percentOff') {
  //       productDataSummary.percentOff = defining.values;
  //     }
  //   });
  // }

  if (attributes.descriptive && attributes.descriptive.length > 0) {
    attributes.descriptive.forEach(descriptive => {
      if (descriptive.storeDisplay === true) {
        productDataSummary.ribbonText = descriptive.values[0].value;
      } else if (descriptive.identifier === 'productDetails') {
        descriptive.values.forEach(item => {
          productDetailsAttributes.push(item);
        });
      }
    });
  }
  const productDetailsList = getProductDetails(productDetailsAttributes);
  productDetailsJSON.imagePath = productData.imagePath || '';
  productDetailsJSON.description = productDetailsList;
  productDataSummary.productDetails = productDetailsJSON;
  productDataSummary.defaultQuantity = '1';
  return productDataSummary;
}

function getProductDetails(productDetailsAttributes) {
  const productDetailsList = [];
  if (productDetailsAttributes && productDetailsAttributes.length > 0) {
    productDetailsAttributes.forEach(product => {
      const productDetailObject = {};
      let innerList = [];
      const valuesList = [];
      innerList = product.value.split(':');
      for (let i = 1; i < innerList.length; i += 2) {
        const valuesObject = {};
        valuesObject.name = innerList[i];
        valuesObject.value = innerList[i + 1] || '';
        valuesList.push(valuesObject);
      }
      productDetailObject.title = innerList[0] || '';
      productDetailObject.values = valuesList;
      productDetailsList.push(productDetailObject);
    });
  }
  return productDetailsList;
}

function getAttributes(productAttribute) {
  const attributes = {};
  const defining = [];
  const descriptive = [];
  if (productAttribute && productAttribute.length > 0) {
    productAttribute.forEach(attribute => {
      if (attribute.usage === 'Defining') {
        defining.push(attribute);
      }
      if (attribute.usage === 'Descriptive') {
        descriptive.push(attribute);
      }
    });
  }
  attributes.defining = defining;
  attributes.descriptive = descriptive;
  return attributes;
}
// function transformBodyJSONResult(bodyData) {
//   const transformedPDPJson = {};
//   console.log(`>>>>>>>1212>>>>>>${JSON.stringify(bodyData)}`);
//   const productData = productDataSummarry(bodyData[0].catalogEntryView[0]);
//   transformedPDPJson.productData = productData;
//   transformedPDPJson.promotionData = bodyData[1].associatedPromotions || '';
//   return transformedPDPJson;
// }

// function productDataSummarry(productData) {
//   const productDataJson = {};
//   productDataJson.uniqueID = productData.uniqueID;
//   productDataJson.productName = productData.name;
//   productDataJson.partNumber = productData.partNumber;
//   productDataJson.parentCatalogEntryID = productData.parentCatalogEntryID;
//   productDataJson.keyword = productData.keyword;
//   if (productData.price && productData.price.length > 0) {
//     productData.price.forEach(price => {
//       if (price.usage === 'Display') {
//         productDataJson.actualPrice = price.value;
//       }
//       if (price.usage === 'Offer') {
//         productDataJson.offerPrice = price.value;
//       }
//     });
//   }
//   productDataJson.imageSrc = productData.thumbnail || '';
//   productDataJson.ribbonText = '';
//   productDataJson.emiData = '';
//   productDataJson.inStock = '';
//   productDataJson.attributes = getAttributes(productData.attributes);
//   return productDataJson;
// }

// function getAttributes(productAttribute) {
//   const attributes = {};
//   const defining = [];
//   const descriptive = [];
//   if (productAttribute && productAttribute.length > 0) {
//     productAttribute.forEach(attribute => {
//       if (attribute.usage === 'Defining') {
//         defining.push(attribute);
//       }
//       if (attribute.usage === 'Descriptive') {
//         descriptive.push(attribute);
//       }
//     });
//   }
//   attributes.defining = defining;
//   attributes.descriptive = descriptive;
//   return attributes;
// }
