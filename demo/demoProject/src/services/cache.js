// cacheService.js
const redis = require('redis');
const client = redis.createClient();

client.connect();
client.on("connect", (err)=>{
    console.log("reddis connected")
})

const cacheService = {
  setCacheEntry: (key, value, expiration) => {
    client.set(key, value, expiration);
  },
  isBlocked: (key) => client.get(key),
  trackRequestCount: (from) => {
    const key = `request_count:${from}`;
    return client.incr(key, (err, count) => {
          client.expire(key, 24 * 60 * 60); // 24 hours expiration
        })
  },
};

module.exports = cacheService;
