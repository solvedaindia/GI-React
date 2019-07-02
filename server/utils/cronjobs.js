const schedule = require('node-schedule');
const logger = require('./logger.js');
const cronconfig = require('../configs/cronconfig');

module.exports.startStoreInfoCron = function startStoreInfoCron() {
  const rule = cronconfig.getRule('storeInfo');
  schedule.scheduleJob(rule, () => {
    global.storeDetails = {};
    logger.debug('Store Details Cleared');
  });
};
