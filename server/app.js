const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const responseTime = require('response-time');
const compression = require('compression');
const StatsD = require('node-statsd');
const contextService = require('request-context');
const uniqid = require('uniqid');
const https = require('https');
const fs = require('fs');
const tokenValidation = require('./utils/tokenvalidation');
const logger = require('./utils/logger.js');
const storeInfo = require('./utils/storeinfo');
require('dotenv').config();

const port = process.env.SERVER_PORT || '8002';
global.storeDetails = {};

// Cron JOB
require('./utils/cronjobs').startStoreInfoCron();

const app = express();

app.use(
  cors({
    origin: '*',
  }),
);

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

// Setting JSON as default content type
app.use(
  bodyParser.json({
    type: '*/*',
  }),
);

app.use(bodyParser.json());
app.use(helmet());

app.use(responseTime());
const stats = new StatsD();
stats.socket.on('error', error => {
  logger.info(error.stack);
});

app.use(
  responseTime((req, res, time) => {
    const stat = (req.method + req.url)
      .toLowerCase()
      // eslint-disable-next-line no-useless-escape
      .replace(/[:\.]/g, '')
      .replace(/\//g, '_');
    stats.timing(stat, time);
    if (time > 800) {
      logger.info(
        ` :(  Request: ${req.method}|${
          req.originalUrl
        }::--:: Res Time: ${time}`,
      );
    } else {
      logger.info(
        ` :)  Request: ${req.method}|${
          req.originalUrl
        }::--:: Res Time: ${time}`,
      );
    }
  }),
);

app.use(contextService.middleware('apirequest'));

app.use((req, res, next) => {
  const reqUniqId = uniqid();
  req.headers.Request_ID = reqUniqId;
  contextService.set('apirequest:requestid', reqUniqId);
  logger.debug(
    `Request for api :${req.originalUrl} ::: Request ID : ${reqUniqId}`,
  );
  next();
});

/* To get StoreId and CatalogID on basis of Store identifier */
app.use((req, res, next) => {
  const storeIdentifier = req.headers.store_id || 'GodrejInterioESite';
  if (storeIdentifier) {
    if (
      global.storeDetails[storeIdentifier] &&
      global.storeDetails[storeIdentifier].storeID &&
      global.storeDetails[storeIdentifier].catalogID
    ) {
      req.headers.storeId = global.storeDetails[storeIdentifier].storeID;
      req.headers.catalogId = global.storeDetails[storeIdentifier].catalogID;
      next();
    } else {
      storeInfo.getStoreDetails(storeIdentifier, (error, result) => {
        if (error) {
          next(error);
        } else {
          global.storeDetails[storeIdentifier] = result;
          req.headers.storeId = global.storeDetails[storeIdentifier].storeID;
          req.headers.catalogId =
            global.storeDetails[storeIdentifier].catalogID;
          next();
        }
      });
    }
  } else {
    next();
  }
});

// To handle secure API's and check token status
app.use((req, res, next) => {
  tokenValidation.validateSecureToken(req, res, next);
  next();
});

// Add routes
app.use('/api/v1', require('./routes'));
app.use(compression());

// HTTP error 404 for unhandled routs
app.use((req, res) => {
  const errorMessage = {
    status: 'failure',
    error: {
      status_code: 404,
      error_key: 'Resource_Not_Found',
      error_message: `Requested resource not found:${req.originalUrl}`,
    },
  };
  logger.error('HTTP ERROR 404: ', JSON.stringify(errorMessage));
  res.status(404).send(errorMessage);
});

// Generic error handler
app.use((err, req, res, next) => {
  logger.error(
    JSON.stringify({
      url: req.originalUrl,
      stackTrace: JSON.stringify(err.stack),
      status_code: err.status_code,
      error_message: err.error_message,
      error_key: err.error_key,
      req_headers: req.headers,
    }),
  );
  res.status(err.status_code).send({
    status: 'failure',
    error: {
      status_code: err.status_code,
      error_key: err.error_key,
      error_message: err.error_message,
    },
  });
});

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
};

const server = https.createServer(options, app);
server.listen(port, () =>
  logger.info(`Server started on https://localhost:${port}`),
);
