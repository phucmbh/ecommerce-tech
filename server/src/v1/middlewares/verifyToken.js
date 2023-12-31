const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

var that = (module.exports = {
  //Get accessToken, verify, add user to req
  verifyAccessToken: asyncHandler(async (req, res, next) => {
    if (req?.headers?.authorization?.startsWith('Bearer')) {
      const token = req.headers.authorization.split(' ')[1];
      jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err)
          return res.status(401).json({
            sucess: false,
            message: 'Invalid access token',
          });
        req.user = decoded; //{_id:..., role:...}
        next();
      });
    } else {
      return res.status(401).json({
        sucess: false,
        message: 'Require authentication credentials',
      });
    }
  }),

  isAdmin: asyncHandler((req, res, next) => {
    const { role } = req.user;
    if (role !== 'admin')
      return res.status(401).json({
        success: false,
        message: 'Require admin role',
      });
    next();
  }),
});
