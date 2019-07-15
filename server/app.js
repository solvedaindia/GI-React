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
const errorUtils = require('./utils/errorutils');
const logger = require('./utils/logger.js');
const storeInfo = require('./utils/storeinfo');

const port = process.env.PORT || '8002';

global.storeDetails = {};

// Cron JOB
require('./utils/cronjobs').startStoreInfoCron();

// const csrf = require('csurf');
// const session = require('express-session');
// const errorHandler = require('errorhandler');

const app = express();

app.use(
  cors({
    origin: '*',
  }),
);

// app.use(require('morgan')('dev'));
// app.disable('x-powered-by');
// app.use(csrf());

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
/* app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy()); */

app.use(responseTime());
const stats = new StatsD();
stats.socket.on('error', error => {
  // console.log('error', error);
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

// db instance connection
// require('./utils/db');

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
  const storeIdentifier = req.headers.store_id;
  if (storeIdentifier) {
    if (
      global.storeDetails[storeIdentifier] &&
      global.storeDetails[storeIdentifier].storeID
    ) {
      req.headers.storeId = global.storeDetails[storeIdentifier].storeID;
      req.headers.catalogId = global.storeDetails[storeIdentifier].catalogID;
      next();
    } else {
      storeInfo.getStoreDetails(req.headers, (error, result) => {
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
    const errorMessage = {
      status: 'failure',
      error: errorUtils.errorlist.storeid_missing,
    };
    logger.error(JSON.stringify(errorMessage));
    res.status(400).send(errorMessage);
  }
});

/* app.use((req, res, next) => {
  if (req.headers.store_id) {
    req.headers.storeId = req.headers.store_id;
    req.headers.catalogId = req.headers.catalog_id || 10051;
    next();
  } else {
    const errorMessage = {
      status: 'failure',
      error: errorUtils.errorlist.storeid_missing,
    };
    logger.error(JSON.stringify(errorMessage));
    res.status(400).send(errorMessage);
  }
}); */

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

/* app.listen(port, () =>
  logger.info(`Server started on http://localhost:${port}`),
); */

const server = https.createServer(options, app);
server.listen(port, () =>
  logger.info(`Server started on https://localhost:${port}`),
);
