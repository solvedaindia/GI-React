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

  const originUserUrl = `${constants.newsletterSubscription.replace(
    '{{storeId}}',
    headers.storeId,
  )}/savenewsletterdetails`;

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
        callback(null, { message: 'Thanks for Subscribing' });
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

/**
 * Newsletter Subscription Status API
 * @param access_token
 * @returns 200,
 * @throws contexterror,badreqerror if storeid or access_token is invalid
 */
module.exports.getSubscriptionStatus = function getSubscriptionStatus(
  headers,
  callback,
) {
  logger.debug('Call to News Letter Subscription Status');

  const reqHeader = headerutil.getWCSHeaders(headers);
  const originUserUrl = `${constants.newsletterSubscription.replace(
    '{{storeId}}',
    headers.storeId,
  )}/getnewslettersubdetails/${headers.userId}`;

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
        const responseMessage = {
          alreadySubscribed: false,
        };
        if (response.body['User Subscription Status'] === true) {
          responseMessage.alreadySubscribed = true;
        }
        callback(null, responseMessage);
      } else {
        logger.debug('Error While Hitting Newsletter Subscription Status API');
        callback(errorutils.handleWCSError(response));
      }
    },
  );
};
