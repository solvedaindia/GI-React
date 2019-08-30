const winston = require('winston');
const fs = require('fs');
const logDir = 'log';
const instance = process.env.INSTANCE || 'API';
let logger;

require('winston-daily-rotate-file');

// winston default logging levels { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
const logLevels = {
  levels: {
    wcserror: 0,
    validation: 1,
    error: 2,
    warn: 3,
    debug: 4,
    info: 5,
    verbose: 6,
    silly: 7,
  },
};

const loggers = [];
const contextService = require('request-context');
const moment = require('moment');
const TIMESTAMP_FORMAT = 'DD-MM-YYYY HH:mm:ss a';
const fileDatePattern = 'yyyy-MM-dd';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const consoleLogger = new winston.transports.Console({
  name: 'console-file',
  level: 'info',
  timestamp() {
    return moment()
      .tz('Asia/Kolkata')
      .format(TIMESTAMP_FORMAT);
  },
  colorize: true,
  prettyPrint: true,
});

const errorLogger = new winston.transports.DailyRotateFile({
  name: 'error-file',
  level: 'error',
  json: true,
  prettyPrint: true,
  datePattern: fileDatePattern,
  filename: `${logDir}/${instance}_error_`,
  timestamp() {
    return moment()
      .tz('Asia/Kolkata')
      .format(TIMESTAMP_FORMAT);
  },
  handleExceptions: true,
  humanReadableUnhandledException: true,
  colorize: true,
  maxsize: 1024 * 1024 * 20, // 2MB
});

const validationLogger = new winston.transports.DailyRotateFile({
  name: 'validation-file',
  level: 'validation',
  json: true,
  prettyPrint: true,
  datePattern: fileDatePattern,
  filename: `${logDir}/${instance}_validation_`,
  timestamp() {
    return moment()
      .tz('Asia/Kolkata')
      .format(TIMESTAMP_FORMAT);
  },
  handleExceptions: true,
  humanReadableUnhandledException: true,
  colorize: true,
  maxsize: 1024 * 1024 * 10, // 1MB
});

const wcserrorLogger = new winston.transports.DailyRotateFile({
  name: 'wcserror-file',
  level: 'wcserror',
  json: true,
  prettyPrint: true,
  datePattern: fileDatePattern,
  filename: `${logDir}/${instance}_wcserror_`, // + moment().format('DD-MM-YY') + '-wcserror.log',
  timestamp() {
    return moment()
      .tz('Asia/Kolkata')
      .format(TIMESTAMP_FORMAT);
  },
  handleExceptions: true,
  humanReadableUnhandledException: true,
  colorize: true,
  maxsize: 1024 * 1024 * 10, // 1MB
});

loggers.push(consoleLogger);
loggers.push(errorLogger);
loggers.push(wcserrorLogger);
loggers.push(validationLogger);

// eslint-disable-next-line prefer-const
logger = new winston.Logger({
  levels: logLevels.levels,
  transports: loggers,
});

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'green',
  wcserror: 'red',
  validation: 'blue',
});

logger.log = function logError() {
  const requestId = contextService.get('apirequest:requestid');
  if (requestId) {
    // eslint-disable-next-line prefer-rest-params
    const newLogMessage = `[Req Id: ${requestId}]-${arguments[1]}`;
    // eslint-disable-next-line prefer-rest-params
    arguments[1] = newLogMessage;
  }
  // eslint-disable-next-line prefer-rest-params
  winston.Logger.prototype.log.apply(this, arguments);
};

module.exports = logger;
