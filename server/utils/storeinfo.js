const origin = require('./origin');
const constants = require('./constants');
const originMethod = 'GET';
const logger = require('./logger.js');
const errorUtils = require('./errorutils');

/* To Get the Store Details Based on Store Identifier */
module.exports.getStoreDetails = function getStoreDetails(headers, callback) {
  const originUrl = constants.storeDetails.replace(
    '{{storeIdentifier}}',
    headers.store_id,
  );
  origin.getResponse(
    originMethod,
    originUrl,
    null,
    null,
    null,
    null,
    null,
    response => {
      if (response.status === 200) {
        if (
          response.body.resultList &&
          response.body.resultList.length > 0 &&
          response.body.resultList[0].storeId
        ) {
          const storeDetails = {
            storeID: response.body.resultList[0].storeId,
            catalogID: response.body.resultList[0].defaultCatalogId,
          };
          callback(null, storeDetails);
          return;
        }
        logger.debug('Error While Fetching Store Details');
        callback(errorUtils.errorlist.store_invalid);
      } else {
        logger.debug('Error While Fetching Store Details');
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
};
