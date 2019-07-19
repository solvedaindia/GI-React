const async = require('async');
const origin = require('../utils/origin');
const constants = require('../utils/constants');
const originMethod = 'GET';
const logger = require('../utils/logger.js');
const errorUtils = require('../utils/errorutils');
const filter = require('../filters/filter');
const headerUtil = require('../utils/headerutil');
const productUtil = require('../utils/productutil');
const categoryUtil = require('../utils/categoryutil');
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
module.exports.getSubCategories = function getSubCategoriesData(req, callback) {
  if (!req.params.categoryID) {
    logger.debug('Get Sub Categories Data :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const categoryId = req.params.categoryID;
  const reqHeaders = req.headers;
  categoryViewByParentCategoryId(reqHeaders, categoryId, (err, result) => {
    if (err) {
      callback(err);
    } else {
      logger.debug('Got all the origin resposes');
      const subCategoryArray = [];
      // const categoryIDs = [];
      const catlogGrupView = result.catalogGroupView;
      if (catlogGrupView && catlogGrupView.length > 0) {
        catlogGrupView.forEach(category => {
          const subCatData = categoryFilter.categoryDetails(category);
          subCategoryArray.push(subCatData);
        });
        callback(null, subCategoryArray);
      } else {
        callback(null, subCategoryArray);
      }

      // if (catlogGrupView && catlogGrupView.length > 0) {
      //   catlogGrupView.forEach(category => {
      //     categoryIDs.push(category.uniqueID);
      //   });
      //   categoryUtil.getCategoryProductCountPrice(
      //     reqHeaders,
      //     categoryIDs,
      //     (error, res) => {
      //       if (error) {
      //         callback(error);
      //         return;
      //       }
      //       catlogGrupView.forEach(category => {
      //         const subCatData = categoryFilter.categoryDetails(category);
      //         subCatData.productCount = '';
      //         subCatData.startPrice = '';
      //         if (res[subCatData.uniqueID]) {
      //           subCatData.productCount =
      //             res[subCatData.uniqueID].productCount || '';
      //           subCatData.startPrice =
      //             res[subCatData.uniqueID].startPrice || '';
      //         }
      //         subCategoryArray.push(subCatData);
      //       });
      //       callback(null, subCategoryArray);
      //     },
      //   );

      //   /* async.map(
      //     catlogGrupView,
      //     (subCategory, cb) => {
      //       const subCatData = filter.filterData('categorydetail', subCategory); // Category Detail Filter
      //       productUtil.productsByCategoryID(
      //         subCatData.uniqueID,
      //         reqHeaders,
      //         (error, productViewResult) => {
      //           if (!error) {
      //             subCatData.productCount =
      //               productViewResult.recordSetTotal || 0; // Product Count
      //             cb(null, subCatData);
      //           } else {
      //             cb(error);
      //           }
      //         },
      //       );
      //     },
      //     (errors, results) => {
      //       if (errors) {
      //         callback(errors);
      //         return;
      //       }
      //       results.forEach(element => {
      //         subCategoryArray.push(element);
      //       });
      //       callback(null, subCategoryArray);
      //     },
      //   ); */
      // } else {
      //   callback(null, subCategoryArray);
      // }
    }
  });
};

/**
 *  Get sub categories by category id
 */
function categoryViewByParentCategoryId(header, categoryID, callback) {
  const originUrl = constants.categoryViewByParentId
    .replace('{{storeId}}', header.storeId)
    .replace('{{categoryId}}', categoryID);

  const reqHeader = headerUtil.getWCSHeaders(header);

  origin.getResponse(
    originMethod,
    originUrl,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        logger.debug('Error While Calling Category View by Parent Category ID');
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}
