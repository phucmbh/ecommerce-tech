const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {
  generateAccessToken,
  generateRefreshToken,
} = require('../middlewares/jwt');
const { JWT_SECRET_KEY, TOKEN_SECRET_KEY, URL_CLIENT, URL_SERVER } =
  process.env;
const User = require('../models/user.model');
const asyncHandler = require('express-async-handler');
const sendMail = require('../utils/sendMail');
const client = require('../databases/init.redis');
const { userData } = require('../../tool/user-data');

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

      // setTimeout(async () => {
      //   await User.deleteOne({ email: email });
      // }, [FIFTEEN_MINUTES]);

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
    console.log(req.body);
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
    const { email } = req.body;
    if (!email) throw new Error('Please enter your email');
    const user = await User.findOne({ email });
    if (!user) throw new Error('Email does not exist');

    const token = user.createPasswordChangeToken();
    await user.save();

    // sendMail({
    //   email,
    //   subject: 'Reset Password',
    //   url: `${URL_CLIENT}/user/reset-password/${user.passwordResetToken}`,
    //   reason: 'change your password',
    // });

    console.log(`${URL_CLIENT}/user/reset-password/${token}`);

    return res.status(200).json({
      success: true,
      message: 'Please check your email',
    });
  }),

  //From password and token from client -> check token, change password
  resetPassword: asyncHandler(async (req, res) => {
    const { password, token } = req.body;

    if (!password || !token) throw new Error('Missing password or token');

    const passwordResetToken = crypto
      .createHmac('sha256', TOKEN_SECRET_KEY)
      .update(token)
      .digest('hex');

    const user = await User.findOne({ passwordResetToken });
    if (!user) throw new Error('Invalid token in reset password');
    if (user.passwordResetExpire < Date.now())
      throw new Error('Token has expired');
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpire = undefined;
    user.passwordChangedAt = Date.now();
    await user.save();
    return res.status(200).json({
      success: true,
      message: 'Change password successfully',
    });
  }),

  //Verify accessToken req.user {_id:..., role:...}
  getUser: asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id).select('-password -refreshToken');
    return res.status(200).json({
      success: user ? true : false,
      user: user ? user : 'User is not found',
    });
  }),

  getAllUsers: asyncHandler(async (req, res) => {
    try {
      const queries = { ...req.query };

      //Delete special fields from query
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach((el) => delete queries[el]);

      //Reformat the query for the correct moongse syntax
      let queryString = JSON.stringify(queries);
      queryString = queryString.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      let queryFormated = JSON.parse(queryString);

      //Filtering
      let queryColor = {};

      if (queries?.name)
        queryFormated.name = { $regex: queries.name, $options: 'i' };

      let query = User.find(queryFormated);

      //sorting  a, b -> [a,b] -> a b
      if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
      }

      //Fields limiting
      if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields);
      }

      //Pagination
      const page = +req.query.page || 1;
      const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
      const skip = (page - 1) * limit;
      query.skip(skip).limit(limit);

      //EXECUTE QUERY
      const users = await query;

      res.status(200).json({
        success: true,
        results: users.length,
        users,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        users: error,
      });
    }
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

  mockUser: asyncHandler(async (req, res) => {
    const users = await User.create(userData);
    res.status(200).json({
      success: users ? true : false,
      message: users ? users : 'Failed',
    });
  }),
});
