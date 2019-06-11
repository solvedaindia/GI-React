const testJSON = require('../configs/testjson');

/**
 * Filter Category Navigation Data.
 * @return Category Navigation Data
 */
module.exports.navigation = getCatNavData;

function getCatNavData(categoryData) {
  const categoryArray = [];

  const catalogGroupData = categoryData.catalogGroupView || [];
  if (catalogGroupData && catalogGroupData.length > 0) {
    catalogGroupData.forEach(dataElement => {
      const categoryDetails = getCategoryDetails(dataElement); // Get Category Details
      const subCategoryArray = getCatNavData(dataElement); // Get Sub Category Data
      if (subCategoryArray.length > 0) {
        categoryDetails.isLeafNode = 'N';
        categoryDetails.subCategoryArray = subCategoryArray;
      } else {
        categoryDetails.isLeafNode = 'Y';
      }
      categoryArray.push(categoryDetails);
    });
  }
  return categoryArray;
  // return testJSON.categoryNavigation;
}

/**
 * Filter Category Data.
 * @return Category Details
 */
module.exports.categoryDetails = getCategoryDetails;
function getCategoryDetails(categoryDetails) {
  const catData = {};
  catData.categoryIdentifier = categoryDetails.identifier;
  catData.categoryName = categoryDetails.name;
  catData.uniqueID = categoryDetails.uniqueID;
  // catData.thumbnail =
  //   categoryDetails.thumbnail ||
  //   'https://192.168.0.36:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/pdp/sampleImages/56101502SD00541/56101502SD00541_546x307_01.png';
  //

  if (categoryDetails.thumbnail) {
    catData.thumbnail = `https://192.168.0.36:8443/wcsstore/GodrejInterioSAS${categoryDetails.thumbnail.substring(
      categoryDetails.thumbnail.indexOf('/images'),
      categoryDetails.thumbnail.length,
    )}`;
  } else {
    catData.thumbnail =
      'https://192.168.0.36:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/pdp/sampleImages/56101502SD00541/56101502SD00541_546x307_01.png';
  }

  catData.fullImage =
    categoryDetails.fullImage ||
    'https://192.168.0.36:8443/wcsstore/GodrejInterioSAS/images/godrejInterio/catfullimage.png';
  catData.onClickUrl = '';
  catData.shortDescription = categoryDetails.shortDescription || '';
  catData.seoUrl = '';
  catData.columns = Number(categoryDetails.x_field2_sm) || 3;
  catData.displaySkus = true;
  catData.startPrice = 2499;
  if (categoryDetails.x_field1_q && Number(categoryDetails.x_field1_q) === 1) {
    catData.displaySkus = false;
  }
  return catData;
}
