const productDetailfilter = require('./productdetailfilter');
const imagefilter = require('./imagefilter');
const swatchIdentifier = 'SWATCHCOLOR';
const rbgRegex = /(\(\d{1,3}),(\d{1,3}),(\d{1,3})\)/;

/** Function to return swatch attributes from components */
module.exports.bundleComponentsSummary = bundleComponentsSummary;
function bundleComponentsSummary(bundleData, promoData) {
  const componentsSummary = {
    actualPrice: '',
    offerPrice: '',
    bundleItem: [],
    descriptive: [],
  };
  const bundleItem = [];
  if (bundleData.components && bundleData.components.length > 0) {
    let bundleActualPrice = 0;
    let bundleOfferPrice = 0;
    bundleData.components.forEach(component => {
      if (component.quantity && component.price && component.price.length > 0) {
        const bundlePrice = getBundlePrice(component.price, component.quantity);
        bundleActualPrice += bundlePrice.actualPrice;
        bundleOfferPrice += bundlePrice.offerPrice;
      }

      const bundleItemJson = productDetailfilter.productDetailSummary(
        component,
      );
      bundleItemJson.quantity = parseFloat(component.quantity) || '';
      bundleItemJson.promotionData = productDetailfilter.getSummaryPromotion(
        promoData[component.uniqueID],
      );
      bundleItem.push(bundleItemJson);
    });
    componentsSummary.actualPrice = bundleActualPrice;
    componentsSummary.offerPrice = bundleOfferPrice;
    componentsSummary.itemInThisBundle = bundleItem;
  }
  return componentsSummary;
}

/** Function to calculate bundle price */
function getBundlePrice(priceValues, quanity) {
  const priceDetailJson = {};
  priceValues.forEach(price => {
    if (price.usage === 'Display' && price.value !== '') {
      priceDetailJson.actualPrice = quanity * parseFloat(price.value);
    }
    if (price.usage === 'Offer' && price.value !== '') {
      priceDetailJson.offerPrice = quanity * parseFloat(price.value);
    }
  });
  return priceDetailJson;
}

/** Function to return swatch attributes of bundle */
module.exports.getSwatchAttributes = getSwatchAttributes;
function getSwatchAttributes(bundleData) {
  const swatchAttributes = [];
  if (bundleData.attributes && bundleData.attributes.length > 0) {
    bundleData.attributes.forEach(attribute => {
      if (
        attribute.usage === 'Descriptive' &&
        attribute.identifier === swatchIdentifier &&
        attribute.values &&
        attribute.values.length > 0
      ) {
        swatchAttributes.push(swatchAttributeJson(attribute));
      }
    });
  }

  if (Array.isArray(swatchAttributes) && !swatchAttributes.length > 0) {
    if (bundleData.components && bundleData.components.length > 0) {
      if (
        bundleData.components[0].attributes &&
        bundleData.components[0].attributes.length > 0
      ) {
        bundleData.components[0].attributes.forEach(attribute => {
          if (
            attribute.usage === 'Defining' &&
            attribute.identifier === swatchIdentifier &&
            attribute.values &&
            attribute.values.length > 0
          ) {
            swatchAttributes.push(swatchAttributeJson(attribute));
          }
        });
      }
    }
  }
  return swatchAttributes;
}

/** Return SWATCH ATTRIBUTE JSON */
function swatchAttributeJson(attribute) {
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
  return attributeJson;
}

/** Function to return swatch attributes of bundle compare page */
module.exports.swatchAttributesForComparePage = swatchAttributesForComparePage;
function swatchAttributesForComparePage(bundleData) {
  const swatchAttributes = [];
  if (bundleData.attributes && bundleData.attributes.length > 0) {
    bundleData.attributes.forEach(attribute => {
      if (
        attribute.usage === 'Defining' &&
        attribute.identifier === swatchIdentifier &&
        attribute.values &&
        attribute.values.length > 0
      ) {
        // eslint-disable-next-line no-shadow
        const swatchAttribute = swatchAttributeCompare(attribute);
        swatchAttribute.skuId = bundleData.uniqueID || '';
        swatchAttributes.push(swatchAttribute);
      }
    });
  }

  if (Array.isArray(swatchAttributes) && !swatchAttributes.length > 0) {
    if (bundleData.components && bundleData.components.length > 0) {
      if (
        bundleData.components[0].attributes &&
        bundleData.components[0].attributes.length > 0
      ) {
        bundleData.components[0].attributes.forEach(attribute => {
          if (
            attribute.usage === 'Defining' &&
            attribute.identifier === swatchIdentifier &&
            attribute.values &&
            attribute.values.length > 0
          ) {
            // eslint-disable-next-line no-shadow
            const swatchAttribute = swatchAttributeCompare(attribute);
            swatchAttribute.skuId = bundleData.uniqueID || '';
            swatchAttributes.push(swatchAttribute);
          }
        });
      }
    }
  }
  return swatchAttributes;
}

/** Swatch Attribute compare for bundle */
function swatchAttributeCompare(attribute) {
  const attributeValueJSON = {
    name: '',
    colorCode: '',
  };
  attribute.values.forEach(attributeValue => {
    const match = rbgRegex.exec(attributeValue.image1);
    attributeValueJSON.name = attributeValue.value;
    if (match !== null) {
      attributeValueJSON.colorCode = attributeValue.image1 || '';
    } else {
      attributeValueJSON.colorCode =
        imagefilter.getImagePath(attributeValue.image1path) || '';
    }
  });
  return attributeValueJSON;
}
