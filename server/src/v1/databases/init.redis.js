const redis = require('redis');

const client = redis.createClient({
  url: process.env.REDIS_URI,
});

(async () => {
  await client.connect();
})();

client.on('ready', () => {
  console.log('Redis connected!');
});

client.on('error', (err) => {
  console.log(err);
});

module.exports = client;
