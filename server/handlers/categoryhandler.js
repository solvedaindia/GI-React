const origin = require('../utils/origin');
const origin2 = require('../utils/origin2.js');
const constants = require('../utils/constants');
const originMethod = 'GET';
const logger = require('../utils/logger.js');
const errorUtils = require('../utils/errorutils');
const headerUtil = require('../utils/headerutil');
const categroyUtil = require('../utils/categoryutil');
const categoryFilter = require('../filters/categoryfilter');
const plpFilter = require('../filters/productlistfilter');

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
          categoryArray: categoryFilter.navigation(response.body), // Category Navigation Filter
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
  try {
    const categoryIdentifier = req.params.categoryID;
    let categoryId = categoryIdentifier;
    const categoryDetails = await categroyUtil.getCategoryDetailsByIdentifier(
      req.headers,
      categoryIdentifier,
    );

    if (categoryDetails.uniqueID) {
      categoryId = categoryDetails.uniqueID;
    }

    const originUrl = constants.categoryViewByParentId
      .replace('{{storeId}}', req.headers.storeId)
      .replace('{{categoryId}}', categoryId);

    const reqHeaders = headerUtil.getWCSHeaders(req.headers);

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

/**
 * This function will return Bread Crumb Data for Category
 * @param categoryID
 */
module.exports.getBreadcrumb = getBreadcrumb;
async function getBreadcrumb(req, callback) {
  if (!req.query.categoryid && !req.query.itemid) {
    logger.debug('Get Category Breadcrumb Data :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  let categoryId = req.query.categoryid || null;
  const reqHeaders = headerUtil.getWCSHeaders(req.headers);
  const resJson = {
    breadCrumbData: [],
  };
  try {
    if (req.query.itemid && !categoryId) {
      const productUrl = constants.pdp
        .replace('{{storeId}}', req.headers.storeId)
        .replace('{{productId}}', req.query.itemid);
      const productDetail = await origin2.getResponse(
        'GET',
        productUrl,
        reqHeaders,
        null,
      );
      if (
        productDetail.body.catalogEntryView &&
        productDetail.body.catalogEntryView.length > 0
      ) {
        const parentCategory = productDetail.body.catalogEntryView[0].parentCatalogGroupID
          .pop()
          .split('_')[1];
        categoryId = parentCategory;
      }
    }
    if (categoryId) {
      const categoryBreadCrumbUrl = constants.categoryBreadcrumb
        .replace('{{storeId}}', req.headers.storeId)
        .replace('{{categoryId}}', categoryId);

      const categoryBreadcrumbData = await origin2.getResponse(
        'GET',
        categoryBreadCrumbUrl,
        reqHeaders,
        null,
      );
      resJson.breadCrumbData = plpFilter.getBreadCrumbData(
        categoryBreadcrumbData.body.breadCrumbTrailEntryViewExtended,
      );
      callback(null, resJson);
    } else {
      callback(null, resJson);
    }
  } catch (error) {
    callback(errorUtils.handleWCSError(error));
  }
}
