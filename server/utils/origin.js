/* eslint-disable no-console */
const unirest = require('unirest');
const logger = require('./logger.js');
// eslint-disable-next-line no-useless-escape
const regexHidePW = /\"logonPassword\"\s*\:\s*\"[^\}]+\"\}/;
const regexHideID = /\"logonId\"\s*\:\s*\"[^\}]+\"\}/;

exports.getResponse = function getResponse(
  originMethod,
  originURL,
  reqHeaders,
  reqCookies,
  reqBody,
  contentEncoding,
  reqUniqId,
  callback,
) {
  logger.debug(`Origin Method:::${originMethod}`);
  logger.debug(`Origin URL:::${originURL}`);
  // console.log('Request Header', reqHeaders);
  // console.log('Request Body', reqBody);
  try {
    const request = unirest(originMethod, originURL).strictSSL(false);
    if (reqHeaders) {
      logger.debug('Setting Headers');
      request.header(reqHeaders);
    }
    if (reqBody) {
      request.send(reqBody);
    } else {
      request.send();
    }
    request.end(response => {
      // logger.debug(`Response From Origin::${JSON.stringify(response)}`);
      if (response.status >= 200 && response.status < 300) {
        callback(response);
      } else {
        const responceJSON = {
          ReqHeaders: reqHeaders || '',
          ReqBody: reqBody || '',
          Method: originMethod,
          URL: originURL,
          Status: response.status,
          Body: response.body,
        };
        logger.debug(`Error from WCS::${response}`);
        logger.wcserror(
          JSON.stringify(responceJSON)
            .replace(regexHideID, '"logonId":"*******"')
            .replace(regexHidePW, '"logonPassword":"*******"'),
        );
        callback(response);
      }
    });
  } catch (error) {
    logger.error(`Error while calling ${originURL} Error is ${error}`);
    callback(error);
  }
};
