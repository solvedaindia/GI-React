const sortJsonArray = require('sort-json-array');
const imagefilter = require('./imagefilter');
const swatchIdentifier = 'SWATCHCOLOR';
const rbgRegex = /(\(\d{1,3}),(\d{1,3}),(\d{1,3})\)/;

/**
 * Filter Product Details Data.
 * @return Product Details for PLP
 */
module.exports.productDetailSummary = productDetailForPLP;
function productDetailForPLP(productDetail) {
  const productDetailJson = {};
  if (productDetail) {
    productDetailJson.uniqueID = productDetail.uniqueID;
    productDetailJson.productName = productDetail.name;
    productDetailJson.partNumber = productDetail.partNumber;
    productDetailJson.type = productDetail.catalogEntryTypeCode;
    productDetailJson.masterCategoryID = productDetail.masterCategoryId;
    productDetailJson.parentUniqueID = productDetail.parentCatalogEntryID || '';
    productDetailJson.actualPrice = '';
    productDetailJson.offerPrice = '';
    if (productDetail.price && productDetail.price.length > 0) {
      productDetail.price.forEach(price => {
        if (price.usage === 'Display' && price.value !== '') {
          productDetailJson.actualPrice = parseFloat(price.value);
        }
        if (price.usage === 'Offer' && price.value !== '') {
          productDetailJson.offerPrice = parseFloat(price.value);
        }
      });
    }
    const thumbnailObject = imagefilter.getThumbnailImages(
      productDetail.attachments,
    );
    productDetailJson.thumbnail = thumbnailObject.thumbnail || '';
    productDetailJson.thumbnail2 = thumbnailObject.thumbnail2 || '';
    productDetailJson.emiData = '';
    productDetailJson.inStock = '';
    productDetailJson.shortDescription = productDetail.shortDescription || '';
    const productAttribute = getProductAttributes(productDetail.attributes);
    productDetailJson.discount = productAttribute.discount;
    productDetailJson.ribbonText = productAttribute.ribbonText;
    productDetailJson.installationRequired =
      productAttribute.installationRequired;
    if (productDetail.UserData && productDetail.UserData.length > 0) {
      productDetailJson.emiData = Number(productDetail.UserData[0].x_field1_i);
    }
    productDetailJson.pageTitle = productDetail.seo_prop_pageTitle || '';
    productDetailJson.imageAltText = productDetail.seo_prop_imageAltText || '';
    productDetailJson.metaDescription =
      productDetail.seo_prop_metaDescription || '';
  }
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
  if (attributes && attributes.length > 0) {
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
  }
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
 * Function to return product details for Productbean
 * @param {*} productDetailsAttributes;
 */
module.exports.getProductDetails = getProductDetails;
function getProductDetails(attributes) {
  const productDetailsJSON = {
    imagePath: '',
    description: [],
  };
  const productDetailsList = [];
  if (attributes.descriptive && attributes.descriptive.length > 0) {
    const specificationValues = [];
    const tempArray = [];
    attributes.descriptive.forEach(attr => {
      if (attr.identifier === 'DIMENSIONIMG') {
        productDetailsJSON.imagePath = imagefilter.getImagePathNew(
          attr.values[0].value,
        );
      }

      if (attr.associatedKeyword === 'Specifications') {
        specificationValues.push({
          name: attr.name,
          value: attr.values[0].value,
        });
      }
      if (
        attr.name === 'Packaging' ||
        attr.associatedKeyword === 'Care Instructions' ||
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
      if (
        element.identifier.includes('FEATURE') &&
        !element.identifier.includes('FEATUREIMG')
      ) {
        const featuresData = {
          title: '',
          description: '',
          imagePath: '',
        };
        const elementList = element.identifier.match(/[^\d]+|\d+/g);
        featuresData.title = element.values[0].value;
        featuresDummy.forEach(ele => {
          if (
            ele.identifier.includes(elementList[1]) &&
            ele.identifier.includes('DESCRIPTION')
          ) {
            featuresData.description = ele.values[0].value;
          }
          if (
            ele.identifier.includes(elementList[1]) &&
            ele.identifier.includes('IMG')
          ) {
            featuresData.imagePath = `${imagefilter.getImagePathNew(
              ele.values[0].value,
            )}`;
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
  if (bodyData) {
    try {
      keywordArray = bodyData.split(',');
      return keywordArray;
    } catch (err) {
      return keywordArray;
    }
  }
  return keywordArray;
}

// Function for compare product attributes
module.exports.swatchAttributesForCompare = swatchAttributesForCompare;
function swatchAttributesForCompare(productData) {
  const attributeJson = {
    skuId: '',
    name: '',
    colorCode: '',
  };
  attributeJson.skuId = productData.uniqueID;
  if (productData.attributes && productData.attributes.length > 0) {
    // iterate kit components attributes
    productData.attributes.forEach(attr => {
      // iterate attributes values
      if (attr.usage === 'Defining' && attr.identifier === swatchIdentifier) {
        attr.values.forEach(attributeValue => {
          const match = rbgRegex.exec(attributeValue.image1);
          attributeJson.name = attributeValue.value;
          if (match !== null) {
            attributeJson.colorCode = attributeValue.image1 || '';
          } else {
            attributeJson.colorCode =
              imagefilter.getImagePath(attributeValue.image1path) || '';
          }
        });
      }
    });
  }
  return attributeJson;
}

/** Funtion to return descriptive attributes */
module.exports.getDescriptiveAttributes = getDescriptiveAttributes;
function getDescriptiveAttributes(productData) {
  const descAttr = {
    dimensionThumbnail: '',
    width: '',
    height: '',
    depth: '',
  };
  if (productData.attributes && productData.attributes.length > 0) {
    productData.attributes.forEach(attr => {
      if (attr.identifier === 'DIMENSIONIMG') {
        descAttr.dimensionThumbnail =
          attr && attr.values[0]
            ? imagefilter.getImagePathNew(attr.values[0].value)
            : '';
      } else if (attr.identifier === 'ExtnWidth') {
        descAttr.width = attr && attr.values[0] ? attr.values[0].value : 'NA';
      } else if (attr.identifier === 'ExtnHeight') {
        descAttr.height = attr && attr.values[0] ? attr.values[0].value : 'NA';
      } else if (attr.identifier === 'ExtnDepth') {
        descAttr.depth = attr && attr.values[0] ? attr.values[0].value : 'NA';
      }
    });
  }
  return descAttr;
}

/** Function to return comparable attributes for kit comparison */
module.exports.getComparableAttributes = getComparableAttributes;
function getComparableAttributes(attributes) {
  const comparable = [];
  if (attributes) {
    attributes.forEach(attribute => {
      if (
        attribute.comparable === true &&
        attribute.associatedKeyword === 'Specifications'
      ) {
        const att = {};
        att.name = attribute.name;
        att.uniqueID = attribute.uniqueID;
        att.value = attribute.values[0].value;
        comparable.push(att);
      }
    });
  }
  return comparable;
}
