const origin = require('../utils/origin');
const origin2 = require('../utils/origin2.js');
const constants = require('../utils/constants');
const originMethod = 'GET';
const logger = require('../utils/logger.js');
const errorUtils = require('../utils/errorutils');
const filter = require('../filters/filter');
const headerUtil = require('../utils/headerutil');
const categoryFilter = require('../filters/categoryfilter');

const topCategories = '@top';
const categoryNavigation = '@top?depthAndLimit=25,0';

/**
 * This function will return ${urlParam} categories data
 * @param urlParam
 * @return category data
 */
module.exports.getCategories = function getCategories(
  urlParam,
  headers,
  callback,
) {
  logger.debug('Call to get categories id: ');
  logger.debug(`Params: ${urlParam}`);

  switch (urlParam) {
    case 'top':
      getCategoriesData(topCategories, headers, callback); // To Get only TOP Categories
      break;

    case 'navigation':
      getCategoriesData(categoryNavigation, headers, callback); // To Get Category Navigation Data
      break;

    default:
      logger.error(
        `Get Categories :${errorUtils.errorlist.resource_not_found}`,
      );
      callback(errorUtils.errorlist.resource_not_found);
  }
};

/**
 * This function will return categories data
 * @param urlParam
 */
function getCategoriesData(urlParam, headers, callback) {
  const reqHeaders = headerUtil.getWCSHeaders(headers);

  const originUrl = constants.categoryview
    .replace('{{storeId}}', headers.storeId)
    .replace('{{urlParam}}', urlParam);

  origin.getResponse(
    originMethod,
    originUrl,
    reqHeaders,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        const resJson = {
          categoryArray: filter.filterData('categorynavigation', response.body), // Category Navigation Filter
        };
        callback(null, resJson);
        return;
      }
      callback(errorUtils.handleWCSError(response));
    },
  );
}

/**
 * This function will return sub categories data
 * @param categoryID
 */
module.exports.getSubCategories = getSubCategoriesData;
async function getSubCategoriesData(req, callback) {
  if (!req.params.categoryID) {
    logger.debug('Get Sub Categories Data :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const categoryId = req.params.categoryID;
  const originUrl = constants.categoryViewByParentId
    .replace('{{storeId}}', req.headers.storeId)
    .replace('{{categoryId}}', categoryId);

  const reqHeaders = headerUtil.getWCSHeaders(req.headers);
  try {
    const result = await origin2.getResponse(
      'GET',
      originUrl,
      reqHeaders,
      null,
    );
    logger.debug('Got all the origin resposes');
    const subCategoryArray = [];
    const catlogGrupView = result.body.catalogGroupView;
    if (catlogGrupView && catlogGrupView.length > 0) {
      catlogGrupView.forEach(category => {
        const subCatData = categoryFilter.categoryDetails(category);
        subCategoryArray.push(subCatData);
      });
      callback(null, subCategoryArray);
    } else {
      callback(null, subCategoryArray);
    }
  } catch (error) {
    callback(errorUtils.handleWCSError(error));
  }
}
