const filter = require('./filter');
const imageFilter = require('./imagefilter');
const rbgRegex = /(\(\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
/**
 * Filter Product List Data.
 * @return Product List with Facet Data
 */
module.exports.facetData = function getFacetData(facetView, catalogID) {
  const facetViewData = facetView;
  const facetData = [];
  if (facetViewData && facetViewData.length > 0) {
    facetViewData.forEach(facet => {
      const eachFacetValue = {
        facetName: facet.name,
        facetValues: [],
      };
      if (facet.name === 'ParentCatalogGroup') {
        eachFacetValue.facetName = 'Category';
      }
      if (facet.name === 'OfferPrice_INR') {
        eachFacetValue.facetName = 'Price';
      }
      if (facet.name === 'percentOff') {
        eachFacetValue.facetName = 'Discount';
      }

      if (facet.entry && facet.entry.length > 0) {
        facet.entry.forEach(facetValue => {
          const facetEntry = {
            label: facetValue.label,
            // value: facetValue.value,
            count: Number(facetValue.count),
            // facetImage: facetValue.image || '',
          };
          if (facet.value === 'parentCatgroup_id_search') {
            facetEntry.value = `${facet.value}:${catalogID}_${
              facetValue.value
            }`;
          } else {
            facetEntry.value = facetValue.value;
          }
          if (facetValue.image) {
            const facetImageArray = facetValue.image.split('/');
            const facetImageArrayLength = facetImageArray.length;
            if (rbgRegex.test(facetImageArray[facetImageArrayLength - 1])) {
              facetEntry.colorCode =
                facetImageArray[facetImageArray.length - 1];
            } else {
              facetEntry.facetImage = imageFilter.getImagePath(
                facetValue.image,
              );
            }
          }

          eachFacetValue.facetValues.push(facetEntry);
        });
      }
      facetData.push(eachFacetValue);
    });
  }
  return facetData;
};

/**
 * Filter Product List Data.
 * @return Product List
 */
module.exports.productList = function getProductList(catalogEntryView) {
  return catalogEntryView;
};

/**
 * Filter Product List Data.
 * @return Product IDs
 */
module.exports.productIDs = function getProductIDs(catalogEntryView) {
  let productID = '';
  if (catalogEntryView && catalogEntryView.length > 0) {
    catalogEntryView.forEach(catlogEntry => {
      productID += `id=${catlogEntry.uniqueID}&`;
    });
  }
  return productID;
};

/**
 * Filter Product List Data.
 * @return Product List with Swatches Data Included
 */
module.exports.productListWithSwatch = function productListWithSwatches(
  catalogEntryView,
) {
  const productArray = []; // Product List
  if (catalogEntryView && catalogEntryView.length > 0) {
    catalogEntryView.forEach(catalogItem => {
      /* Each Product Detail */
      const productDetailJson = {
        hasSwatches: true,
        swatchData: [],
      };
      const swatchArray = [];
      /* if (catalogItem.sKUs && catalogItem.sKUs.length > 0) {
        catalogItem.sKUs.forEach(skuData => {
          const skuJSON = filter.filterData('productdetail_summary', skuData);
          swatchArray.push(skuJSON); // Push Item Bean Data in Swatch Array
        });
        productDetailJson.swatchData = swatchArray;
      } */

      if (catalogItem.sKUs && catalogItem.sKUs.length > 0) {
        const skuArray = catalogItem.sKUs;
        const dafaultSKU = getDefaultSKUData(skuArray);
        const index = skuArray.indexOf(dafaultSKU);
        if (index >= 0) {
          skuArray.splice(index, 1); // Remove Default SKU from Sku Array
        }

        const defaultSKUDetail = filter.filterData(
          'productdetail_summary',
          dafaultSKU,
        );
        const fixedAttribute = defaultSKUDetail.fixedAttributes;
        swatchArray.push(defaultSKUDetail);

        const resolvedSKUArray = resolveSKU(skuArray, fixedAttribute); // Resolved SKUs

        if (resolvedSKUArray && resolvedSKUArray.length > 0) {
          resolvedSKUArray.forEach(skuData => {
            swatchArray.push(skuData);
          });
        }
        productDetailJson.swatchData = swatchArray;
      }
      productArray.push(productDetailJson);
    });
  }
  return productArray;
};

/**
 * Filter Product List Data.
 * @return Product List with Swatches Data Included
 */
module.exports.productListWithSwatchData = function productListWithSwatchData(
  catalogEntryView,
) {
  const productArray = []; // Product List
  if (catalogEntryView && catalogEntryView.length > 0) {
    catalogEntryView.forEach(catalogItem => {
      const skuDetail = {
        defaultSkuDetail: {},
        swatchesData: [],
      };
      if (catalogItem.sKUs && catalogItem.sKUs.length > 0) {
        const skuArray = catalogItem.sKUs;
        skuDetail.defaultSkuDetail = getDefaultSKUData(skuArray);
      }
      productArray.push(skuDetail);
    });
  }
  return productArray;
};

/**
 * Filter Product List Data.
 * @return Product List without Swatches Data
 */
module.exports.productListWithoutSwatch = function productListWithoutSwatches(
  catalogEntryView,
) {
  let productArray = []; // Product List
  if (catalogEntryView && catalogEntryView.length > 0) {
    // catalogEntryView.forEach(catalogItem => {
    //   if (catalogItem.sKUs && catalogItem.sKUs.length > 0) {
    //     catalogItem.sKUs.forEach(skuData => {
    //       const itemBean = filter.filterData('productdetail_summary', skuData);
    //       delete itemBean.primaryColor;
    //       delete itemBean.fixedAttributes;
    //       // itemBean.hasSwatches = false;
    //       productArray.push(itemBean); // Push Item Bean Data in Product Array
    //     });
    //   }
    // });
    productArray = catalogEntryView;
  }
  return productArray;
};

function getDefaultSKUData(skuArray) {
  const defaultSKU = skuArray[0];
  /*  for (let i = 0; i < skuArray.length; i += 1) {
          let temp = false;
          for (let j = 0; j < skuArray[i].attributes.length; j += 1) {
            if (
              skuArray[i].attributes[j].identifier === 'defaultSKU' &&
              skuArray[i].attributes[j].values[0].value === 'true'
            ) {
              dafaultSKU =  skuArray[i];
              
              temp = true;
              break;
            }
          }
          if (temp === true) {
            break;
          }
        } */
  /* skuArray.forEach(skuData => {
    skuData.attributes.forEach(attributeData => {
      if (
        attributeData.identifier === 'defaultSKU' &&
        attributeData.values[0].value === 'true'
      ) {
        defaultSKU = skuData;
      }
    });
  }); */
  return defaultSKU;
}

function resolveSKU(skuData, attribute) {
  const resolvedSKUArray = [];
  if (skuData && skuData.length > 0) {
    skuData.forEach(eachSKU => {
      const skuDetail = filter.filterData('productdetail_summary', eachSKU);
      const keys = Object.keys(attribute);
      let temp = true;
      keys.forEach(key => {
        if (attribute[key] !== skuDetail.fixedAttributes[key]) {
          temp = false;
        }
      });
      if (temp === true) {
        resolvedSKUArray.push(skuDetail);
      }
    });
  }
  return resolvedSKUArray;
}
