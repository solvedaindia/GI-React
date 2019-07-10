const sortJsonArray = require('sort-json-array');
const imagefilter = require('./imagefilter');
// const swatchIdentifier = 'swatchcolor';
const swatchIdentifier = 'sc';
const rbgRegex = /(\(\d{1,3}),(\d{1,3}),(\d{1,3})\)/;

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
  productDetailJson.type = productDetail.catalogEntryTypeCode;
  productDetailJson.masterCategoryID = productDetail.masterCategoryId;
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
  /* productDetailJson.promotionData = getSummaryPromotion(
    productDetail.promotionData,
  ); */
  const productAttribute = getProductAttributes(productDetail.attributes);
  productDetailJson.discount = productAttribute.discount;
  productDetailJson.ribbonText = productAttribute.ribbonText;
  productDetailJson.installationRequired =
    productAttribute.installationRequired;
  if (productDetail.UserData && productDetail.UserData.length > 0) {
    productDetailJson.emiData = Number(productDetail.UserData[0].x_field1_i);
  }
  /* if (productDetailJson.discount > 0) {
    // eslint-disable-next-line radix
    productDetailJson.actualPrice = parseInt(
      (productDetailJson.offerPrice * 100) /
        (100 - Number(productDetailJson.discount)),
    );
  } */
  productDetailJson.pageTitle = productDetail.seo_prop_pageTitle || '';
  productDetailJson.imageAltText = productDetail.seo_prop_imageAltText || '';
  productDetailJson.metaDescription =
    productDetail.seo_prop_metaDescription || '';
  return productDetailJson;
}

module.exports.getSummaryPromotion = getSummaryPromotion;
function getSummaryPromotion(promotionData) {
  let resPromotionData = '';
  if (promotionData && promotionData.length > 0) {
    if (promotionData[0].code) {
      // eslint-disable-next-line prefer-destructuring
      resPromotionData = promotionData[0].code.split('-')[0];
    } else if (promotionData[0].name) {
      // eslint-disable-next-line prefer-destructuring
      resPromotionData = promotionData[0].name.split('-')[0];
    }
  }
  return resPromotionData;
}

module.exports.getSwatchData = getSwatchData;
function getSwatchData(productAttribueArray) {
  const swatchColor = [];
  if (productAttribueArray && productAttribueArray.length > 0) {
    for (let index = 0; index < productAttribueArray.length; index += 1) {
      if (productAttribueArray[index].identifier === swatchIdentifier) {
        productAttribueArray[index].values.forEach(color => {
          const tempJSON = {
            name: color.value,
          };
          if (rbgRegex.test(color.image1)) {
            tempJSON.colorCode = color.image1;
          } else {
            tempJSON.facetImage = imagefilter.getImagePath(color.image1path);
          }
          swatchColor.push(tempJSON);
        });
        break;
      }
    }
  }
  return swatchColor;
}

module.exports.getProductAttributes = getProductAttributes;
function getProductAttributes(attributes) {
  const productAttribute = {
    ribbonText: '',
    discount: '',
    installationRequired: '',
  };
  attributes.forEach(attribute => {
    if (attribute.identifier === 'percentOff') {
      productAttribute.discount = attribute.values[0].value;
    }
    if (attribute.identifier === 'Ribbon') {
      productAttribute.ribbonText = attribute.values[0].value;
    }
    if (attribute.identifier === 'ExtnIsInstallationReqd') {
      productAttribute.installationRequired = attribute.values[0].value;
    }
  });
  return productAttribute;
}

module.exports.getFixedAttribute = getFixedAttributes;
function getFixedAttributes(productAttribute) {
  const fixedAttribute = {};
  if (productAttribute && productAttribute.length > 0) {
    productAttribute.forEach(attribute => {
      if (
        attribute.usage === 'Defining' &&
        attribute.identifier !== swatchIdentifier
      ) {
        fixedAttribute[attribute.identifier] = attribute.values[0].value;
      }
    });
  }
  return fixedAttribute;
}

/**
 * Function to return defining and descriptive attributes for PDP
 * @param {*} productAttribute;
 */
