const schedule = require('node-schedule');
const logger = require('./logger.js');
const cronconfig = require('../configs/cronconfig');
const apiCache = require('./apicache');

module.exports.startStoreInfoCron = function startStoreInfoCron() {
  const rule = cronconfig.getRule('storeInfo');
  schedule.scheduleJob(rule, () => {
    global.storeDetails = {};
    logger.debug('Store Details Cleared');
  });
};

module.exports.clearCache = function clearCache() {
  const rule = cronconfig.getRule('clearCache');
  schedule.scheduleJob(rule, () => {
    apiCache.clearCache(() => {});
  });
};
