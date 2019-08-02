exports.getWCSHeaders = function getWCSHeaders(headers) {
  if (headers.WCToken && headers.WCTrustedToken)
    return {
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      WCToken: headers.WCToken,
      WCTrustedToken: headers.WCTrustedToken,
    };
  return null;
};
