const async = require('async');
const errorUtils = require('../utils/errorutils');
const logger = require('../utils/logger.js');
const productUtil = require('../utils/productutil');
const promotionUtil = require('../utils/promotionutil');
const pdpfilter = require('../filters/productdetailfilter');

const associatedPromo = [
  {
    name: 'Free accessories',
    description: null,
  },
  {
    name: 'Cashback Offer',
    description:
      'Get 10% cashback upto Rs 500 on Purchases on 1499. For limited period only.',
  },
  {
    name: 'Coupon Offer',
    description: 'Use coupon FIRSTBUY and get 599 off.',
  },
];

const purchaseGuide = [
  {
    title: 'Product Videos',
    values: [
      {
        type: 'video',
        thumbImagePath:
          '/images/godrejInterio/pdp/sofa/productDetail/video/thumbnail/thumbnail_1_1.png',
        path: '/images/godrejInterio/pdp/sofa/productDetail/video/video_1.mp4',
      },
      {
        type: 'video',
        thumbImagePath:
          '/images/godrejInterio/pdp/sofa/productDetail/video/thumbnail/thumbnail_2_1.png',
        path: '/images/godrejInterio/pdp/sofa/productDetail/video/video_5.mp4',
      },
      {
        type: 'video',
        thumbImagePath:
          '/images/godrejInterio/pdp/sofa/productDetail/video/thumbnail/thumbnail_1_1.png',
        path: '/images/godrejInterio/pdp/sofa/productDetail/video/video_1.mp4',
      },
    ],
  },
  {
    title: 'Test Videos',
    values: [
      {
        type: 'video',
        thumbImagePath:
          '/images/godrejInterio/pdp/sofa/productDetail/video/thumbnail/thumbnail_1_2.png',
        path: '/images/godrejInterio/pdp/sofa/productDetail/video/video_2.mp4',
      },
      {
        type: 'video',
        thumbImagePath:
          '/images/godrejInterio/pdp/sofa/productDetail/video/thumbnail/thumbnail_2_2.png',
        path: '/images/godrejInterio/pdp/sofa/productDetail/video/video_6.mp4',
      },
      {
        type: 'video',
        thumbImagePath:
          '/images/godrejInterio/pdp/sofa/productDetail/video/thumbnail/thumbnail_1_2.png',
        path: '/images/godrejInterio/pdp/sofa/productDetail/video/video_2.mp4',
      },
    ],
  },
  {
    title: 'Comfort Meter',
    values: [
      {
        type: 'video',
        thumbImagePath:
          '/images/godrejInterio/pdp/sofa/productDetail/video/thumbnail/thumbnail_1_3.png',
        path: '/images/godrejInterio/pdp/sofa/productDetail/video/video_3.mp4',
      },
      {
        type: 'video',
        thumbImagePath:
          '/images/godrejInterio/pdp/sofa/productDetail/video/thumbnail/thumbnail_2_3.png',
        path: '/images/godrejInterio/pdp/sofa/productDetail/video/video_7.mp4',
      },
      {
        type: 'video',
        thumbImagePath:
          '/images/godrejInterio/pdp/sofa/productDetail/video/thumbnail/thumbnail_1_3.png',
        path: '/images/godrejInterio/pdp/sofa/productDetail/video/video_3.mp4',
      },
    ],
  },
];

/**
 * Function for PLP Data
 * @param
 * @returns
 * @throws
 */
