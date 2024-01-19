const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

var that = (module.exports = {
  generateAccessToken: (uid, role) =>
    jwt.sign({ _id: uid, role }, JWT_SECRET_KEY, {
      expiresIn: '3d',
    }),
  generateRefreshToken: (uid) =>
    jwt.sign({ _id: uid }, JWT_SECRET_KEY, { expiresIn: '7d' }),
});
