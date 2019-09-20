/* eslint-disable prefer-destructuring */
const redis = require('redis');
const logger = require('./logger');
const cacheConfig = require('../configs/cacheconfig');
const apiCacheConfig = cacheConfig.apiCacheConfig;

const defaultCacheConfig = {
  redisClient: null,
};
global.isRedis = false;
if (process.env.REDIS === '1') {
  const redisClient = redis.createClient(cacheConfig.redisConfig());
  redisClient.on('error', err => {
    logger.error('Redis client error');
    global.isRedis = false;
  });
  redisClient.on('ready', () => {
    logger.info('Redis connected');
    global.isRedis = true;
  });
  defaultCacheConfig.redisClient = redisClient;
}

module.exports.getCachedResponse = function getCachedResponse(
  apiName,
  req,
  callback,
) {
  if (global.isRedis === false) {
    callback(null);
    return;
  }
  let key = apiName;
  if (req) {
    key = apiName + req.url + req.headers.storeId;
  }
  let userSpecific = false;
  const apiCacheConf = apiCacheConfig[apiName] || null;
  if (apiCacheConf) {
    userSpecific = apiCacheConf.userSpecific;
  }
  key = userSpecific ? key + req.headers.userId : key;
  defaultCacheConfig.redisClient.get(key, (err, reply) => {
    if (!err && reply !== null) {
      logger.info('Sending From Cache');
      callback(JSON.parse(reply));
      return;
    }
    callback(null);
  });
};

module.exports.cacheResponse = function cacheResponse(apiName, req, res) {
  if (global.isRedis === true) {
    let key = apiName;
    if (req) {
      key = apiName + req.url + req.headers.storeId;
    }
    let expiryTime = 1800;
    let userSpecific = false;
    const apiCacheConf = apiCacheConfig[apiName] || null;
    if (apiCacheConf) {
      expiryTime = apiCacheConf.expiryTime;
      userSpecific = apiCacheConf.userSpecific;
    }
    key = userSpecific ? key + req.headers.userId : key;
    defaultCacheConfig.redisClient.set(key, JSON.stringify(res));
    defaultCacheConfig.redisClient.expire(key, expiryTime);
    logger.info('Successfully Cached');
  }
};

module.exports.clearCache = function clearCache(callback) {
  if (global.isRedis === true) {
    defaultCacheConfig.redisClient.flushall();
    logger.debug('Cache Cleared');
    callback('Cache Cleared');
    return;
  }
  callback('Redis Not Connected');
};

module.exports.getKeys = function getKeys(req, callback) {
  if (global.isRedis === true) {
    const keyword = req.query.keyword;
    const searchKey = keyword ? `*${keyword}*` : '*';
    defaultCacheConfig.redisClient.keys(searchKey, (err, keys) => {
      if (err) {
        callback(`Error In Fetching Keys from Redis${err}`);
        return;
      }
      callback(keys);
    });
  } else {
    callback('Redis Not Connected');
  }
};

module.exports.deletekey = function deletekey(key, callback) {
  if (global.isRedis === true) {
    defaultCacheConfig.redisClient.del(key, (err, res) => {
      if (err) {
        callback(`Error In Deleting Key${err}`);
        return;
      }
      callback('Successfully Deleted');
    });
  } else {
    callback('Redis Not Connected');
  }
};
