const async = require('async');
const equal = require('deep-equal');
const errorUtils = require('../utils/errorutils');
const logger = require('../utils/logger.js');
const promotionUtil = require('../utils/promotionutil');
const constants = require('../utils/constants');
const headerUtil = require('../utils/headerutil');
const origin = require('../utils/origin');
const plpfilter = require('../filters/productlistfilter');
const pdpfilter = require('../filters/productdetailfilter');
const categoryUtil = require('../utils/categoryutil');
const plpconfig = require('../configs/plpconfig');
const productUtil = require('../utils/productutil');

/* Get Product List By Category ID with All the Data including Promotion, Category Details */
module.exports.getProductsByCategory = function getProductsByCategory(
  req,
  callback,
) {
  if (!req.params.categoryId) {
    logger.debug('Get Product List by Category :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const categoryID = req.params.categoryId;
  const reqHeader = req.headers;

  const queryUrl = getQueryUrl(req);

  const plpResponse = {
    productCount: 0,
    facetData: [],
    productList: [],
    categoryDetails: {},
  };
  if (reqHeader.cat_details === 'true') {
    categoryUtil.getCategoryDetails(reqHeader, categoryID, (err, result) => {
      if (err) {
        callback(err);
        return;
      }
      const categoryDetail = result;
      plpResponse.categoryDetails = categoryDetail;
      if (categoryDetail.displaySkus === true) {
        reqHeader.sku_display = 'true';
      }
      if (categoryDetail.displaySkus === false) {
        reqHeader.sku_display = 'false';
      }
      plpProductList(reqHeader, categoryID, queryUrl, plpResponse, callback);
    });
  } else {
    plpProductList(reqHeader, categoryID, queryUrl, plpResponse, callback);
  }
};

/* Get Product List By Search Term with All the Data including Promotion Data */
module.exports.getProductsBySearchTerm = function getProductsBySearch(
  req,
  callback,
) {
  if (!req.params.searchterm) {
    logger.debug('Get Product List By Search Term :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }

  const reqHeader = req.headers;
  const queryUrl = getQueryUrl(req);

  const searchResponse = {
    productCount: 0,
    facetData: [],
    productList: [],
    spellCheck: [],
  };

  let productListUrl = constants.searchByTerm
    .replace('{{storeId}}', reqHeader.storeId)
    .replace('{{searchTerm}}', req.params.searchterm)
    .replace('{{queryUrl}}', queryUrl);
  productListUrl += `&searchType=${plpconfig.searchPageSearchType}`;

  const plpTask = [
    getAllSKUProductList.bind(null, reqHeader, productListUrl, searchResponse),
    getSkuPromotionData,
  ];

  async.waterfall(plpTask, (err, result) => {
    if (err) {
      callback(err);
    } else {
      logger.debug('Got all the resposes for Product List By Search Term');
      callback(null, result);
    }
  });
};

function plpProductList(headers, categoryID, queryUrl, plpResponse, callback) {
  let productListUrl = constants.allSKUByCategoryId
    .replace('{{storeId}}', headers.storeId)
    .replace('{{categoryId}}', categoryID)
    .replace('{{queryUrl}}', queryUrl);
  let searchType = plpconfig.allSKUSearchType;
  if (headers.sku_display === 'false') {
    searchType = plpconfig.productSearchType;
  }
  productListUrl += `&searchType=${searchType}`;
  let plpTask = [
    getAllSKUProductList.bind(null, headers, productListUrl, plpResponse),
    getSkuPromotionData,
  ];
  if (headers.sku_display === 'false') {
    plpTask = [
      getAllSKUProductList.bind(null, headers, productListUrl, plpResponse),
      getSKUList,
    ];
  }
  async.waterfall(plpTask, (err, result) => {
    if (err) {
      callback(err);
    } else {
      logger.debug('Got all the resposes for Product List By Category');
      callback(null, result);
    }
  });
}

/* Create Query Url for Product List */
function getQueryUrl(req) {
  const reqHeader = req.headers;
  const reqQuery = req.query;
  const pageSize = Number(reqQuery.pagesize) || plpconfig.pageSize;
  const pageNumber = Number(reqQuery.pagenumber) || plpconfig.pageNumber;
  const orderBy = Number(reqQuery.orderby) || plpconfig.orderBy;
  const currency = plpconfig.currencyType;

  let queryUrl = `pageSize=${pageSize}&pageNumber=${pageNumber}&orderBy=${orderBy}&catalogId=${
    reqHeader.catalogId
  }`;
  let facetUrl = '';
  if (reqQuery.facet) {
    const differentFacetArray = encodeURIComponent(req.query.facet).split(
      '%2C',
    );
    differentFacetArray.forEach(sameFacet => {
      const sameFacetArray = sameFacet.split('%20');
      facetUrl += '&facet=';
      sameFacetArray.forEach(differentFacet => {
        facetUrl += `${differentFacet}+`;
      });
    });
    queryUrl += `${facetUrl}`;
  }
  return queryUrl;
}

/**
 *  Get Products List
 */
function getAllSKUProductList(
  headers,
  productListUrl,
  productListRes,
  callback,
) {
  const reqHeader = headerUtil.getWCSHeaders(headers);
  origin.getResponse(
    'GET',
    productListUrl,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        const productListJson = productListRes;
        if (response.body.metaData.spellcheck) {
          productListJson.spellCheck = response.body.metaData.spellcheck;
        }
        productListJson.productCount = response.body.recordSetTotal;
        productListJson.facetData = plpfilter.facetData(
          response.body.facetView,
          headers.catalogId,
        );
        productListJson.productList = response.body.catalogEntryView;
        callback(null, headers, productListJson);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}

/**
 *  Get Promotion Data
 */
function getSkuPromotionData(headers, productListJson, callback) {
  if (productListJson.productList && productListJson.productList.length > 0) {
    const skuIds = [];
    productListJson.productList.forEach(product => {
      skuIds.push(product.uniqueID);
    });

    promotionUtil.getMultiplePromotionData(skuIds, headers, (err, res) => {
      if (err) {
        callback(err);
        return;
      }
      const productListArray = [];
      productListJson.productList.forEach(product => {
        const productDetail = pdpfilter.productDetailSummary(product);
        productDetail.promotionData = pdpfilter.getSummaryPromotion(
          res[productDetail.uniqueID],
        );
        productListArray.push(productDetail);
      });
      // eslint-disable-next-line no-param-reassign
      productListJson.productList = productListArray;
      callback(null, productListJson);
    });

    /* async.map(
      productListJson.productList,
      (product, cb) => {
        let productDetail = product;
        promotionUtil.getPromotionData(
          productDetail.uniqueID,
          headers,
          (error, promotionData) => {
            if (!error) {
              productDetail = pdpfilter.productDetailSummary(productDetail); // Filter Product Details
              productDetail.promotionData = pdpfilter.getSummaryPromotion(
                promotionData,
              ); // Add Promotion Data to Product Details
              cb(null, productDetail);
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
        productListJson.productList = results;
        callback(null, productListJson);
      },
    ); */
  } else {
    callback(null, productListJson);
  }
}

function getSKUList(headers, productListJson, callback) {
  const responseJSON = productListJson;
  const productIDs = [];
  const productsList = responseJSON.productList;
  responseJSON.productList = [];
  if (productsList && productsList.length > 0) {
    productsList.forEach(product => {
      productIDs.push(product.uniqueID);
    });
    productUtil.getProductListByIDs(headers, productIDs, (err, result) => {
      if (err) {
        callback(err);
        return;
      }
      const productListTask = [
        getFilteredSKUs.bind(null, result),
        getProductPromotion.bind(null, headers, result),
      ];
      async.parallel(productListTask, (error, res) => {
        if (error) {
          callback(error);
        } else {
          responseJSON.productList = mergeSwatchandPromotion(res[0], res[1]);
          callback(null, responseJSON);
        }
      });
    });
  } else {
    callback(null, responseJSON);
  }
}

function getDefaultSKU(skuArray) {
  return skuArray[0];
}

/* Filter the SKU's with Swatch Data from list of all SKu's */
function getFilteredSKUs(productsList, callback) {
  const productListArray = [];
  productsList.forEach(product => {
    if (
      product.catalogEntryTypeCode === 'ProductBean' &&
      product.sKUs &&
      product.sKUs.length > 0
    ) {
      const productDetail = {
        skuList: [],
        swatchesData: pdpfilter.getSwatchData(product.attributes),
      };
      const defaultSKU = getDefaultSKU(product.sKUs);
      const fixedAttributes = pdpfilter.getFixedAttribute(
        defaultSKU.attributes,
      );
      if (
        productDetail.swatchesData &&
        productDetail.swatchesData.length === 0
      ) {
        const temp = pdpfilter.productDetailSummary(defaultSKU);
        temp.parentUniqueID = product.uniqueID;
        temp.swatchColor = '';
        productDetail.skuList.push(temp);
      } else {
        productDetail.swatchesData.forEach(swatch => {
          let skuJSON = {};
          for (let index = 0; index < product.sKUs.length; index += 1) {
            const swatchColor = pdpfilter.getSwatchData(
              product.sKUs[index].attributes,
            );
            let skuSwatchColor = '';
            if (swatchColor && swatchColor.length > 0) {
              skuSwatchColor = swatchColor[0].name;
            }
            if (swatch.name === skuSwatchColor) {
              const skuFixedAttributes = pdpfilter.getFixedAttribute(
                product.sKUs[index].attributes,
              );
              if (equal(fixedAttributes, skuFixedAttributes)) {
                skuJSON = pdpfilter.productDetailSummary(product.sKUs[index]);
                skuJSON.swatchColor = skuSwatchColor;
                skuJSON.parentUniqueID = product.uniqueID;
                break;
              } else if (Object.entries(skuJSON).length === 0) {
                skuJSON = pdpfilter.productDetailSummary(product.sKUs[index]);
                skuJSON.swatchColor = skuSwatchColor;
                skuJSON.parentUniqueID = product.uniqueID;
              }
            }
          }
          productDetail.skuList.push(skuJSON);
        });
      }
      productListArray.push(productDetail);
    }
    if (
      product.catalogEntryTypeCode === 'PackageBean' &&
      product.components &&
      product.components.length > 0
    ) {
      const productDetail = {
        skuList: [],
        swatchesData: [],
      };
      const skuJSON = pdpfilter.productDetailSummary(product);
      skuJSON.parentUniqueID = product.uniqueID;
      productDetail.skuList.push(skuJSON);
      productListArray.push(productDetail);
    }
  });
  callback(null, productListArray);
}

/* Get Promotions of All SKU's in a product */
function getProductPromotion(headers, productsList, callback) {
  const skuIds = [];
  productsList.forEach(product => {
    if (product.sKUs && product.sKUs.length > 0) {
      product.sKUs.forEach(sku => {
        skuIds.push(sku.uniqueID);
      });
    }
  });
  promotionUtil.getMultiplePromotionData(skuIds, headers, (err, res) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null, res);
  });
}

/* Merge the Promotion Data and SKU's with Swatches */
function mergeSwatchandPromotion(productsList, promotionData) {
  productsList.forEach(skus => {
    if (skus.skuList && skus.skuList.length > 0) {
      skus.skuList.forEach(sku => {
        // eslint-disable-next-line no-param-reassign
        sku.promotionData = pdpfilter.getSummaryPromotion(
          promotionData[sku.uniqueID],
        );
      });
    }
  });
  return productsList;
}

module.exports.productListByIds = productListByIDs;
function productListByIDs(header, query, callback) {
  if (!query.id) {
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const resJson = {};
  const productIDs = [];
  const reqHeader = header;
  reqHeader.promotionData = 'false';
  if (Array.isArray(query.id)) {
    query.id.forEach(id => {
      productIDs.push(id);
    });
  } else {
    productIDs.push(query.id);
  }
  if (query.includepromotion === 'true') {
    reqHeader.promotionData = true;
  }
  productUtil.productByProductIDs(productIDs, reqHeader, (err, res) => {
    if (err) {
      callback(err);
      return;
    }
    if (res.productList && res.productList.length > 0) {
      res.productList.forEach(product => {
        resJson[product.uniqueID] = product;
      });
    }
    callback(null, resJson);
  });
}

module.exports.productListByPartNumbers = productListByPartNumbers;
function productListByPartNumbers(header, query, callback) {
  if (!query.pn) {
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const resJson = {};
  /* const resJson = {
    productCount: 0,
    productList: [],
  }; */
  const partNumbers = [];
  const reqHeader = header;
  reqHeader.promotionData = 'false';
  if (Array.isArray(query.pn)) {
    query.pn.forEach(pn => {
      partNumbers.push(pn);
    });
  } else {
    partNumbers.push(query.pn);
  }

  async.map(
    partNumbers,
    (partNumber, cb) => {
      productUtil.productDetailByPartNumber(partNumber, header, cb);
    },
    (error2, productList) => {
      if (error2) {
        callback(error2);
        return;
      }
      if (productList && productList.length > 0) {
        // resJson.productCount = productList.length;
        if (query.includepromotion === 'true') {
          const productIds = [];
          productList.forEach(product => {
            productIds.push(product.uniqueID);
          });
          promotionUtil.getMultiplePromotionData(
            productIds,
            header,
            (error3, promotionData) => {
              if (error3) {
                callback(error3);
                return;
              }
              productList.forEach(product => {
                let productDetail = {};
                productDetail = pdpfilter.productDetailSummary(product);
                productDetail.promotionData = pdpfilter.getSummaryPromotion(
                  promotionData[productDetail.uniqueID],
                );
                if(productDetail.partNumber){
                  resJson[productDetail.partNumber] = productDetail;
                }
                // resJson.productList.push(productDetail);
              });
              callback(null, resJson);
            },
          );
        } else {
          productList.forEach(product => {
            let productDetail = {};
            productDetail = pdpfilter.productDetailSummary(product);
            if(productDetail.partNumber){
              resJson[productDetail.partNumber] = productDetail;
            }
            // resJson.productList.push(productDetail);
          });
          callback(null, resJson);
        }
      }
    },
  );
}
