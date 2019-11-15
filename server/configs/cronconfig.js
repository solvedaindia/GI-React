//        schedule time configuration
//        *    *    *    *    *    *
//        ┬    ┬    ┬    ┬    ┬    ┬
//        |    │    │    │    │    |
//        │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
//        │    │    │    │    └───── month (1 - 12)
//        │    │    │    └────────── day of month (1 - 31)
//        │    │    └─────────────── hour (0 - 23)
//        │    └──────────────────── minute (0 - 59)
//        └───────────────────────── second (0 - 59, OPTIONAL)

const cronSchedule = {
  storeInfo: '0 1 * * *', // At 6:30 AM
  clearCache: '0 1 * * *', // At 6:30 AM
};

module.exports.getRule = function getRule(cronName) {
  return cronSchedule[cronName];
};
