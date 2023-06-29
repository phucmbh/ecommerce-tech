const jwt = require('jsonwebtoken');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../middlewares/jwt');
const { JWT_SECRET_KEY } = process.env;

const User = require('../models/user');

const asyncHandler = require('express-async-handler');

const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName)
    return res.status(400).json({
      sucess: false,
      message: 'Missing inputs',
    });

  const user = await User.findOne({ email });

  if (user) throw new Error('User already exists');
  else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      sucess: newUser ? true : false,
      message: newUser ? 'Register is successfully' : 'Something was wrong',
    });
  }
});

//Check password, create accessToken, create refreshToken - update in db - store in cookie
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      sucess: false,
      message: 'Missing inputs',
    });

  const user = await User.findOne({ email });

  //plan oject
  if (user && user.isCorrectPassword(password)) {
    const { password, role, ...userData } = user.toObject();
    const accessToken = generateAccessToken(user._id, role);
    const refreshToken = generateRefreshToken(user._id);
    await User.findByIdAndUpdate(user._id, { refreshToken }, { new: true });
    const _7DAYS = 7 * 24 * 60 * 60 * 1000;
    res.cookie('refreshToken', refreshToken, {
      maxAge: _7DAYS,
      httpOnly: true,
    });
    return res.status(200).json({
      sucess: true,
      accessToken,
      userData,
    });
  } else {
    throw new Error('Invalid credentials');
  }
});

// Delete refresh token in db and cookies
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken)
    throw new Error('No refresh token in cookies');
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: '' },
    { new: true }
  );

  res.clearCookie('refreshToken', {
    secure: true,
    httpOnly: true,
  });

  return res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
});

//Verify accessToken req.user {_id:..., role:...}
const getUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select('-password -role -refreshToken');
  return res.status(200).json({
    success: true,
    resutl: user ? user : 'User not found',
  });
});

//Retrive refresh token in cookies, verify, check with refresh token in db
const refreshAccessToken = asyncHandler(async (req, res) => {
  // {refreshToken: ...}
  const cookie = req.cookies;
  if (!cookie.refreshToken) throw new Error('No refresh token in cookie');

  // {_id: ...}
  const decodedRefreshToken = jwt.verify(cookie.refreshToken, JWT_SECRET_KEY);
  const user = await User.findOne({
    _id: decodedRefreshToken._id,
    refreshToken: cookie.refreshToken,
  });

  return res.status(200).json({
    success: user ? true : false,
    newAccessToken: user
      ? generateAccessToken(user._id, user.role)
      : 'Refresh token note match',
  });
});

module.exports = {
  register,
  login,
  logout,
  getUser,
  refreshAccessToken,
};
