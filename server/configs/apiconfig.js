exports.getEnvHostName = function hostName() {
  let envName = '';
  let apiVersion = '/v1';
  const port = normalizePort(process.env.SERVER_PORT || '8002');
  if (process.env.ENV) {
    envName = process.env.ENV;
  } else {
    envName = 'LOCAL';
  }
  if (process.env.APIVERSION) {
    apiVersion = `/${process.env.APIVERSION}`;
  }
  const hostname = {};
  // eslint-disable-next-line default-case
  switch (envName) {
    case 'LOCAL':
      hostname.secure = `https://localhost:${port}/api${apiVersion}/secure`;
      hostname.nonsecure = `http://localhost:${port}/api${apiVersion}`;
      break;
  }
  hostname.endPoint = envName;
  return hostname;
};

function normalizePort(val) {
  const port = parseInt(val, 10);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}
exports.getEndPoint = function getEndPoint() {
  let endPoint = '';
  if (process.env.WCSENDPOINT) {
    endPoint = process.env.WCSENDPOINT;
  } else {
    endPoint = 'LOCAL';
  }
  const endpointConfigURL = {};
  // eslint-disable-next-line default-case
  switch (endPoint) {
    case 'LOCAL':
      endpointConfigURL.hostname = '192.168.0.36';
      endpointConfigURL.searchHostname = '192.168.0.36:3738';
      break;
    case 'DEV':
      endpointConfigURL.hostname = '172.30.0.163:5443';
      endpointConfigURL.searchHostname = '172.30.0.163:3738';
      break;
    case 'SIT':
      endpointConfigURL.hostname = '172.30.0.172:5443';
      endpointConfigURL.searchHostname = '172.30.0.172:3738';
      break;
    case 'UAT':
      endpointConfigURL.hostname = '172.30.0.181:5443';
      endpointConfigURL.searchHostname = '172.30.0.181:3738';
      break;
  }
  endpointConfigURL.endPoint = endPoint;
  return endpointConfigURL;
};
