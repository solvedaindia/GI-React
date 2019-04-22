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
  catData.thumbnail = categoryDetails.thumbnail || '';
  catData.fullImage = categoryDetails.fullImage || '';
  catData.onClickUrl = '';
  catData.shortDescription = categoryDetails.shortDescription || '';
  catData.seoUrl = '';
  catData.columns = Number(categoryDetails.x_field2_sm) || 3;
  catData.displaySkus = true;
  catData.startPrice = '';
  if (categoryDetails.x_field1_q && Number(categoryDetails.x_field1_q) === 1) {
    catData.displaySkus = false;
  }
  return catData;
}
