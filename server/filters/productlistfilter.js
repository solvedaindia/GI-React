const imageFilter = require('./imagefilter');
const rbgRegex = /(\(\d{1,3}),(\d{1,3}),(\d{1,3})\)/;
const priceRegex = /\B(?=(\d{3})+(?!\d))/g;
const numberPattern = /\d+/g;
/**
 * Filter Product List Data.
 * @return Product List with Facet Data
 */
module.exports.facetData = function getFacetData(facetView, catalogID) {
  const facetViewData = facetView;
  const facetData = [];
  if (facetViewData && facetViewData.length > 0) {
    facetViewData.forEach(facet => {
      if (facet.name !== 'ParentCatalogGroup') {
        const eachFacetValue = {
          facetName: facet.name,
          facetValues: [],
        };
        if (facet.name === 'ParentCatalogGroup') {
          eachFacetValue.facetName = 'Category';
        }
        if (facet.name.includes('OfferPrice_INR')) {
          eachFacetValue.facetName = 'Price';
        }
        if (facet.name === 'percentOff') {
          eachFacetValue.facetName = 'Offer';
        }

        if (facet.entry && facet.entry.length > 0) {
          for (let i = 0; i < facet.entry.length; i += 1) {
            const facetValue = facet.entry[i];
            const facetEntry = {
              label: facetValue.label,
              count: Number(facetValue.count),
            };
            if (facet.name.includes('OfferPrice_INR') && facetValue.label) {
              const priceRange = facetValue.label
                .replace('*', 0)
                .match(numberPattern);
              if (priceRange[1] === '0') {
                facetEntry.label = `Above ₹${formatPrice(priceRange[0])}`;
              } else {
                facetEntry.label = `₹${formatPrice(
                  priceRange[0],
                )} to ₹${formatPrice(priceRange[1])}`;
              }
            }
            if (
              facet.value === 'parentCatgroup_id_search' &&
              !facetValue.extendedData.parentIds
            ) {
              // eslint-disable-next-line no-continue
              continue;
            }
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
          }
        }
        facetData.push(eachFacetValue);
      }
    });
  }
  return facetData;
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

module.exports.getBreadCrumbData = function getBreadCrumbData(breadcrumb) {
  let breadcrumbData = {};
  const breadcrumbDataArray = [];
  if (breadcrumb && breadcrumb.length > 0) {
    // eslint-disable-next-line prefer-destructuring
    breadcrumbData = breadcrumb[0];
    for (let index = 0; index < breadcrumb.length; index += 1) {
      if (breadcrumb[index]['0'].label.toLowerCase() === 'rooms') {
        breadcrumbData = breadcrumb[index];
        break;
      }
    }
  }
  const keys = Object.keys(breadcrumbData);
  keys.forEach(key => {
    breadcrumbDataArray.push(breadcrumbData[key]);
  });
  return breadcrumbDataArray;
};

function formatPrice(priceValue) {
  return priceValue.toString().replace(priceRegex, ',');
}
