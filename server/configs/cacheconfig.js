module.exports.apiCacheConfig = {
  plp: {
    expiryTime: 60 * 60 * 4, // 4 Hour
    userSpecific: false,
  },
  pdp: {
    expiryTime: 60 * 60 * 4,
    userSpecific: false,
  },
  espot: {
    expiryTime: 60 * 60 * 4,
    userSpecific: false,
  },
};

module.exports.redisConfig = getRedisConfig;
function getRedisConfig() {
  const redisClientUrl = 'redis://@127.0.0.1:6379/1';
  return redisClientUrl;
}
