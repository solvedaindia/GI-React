const rbgRegex = /(\(\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
const imagefilter = require('./imagefilter');

/** Function for Kit Data Summary */
module.exports.getKitSummary = getKitSummary;
function getKitSummary(kitData, promotions) {
  const kitSummary = {};
  if (kitData) {
    kitSummary.uniqueID = kitData.uniqueID;
    kitSummary.productName = kitData.name;
    kitSummary.partNumber = kitData.partNumber;
    kitSummary.type = kitData.catalogEntryTypeCode;
    kitSummary.masterCategoryID = kitData.masterCategoryId;
    kitSummary.parentUniqueID = kitData.parentCatalogEntryID || '';
    kitSummary.swatchAttributes = [];
    kitSummary.swatchAttributes.push(getSwatchAttibute(kitData));
    if (kitSummary.swatchAttributes.length > 0) {
      kitSummary.swatchAttributes = filterSwatchAtrributes(
        kitSummary.swatchAttributes,
      );
    }
    if (kitData.price && kitData.price.length > 0) {
      kitData.price.forEach(price => {
        if (price.usage === 'Display') {
          kitSummary.actualPrice = Number(price.value);
        }
        if (price.usage === 'Offer') {
          kitSummary.offerPrice = Number(price.value);
        }
      });
    }
    kitSummary.onClickUrl = '';
    kitSummary.seoUrl = '';
    kitSummary.thumbnail = imagefilter.getImagePath(kitData.thumbnail);
    kitSummary.emiData = '';
    kitSummary.inStock = '';
    kitSummary.shortDescription = kitData.shortDescription || '';
    const productAttribute = getProductAttributes(kitData.attributes);
    kitSummary.discount = productAttribute.discount;
    kitSummary.ribbonText = productAttribute.ribbonText;
    if (kitData.UserData && kitData.UserData.length > 0) {
      kitSummary.emiData = Number(kitData.UserData[0].x_field1_i);
    }
    kitSummary.pageTitle = kitData.seo_prop_pageTitle || '';
    kitSummary.imageAltText = kitData.seo_prop_imageAltText || '';
    kitSummary.metaDescription = '';
    const associatedPromo = [];
    if (promotions[kitData.uniqueID]) {
      promotions[kitData.uniqueID].forEach(promo => {
        associatedPromo.push({
          name: promo.name,
          description: promo.description || '',
          promocode: promo.promoCode,
        });
      });
    }
    kitSummary.promotions = associatedPromo;
  }
  return kitSummary;
}

/** Function to return Product Attributes */
module.exports.getProductAttributes = getProductAttributes;
function getProductAttributes(attributes) {
  const productAttribute = {
    ribbonText: '',
    discount: '',
  };
  if (attributes && attributes.length > 0) {
    attributes.forEach(attribute => {
      if (attribute.identifier === 'percentOff') {
        productAttribute.discount = attribute.values[0].value;
      }
      if (attribute.identifier === 'Ribbon') {
        productAttribute.ribbonText = attribute.values[0].value;
      }
    });
  }
  return productAttribute;
}

/** Function to return swatch attributes from kit components */
module.exports.getSwatchAttibute = getSwatchAttibute;
function getSwatchAttibute(kitData) {
  const attributeJson = {
    uniqueID: '',
    name: '',
    values: [],
  };
  attributeJson.uniqueID = kitData.uniqueID;
  if (kitData.components && kitData.components.length > 0) {
    // iterate kit components
    kitData.components.forEach(components => {
      if (components.attributes && components.attributes.length > 0) {
        // iterate kit components attributes
        components.attributes.forEach(attr => {
          attributeJson.name = attr.name;
          // iterate attributes values
          attr.values.forEach(attributeValue => {
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
        });
      }
    });
  }
  return attributeJson;
}

/** Fubction for filter swatch attributes on the basis of name */
module.exports.filterSwatchAtrributes = filterSwatchAtrributes;
function filterSwatchAtrributes(attributes) {
  const swatchAttributes = [];
  if (attributes && attributes.length > 0) {
    attributes.forEach(attribute => {
      if (attribute.values.length > 0) {
        if (swatchAttributes.length > 0) {
          let temp = false;
          for (let index = 0; index < swatchAttributes.length; index += 1) {
            const attr = swatchAttributes[index];
            if (attr.name === attribute.name) {
              const attrJson = {};
              attrJson.name = attribute.values[0].name.trim();
              if (attribute.values[0].colorCode) {
                attrJson.colorCode = attribute.values[0].colorCode;
              } else {
                attrJson.facetImage = attribute.values[0].facetImage;
              }
              attr.values.push(attrJson);
              temp = true;
              break;
            }
          }
          if (temp === false) {
            const attributeJson = {
              name: '',
              values: [],
            };
            attributeJson.name = attribute.name.trim();
            const attrJson = {};
            attrJson.name = attribute.values[0].name;
            if (attribute.values[0].colorCode) {
              attrJson.colorCode = attribute.values[0].colorCode;
            } else {
              attrJson.facetImage = attribute.values[0].facetImage;
            }
            attributeJson.values.push(attrJson);
            swatchAttributes.push(attributeJson);
          }
        } else {
          const attributeJson = {
            name: '',
            values: [],
          };
          attributeJson.name = attribute.name.trim();
          const attrJson = {};
          attrJson.name = attribute.values[0].name;
          if (attribute.values[0].colorCode) {
            attrJson.colorCode = attribute.values[0].colorCode;
          } else {
            attrJson.facetImage = attribute.values[0].facetImage;
          }
          attributeJson.values.push(attrJson);
          swatchAttributes.push(attributeJson);
        }
      }
    });
  }
  return swatchAttributes;
}

/** Function to return swatch attributes for kit comparison */
module.exports.swatchAttributesForCompare = swatchAttributesForCompare;
function swatchAttributesForCompare(kitData) {
  const attributeJson = {
    skuId: '',
    name: '',
    colorCode: '',
  };
  attributeJson.skuId = kitData.uniqueID;
  if (kitData.components && kitData.components.length > 0) {
    // iterate kit components
    kitData.components.forEach(components => {
      if (components.attributes && components.attributes.length > 0) {
        // iterate kit components attributes
        components.attributes.forEach(attr => {
          // iterate attributes values
          if (attr.usage === 'Defining' && attr.identifier === 'sc') {
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
    });
  }
  return attributeJson;
}

/** Function to return kit sumaary for kit comparison */
module.exports.kitSummaryForCompare = kitSummaryForCompare;
function kitSummaryForCompare(kitData) {
  const kitSummary = {
    uniqueID: '',
    partNumber: '',
    shortDescription: '',
    name: '',
    swatch: [],
    price: '',
    thumbnail: '',
    fullImage: '',
    keyword: '',
    weight: '',
    height: '',
    depth: '',
  };
  if (kitData) {
    kitSummary.uniqueID = kitData.uniqueID;
    kitSummary.partNumber = kitData.partNumber;
    kitSummary.shortDescription = kitData.shortDescription;
    kitSummary.name = kitData.name;
    kitSummary.swatch.push(swatchAttributesForCompare(kitData));
    kitSummary.price = kitData.price;
    kitSummary.thumbnail = kitData.thumbnail;
    kitSummary.fullImage = kitData.fullImage;
    kitSummary.keyword = kitData.keyword;
  }
  return kitSummary;
}

/** Function to return comparable attributes for kit comparison */
module.exports.getComparableAttributes = getComparableAttributes;
function getComparableAttributes(kitData) {
  const comparable = [];
  if (kitData.attributes && kitData.attributes.length > 0) {
    kitData.attributes.forEach(attribute => {
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
