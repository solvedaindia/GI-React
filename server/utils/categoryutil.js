const async = require('async');
const origin = require('./origin');
const constants = require('./constants');
const originMethod = 'GET';
const errorUtils = require('./errorutils');
const logger = require('./logger.js');
const headerUtil = require('./headerutil');
const productUtil = require('./productutil');
const categoryFilter = require('../filters/categoryfilter');

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

  const categoryListTask = [
    getCategoryListByIDs.bind(null, headers, categoryIDs),
    getProductCountandPrice.bind(null, headers, categoryIDs),
  ];
  async.parallel(categoryListTask, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, transformJson2(result));
    }
  });
};

/* Get Category Details by IDS */
function getCategoryListByIDs(headers, categoryIDs, callback) {
  if (categoryIDs && categoryIDs.length > 0) {
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
        callback(null, categoryArray);
      },
    );
  }
}

/* Get Product Count for Each Category */
function getProductCount(headers, categoryIDs, callback) {
  const categoryProductCountArray = [];
  async.map(
    categoryIDs,
    (categoryId, cb) => {
      productUtil.productsByCategoryID(
        categoryId,
        headers,
        (error, productList) => {
          if (!error) {
            const productCount = {
              categoryID: categoryId,
              productCount: productList.recordSetTotal,
            };
            cb(null, productCount);
          } else {
            cb(error);
          }
        },
      );
    },
    (errors, results) => {
      if (errors) {
        callback(errors);
        return;
      }
      results.forEach(result => {
        categoryProductCountArray.push(result);
      });
      callback(null, categoryProductCountArray);
    },
  );
}

/* Get Product Count and Min Price for Each Category */
module.exports.getCategoryProductCountPrice = getProductCountandPrice;
function getProductCountandPrice(headers, categoryIDs, callback) {
  const categoryIds = categoryIDs.join(',');

  const originUrl = constants.categoryProductPriceData
    .replace('{{storeId}}', headers.storeId)
    .replace('{{categoryUrl}}', categoryIds);

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
        callback(null, response.body);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}

/* Merging Category Details and Product Count Data */
function transformJson(result) {
  const categoryList = [];
  const categoryListArray = result[0];
  const productCountArray = result[1];
  categoryListArray.forEach(category => {
    for (let index = 0; index < productCountArray.length; index += 1) {
      if (
        category.uniqueID &&
        category.uniqueID === productCountArray[index].categoryID
      ) {
        // eslint-disable-next-line no-param-reassign
        category.productCount = productCountArray[index].productCount;
        categoryList.push(category);
        break;
      }
    }
  });
  return categoryList;
}

/* Merging Category Details and Product Count Data */
function transformJson2(result) {
  const categoryList = [];
  const categoryListArray = result[0];
  const productCountJSON = result[1];
  categoryListArray.forEach(category => {
    const categoryDetail = category;
    if (category.uniqueID) {
      categoryDetail.productCount = '';
      categoryDetail.startPrice = '';
      if (productCountJSON[categoryDetail.uniqueID]) {
        categoryDetail.productCount =
          productCountJSON[categoryDetail.uniqueID].productCount || '';
        categoryDetail.startPrice =
          productCountJSON[categoryDetail.uniqueID].startPrice || '';
      }
      categoryList.push(categoryDetail);
    }
  });
  return categoryList;
}
