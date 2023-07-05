const { trusted } = require('mongoose');
const Order = require('../models/order.model');
const User = require('../models/user.model');
const Coupon = require('../models/coupon.model');
const asyncHandler = require('express-async-handler');

var that = (module.exports = {
  createOrder: asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { couponId } = req.body;
    const userCart = await User.findById(_id)
      .select('cart')
      .populate('cart.product', 'title price');
    const products = userCart.cart.map((el) => ({
      product: el.product._id,
      count: el.quantity,
      color: el.color,
    }));

    let total = userCart.cart.reduce(
      (sum, el) => sum + el.product.price * el.quantity,
      0
    );
    const createData = { products, total, orderBy: _id };
    if (couponId) {
      const coupon = await Coupon.findById({ _id: couponId });
      console.log(coupon);
      total =
        Math.round((total * (1 - coupon?.discount / 100)) / 1000) * 1000 ||
        total;
      createData.total = total;
      createData.coupon = coupon;
    }

    const order = await Order.create(createData);

    return res.json({
      success: order ? true : false,
      order: order ? order : 'Cannot create order',
    });
  }),
  updateStatusOrder: asyncHandler(async (req, res) => {
    const { oid } = req.params;
    const { status } = req.body;
    if (!status) throw new Error('Missing status');
    const order = await Order.findByIdAndUpdate(
      oid,
      { status },
      {
        new: true,
      }
    );
    return res.json({
      success: order ? true : false,
      order: order ? order : 'Cannot update status order',
    });
  }),

  getAllOrders: asyncHandler(async (req, res) => {
    const orders = await Order.find();
    return res.json({
      success: orders ? true : false,
      allOrders: orders ? orders : 'Cannot get all orders',
    });
  }),

  getUserOrder: asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const order = await Order.find({ orderBy: _id });
    return res.json({
      success: order ? true : false,
      order: order ? order : 'Cannot create order',
    });
  }),
});
