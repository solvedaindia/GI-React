const async = require('async');
const errorUtils = require('../utils/errorutils');
const logger = require('../utils/logger.js');
const productUtil = require('../utils/productutil');
const promotionUtil = require('../utils/promotionutil');
const pdpfilter = require('../filters/productdetailfilter');

const associatedPromo = [
  {
    code: 'AmountOff_PromotionName-10000051',
    endDate: '9999-12-31 23:59:59.999',
    description: null,
    associatePromotionId: '30051',
    startDate: '2019-04-18 00:00:00.0',
  },
  {
    code: 'PecentageOff_CatalogEntry-10000055',
    endDate: '9999-12-31 23:59:59.999',
    description: null,
    associatePromotionId: '30055',
    startDate: '2019-04-18 00:00:00.0',
  },
];
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

  productUtil.productByProductID(productID, reqHeaders, (err, result) => {
    if (err) {
      callback(errorUtils.handleWCSError(err));
    } else {
      logger.debug('Got all the origin resposes for Product Detail');
      callback(null, productSummaryJson(result));
    }
  });

  // callback(null, transformJSON(prodDetails));
  // async.parallel(
  //   [
  //     productDetails.bind(null, reqHeaders, productID),
  //     // promotionDetails.bind(null, reqHeaders, productID),
  //   ],
  //   (err, result) => {
  //     if (err) {
  //       callback(errorUtils.handleWCSError(err));
  //     } else {
  //       logger.debug('Got all the origin resposes for Product Detail');
  //       callback(null, transformJSON(result));
  //     }
  //   },
  // );
};

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

function productSummaryJson(bodyData) {
  const productDataSummary = {};
  const productData = bodyData.catalogEntryView[0];
  productDataSummary.uniqueID = productData.uniqueID;
  const attributes = getAttributes(productData.attributes);
  productDataSummary.defAttributes = getDefAttributes(attributes);
  productDataSummary.productDetails = {};
  if (attributes.descriptive && attributes.descriptive.length > 0) {
    attributes.descriptive.forEach(descriptive => {
      if (descriptive.identifier === 'productDetail') {
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
      productDataSummary.productFeatures = jsonParse.Features;
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
  const productAttachment = [];
  let i;
  let j;
  for (i = 0; i < attachments.length; i++) {
    if (attachments[i].usage === 'ANGLEIMAGES_FULLIMAGE') {
      for (j = 1; j < attachments.length; j++) {
        if (
          attachments[j].usage === 'ANGLEIMAGES_THUMBNAIL' &&
          attachments[j].name === attachments[i].name
        ) {
          productAttachment.push({
            type: 'image',
            fullImagePath: attachments[i].attachmentAssetPath,
            thumbnailPath: attachments[j].attachmentAssetPath,
          });
          break;
        }
      }
    } else if (
      attachments[i].usage === 'IMAGES' &&
      attachments[i].name !== 'productDetailImage'
    ) {
      productAttachment.push({
        type: 'video',
        name: attachments[i].name,
        path: `${attachments[i].attachmentAssetPath}/${attachments[i].image}`,
      });
    }
  }
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
      const colorValues = [];
      attribute.values.forEach(element => {
        colorValues.push({
          name: element.value,
          facetImage: element.image1path || '',
          colorCode: element.colorCode || '',
        });
      });
      defAttributes.push({ name: attribute.name, values: colorValues });
    } else if (attribute.identifier === 'materialSwatch') {
      const materialValues = [];
      attribute.values.forEach(element => {
        materialValues.push({
          name: element.value,
          facetImage: element.image1path || '',
        });
      });
      defAttributes.push({ name: attribute.name, values: materialValues });
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
      skuDataJson.emiData = Number(sku.x_field1_i) || '';
      skuDataJson.fullImagePath = sku.fullImage || '';
      skuDataJson.thumbImagePath = sku.thumbnail || '';
      if (sku.price && sku.price.length > 0) {
        sku.price.forEach(price => {
          if (price.usage === 'Display') {
            skuDataJson.actualPrice = Number(price.value);
          }
          if (price.usage === 'Offer') {
            skuDataJson.offerPrice = Number(price.value);
          }
        });
      }
      const attributes = getAttributes(sku.attributes);
      if (attributes.descriptive && attributes.descriptive.length > 0) {
        attributes.descriptive.forEach(descriptive => {
          if (descriptive.storeDisplay === true) {
            skuDataJson.ribbonText = descriptive.values[0].value;
          }
        });
      }
      skuDataJson.discount = getDiscount(attributes);
      skuDataJson.defAttributes = getDefAttributes(attributes);
      skuDataJson.attachments = getAttachments(sku.attachments);
      skuDataJson.promotions = associatedPromo || '';
      // const similarProducts = getSimilarProductsData(bodyData);
      // skuDataJson.similarProducts = similarProducts.similarProducts || '';
      // skuDataJson.combosYouMayLike = similarProducts.combosYouMayLike || '';
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
      if (
        element.usage === 'MEDIA' &&
        element.name.includes('purchaseGuideTab')
      ) {
        let innerList = [];
        innerList = element.name.split(':');
        purchaseGuide.push({
          title: innerList[1] || '',
          thumbImagePath: `${element.attachmentAssetPath}/${element.image}`,
          path: '',
        });
      }
    });
  }
  return purchaseGuide;
}

/**
 * Function to return similar products data for itembean
 */
function getSimilarProductsData(bodyData) {
  const mercAssociations = {};
  bodyData.merchandisingAssociations.forEach(element => {
    if (element.associationType === 'X-SELL') {
      const similarProductsData = [];
      element.sKUs.forEach(sku => {
        similarProductsData.push(pdpfilter.productDetailSummary(sku));
      });
      // const similarProductsData = getSkuData(element, 'false');
      mercAssociations.similarProducts = similarProductsData;
    } else if (element.associationType === 'UPSELL') {
      const combosYouLikeData = [];
      element.sKUs.forEach(sku => {
        combosYouLikeData.push(pdpfilter.productDetailSummary(sku));
      });
      // const combosYouLikeData = getSkuData(element, 'false');
      mercAssociations.combosYouMayLike = combosYouLikeData;
    }
  });
  return mercAssociations;
}
