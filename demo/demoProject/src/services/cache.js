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
    return new Promise((resolve, reject) => {
      client.incr(key, (err, count) => {
        if (err) {
          reject(err);
        } else {
          client.expire(key, 24 * 60 * 60); // 24 hours expiration
          resolve(count);
        }
      });
    });
  },
};

module.exports = cacheService;
