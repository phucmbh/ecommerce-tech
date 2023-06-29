const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

const generateAccessToken = (uid, role) =>
  jwt.sign({ _id: uid, role }, JWT_SECRET_KEY, {
    expiresIn: '2d',
  });
const generateRefreshToken = (uid) =>
  jwt.sign({ _id: uid }, JWT_SECRET_KEY, { expiresIn: '7d' });

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
