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
  if (productDetail.price && productDetail.price.length > 0) {
    productDetail.price.forEach(price => {
      if (price.usage === 'Display') {
        productDetailJson.actualPrice = price.value;
      }
      if (price.usage === 'Offer') {
        productDetailJson.offerPrice = price.value;
      }
    });
  }
  productDetailJson.onClickUrl = '';
  productDetailJson.seoUrl = '';
  productDetailJson.imageSrc = productDetail.thumbnail || '';
  productDetailJson.ribbonText = '';
  productDetailJson.emiData = '';
  productDetailJson.inStock = '';
  const fixedAttributes = getFixedAttributes(productDetail.attributes);
  productDetailJson.fixedAttributes = fixedAttributes;
  productDetailJson.primaryColor = getPrimaryColor(productDetail.attributes);
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
