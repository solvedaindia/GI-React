const origin = require('../utils/origin');
const constants = require('../utils/constants');
const originMethod = 'GET';
const logger = require('../utils/logger.js');
const errorUtils = require('../utils/errorutils');
const filter = require('../filters/filter');
const headerUtils = require('../utils/headerutil');

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
      getCategoriesData('@top', headers, callback); // To Get only TOP Categories
      break;

    case 'navigation':
      getCategoriesData('@top?depthAndLimit=25,0', headers, callback); // To Get Category Navigation Data
      break;

    default:
      // default through error as no target found
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
  const reqHeaders = headerUtils.getWCSHeaders(headers);
  const originUrl = constants.TopCategoryHierarchy.replace(
    '{{storeId}}',
    headers.storeId,
  ).replace('{{urlParam}}', urlParam);
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
      // callback(null, filter.filterData('categorynavigation', response));
    },
  );
}
