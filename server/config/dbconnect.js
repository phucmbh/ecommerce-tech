const { default: mongoose } = require('mongoose');

const dbConect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (conn.connection.readyState === 1) {
      console.log('Db connection is successfully');
    } else {
      console.log('Db connecting');
    }
  } catch (error) {
    console.log('DB connection error');
    throw new Error(error);
  }
};

module.exports = dbConect;
