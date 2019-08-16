const request = require('request');
const logger = require('./logger.js');
// eslint-disable-next-line no-useless-escape
const regexHidePW = /\"logonPassword\"\s*\:\s*\"[^\}]+\"\}/;
// eslint-disable-next-line no-useless-escape
const regexHideID = /\"logonId\"\s*\:\s*\"[^\}]+\"\}/;

exports.getResponse = getResponse;
function getResponse(originMethod, originURL, reqHeaders, reqBody) {
  logger.debug(`Origin Method:::${originMethod}`);
  logger.debug(`Origin URL:::${originURL}`);
  // logger.debug('Request Header:::', reqHeaders);
  // logger.debug('Request Body:::', JSON.stringify(reqBody));
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
      // logger.debug(`Response From Origin::${JSON.stringify(response)}`);
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
        logger.debug(`Error from WCS::${response}`);
        logger.wcserror(
          JSON.stringify(responceJSON)
            .replace(regexHideID, '"logonId":"*******"')
            .replace(regexHidePW, '"logonPassword":"*******"'),
        );
        reject(response);
      }
    });
  });
}
