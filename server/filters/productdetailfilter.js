/**
 * Filter Product Details Data.
 * @return Product Details for PLP
 */
module.exports.productDetailSummary = function productDetailForPLP(
  productDetail,
) {
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
  productDetailJson.thumbnail = productDetail.thumbnail || '';
  productDetailJson.ribbonText = '';
  productDetailJson.emiData = '';
  productDetailJson.inStock = '';
  productDetailJson.discount = '';
  productDetailJson.shortDescription = productDetail.shortDescription || '';
  productDetailJson.promotionData = null;
  if (productDetail.promotionData && productDetail.promotionData.length > 0) {
    // eslint-disable-next-line prefer-destructuring
    productDetailJson.promotionData = productDetail.promotionData[0];
  }

  // const fixedAttributes = getFixedAttributes(productDetail.attributes);
  // productDetailJson.fixedAttributes = fixedAttributes;
  // productDetailJson.primaryColor = getPrimaryColor(productDetail.attributes);
  return productDetailJson;
};

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

function getPrimaryColor(productAttribueArray) {
  let primaryColor = {};
  if (productAttribueArray && productAttribueArray.length > 0) {
    primaryColor = productAttribueArray
      .filter(eachAttribute => eachAttribute.identifier === 'PrimaryColor')
      .map(eachAttribute => {
        const attributeDetail = {};
        attributeDetail.name = eachAttribute.name;
        attributeDetail.value = eachAttribute.values[0].value;
        return attributeDetail;
      });
  }
  return primaryColor;
}
