const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const responseTime = require('response-time');
const compression = require('compression');
const StatsD = require('node-statsd');
const https = require('https');
const fs = require('fs');
const tokenValidation = require('./utils/tokenvalidation');
const errorUtils = require('./utils/errorutils');
const logger = require('./utils/logger.js');

// const csrf = require('csurf');
// const session = require('express-session');
// const errorHandler = require('errorhandler');

const app = express();
app.use(compression());
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
// app.use(helmet.noSniff());
// app.use(helmet.ieNoOpen());
// app.use(helmet.xssFilter());
// app.use(helmet.hidePoweredBy());

// app.use(express.static(path.join(__dirname, 'public')));
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

app.use((req, res, next) => {
  if (req.headers.store_id) {
    req.headers.storeId = req.headers.store_id;
    next();
  } else {
    const errorMessage = {
      status: 'failure',
      error: errorUtils.errorlist.storeid_missing,
    };
    logger.error('HTTP ERROR 400: ', JSON.stringify(errorMessage));
    res.status(400).send(errorMessage);
  }
});

// To handle secure API's and check token status
app.use((req, res, next) => {
   console.log('User Agent>>>', req.headers['user-agent']);
  tokenValidation.validateSecureToken(req, res, next);
  next();
  /* if (req.url.indexOf('/secure/') !== -1) {
    tokenValidation.validateSecureToken(req, res, next);
    next();
  } else {
    next();
  } */
});

// Add routes
app.use('/api/v1', require('./routes'));

// HTTP error 404 for unhandled routs
app.use((req, res) => {
  const errorMessage = {
    status: 'failure',
    error: {
      message: `Requested resource not found:${req.originalUrl}`,
    },
  };
  logger.error('HTTP ERROR 404: ', JSON.stringify(errorMessage));
  res.status(404);
  res.send(errorMessage);
});

// Generic error handler
app.use((err, req, res, next) => {
  logger.error(
    JSON.stringify({
      url: req.originalUrl,
      stackTrace: JSON.stringify(err.stack),
      status_code: err.status || err.status_code,
      error_message: err.message || err.error_message,
      error_key: err.error_code || err.error_key,
      req_headers: req.headers,
    }),
  );
  res.status(err.status || err.status_code).send({
    status: 'failure',
    error: {
      status_code: err.status || err.status_code,
      error_key: err.error_code || err.error_key,
      error_message: err.message || err.error_message,
    },
    // error_response: err.error_code
  });
});

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert'),
};

// app.listen(8001, () => console.log('Server started on http://localhost:8001'));

https
  .createServer(options, app)
  // eslint-disable-next-line no-console
  .listen(8002, () => console.log('Server started on https://localhost:8002'));
