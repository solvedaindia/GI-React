/* eslint-disable no-useless-escape */
const unirest = require('unirest');
const logger = require('./logger.js');
const regexHidePW = /\"logonPassword\"\s*\:\s*\"[^\}]+\"\}/;
const regexHideConfirmPW = /\"logonPasswordVerify\"\s*\:\s*\"[^\}]+\"\}/;
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
  logger.debug(`Origin URL:::${originURL}`);
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
      if (response.status >= 200 && response.status < 300) {
        callback(response);
      } else {
        const responceJSON = {
          Status: response.status,
          URL: originURL,
          Method: originMethod,
          ReqHeaders: reqHeaders || '',
          ReqBody: reqBody || '',
          Body: response.body,
        };
        logger.wcserror(
          JSON.stringify(responceJSON)
            .replace(regexHideID, '"logonId":"*******"')
            .replace(regexHidePW, '"logonPassword":"*******"')
            .replace(regexHideConfirmPW, '"logonPasswordVerify":"*******"'),
        );
        callback(response);
      }
    });
  } catch (error) {
    logger.error(`Error while calling ${originURL} Error is ${error}`);
    callback(error);
  }
};
