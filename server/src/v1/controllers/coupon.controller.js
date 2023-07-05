const Coupon = require('../models/coupon.model');
const asyncHandler = require('express-async-handler');

var that = (module.exports = {
  createCoupon: asyncHandler(async (req, res) => {
    const { name, discount, expiry } = req.body;
    const ONE_DAY = 24 * 60 * 60 * 1000;
    const result = await Coupon.create({
      ...req.body,
      expiry: Date.now() + expiry * ONE_DAY,
    });
    return res.json({
      success: result ? true : false,
      createdCoupon: result ? result : 'Cannot create Coupon',
    });
  }),

  getAllCoupons: asyncHandler(async (req, res) => {
    const result = await Coupon.find().select('-createdAt -updatedAt');
    return res.json({
      success: result ? true : false,
      allCoupons: result ? result : 'Cannot get all coupon',
    });
  }),

  updateCoupon: asyncHandler(async (req, res) => {
    const { name, discount, expiry } = req.body;
    const { cid } = req.params;
    const ONE_DAY = 24 * 60 * 60 * 1000;
    if (Object.keys(cid).length === 0) throw new Error('Missing input!');
    if (expiry) expiry = Date.now() + ONE_DAY * expiry;
    const result = await Coupon.findByIdAndUpdate(cid, req.body, {
      new: true,
    });
    return res.json({
      success: result ? true : false,
      updatedCoupon: result ? result : 'Cannot update coupon',
    });
  }),

  deleteCoupon: asyncHandler(async (req, res) => {
    const { cid } = req.params;
    if (Object.keys(cid).length === 0) throw new Error('Missing input!');
    const result = await Coupon.findByIdAndDelete(cid);
    return res.json({
      success: result ? true : false,
      deletedCoupon: result ? result : 'Cannot delete coupon',
    });
  }),
});
