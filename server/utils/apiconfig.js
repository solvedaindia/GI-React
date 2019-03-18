exports.getEnvHostName = function hostName() {
  let envName = '';
  let apiVersion = '/v1';
  const port = normalizePort(process.env.PORT || '8002');
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
      endpointConfigURL.hostname = '192.168.0.39';
      endpointConfigURL.searchHostname = '192.168.0.39:3738';
      break;
  }
  endpointConfigURL.endPoint = endPoint;
  return endpointConfigURL;
};
