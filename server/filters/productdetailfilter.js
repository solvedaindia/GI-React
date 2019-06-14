const sortJsonArray = require('sort-json-array');
const imagefilter = require('./imagefilter');

/**
 * Filter Product Details Data.
 * @return Product Details for PLP
 */
module.exports.productDetailSummary = productDetailForPLP;
function productDetailForPLP(productDetail) {
  const productDetailJson = {};
  productDetailJson.uniqueID = productDetail.uniqueID;
  productDetailJson.productName = productDetail.name;
  productDetailJson.partNumber = productDetail.partNumber;
  productDetailJson.parentUniqueID = productDetail.parentCatalogEntryID || '';
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
  productDetailJson.thumbnail = imagefilter.getImagePath(
    productDetail.thumbnail,
  );

  productDetailJson.emiData = '';
  productDetailJson.inStock = '';
  productDetailJson.shortDescription = productDetail.shortDescription || '';
  productDetailJson.promotionData = getSummaryPromotion(
    productDetail.promotionData,
  );
  const productAttribute = getProductAttributes(productDetail.attributes);
  productDetailJson.discount = productAttribute.discount;
  productDetailJson.ribbonText = productAttribute.ribbonText;
  if (productDetail.UserData && productDetail.UserData.length > 0) {
    productDetailJson.emiData = Number(productDetail.UserData[0].x_field1_i);
  }
  if (productDetailJson.discount > 0) {
    // eslint-disable-next-line radix
    productDetailJson.actualPrice = parseInt(
      (productDetailJson.offerPrice * 100) /
        (100 - Number(productDetailJson.discount)),
    );
  }
  productDetailJson.pageTitle = productDetail.seo_prop_pageTitle || '';
  productDetailJson.imageAltText = productDetail.seo_prop_imageAltText || '';
  productDetailJson.metaDescription =
    productDetail.seo_prop_metaDescription || '';
  // const fixedAttributes = getFixedAttributes(productDetail.attributes);
  // productDetailJson.fixedAttributes = fixedAttributes;
  // productDetailJson.primaryColor = getPrimaryColor(productDetail.attributes);
  return productDetailJson;
}

module.exports.getSummaryPromotion = getSummaryPromotion;
function getSummaryPromotion(promotionData) {
  let resPromotionData = '';
  if (promotionData && promotionData.length > 0) {
    // eslint-disable-next-line prefer-destructuring
    resPromotionData = promotionData[0].code.split('-')[0];
  }
  return resPromotionData;
}

module.exports.getSwatchData = getSwatchData;
function getSwatchData(productAttribueArray) {
  const swatchColor = [];
  if (productAttribueArray && productAttribueArray.length > 0) {
    const colorFacetArray = productAttribueArray.filter(
      eachAttribute => eachAttribute.identifier === 'fc',
    );
    if (colorFacetArray && colorFacetArray.length > 0) {
      colorFacetArray[0].values.forEach(color => {
        const tempJSON = {
          name: color.value,
          colorCode: color.image1,
          identifier: color.identifier,
        };
        swatchColor.push(tempJSON);
      });
    }
  }
  return swatchColor;
}

function getProductAttributes(attributes) {
  const productAttribute = {
    ribbonText: '',
    discount: '',
  };
  attributes.forEach(attribute => {
    if (attribute.identifier === 'percentOff') {
      productAttribute.discount = attribute.values[0].value;
    }
    if (attribute.identifier === 'Ribbon') {
      productAttribute.ribbonText = attribute.values[0].value;
    }
  });
  return productAttribute;
}

function getFixedAttributes(productAttribute) {
  const fixedAttribute = {};
  if (productAttribute && productAttribute.length > 0) {
    productAttribute
      .filter(
        attribute =>
          attribute.usage === 'Defining' &&
          attribute.identifier !== 'defaultSKU' &&
          attribute.identifier !== 'PrimaryColor',
      )
      .map(eachAttribute => {
        fixedAttribute[eachAttribute.identifier] =
          eachAttribute.values[0].value;
        return true;
      });
  }
  return fixedAttribute;
}

/**
 * Added this code
 * for Filter PDP Json Response
 */
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

module.exports.productDataSummary = productDataForPDP;
function productDataForPDP(bodyData) {
  const productDataSummary = {};
  if (bodyData[0].catalogEntryView.length > 0) {
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
    productDataSummary.purchaseGuide = getPurchaseGuide(
      productData.attachments,
    );
    productDataSummary.keywords = getKeywords(productData.keyword);
  }
  return productDataSummary;
}

/** *
 * This function will return product images and videos
 */
