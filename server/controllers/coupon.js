const Coupon = require('../models/coupon');
const asyncHandler = require('express-async-handler');

var that = (module.exports = {
  createCoupon: asyncHandler(async (req, res) => {
    const result = await Coupon.create(req.body);
    return res.json({
      success: result ? true : false,
      createdCoupon: result ? result : 'Cannot create Coupon',
    });
  }),

  getAllCoupons: asyncHandler(async (req, res) => {
    const result = await Coupon.find();
    return res.json({
      success: result ? true : false,
      allCoupons: result ? result : 'Cannot create Coupon',
    });
  }),

  updateCoupon: asyncHandler(async (req, res) => {
    const { cid } = req.params;
    const result = await Coupon.findByIdAndUpdate(cid, req.body, {
      new: true,
    });
    return res.json({
      success: result ? true : false,
      updatedCoupon: result ? result : 'Cannot update Coupon',
    });
  }),

  deleteCoupon: asyncHandler(async (req, res) => {
    const { cid } = req.params;
    const result = await Coupon.findByIdAndDelete(cid);
    return res.json({
      success: result ? true : false,
      deletedCoupon: result ? result : 'Cannot delete Coupon',
    });
  }),
});
