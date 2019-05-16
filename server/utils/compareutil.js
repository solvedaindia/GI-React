const async = require('async');
const origin = require('./origin');
const constants = require('./constants');
const originMethod = 'GET';
const errorUtils = require('./errorutils');
const logger = require('./logger.js');
const headerutil = require('./headerutil');

module.exports.getCompareProducts = function getCompareProducts(headers, productIDs, callback) {
    let id = '';
    if (productIDs && productIDs.length > 0) {
      productIDs.forEach(productID => {
        id += `id=${productID}&`;
      });
    }
    const originUrl = constants.productViewByProductIds
      .replace('{{storeId}}', headers.storeId)
      .replace('{{idQuery}}', id);
  
    const reqHeader = headerutil.getWCSHeaders(headers);
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
         callback(null, response.body)
        } else {
          callback(errorUtils.handleWCSError(response));
        }
      },
    );
  }