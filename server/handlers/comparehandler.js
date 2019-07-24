const async = require('async');
const errorUtils = require('../utils/errorutils');
const logger = require('../utils/logger.js');
const compareUtil = require('../utils/compareutil');



module.exports.getCompareData = function getCompareData(req, callback) {
    logger.debug('Inside the GET PDP Data Method');
    if (!req.query.ids) {
        logger.debug('GET PDP Data :: Invalid Params');
        callback(errorUtils.errorlist.invalid_params);
        return;
    }
    console.log(req.query, "this is query");
    const reqHeaders = req.headers;
    const ids = req.query.ids.split(',');

    compareUtil.getCompareProducts(reqHeaders, ids, (err, result) => {
        if (err) {
            callback(errorUtils.handleWCSError(err));
        } else {
            logger.debug('Got all the origin resposes for Product Detail');
            callback(null, result);
        }
    });
};