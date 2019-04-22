const async = require('async');
const errorUtils = require('../utils/errorutils');
const logger = require('../utils/logger.js');
const productUtil = require('../utils/productutil');
const promotionUtil = require('../utils/promotionutil');

/**
 * Function for PLP Data
 * @param
 * @returns
 * @throws
 */
module.exports.getProductDetails = function getProductDetails(req, callback) {
  logger.debug('Inside the GET PDP Data Method');
  if (!req.params.productId) {
    logger.debug('GET PDP Data :: Invalid Params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }

  const reqHeaders = req.headers;
  const productID = req.params.productId;

  // callback(null, transformJSON(prodDetails));
  async.parallel(
    [
      productDetails.bind(null, reqHeaders, productID),
      // promotionDetails.bind(null, reqHeaders, productID),
    ],
    (err, result) => {
      if (err) {
        callback(errorUtils.handleWCSError(err));
      } else {
        logger.debug('Got all the origin resposes for Product Detail');
        callback(null, transformJSON(result));
      }
    },
  );
};

/** Product Details */
function productDetails(header, productID, callback) {
  productUtil.productByProductID(productID, header, (err, result) => {
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
  const productData = productSummary(bodyData[0].catalogEntryView[0]);
  transformPDPJSON.productData = productData;
  return transformPDPJSON;
}

function productSummary(productData) {
  const productDataSummary = {};
  productDataSummary.uniqueID = productData.uniqueID;
  productDataSummary.productName = productData.name;
  productDataSummary.partNumber = productData.partNumber;
  productDataSummary.parentCatalogEntryID = productData.parentCatalogEntryID;
  productDataSummary.defaultQuantity = '1';
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
  productDataSummary.percentOff = getDiscount(attributes);
  productDataSummary.attachments = getAttachments(productData.attachments);
  productDataSummary.defAttributes = getDefAttributes(attributes);
  productDataSummary.productDetails = {};
  if (attributes.descriptive && attributes.descriptive.length > 0) {
    attributes.descriptive.forEach(descriptive => {
      if (descriptive.storeDisplay === true) {
        productDataSummary.ribbonText = descriptive.values[0].value;
      } else if (descriptive.identifier === 'productDetail') {
        productDataSummary.productDetails = getProductDetails(
          descriptive.values[0],
          productData.attachments,
        );
      }
    });
  }
  if (productData.sKUs && productData.sKUs.length > 0) {
    productDataSummary.skuData = getSkuData(productData);
    const features = productData.sKUs[0].UserData[0].x_auxDescription1;
    try {
      const jsonParse = JSON.parse(features);
      productDataSummary.features = jsonParse.Features;
    } catch (err) {
      logger.error();
      productDataSummary.features = [];
    }
  }
  productDataSummary.purchaseGuide = getPurchaseGuide(productData.attachments);
  productDataSummary.keywords = getKeywords(productData.keyword);
  return productDataSummary;
}

/** *
 * This function will return product images and videos
 */
function getAttachments(attachments) {
  const productAttachment = {};
  const productImages = [];
  const productVideos = [];
  let i;
  let j;
  for (i = 0; i < attachments.length; i++) {
    if (attachments[i].usage === 'ANGLEIMAGES_FULLIMAGE') {
      for (j = 1; j < attachments.length; j++) {
        if (
          attachments[j].usage === 'ANGLEIMAGES_THUMBNAIL' &&
          attachments[j].name === attachments[i].name
        ) {
          const productImageJson = {};
          productImageJson.name = attachments[i].name;
          productImageJson.imagePath = attachments[i].attachmentAssetPath;
          productImageJson.thumbnailPath = attachments[j].attachmentAssetPath;
          productImages.push(productImageJson);
          break;
        }
      }
    } else if (
      attachments[i].usage === 'IMAGES' &&
      attachments[i].name !== 'productDetailImage'
    ) {
      const productVideoJson = {};
      productVideoJson.name = attachments[i].name;
      productVideoJson.path = `${attachments[i].attachmentAssetPath}/${
        attachments[i].image
      }`;
      productVideos.push(productVideoJson);
    }
  }
  productAttachment.productImages = productImages;
  productAttachment.productVideos = productVideos;
  return productAttachment;
}

/**
 * Function to return defining attributes for Itembean and productbean
 * @param {*} attributes
 */
function getDefAttributes(attributes) {
  const defAttributes = [];
  attributes.defining.forEach(attribute => {
    if (attribute.identifier === 'colorSwatch') {
      const colorSwatchJSON = {};
      const colorValues = [];
      attribute.values.forEach(value => {
        colorValues.push(value);
      });
      colorSwatchJSON.name = attribute.name;
      colorSwatchJSON.values = colorValues;
      defAttributes.push(colorSwatchJSON);
    } else if (attribute.identifier === 'materialSwatch') {
      const materialSwatchJSON = {};
      const materialValues = [];
      attribute.values.forEach(value => {
        materialValues.push(value);
      });
      materialSwatchJSON.name = attribute.name;
      materialSwatchJSON.values = materialValues;
      defAttributes.push(materialSwatchJSON);
    }
  });
  return defAttributes;
}

/**
 * Function to return SKU data for PDP
 * @param {*} bodyData
 */
function getSkuData(bodyData) {
  const skuData = [];
  if (bodyData.sKUs && bodyData.sKUs.length > 0) {
    bodyData.sKUs.forEach(sku => {
      const skuDataJson = {};
      skuDataJson.uniqueID = sku.uniqueID;
      skuDataJson.productName = sku.name;
      skuDataJson.partNumber = sku.partNumber;
      skuDataJson.parentCatalogEntryID = sku.parentCatalogEntryID;
      skuDataJson.defaultQuantity = '1';
      skuDataJson.emiData = sku.x_field1_i;
      if (sku.price && sku.price.length > 0) {
        sku.price.forEach(price => {
          if (price.usage === 'Display') {
            skuDataJson.actualPrice = price.value;
          }
          if (price.usage === 'Offer') {
            skuDataJson.offerPrice = price.value;
          }
        });
      }
      const attributes = getAttributes(sku.attributes);
      skuDataJson.percentOff = getDiscount(attributes);
      skuDataJson.defAttributes = getDefAttributes(attributes);
      skuDataJson.attachments = getAttachments(sku.attachments);
      const similarProducts = getSimilarProductsData(bodyData);
      skuDataJson.similarProducts = similarProducts.similarProductsData || '';
      skuDataJson.combosYouMayLike = similarProducts.combosYouLikeData || '';
      skuData.push(skuDataJson);
    });
  }
  return skuData;
}

/**
 * Function to return dicount for Productbean and Itembean
 * @param {*} attributes
 */
function getDiscount(attributes) {
  let discount;
  if (attributes.defining && attributes.defining.length > 0) {
    attributes.defining.forEach(defining => {
      if (defining.identifier === 'percentOff') {
        discount = defining.values[0].value;
      }
    });
  }
  return discount;
}

/**
 * Function to return product details for Productbean
 * @param {*} productDetailsAttributes;
 */
function getProductDetails(productDetailsValues, productAttachments) {
  const productDetailsJSON = {};
  if (productAttachments && productAttachments.length > 0) {
    productAttachments.forEach(attachment => {
      if (
        attachment.usage === 'IMAGES' &&
        attachment.name === 'productDetailImage'
      ) {
        productDetailsJSON.imagePath = `${attachment.attachmentAssetPath}/${
          attachment.image
        }`;
      }
    });
  }

  if (productDetailsValues) {
    const productDetailsList = [];
    const value = productDetailsValues.value;
    try {
      const jsonParse = JSON.parse(value);
      jsonParse.ProductDetails.forEach(element => {
        const productDetailsJson = {};
        const productDataList = [];
        const innerList = element.description.split(',');
        for (let i = 0; i < innerList.length; i++) {
          const valueList = innerList[i].split(':');
          const prodJson = {};
          prodJson.name = valueList[0];
          prodJson.value = valueList[1];
          productDataList.push(prodJson);
        }
        productDetailsJson.title = element.name;
        productDetailsJson.values = productDataList;
        productDetailsList.push(productDetailsJson);
      });
    } catch (err) {
      console.log(err);
    }

    // productDetailsValues.forEach(product => {
    //   const productDetailObject = {};
    //   let innerList = [];
    //   const valuesList = [];
    //   innerList = product.value.split(':');
    //   for (let i = 1; i < innerList.length; i += 2) {
    //     const valuesObject = {};
    //     valuesObject.name = innerList[i];
    //     valuesObject.value = innerList[i + 1] || '';
    //     valuesList.push(valuesObject);
    //   }
    //   productDetailObject.title = innerList[0] || '';
    //   productDetailObject.values = valuesList;
    //   productDetailsList.push(productDetailObject);
    // });
    productDetailsJSON.description = productDetailsList;
  }
  return productDetailsJSON;
}

/**
 * Function to return defining and descriptive attributes for Productbean and Itembean
 * @param {*} productAttribute;
 */
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

/** *
 * Function to return keywords for Productbean
 */
function getKeywords(bodyData) {
  const keywords = [];
  const keywordArray = bodyData.split(',');
  keywordArray.forEach(keyword => {
    keywords.push(keyword);
  });
  return keywords;
}

/** *
 * Function to return purchase guide data for Productbean
 */
function getPurchaseGuide(purchaseGuideData) {
  const purchaseGuide = [];
  if (purchaseGuideData && purchaseGuideData.length > 0) {
    purchaseGuideData.forEach(element => {
      if (element.usage === 'MEDIA') {
        if (element.name.includes('purchaseGuideTab')) {
          const purchaseGuideObject = {};
          let innerList = [];
          innerList = element.name.split(':');
          purchaseGuideObject.tab = innerList[0] || '';
          purchaseGuideObject.title = innerList[1] || '';
          purchaseGuideObject.imagePath = `${element.attachmentAssetPath}/${
            element.image
          }`;
          purchaseGuide.push(purchaseGuideObject);
        }
      }
    });
  }
  return purchaseGuide;
}

/**
 * Function to return similar products data for itembean
 */
function getSimilarProductsData(bodyData) {
  const similarProducts = [];
  const similarProductsData = {};
  const combosYouLikeData = {};
  bodyData.merchandisingAssociations.forEach(element => {
    if (element.associationType === 'X-SELL') {
      //similarProducts = getSkuData(bodyData.merchandisingAssociations);
      console.log(element.associationType);
    } else if (element.associationType === 'UPSELL') {
      console.log(element.associationType);
    }
  });
  similarProducts.push(similarProductsData);
  similarProducts.push(combosYouLikeData);
  return similarProducts;
}
