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
    kitSummary.swatchAttibute = getSwatchAttibute(kitData);
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
    // kitSummary.thumbnail = imagefilter.getImagePath(
    //   kitData.thumbnail,
    // );
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

module.exports.getSwatchAttibute = getSwatchAttibute;
function getSwatchAttibute(kitData) {
  const swatchAttributes = {};
  swatchAttributes.uniqueId = kitData.uniqueID;
  swatchAttributes.name = '';
  swatchAttributes.value = '';
  swatchAttributes.imagePath = '';
  if (kitData.components && kitData.components.length > 0) {
    kitData.components.forEach(comp => {
      if (comp.attributes && comp.attributes.length > 0) {
        swatchAttributes.name = comp.attributes[0].values[0].value;
        swatchAttributes.value = comp.attributes[0].values[0].image1;
        swatchAttributes.imagePath = comp.attributes[0].values[0].image1path;
      }
    });
  }
  return swatchAttributes;
}

module.exports.getProductAttributes = getProductAttributes;
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
