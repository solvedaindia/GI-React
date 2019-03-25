const origin = require('../utils/origin');
const constants = require('../utils/constants');
const errorUtils = require('../utils/errorutils');
const logger = require('../utils/logger.js');
const headerutil = require('../utils/headerutil');

/**
 * Function for PLP Data
 * @param
 * @returns
 * @throws
 */
module.exports.getPdpData = function getPdpData(req, callback) {
  logger.debug('Inside the GET PDP Data Method');
  if (!req.query.id && req.query.id == null) {
    logger.debug('GET PDP Data :: Invalid Params');
    callback(errorUtils.errorlist.invalid_params);
    return;
  }

  const reqHeader = headerutil.getWCSHeaders(req.headers);
  const productId = req.query.id;

  const originUserUrl = constants.productViewById
    .replace('{{storeId}}', req.headers.store_id)
    .replace('{{productid}}', productId);

  origin.getResponse(
    'GET',
    originUserUrl,
    reqHeader,
    null,
    null,
    null,
    '',
    response => {
      if (response.status === 200) {
        callback(null, response.body);
      } else {
        logger.error(
          `PDP error ${JSON.stringify(response.body)}`,
          'Error',
          null,
        );
        callback(errorUtils.handleWCSError(response));
      }
    },
  );
};
