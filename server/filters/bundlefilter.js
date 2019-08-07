const productDetailfilter = require('./productdetailfilter');
const imagefilter = require('./imagefilter');
const rbgRegex = /(\(\d{1,3}),(\d{1,3}),(\d{1,3})\)/;

/** Return Swatch Attributes for Bundless */
// module.exports.getAttributes = getAttributes;
// function getAttributes(bundleData) {
//   const attributes = {};
//   const defining = [];
//   const descriptive = [];
//   const bundleDataArray = [];
//   if (bundleData.components && bundleData.components.length > 0) {
//     bundleData.components.forEach(element => {
//       // if element productBean
//       if (element.catalogEntryTypeCode === 'ProductBean') {
//         if (element.attributes && element.attributes.length > 0) {
//           element.attributes.forEach(attribute => {
//             if (attribute.usage === 'Defining') {
//               defining.push(attribute);
//             }
//             if (attribute.usage === 'Descriptive') {
//               descriptive.push(attribute);
//             }
//             // const attributeJson = {
//             //   name: attribute.name,
//             //   values: [],
//             // };
//             // attribute.values.forEach(attributeValue => {
//             //   const match = rbgRegex.exec(attributeValue.image1);
//             //   const attributeValueJSON = {};
//             //   attributeValueJSON.name = attributeValue.value;
//             //   if (match !== null) {
//             //     attributeValueJSON.colorCode = attributeValue.image1 || '';
//             //   } else {
//             //     attributeValueJSON.facetImage =
//             //       imagefilter.getImagePath(attributeValue.image1path) || '';
//             //   }
//             //   attributeJson.values.push(attributeValueJSON);
//             // });
//             // swatchAttributes.push(attributeJson);
//           });
//         }

//         if (element.sKUs && element.sKUs.length > 0) {
//           element.sKUs.forEach(sku => {
//             bundleDataArray.push(sku);
//           });
//         }
//       }

//       // if element itembean
//       if (element.catalogEntryTypeCode === 'ItemBean') {
//         bundleDataArray.push(element);
//       }
//     });
//   }
//   attributes.defining = sortJsonArray(defining, 'sequence');
//   attributes.descriptive = descriptive;
//   attributes.bundleDataArray = bundleDataArray;
//   return attributes;
// }

// module.exports.getBundlesData = getBundlesData;
// function getBundlesData(bundleData) {
//   const bundleDataJson = {
//     itemDataArray: [],
//     productDataJson: {},
//   };
//   if (bundleData.components && bundleData.components.length > 0) {
//     bundleData.components.forEach(element => {
//       if (element.catalogEntryTypeCode === 'ItemBean') {
//         bundleDataJson.itemDataArray.push(element);
//       }

//       if (element.catalogEntryTypeCode === 'ProductBean') {
//         bundleDataJson.productDataJson = element;
//       }
//     });
//   }
//   return bundleDataJson;
// }

// module.exports.getItemDataSummary = getItemDataSummary;
// function getItemDataSummary(itemData, promotions) {
//   const associatedPromo = [];
//   if (promotions[itemData.uniqueID]) {
//     promotions[itemData.uniqueID].forEach(promo => {
//       associatedPromo.push({
//         name: promo.name,
//         description: promo.description || '',
//         promocode: promo.promoCode,
//       });
//     });
//   }
//   const attributes = productDetailfilter.getAttributes(itemData);
//   const itemDataSummary = productDetailfilter.productDetailSummary(itemData);
//   itemDataSummary.defAttributes = productDetailfilter.getDefAttributes(
//     attributes.defining,
//   );
//   itemDataSummary.quantity = itemData.quantity;
//   itemDataSummary.attachments = imagefilter.getProductImages(itemData);
//   itemDataSummary.promotions = associatedPromo;
//   return itemDataSummary;
// }