module.exports.getProductDetails = function getProductDetailsData(
  req,
  callback,
) {
  logger.debug('Inside the GET PDP Data Method');
  if (!req.params.productId) {
    logger.debug('GET PDP Data :: Invalid Params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }

  const reqHeaders = req.headers;
  const productID = req.params.productId;

  // productUtil.productByProductID(productID, reqHeaders, (err, result) => {
  //   if (err) {
  //     callback(errorUtils.handleWCSError(err));
  //   } else {
  //     logger.debug('Got all the origin resposes for Product Detail');
  //     callback(null, productSummaryJson(reqHeaders, result));
  //   }
  // });

  // callback(null, transformJSON(prodDetails));
  async.parallel(
    [
      productDetails.bind(null, reqHeaders, productID),
      promotionDetails.bind(null, reqHeaders, productID),
    ],
    (err, result) => {
      if (err) {
        callback(errorUtils.handleWCSError(err));
      } else {
        logger.debug('Got all the origin resposes for Product Detail');
        callback(null, productSummaryJson(result));
      }
    },
  );
};

module.exports.getAssociatedProducts = function associatedProducts(
  req,
  callback,
) {
  logger.debug('Inside the Associated Products data Method');
  if (!req.params.skuId) {
    logger.debug('GET PDP Data :: Invalid Params');
    callback(errorUtils.errorlist.invalid_params);
  }

  const reqHeaders = req.headers;
  const skuID = req.params.skuId;

  productUtil.productByProductID(skuID, reqHeaders, (err, result) => {
    if (err) {
      callback(errorUtils.handleWCSError(err));
    } else {
      logger.debug('Got all the origin resposes for Product Detail');
      callback(null, result);
    }
  });
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
  promotionUtil.getMultiplePromotions(ProductID, header, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}

function productSummaryJson(bodyData) {
  const productDataSummary = {};
  const productData = bodyData[0].catalogEntryView[0];
  productDataSummary.uniqueID = productData.uniqueID;
  productDataSummary.type = 'product';
  const attributes = getAttributes(productData.attributes);
  productDataSummary.defAttributes = getDefAttributes(attributes);
  productDataSummary.skuData = getSkuData(productData);
  productDataSummary.productDetails = getProductDetails(
    attributes,
    productData.attachments,
  );
  productDataSummary.productFeatures = getProductFeatures(attributes);
  productDataSummary.purchaseGuide = purchaseGuide;
  productDataSummary.keywords = getKeywords(productData.keyword);
  return productDataSummary;
}

/** *
 * This function will return product images and videos
 */
function getAttachments(attachments) {
  const productAttachment = [];
  for (let i = 0; i < attachments.length; i++) {
    if (attachments[i].usage === 'ANGLEIMAGES_FULLIMAGE') {
      for (let j = 1; j < attachments.length; j++) {
        const lastChar = attachments[i].name[attachments[i].name.length - 1];
        if (
          attachments[j].usage === 'THUMBNAIL' &&
          attachments[j].name.includes(lastChar)
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
      attachments[i].usage === 'MEDIA' &&
      !attachments[i].name.includes('purchaseGuide')
    ) {
      for (let j = 1; j < attachments.length; j++) {
        const lastChar = attachments[i].name[attachments[i].name.length - 1];
        if (
          attachments[j].usage === 'THUMBNAIL' &&
          attachments[j].name.includes(lastChar)
        ) {
          productAttachment.push({
            type: 'video',
            thumbnailPath: attachments[j].attachmentAssetPath,
            videoPath: attachments[i].attachmentAssetPath,
          });
          break;
        }
      }
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
    const attributeJson = {
      name: attribute.name,
      values: [],
    };
    attribute.values.forEach(attributeValue => {
      const attributeValueJSON = {
        name: attributeValue.value,
        facetImage: attributeValue.image1path || '',
        colorCode: attributeValue.image1 || '',
      };
      attributeJson.values.push(attributeValueJSON);
    });
    defAttributes.push(attributeJson);
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
      if (sku.UserData && sku.UserData.length > 0) {
        skuDataJson.emiData = Number(sku.UserData[0].x_field1_i);
      }
      skuDataJson.fullImagePath = sku.fullImage || '';
      skuDataJson.thumbImagePath = sku.thumbnail || '';
      skuDataJson.shortDescription = sku.shortDescription || '';
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
      skuDataJson.ribbon = getRibbonText(attributes) || '';
      skuDataJson.discount = getDiscount(attributes);
      skuDataJson.defAttributes = getDefAttributes(attributes);
      try {
        const attachment = getAttachments(sku.attachments);
        skuDataJson.attachments = attachment;
      } catch (err) {
        skuDataJson.attachments = '';
      }
      skuDataJson.promotions = associatedPromo || '';
      const similarProducts = getSimilarProductsData(bodyData);
      skuDataJson.similarProducts = similarProducts.similarProducts || '';
      skuDataJson.combos = similarProducts.combosYouMayLike || '';
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
  if (attributes.descriptive && attributes.descriptive.length > 0) {
    attributes.descriptive.forEach(descriptive => {
      if (descriptive.name === 'percentOff') {
        discount = descriptive.values[0].value;
      }
    });
  } else {
    discount = '';
  }
  return discount;
}

/**
 * Function to return ribbon text
 */
function getRibbonText(attributes) {
  let ribbonText;
  if (attributes.descriptive && attributes.descriptive.length > 0) {
    attributes.descriptive.forEach(descriptive => {
      if (descriptive.name === 'Ribbon') {
        ribbonText = descriptive.values[0].value;
      }
    });
  }
  return ribbonText;
}

/**
 * Function to return product details for Productbean
 * @param {*} productDetailsAttributes;
 */
function getProductDetails(attributes, productAttachments) {
  const productDetailsJSON = {};
  if (productAttachments && productAttachments.length > 0) {
    productAttachments.forEach(attachment => {
      if (
        attachment.usage === 'IMAGES' &&
        attachment.name === 'productDetailImage'
      ) {
        productDetailsJSON.imagePath = attachment.attachmentAssetPath || '';
      }
    });
  }

  if (attributes.descriptive && attributes.descriptive.length > 0) {
    const productDetailsList = [];
    const specificationValues = [];
    attributes.descriptive.forEach(attr => {
      if (attr.associatedKeyword === 'Specifications') {
        specificationValues.push({
          name: attr.name,
          value: attr.values[0].value,
        });
      }
      if (
        attr.associatedKeyword === 'CareInstructions' ||
        attr.name === 'Packaging' ||
        attr.name === 'Policies'
      ) {
        productDetailsList.push({
          title: attr.name,
          values: attr.values[0].value,
        });
      }
    });
    productDetailsList.push({
      title: 'Specificactions',
      values: specificationValues || '',
    });
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
  const purchaseGuideDummy = [];
  purchaseGuideData.forEach(element => {
    if (
      (element.usage === 'MEDIA' || element.usage === 'THUMBNAIL') &&
      element.name.includes('purchaseGuideTab')
    ) {
      purchaseGuideDummy.push(element);
    }
  });
  // if (purchaseGuideData && purchaseGuideData.length > 0) {
  //   purchaseGuideData.forEach(element => {
  //     if (
  //       element.usage === 'MEDIA' &&
  //     ) {
  //       let innerList = [];
  //       innerList = element.name.split(':');
  //       purchaseGuide.push({
  //         title: innerList[1] || '',
  //         thumbImagePath: `${element.attachmentAssetPath}/${element.image}`,
  //         path: '',
  //       });
  //     }
  //   });
  // }
  return null;
}

/**
 * Function to return similar products data for itembean
 */
function getSimilarProductsData(bodyData) {
  const mercAssociations = {};
  if (bodyData.merchandisingAssociations)
    bodyData.merchandisingAssociations.forEach(element => {
      if (element.associationType === 'X-SELL') {
        const similarProductsData = [];
        element.sKUs.forEach(sku => {
          similarProductsData.push(productDetailForPLP(sku));
        });
        mercAssociations.similarProducts = similarProductsData;
      } else if (element.associationType === 'UPSELL') {
        const combosYouLikeData = [];
        element.sKUs.forEach(sku => {
          combosYouLikeData.push(productDetailForPLP(sku));
        });
        // const combosYouLikeData = getSkuData(element, 'false');
        mercAssociations.combosYouMayLike = combosYouLikeData;
      }
    });
  return mercAssociations;
}

/**
 * Function to return Product Features
 */
function getProductFeatures(attributes) {
  const featuresDummy = [];
  const featuresJson = [];
  attributes.descriptive.forEach(attr => {
    if (attr.associatedKeyword === 'Features') {
      featuresDummy.push(attr);
    }
  });

  if (featuresDummy && featuresDummy.length > 0) {
    const featureHeading = [];
    const featureDesc = [];
    const featureImage = [];

    featuresDummy.forEach(element => {
      if (element.name.includes('Feature') && !element.name.includes('Image')) {
        featureHeading.push(element);
      }
      if (element.name.includes('Description')) {
        featureDesc.push(element);
      }
      if (element.name.includes('Image')) {
        featureImage.push(element);
      }
    });

    featureHeading.forEach(head => {
      const elementList = head.name.split(' ');
      const featuresData = {};
      featuresData.title = head.values[0].value;
      // eslint-disable-next-line no-restricted-syntax
      for (const desc of featureDesc) {
        if (desc.name.includes(elementList[1])) {
          featuresData.description = desc.values[0].value;
          break;
        }
      }
      // eslint-disable-next-line no-restricted-syntax
      for (const image of featureImage) {
        if (image.name.includes(elementList[1])) {
          featuresData.imagePath = image.values[0].value;
          break;
        }
      }
      featuresJson.push(featuresData);
    });
  }
  return featuresJson;
}

function productDetailForPLP(productDetail) {
  const productDetailJson = {};
  productDetailJson.uniqueID = productDetail.uniqueID;
  productDetailJson.productName = productDetail.name;
  productDetailJson.partNumber = productDetail.partNumber;
  if (productDetail.price && productDetail.price.length > 0) {
    productDetail.price.forEach(price => {
      if (price.usage === 'Display') {
        productDetailJson.actualPrice = Number(price.value);
      }
      if (price.usage === 'Offer') {
        productDetailJson.offerPrice = Number(price.value);
      }
    });
  }
  productDetailJson.onClickUrl = '';
  productDetailJson.seoUrl = '';
  productDetailJson.thumbnail = productDetail.thumbnail || '';
  const attributes = getAttributes(productDetail.attributes);
  productDetailJson.ribbonText = getRibbonText(attributes);
  productDetailJson.emiData = productDetail.UserData[0].x_field1_i;
  if (productDetail.UserData && productDetail.UserData.length > 0) {
    productDetailJson.emiData = Number(productDetail.UserData[0].x_field1_i);
  }
  productDetailJson.inStock = '';
  if (attributes.defining && attributes.defining.length > 0) {
    attributes.defining.forEach(defining => {
      if (defining.name === 'percentOff') {
        productDetailJson.discount = defining.values[0].value;
      }
    });
  }
  productDetailJson.shortDescription = productDetail.shortDescription || '';
  // eslint-disable-next-line prefer-destructuring
  productDetailJson.promotionData = associatedPromo[0].name;
  return productDetailJson;
}
