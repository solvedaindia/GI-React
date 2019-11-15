const async = require('async');
const origin = require('./origin');
const origin2 = require('./origin2');
const constants = require('./constants');
const originMethod = 'GET';
const errorUtils = require('./errorutils');
const logger = require('./logger.js');
const headerUtil = require('./headerutil');
const categoryFilter = require('../filters/categoryfilter');

/**
 *  Get Category Details by ID
 */
module.exports.getCategoryDetails2 = getCategoryDetails2;
function getCategoryDetails2(headers, categoryID) {
  return new Promise((resolve, reject) => {
    if (!categoryID) {
      logger.debug('Get Category Details :: invalid params');
      reject(errorUtils.errorlist.invalid_params);
      return;
    }
    const originUrl = constants.categoryViewByCategoryId
      .replace('{{storeId}}', headers.storeId)
      .replace('{{categoryId}}', categoryID);

    const reqHeader = headerUtil.getWCSHeaders(headers);
    origin2
      .getResponse(originMethod, originUrl, reqHeader, null)
      .then(result => {
        let categoryDetails = {};
        if (
          result.body.catalogGroupView &&
          result.body.catalogGroupView.length > 0
        ) {
          categoryDetails = categoryFilter.categoryDetails(
            result.body.catalogGroupView[0],
          );
        }
        resolve(categoryDetails);
      })
      .catch(err => {
        reject(errorUtils.handleWCSError(err));
      });
  });
}

/**
 *  Get Category Details by ID
 */
module.exports.getCategoryDetails = getCategoryDetails;
function getCategoryDetails(headers, categoryID, callback) {
  if (!categoryID) {
    logger.debug('Get Category Details :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const originUrl = constants.categoryViewByCategoryId
    .replace('{{storeId}}', headers.storeId)
    .replace('{{categoryId}}', categoryID);

  const reqHeader = headerUtil.getWCSHeaders(headers);

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
        if (
          response.body.catalogGroupView &&
          response.body.catalogGroupView.length > 0
        ) {
          callback(
            null,
            categoryFilter.categoryDetails(response.body.catalogGroupView[0]),
          );
        } else {
          callback(null, {});
        }
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}

/**
 *  Get Category Details by ID
 */
module.exports.getCategoryDetailsByIdentifier = getCategoryDetailsByIdentifier;
function getCategoryDetailsByIdentifier(headers, catIdentifier) {
  return new Promise((resolve, reject) => {
    if (!catIdentifier) {
      logger.debug('Get Category Details by Identifier :: invalid params');
      reject(errorUtils.errorlist.invalid_params);
      return;
    }
    const originUrl = constants.categoryViewByIdentifier
      .replace('{{storeId}}', headers.storeId)
      .replace('{{categoryIdentifier}}', catIdentifier);

    const reqHeader = headerUtil.getWCSHeaders(headers);
    origin2
      .getResponse(originMethod, originUrl, reqHeader, null)
      .then(result => {
        let categoryDetails = {};
        if (
          result.body.catalogGroupView &&
          result.body.catalogGroupView.length > 0
        ) {
          categoryDetails = categoryFilter.categoryDetails(
            result.body.catalogGroupView[0],
          );
        }
        resolve(categoryDetails);
      })
      .catch(err => {
        reject(errorUtils.handleWCSError(err));
      });
  });
}

/**
 * Get CategoryDetails By IDS
 * @param storeId,access_token,categoryID Array
 * @return Category List with Product Count
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.categoryListByIDs = function getCategoryListByCategoryIDs(
  categoryIDs,
  headers,
  callback,
) {
  if (!categoryIDs || categoryIDs.length === 0) {
    logger.debug('Get Category List by Category IDs :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const categoryArray = [];
  async.map(
    categoryIDs,
    (categoryId, cb) => {
      getCategoryDetails(headers, categoryId, (error, categoryData) => {
        if (!error) {
          cb(null, categoryData);
        } else {
          cb(error);
        }
      });
    },
    (errors, results) => {
      if (errors) {
        callback(errors);
        return;
      }
      results.forEach(result => {
        categoryArray.push(result);
      });
      callback(null, transformJson(categoryArray));
    },
  );
};

/* Merging Category Details and Product Count Data */
function transformJson(result) {
  const categoryList = [];
  const categoryListArray = result;
  categoryListArray.forEach(category => {
    const categoryDetail = category;
    if (categoryDetail.uniqueID) {
      categoryList.push(categoryDetail);
    }
  });
  return categoryList;
}
