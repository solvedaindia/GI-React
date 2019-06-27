const constants = require('../utils/constants');
const headerutil = require('../utils/headerutil.js');
const errorutils = require('../utils/errorutils.js');
const origin = require('../utils/origin.js');

module.exports.bankList = function bankList(headers, callback) {
  const reqHeaders = headerutil.getWCSHeaders(headers);

  const getBankListURL = `${constants.getBankList.replace(
    '{{storeId}}',
    headers.storeId,
  )}`;

  origin.getResponse(
    'GET',
    getBankListURL,
    reqHeaders,
    null,
    null,
    null,
    '',
    response => {
      if (response.status === 200) {
        callback(null, response);
      } else {
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};