// module.exports.getProductDataSummary = getProductDataSummary;
// function getProductDataSummary(productData, promotions) {
//   const productDataSummary = {
//     uniqueID: '',
//     type: 'product',
//     defAttributes: [],
//     skuData: [],
//   };
//   if (productData) {
//     productDataSummary.uniqueID = productData.uniqueID;
//     const attributes = productDetailfilter.getAttributes(productData);
//     productDataSummary.defAttributes = productDetailfilter.getDefAttributes(
//       attributes.defining,
//     );
//     if (productData.sKUs && productData.sKUs.length > 0) {
//       productData.sKUs.forEach(sku => {
//         // eslint-disable-next-line no-param-reassign
//         sku.quantity = productData.quantity;
//         productDataSummary.skuData.push(getItemDataSummary(sku, promotions));
//       });
//     }
//   }
//   return productDataSummary;
// }

// module.exports.swatchAttributesForCompare = swatchAttributesForCompare;
// function swatchAttributesForCompare(attributes) {
//   const swatchAttributes = [];
//   if (attributes.defining && attributes.defining.length > 0) {
//     attributes.defining.forEach(attr => {
//       if (attr.values && attr.values.length > 0) {
//         attr.values.forEach(element => {
//           const attributeJson = {
//             skuId: '',
//             name: '',
//             colorCode: '',
//           };
//           const match = rbgRegex.exec(element.image1);
//           attributeJson.name = element.value;
//           if (match !== null) {
//             attributeJson.colorCode = element.image1 || '';
//           } else {
//             attributeJson.colorCode =
//               imagefilter.getImagePath(element.image1path) || '';
//           }
//           swatchAttributes.push(attributeJson);
//         });
//       }
//     });
//   }
//   return swatchAttributes;
// }

module.exports.bundleSummaryForCompare = bundleSummaryForCompare;
function bundleSummaryForCompare(bundleData) {
  const bundleSummary = {
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
  if (bundleData) {
    bundleSummary.uniqueID = bundleData.uniqueID;
    bundleSummary.partNumber = bundleData.partNumber;
    bundleSummary.shortDescription = bundleData.shortDescription;
    bundleSummary.name = bundleData.name;
    // bundleSummary.swatch.push(swatchAttributesForCompare(kitData));
    bundleSummary.price = bundleData.price;
    bundleSummary.thumbnail = bundleData.thumbnail;
    bundleSummary.fullImage = bundleData.fullImage;
    bundleSummary.keyword = bundleData.keyword;
  }
  return bundleSummary;
}

// modeule.exports.swatchAttributesForCompare = swatchAttributesForCompare;
// function swatchAttributesForCompare(bundleData) {
//     const attributeJson = {
//         skuId: '',
//         name: '',
//         colorCode: '',
//     };
//     if (bundleData.components && bundleData.components.length > 0) {
//         attributeJson.skuId = bundleData.uniqueID;

//     }
// }

/** Function to return swatch attributes from components */
module.exports.bundleComponentsSummary = bundleComponentsSummary;
function bundleComponentsSummary(bundleData) {
  const componentsSummary = {
    actualPrice: '',
    offerPrice: '',
    bundleItem: [],
    descriptive: [],
  };
  const bundleItem = [];
  if (bundleData.components && bundleData.components.length > 0) {
    // iterate kit components
    const swatchAttributeJson = {
      uniqueID: '',
      name: '',
      values: [],
    };
    let bundleActualPrice = 0;
    let bundleOfferPrice = 0;
    swatchAttributeJson.uniqueID = bundleData.uniqueID;
    bundleData.components.forEach(component => {
      if (component.attributes && component.attributes.length > 0) {
        // iterate kit components attributes
        component.attributes.forEach(attr => {
          if (attr.usage === 'Defining') {
            swatchAttributeJson.name = attr.name;
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
              swatchAttributeJson.values.push(attributeValueJSON);
            });
          }

          if (attr.usage === 'Descriptive') {
            componentsSummary.descriptive.push(attr);
          }
        });
      }

      if (component.quantity && component.price && component.price.length > 0) {
        const bundlePrice = getBundlePrice(component.price, component.quantity);
        bundleActualPrice += bundlePrice.actualPrice;
        bundleOfferPrice += bundlePrice.offerPrice;
      }

      const bundleItemJson = productDetailfilter.productDetailSummary(
        component,
      );
      bundleItem.push(bundleItemJson);
    });
    componentsSummary.swatchAttributes = swatchAttributeJson;
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
