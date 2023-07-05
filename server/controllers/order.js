const Order = require('../models/order');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');

var that = (module.exports = {
  createOrder: asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const userCart = await User.findById(_id).select('cart');
    return res.json({
      success: userCart ? true : false,
      allOrders: userCart ? userCart : 'Cannot create Order',
    });
  }),

  getAllOrders: asyncHandler(async (req, res) => {
    const result = await Order.find().select('-createdAt -updatedAt');
    return res.json({
      success: result ? true : false,
      allOrders: result ? result : 'Cannot get all order',
    });
  }),

  updateOrder: asyncHandler(async (req, res) => {
    const { name, discount, expiry } = req.body;
    const { cid } = req.params;
    const ONE_DAY = 24 * 60 * 60 * 1000;
    if (Object.keys(cid).length === 0) throw new Error('Missing input!');
    if (expiry) expiry = Date.now() + ONE_DAY * expiry;
    const result = await Order.findByIdAndUpdate(cid, req.body, {
      new: true,
    });
    return res.json({
      success: result ? true : false,
      updatedOrder: result ? result : 'Cannot update order',
    });
  }),

  deleteOrder: asyncHandler(async (req, res) => {
    const { cid } = req.params;
    if (Object.keys(cid).length === 0) throw new Error('Missing input!');
    const result = await Order.findByIdAndDelete(cid);
    return res.json({
      success: result ? true : false,
      deletedOrder: result ? result : 'Cannot delete order',
    });
  }),
});
