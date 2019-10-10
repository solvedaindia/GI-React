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
  catsuggestion: {
    expiryTime: 60 * 60 * 24,
    userSpecific: false,
  },
};

module.exports.redisConfig = getRedisConfig;
function getRedisConfig() {
  const redisClientUrl = `redis://@${process.env.HOST_IP}:6379/1`;
  return redisClientUrl;
}
