const constants = require('../utils/constants');
const logger = require('../utils/logger.js');
const origin = require('../utils/origin.js');
const headerutil = require('../utils/headerutil.js');
const errorutils = require('../utils/errorutils.js');

/**
 * Newsletter API
 * @param email_id
 * @returns 200, ok :- Successfully subscribed
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.newsLetterSubscription = function newsLetterSubscription(
  params,
  headers,
  callback,
) {
  logger.debug('Call to News Letter API');
  if (!params.email_id) {
    logger.debug('Invalid Params');
    callback(errorutils.errorlist.invalid_params);
    return;
  }

  const reqHeader = headerutil.getWCSHeaders(headers);
  const reqBody = {
    userId: headers.userId,
    emailId: params.email_id,
  };

  const originUserUrl = constants.newsletterSubscription.replace(
    '{{storeId}}',
    headers.storeId,
  );

  origin.getResponse(
    'POST',
    originUserUrl,
    reqHeader,
    null,
    reqBody,
    null,
    '',
    response => {
      if (response.status === 200) {
        callback(null, { message: 'Successfully Subscribed' });
      } else {
        logger.error(
          `newsletter error ${JSON.stringify(response.body)}`,
          'Error',
          null,
        );
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};
