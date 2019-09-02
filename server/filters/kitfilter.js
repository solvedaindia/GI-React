const rbgRegex = /(\(\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
const swatchIdentifier = 'SWATCHCOLOR';
const imagefilter = require('./imagefilter');

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
          if (attr.usage === 'Defining') {
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
          }
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
      if (attribute.values && attribute.values.length > 0) {
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
module.exports.swatchAttributesForComparePage = swatchAttributesForComparePage;
function swatchAttributesForComparePage(kitData) {
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
          if (
            attr.usage === 'Defining' &&
            attr.identifier === swatchIdentifier
          ) {
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
