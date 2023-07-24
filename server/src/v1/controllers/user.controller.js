const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../middlewares/jwt');
const { JWT_SECRET_KEY, URL_CLIENT } = process.env;
const User = require('../models/user.model');
const asyncHandler = require('express-async-handler');
const sendMail = require('../utils/sendMail');
const client = require('../databases/init.redis');

var that = (module.exports = {
  register: asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName, mobile } = req.body;
    if (!email || !password || !firstName || !lastName || !mobile)
      return res.status(400).json({
        success: false,
        message: 'Missing inputs',
      });
    const user = await User.findOne({ email });

    if (user) throw new Error('User already exists');
    else {
      const FIFTEEN_MINUTES = 60 * 15;

      const token = crypto.randomBytes(128).toString('hex');
      await client.setEx(
        `etoken:${token}`,
        FIFTEEN_MINUTES,
        JSON.stringify({ ...req.body })
      );

      console.log(`${URL_CLIENT}/user/verifyemail/${token}`);

      await sendMail({
        subject: 'Verify email',
        url: `${URL_CLIENT}/user/verifyemail/${token}`,
        reason: 'verify your email address',
        email,
      });
      return res.status(200).json({
        success: true,
        message: 'Please check your email to active your account',
      });
    }
  }),

  verifyEmail: asyncHandler(async (req, res) => {
    const { token } = req.params;
    if (!token) return res.redirect(`${URL_CLIENT}/verifyemail/failed`);

    const user = JSON.parse(await client.get(`etoken:${token}`));

    if (user) {
      await User.create(user);
      return res.status(200).json({
        success: true,
        message: 'Verify successfully. Let login',
      });
    }

    return res.status(200).json({
      success: false,
      message: 'Verify failed !',
    });
  }),

  //Check password, create accessToken, create refreshToken - update in db - store in cookie
  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: 'Missing inputs',
      });

    const user = await User.findOne({ email });

    //plan oject
    if (user && user.isCorrectPassword(password)) {
      const { password, role, refreshToken, ...userData } = user.toObject();
      const accessToken = generateAccessToken(user._id, role);
      const newRefreshToken = generateRefreshToken(user._id);
      await User.findByIdAndUpdate(
        user._id,
        { newRefreshToken },
        { new: true }
      );
      const SEVEN_DAYS = 7 * 1000 * 60 * 60 * 24;
      res.cookie('refreshToken', newRefreshToken, {
        maxAge: SEVEN_DAYS,
        httpOnly: true,
      });
      return res.status(200).json({
        success: true,
        accessToken,
        userData,
      });
    }

    return res.status(400).json({
      success: false,
      message: 'Login failed !',
    });
  }),

  // Delete refresh token in db and cookies
  logout: asyncHandler(async (req, res) => {
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
  }),

  //Retrive refresh token in cookies, verify, check with refresh token in db
  refreshAccessToken: asyncHandler(async (req, res) => {
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
  }),

  // Client send mail
  // Server check mail => send mail + link password change token
  // Client check mail -> click link -> enter new password -> send to server (pass, token)
  // Check token, change password

  forgotPassword: asyncHandler(async (req, res) => {
    const { email } = req.query;
    if (!email) throw new Error('Missing email');
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    const resetToken = user.createPasswordChangeToken();
    await user.save();
    const { URL_CLIENT } = process.env;
    const result = await sendMail({
      email,
      subject: 'Forgot Password',
      url: `${URL_CLIENT}/api/user/forgotpassword`,
      reason: 'change your password',
    });
    return res.status(200).json({
      success: true,
      result,
    });
  }),

  //From password and token from client -> check token, change password
  resetPassword: asyncHandler(async (req, res) => {
    const { password, token } = req.body;

    if (!password || !token) throw new Error('Missing password or token');

    const passwordResetToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken,
      passwordResetExpire: { $gt: Date.now() },
    });
    if (!user) throw new Error('Invalid reset token in reset password');
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    user.passwordChangedAt = Date.now();
    await user.save();
    console.log('done');
    return res.status(200).json({
      success: true,
      message: user,
    });
  }),

  //Verify accessToken req.user {_id:..., role:...}
  getUser: asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id).select(
      '-password -role -refreshToken'
    );
    return res.status(200).json({
      success: user ? true : false,
      resutl: user ? user : 'User is not found',
    });
  }),

  getAllUsers: asyncHandler(async (req, res) => {
    const user = await User.find({}).select('-password -refreshToken -role');
    return res.status(200).json({
      success: user ? true : false,
      users: user ? user : 'Users are not found',
    });
  }),

  deleteUser: asyncHandler(async (req, res) => {
    const { _id } = req.query;
    const result = await User.findByIdAndDelete({ _id });

    res.status(200).json({
      success: result ? true : false,
      message: result
        ? `User with email: ${result.email} has been deleted`
        : 'User is not found',
    });
  }),

  updateUser: asyncHandler(async (req, res) => {
    const { _id } = req.user;
    if (!_id || Object.keys(req.body).length === 0)
      throw new Error('Update user: Missing in put !!!');
    const result = await User.findByIdAndUpdate(_id, req.body, { new: true });

    res.status(200).json({
      success: result ? true : false,
      message: result ? result : 'Some thing went wrong',
    });
  }),

  updateUserByAdmin: asyncHandler(async (req, res) => {
    const { uid } = req.params;
    //req.body: {}   check object to see if it exists
    if (Object.keys(req.body).length === 0)
      throw new Error('Update user by admin: Missing in put !!!');
    const result = await User.findByIdAndUpdate({ _id: uid }, req.body, {
      new: true,
    }).select('-password -role -refreshToken');

    res.status(200).json({
      success: result ? true : false,
      message: result ? result : 'Some thing went wrong',
    });
  }),
  updateUserAddress: asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { address } = req.body;
    if (!address) throw new Error('No address');
    const result = await User.findByIdAndUpdate(
      _id,
      { $push: { address: address } },
      {
        new: true,
      }
    ).select('-password -role -refreshToken');

    res.status(200).json({
      success: result ? true : false,
      message: result ? result : 'Some thing went wrong',
    });
  }),

  updateCart: asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { pid, quantity, color } = req.body;
    if (!pid || !quantity || !color) throw new Error('Missing inputs');

    const user = await User.findById(_id).select('cart');
    const alreadyProduct = user?.cart.find(
      (el) => el.product.toString() === pid
    );

    if (alreadyProduct && alreadyProduct.color === color) {
      const result = await User.updateOne(
        { cart: { $elemMatch: alreadyProduct } },
        { $set: { 'cart.$.quantity': quantity } },
        { new: true }
      );

      res.status(200).json({
        success: result ? true : false,
        message: result ? user : 'Cannt update cart',
      });
    } else {
      const result = await User.findByIdAndUpdate(
        _id,
        { $push: { cart: { product: pid, quantity, color } } },
        {
          new: true,
        }
      );

      res.status(200).json({
        success: result ? true : false,
        message: result ? user : 'Cannt update cart',
      });
    }
  }),
});
