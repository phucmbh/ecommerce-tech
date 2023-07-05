const Brand = require('../models/brand.model');
const asyncHandler = require('express-async-handler');

var that = (module.exports = {
  createBrand: asyncHandler(async (req, res) => {
    const result = await Brand.create(req.body);
    return res.json({
      success: result ? true : false,
      createdBrand: result ? result : 'Cannot create brand',
    });
  }),

  getAllBrands: asyncHandler(async (req, res) => {
    const result = await Brand.find();
    return res.json({
      success: result ? true : false,
      allBrands: result ? result : 'Cannot create brand',
    });
  }),

  updateBrand: asyncHandler(async (req, res) => {
    const { bid } = req.params;
    const result = await Brand.findByIdAndUpdate(bid, req.body, {
      new: true,
    });
    return res.json({
      success: result ? true : false,
      updatedBrand: result ? result : 'Cannot update brand',
    });
  }),

  deleteBrand: asyncHandler(async (req, res) => {
    const { bid } = req.params;
    const result = await Brand.findByIdAndDelete(bid);
    return res.json({
      success: result ? true : false,
      deletedBrand: result ? result : 'Cannot delete brand',
    });
  }),
});