function getAttachments(attachments) {
  const productAttachment = [];
  if (attachments.length > 0) {
    for (let i = 0; i < attachments.length; i++) {
      const obj = {};
      if (
        attachments[i].usage === 'ANGLEIMAGES_FULLIMAGE' &&
        !attachments[i].name.includes('OVERLAY')
      ) {
        for (let j = 0; j < attachments.length; j++) {
          const lastChar = attachments[i].name[attachments[i].name.length - 1];
          if (
            attachments[j].usage === 'ANGLEIMAGES_THUMBNAIL' &&
            attachments[j].name.includes(lastChar)
          ) {
            obj.type = 'image';
            obj.fullImagePath = attachments[i].attachmentAssetPath;
            obj.thumbnailPath = attachments[j].attachmentAssetPath;
          }
          if (
            attachments[j].usage === 'ANGLEIMAGES_FULLIMAGE' &&
            attachments[j].name.includes(lastChar)
          ) {
            obj.fullScreenImagePath = attachments[j].attachmentAssetPath;
          }
        }
        productAttachment.push(obj);
      } else if (
        attachments[i].usage === 'MEDIA' &&
        !attachments[i].name.includes('purchaseGuide')
      ) {
        for (let j = 1; j < attachments.length; j++) {
          const lastChar = attachments[i].name[attachments[i].name.length - 1];
          if (
            attachments[j].usage === 'ANGLEIMAGES_THUMBNAIL' &&
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
  }
  return productAttachment;
}

/**
 * Function to return defining attributes for Itembean and productbean
 * @param {*} attributes
 */
function getDefAttributes(attributes) {
  const defAttributes = [];
  const matchColors = /(\(\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
  if (attributes.defining && attributes.defining.length > 0) {
    attributes.defining.forEach(attribute => {
      const attributeJson = {
        name: attribute.name,
        values: [],
      };
      attribute.values.forEach(attributeValue => {
        const match = matchColors.exec(attributeValue.image1);
        const attributeValueJSON = {};
        attributeValueJSON.name = attributeValue.value;
        if (match !== null) {
          attributeValueJSON.colorCode = attributeValue.image1 || '';
        } else {
          attributeValueJSON.facetImage = attributeValue.image1path || '';
        }
        attributeJson.values.push(attributeValueJSON);
      });
      defAttributes.push(attributeJson);
    });
  }
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
      let actualPrice;
      let offerPrice;
      skuDataJson.uniqueID = sku.uniqueID || '';
      skuDataJson.productName = sku.name || '';
      skuDataJson.partNumber = sku.partNumber || '';
      skuDataJson.parentCatalogEntryID = sku.parentCatalogEntryID || '';
      if (sku.UserData && sku.UserData.length > 0) {
        skuDataJson.emiData = Number(sku.UserData[0].x_field1_i);
      } else {
        skuDataJson.emiData = '';
      }
      skuDataJson.fullImagePath = getImagePath(sku.fullImage);
      skuDataJson.thumbImagePath = getImagePath(sku.thumbnail);
      skuDataJson.shortDescription = sku.shortDescription || '';
      if (sku.price && sku.price.length > 0) {
        sku.price.forEach(price => {
          if (price.usage === 'Display') {
            actualPrice = Number(price.value) || '';
          }
          if (price.usage === 'Offer') {
            offerPrice = Number(price.value) || '';
          }
        });
      }
      skuDataJson.actualPrice = actualPrice || '';
      skuDataJson.offerPrice = offerPrice || '';
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
  } else {
    ribbonText = '';
  }
  return ribbonText;
}

/**
 * Function to return product details for Productbean
 * @param {*} productDetailsAttributes;
 */
function getProductDetails(attributes, productAttachments) {
  const productDetailsJSON = {};
  const productDetailsList = [];
  if (productAttachments && productAttachments.length > 0) {
    productAttachments.forEach(attachment => {
      if (
        attachment.usage === 'IMAGES' &&
        attachment.name === 'productDetailImage'
      ) {
        productDetailsJSON.imagePath = attachment.attachmentAssetPath;
      }
    });
  } else {
    productDetailsJSON.imagePath = '';
  }

  if (attributes.descriptive && attributes.descriptive.length > 0) {
    const specificationValues = [];
    const tempArray = [];
    attributes.descriptive.forEach(attr => {
      if (attr.associatedKeyword === 'Specifications') {
        specificationValues.push({
          name: attr.name,
          value: attr.values[0].value,
        });
      }
      if (
        attr.name === 'Packaging' ||
        attr.associatedKeyword === 'CareInstructions' ||
        attr.name === 'Policies'
      ) {
        tempArray.push({
          title: attr.name,
          value: attr.values[0].value,
        });
      }
    });
    productDetailsList.push({
      title: 'Specifications',
      values: specificationValues || '',
    });

    tempArray.forEach(element => {
      productDetailsList.push({
        title: element.title,
        values: element.value || '',
      });
    });
  }
  productDetailsJSON.description = productDetailsList;
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
  attributes.defining = sortJsonArray(defining, 'sequence');
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
  // eslint-disable-next-line no-shadow
  const purchaseGuide = [
    {
      title: 'Product Videos',
      values: [],
    },
    {
      title: 'Test Videos',
      values: [],
    },
    {
      title: 'Comfort Meter',
      values: [],
    },
  ];
  const testImages = [];
  const testVideos = [];
  const productImages = [];
  const productVideos = [];
  const comfortImages = [];
  const comfortVideos = [];
  purchaseGuideData.forEach(element => {
    if (element.name.includes('purchaseGuide')) {
      const nameArray = element.name.split(':');
      if (nameArray[1] === 'ProductVideos') {
        if (element.usage === 'THUMBNAIL') {
          const temp = {
            type: 'video',
            seq: nameArray[2],
            thumbImagePath: element.attachmentAssetPath,
          };
          productImages.push(temp);
        }
        if (element.usage === 'MEDIA') {
          const temp = {
            seq: nameArray[2],
            path: element.attachmentAssetPath,
          };
          productVideos.push(temp);
        }
      }
      if (nameArray[1] === 'TestVideos') {
        if (element.usage === 'THUMBNAIL') {
          const temp = {
            type: 'video',
            seq: nameArray[2],
            thumbImagePath: element.attachmentAssetPath,
          };
          testImages.push(temp);
        }
        if (element.usage === 'MEDIA') {
          const temp = {
            seq: nameArray[2],
            path: element.attachmentAssetPath,
          };
          testVideos.push(temp);
        }
      }
      if (nameArray[1] === 'ComfortMeter') {
        if (element.usage === 'THUMBNAIL') {
          const temp = {
            type: 'video',
            seq: nameArray[2],
            thumbImagePath: element.attachmentAssetPath,
          };
          comfortImages.push(temp);
        }
        if (element.usage === 'MEDIA') {
          const temp = {
            seq: nameArray[2],
            path: element.attachmentAssetPath,
          };
          comfortVideos.push(temp);
        }
      }
    }
  });

  purchaseGuide[0].values = mergeImagesAndVideos(
    sortJsonArray(productImages, 'seq'),
    productVideos,
  );
  purchaseGuide[1].values = mergeImagesAndVideos(
    sortJsonArray(testImages, 'seq'),
    testVideos,
  );
  purchaseGuide[2].values = mergeImagesAndVideos(
    sortJsonArray(comfortImages, 'seq'),
    comfortVideos,
  );
  return purchaseGuide;
}

function mergeImagesAndVideos(imageArray, videoArray) {
  imageArray.forEach(image => {
    for (let index = 0; index < videoArray.length; index++) {
      if (image.seq === videoArray[index].seq) {
        Object.assign(image, videoArray[index]);
        delete image.seq;
      }
    }
  });
  return imageArray;
}
/**
 * Function to return similar products data for itembean
 */
function getSimilarProductsData(bodyData) {
  const mercAssociations = {};
  const similarProductsData = [];
  const combosYouLikeData = [];
  if (
    bodyData.merchandisingAssociations &&
    bodyData.merchandisingAssociations.length > 0
  ) {
    bodyData.merchandisingAssociations.forEach(element => {
      if (element.associationType === 'X-SELL') {
        similarProductsData.push(mercAssociationsDataForPDP(element));
      } else if (element.associationType === 'UPSELL') {
        combosYouLikeData.push(mercAssociationsDataForPDP(element));
      }
    });
  }
  mercAssociations.similarProducts = similarProductsData;
  mercAssociations.combosYouMayLike = combosYouLikeData;
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

function mercAssociationsDataForPDP(productDetail) {
  const productDetailJson = {};
  let actualPrice;
  let offerPrice;
  productDetailJson.uniqueID = productDetail.uniqueID || '';
  productDetailJson.productName = productDetail.name || '';
  productDetailJson.partNumber = productDetail.partNumber || '';
  if (productDetail.price && productDetail.price.length > 0) {
    productDetail.price.forEach(price => {
      if (price.usage === 'Display') {
        actualPrice = Number(price.value);
      }
      if (price.usage === 'Offer') {
        offerPrice = Number(price.value);
      }
    });
  }
  productDetailJson.actualPrice = actualPrice || '';
  productDetailJson.offerPrice = offerPrice || '';
  productDetailJson.onClickUrl = '';
  productDetailJson.seoUrl = '';
  productDetailJson.thumbnail = getImagePath(productDetail.thumbnail);
  const attributes = getAttributes(productDetail.attributes);
  productDetailJson.ribbonText = getRibbonText(attributes);
  if (productDetail.UserData && productDetail.UserData.length > 0) {
    productDetailJson.emiData = Number(productDetail.UserData[0].x_field1_i);
  } else {
    productDetailJson.emiData = 999;
  }
  productDetailJson.inStock = '';
  productDetailJson.discount = getDiscount(attributes) || '';
  productDetailJson.shortDescription = productDetail.shortDescription || '';
  // eslint-disable-next-line prefer-destructuring
  productDetailJson.promotionData = associatedPromo[0].name || '';
  return productDetailJson;
}

function getImagePath(imagePath) {
  if (imagePath) {
    const arr = imagePath.split('//');
    if (arr.length > 0) {
      return `/${arr[1]}`;
    }
  }
  return imagePath;
}
