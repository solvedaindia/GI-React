/* eslint-disable no-useless-escape */
const request = require('request');
const logger = require('./logger.js');
const regexHidePW = /\"logonPassword\"\s*\:\s*\"[^\}]+\"\}/;
const regexHideConfirmPW = /\"logonPasswordVerify\"\s*\:\s*\"[^\}]+\"\}/;
const regexHideID = /\"logonId\"\s*\:\s*\"[^\}]+\"\}/;

exports.getResponse = getResponse;
function getResponse(originMethod, originURL, reqHeaders, reqBody) {
  logger.debug(`Origin URL:::${originURL}`);
  return new Promise((resolve, reject) => {
    const options = {
      url: originURL,
      method: originMethod,
      headers: reqHeaders,
      json: true,
      strictSSL: false,
    };
    if (reqBody) {
      options.body = reqBody;
    }
    request(options, (error, response) => {
      if (error) {
        logger.error(`Error while calling ${originURL} Error is ${error}`);
        reject(error);
        return;
      }
      response.status = response.statusCode;
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
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
        reject(response);
      }
    });
  });
}
