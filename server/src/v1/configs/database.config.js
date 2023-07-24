const mongoose = require('mongoose');
const redis = require('redis');

module.exports = {
  initMongodb: () => {
    //connect mongoose
    mongoose
      .connect(process.env.MONGO_URI)
      .then((_) => console.log('Connected mongoose success !!!'))
      .catch((err) => console.error(`Error: connect:::`, err));

    // all executed methods log output to console
    // mongoose.set('debug', true);

    // disable colors in debug mode
    // mongoose.set('debug', { color: false });

    // get mongodb-shell friendly output (ISODate)
    // mongoose.set('debug', { shell: true });
  },

  connectRedis: async () => {
    const client = redis.createClient({
      url: process.env.REDIS_URI,
    });
    client.on('error', (error) => console.error(`Error : ${error}`));
    await client.connect();

    client.on('ready', () => {
      console.log('Connected!');
    });
    await client.set('key', 'value');
    console.log('hmm');
    return client;
  },
};
