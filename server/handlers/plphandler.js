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
module.exports.getProductsByCategory = getProductsByCategory;
async function getProductsByCategory(req, callback) {
  if (!req.params.categoryId) {
    logger.debug('Get Product List by Category :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const categoryIdentifier = req.params.categoryId;
  let categoryID = categoryIdentifier;
  const reqHeader = req.headers;

  const queryUrl = getQueryUrl(req);

  const plpResponse = {
    productCount: 0,
    facetData: [],
    productList: [],
    categoryDetails: {},
    breadCrumbData: [],
  };

  try {
    let categoryDetail = await categoryUtil.getCategoryDetailsByIdentifier(
      reqHeader,
      categoryIdentifier,
    );
    if (categoryDetail.uniqueID) {
      categoryID = categoryDetail.uniqueID;
    }
    categoryDetail = await categoryUtil.getCategoryDetails2(
      reqHeader,
      categoryID,
    );
    plpResponse.categoryDetails = categoryDetail;
    if (categoryDetail.displaySkus === true) {
      reqHeader.sku_display = 'true';
    }
    if (categoryDetail.displaySkus === false) {
      reqHeader.sku_display = 'false';
    }
    plpProductList(reqHeader, categoryID, queryUrl, plpResponse, callback);
  } catch (error) {
    callback(error);
  }
}

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

  let searchTerm = req.params.searchterm;
  const splitTermsArray = searchTerm.split(" ");

  let indexes = "";
  let reg = new RegExp('^[0-9]+$');

  for(let i = 0; i< splitTermsArray.length-1; i++){
    if(splitTermsArray[i].match(reg) && !splitTermsArray[i+1].match(reg)){
      if(indexes === ""){
        indexes = indexes + i;
      }else{
        indexes = indexes + "," + i;
      }
    }
  }

  searchTerm = "";
  let i = 0;
  for(i=0; i< splitTermsArray.length-1;){
    if(indexes.includes(i.toString())){
      if(searchTerm === "") {
        searchTerm = searchTerm.concat("\"", splitTermsArray[i], " ", splitTermsArray[i+1], "\"");
        i = i + 2;
      } else {
        searchTerm = searchTerm.concat(" ", "\"", splitTermsArray[i], " ", splitTermsArray[i+1], "\"");
        i = i + 2;
      }
    } else {
      if(searchTerm === ""){
        searchTerm = searchTerm.concat(splitTermsArray[i]);
        i++;
      } else {
        searchTerm = searchTerm.concat(" ", splitTermsArray[i]);      
        i++;
      }
    }
  }

  if(i == splitTermsArray.length - 1) {
    if(searchTerm === "")
      searchTerm = searchTerm.concat(splitTermsArray[i]);
    else
      searchTerm = searchTerm.concat(" ", splitTermsArray[i]);   
  }


  const searchResponse = {
    searchTerm: searchTerm,
    productCount: 0,
    facetData: [],
    productList: [],
  };
  let productListUrl = constants.searchByTerm
    .replace('{{storeId}}', reqHeader.storeId)
    .replace('{{searchTerm}}', searchTerm)
    .replace('{{queryUrl}}', queryUrl);
  productListUrl += `&searchType=${plpconfig.searchPageSearchType}`;

  const plpTask = [
    getAllSKUProductList.bind(
      null,
      reqHeader,
      productListUrl,
      searchResponse,
      req,
    ),
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

/* Get FacetList for PLP */
module.exports.getPLPFacetList = getPLPFacetList;
function getPLPFacetList(req, callback) {
  if (!req.params.categoryId) {
    logger.debug('Get Product List by Category :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }
  const categoryID = req.params.categoryId;
  const header = req.headers;
  const reqQuery = req.query;
  let queryUrl = `catalogId=${header.catalogId}`;
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

  let facetListUrl = constants.allSKUByCategoryId
    .replace('{{storeId}}', header.storeId)
    .replace('{{categoryId}}', categoryID)
    .replace('{{queryUrl}}', queryUrl);
  let searchType = plpconfig.allSKUSearchType;
  if (header.sku_display === 'false') {
    searchType = plpconfig.productSearchType;
  }
  facetListUrl += `&searchType=${searchType}`;

  const reqHeader = headerUtil.getWCSHeaders(header);
  origin.getResponse(
    'GET',
    facetListUrl,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        const facetRes = {
          facetData: [],
        };
        if (response.body.facetView && response.body.facetView.length > 0) {
          facetRes.facetData = plpfilter.facetData(
            response.body.facetView,
            header.catalogId,
          );
        }
        callback(null, facetRes);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}

/* Get FacetList for Search */
module.exports.getSearchFacetList = getSearchFacetList;
function getSearchFacetList(req, callback) {
  if (!req.params.searchterm) {
    logger.debug('Get Product List By Search Term :: invalid params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }

  const header = req.headers;
  let facetUrl = '';
  const reqQuery = req.query;
  let queryUrl = '';
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
  let facetListUrl = constants.searchByTerm
    .replace('{{storeId}}', header.storeId)
    .replace('{{searchTerm}}', encodeURIComponent(req.params.searchterm))
    .replace('{{queryUrl}}', queryUrl);
  facetListUrl += `&searchType=${plpconfig.searchPageSearchType}`;
  const reqHeader = headerUtil.getWCSHeaders(header);
  origin.getResponse(
    'GET',
    facetListUrl,
    reqHeader,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        const facetRes = {
          facetData: [],
        };
        if (response.body.facetView && response.body.facetView.length > 0) {
          facetRes.facetData = plpfilter.facetData(
            response.body.facetView,
            header.catalogId,
          );
        }
        callback(null, facetRes);
      } else {
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
}

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
    getAllSKUProductList.bind(null, headers, productListUrl, plpResponse, null),
    getSkuPromotionData,
  ];
  if (headers.sku_display === 'false') {
    plpTask = [
      getAllSKUProductList.bind(
        null,
        headers,
        productListUrl,
        plpResponse,
        null,
      ),
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
  req,
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

        if (
          response.body.catalogEntryView.length === 0 &&
          response.body.metaData.spellcheck &&
          response.body.metaData.spellcheck.length > 0
        ) {
          const spellCheckArray = response.body.metaData.spellcheck;
          productListJson.spellCheck = spellCheckArray;
          // eslint-disable-next-line prefer-destructuring
          productListJson.searchTerm = spellCheckArray[0];
          const spellCheckUrl = productListUrl.replace(
            req.params.searchterm,
            spellCheckArray[0],
          );
          origin.getResponse(
            'GET',
            spellCheckUrl,
            reqHeader,
            null,
            null,
            null,
            null,
            spellCheckResponse => {
              if (spellCheckResponse.status === 200) {
                if (spellCheckResponse.body.catalogEntryView.length === 0) {
                  delete productListJson.spellCheck;
                }
                productListJson.productCount =
                  spellCheckResponse.body.recordSetTotal;
                productListJson.facetData = plpfilter.facetData(
                  spellCheckResponse.body.facetView,
                  headers.catalogId,
                );
                productListJson.productList =
                  spellCheckResponse.body.catalogEntryView || [];
                callback(null, headers, productListJson);
              } else {
                callback(errorUtils.handleWCSError(spellCheckResponse));
              }
            },
          );
        } else {
          productListJson.productCount = response.body.recordSetTotal;
          productListJson.facetData = plpfilter.facetData(
            response.body.facetView,
            headers.catalogId,
          );
          productListJson.productList = response.body.catalogEntryView || [];
          productListJson.breadCrumbData = plpfilter.getBreadCrumbData(
            response.body.breadCrumbTrailEntryViewExtended,
          );
          const categoryIds = [];
          productListJson.breadCrumbData.forEach(breadcrumb => {
            categoryIds.push(breadcrumb.value);
          });
          categoryUtil.categoryListByIDs(
            categoryIds,
            headers,
            (err, catResponse) => {
              if (catResponse && catResponse.length > 0) {
                catResponse.forEach(category => {
                  for (
                    let index = 0;
                    index < productListJson.breadCrumbData.length;
                    index += 1
                  ) {
                    if (
                      productListJson.breadCrumbData[index].value ===
                      category.uniqueID
                    ) {
                      productListJson.breadCrumbData[index].categoryIdentifier =
                        category.categoryIdentifier;
                      break;
                    }
                  }
                });
              }
              callback(null, headers, productListJson);
            },
          );
        }
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
    const productArray = [];
    productListJson.productList.forEach(product => {
      if (product.catalogEntryTypeCode !== 'ProductBean') {
        productArray.push(product);
        skuIds.push(product.uniqueID);
      }
    });

    promotionUtil.getMultiplePromotionData(skuIds, headers, (err, res) => {
      if (err) {
        callback(err);
        return;
      }
      const productListArray = [];
      productArray.forEach(product => {
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
module.exports.getFilteredSKUs = getFilteredSKUs;
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
    if (
      product.catalogEntryTypeCode === 'BundleBean' &&
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
                if (productDetail.partNumber) {
                  resJson[productDetail.partNumber] = productDetail;
                }
              });
              callback(null, resJson);
            },
          );
        } else {
          productList.forEach(product => {
            let productDetail = {};
            productDetail = pdpfilter.productDetailSummary(product);
            if (productDetail.partNumber) {
              resJson[productDetail.partNumber] = productDetail;
            }
          });
          callback(null, resJson);
        }
      }
    },
  );
}
