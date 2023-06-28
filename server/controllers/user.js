const User = require('../models/user');

const asyncHandler = require('express-async-handler');

const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if ((!email, !password, !firstName, !lastName))
    return res.status(400).json({
      sucess: false,
      message: 'Missing inputs',
    });
  const respone = await User.create(req.body);
  return res.status(200).json({
    sucess: respone ? true : false,
    respone,
  });
});


module.exports = {
  register,
}