module.exports.getAttributes = getAttributes;
function getAttributes(productData) {
  const attributes = {};
  const defining = [];
  const descriptive = [];
  if (productData.attributes && productData.attributes.length > 0) {
    productData.attributes.forEach(attribute => {
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

/**
 * Function to return defining attributes for Itembean and productbean
 * @param {*} attributes
 */
module.exports.getDefAttributes = getDefAttributes;
function getDefAttributes(attributes) {
  const defAttributes = [];
  if (attributes && attributes.length > 0) {
    attributes.forEach(attribute => {
      const attributeJson = {
        name: attribute.name,
        values: [],
      };
      attribute.values.forEach(attributeValue => {
        const match = rbgRegex.exec(attributeValue.image1);
        const attributeValueJSON = {};
        attributeValueJSON.name = attributeValue.value;
        if (match !== null) {
          attributeValueJSON.colorCode = attributeValue.image1 || '';
        } else {
          attributeValueJSON.facetImage =
            imagefilter.getImagePath(attributeValue.image1path) || '';
        }
        attributeJson.values.push(attributeValueJSON);
      });
      defAttributes.push(attributeJson);
    });
  }
  return defAttributes;
}

/**
 * Function to return product images and videos
 * @param {*} productData
 */
module.exports.getAttachments = getAttachments;
function getAttachments(productData) {
  const productAttachment = [];
  if (productData.attachments && productData.attachments.length > 0) {
    // eslint-disable-next-line prefer-destructuring
    const attachments = productData.attachments;
    for (let i = 0; i < attachments.length; i += 1) {
      const obj = {};
      if (
        attachments[i].usage === 'ANGLEIMAGES_FULLIMAGE' &&
        !attachments[i].name.includes('OVERLAY')
      ) {
        for (let j = 0; j < attachments.length; j += 1) {
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
        for (let j = 1; j < attachments.length; j += 1) {
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
 * Function to return product details for Productbean
 * @param {*} productDetailsAttributes;
 */
module.exports.getProductDetails = getProductDetails;
function getProductDetails(attributes, productData) {
  const productDetailsJSON = {};
  const productDetailsList = [];
  if (productData.attachments && productData.attachments.length > 0) {
    productData.attachments.forEach(attachment => {
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
    if (specificationValues.length > 0) {
      productDetailsList.push({
        title: 'Specifications',
        values: specificationValues || '',
      });
    }
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
 * Function to return Product Features
 * @param {*} attributes
 */
module.exports.getProductFeatures = getProductFeatures;
function getProductFeatures(attributes) {
  const featuresDummy = [];
  const featuresJson = [];
  if (attributes.descriptive && attributes.descriptive.length > 0) {
    attributes.descriptive.forEach(attr => {
      if (attr.associatedKeyword === 'Features') {
        featuresDummy.push(attr);
      }
    });
  }

  if (featuresDummy && featuresDummy.length > 0) {
    featuresDummy.forEach(element => {
      if (element.name.includes('Feature') && !element.name.includes('Image')) {
        const featuresData = {
          title: '',
          description: '',
          imagePath: '',
        };
        const elementList = element.name.split(' ');
        featuresData.title = element.values[0].value;
        featuresDummy.forEach(ele => {
          if (
            ele.name.includes(elementList[1]) &&
            ele.name.includes('Description')
          ) {
            featuresData.description = ele.values[0].value;
          }

          if (
            ele.name.includes(elementList[1]) &&
            element.name.includes('Image')
          ) {
            featuresData.imagePath = ele.values[0].value;
          }
        });
        featuresJson.push(featuresData);
      }
    });
  }
  return featuresJson;
}

/**
 * Function to return purchase guide data for Productbean
 * @param {*} purchaseGuideData
 */
module.exports.getPurchaseGuide = getPurchaseGuide;
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

  if (purchaseGuide.attachments && purchaseGuide.attachments.length > 0) {
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
  }
  return purchaseGuide;
}

function mergeImagesAndVideos(imageArray, videoArray) {
  imageArray.forEach(image => {
    for (let index = 0; index < videoArray.length; index += 1) {
      if (image.seq === videoArray[index].seq) {
        Object.assign(image, videoArray[index]);
        // eslint-disable-next-line no-param-reassign
        delete image.seq;
      }
    }
  });
  return imageArray;
}

/**
 * Function to return keywords
 * @param {*} bodyData
 */
module.exports.getKeywords = getKeywords;
function getKeywords(bodyData) {
  let keywordArray = [];
  try {
    keywordArray = bodyData.split(',');
    return keywordArray;
  } catch (err) {
    return keywordArray;
  }
}
