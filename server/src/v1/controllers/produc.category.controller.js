const ProductCategory = require('../models/product.category.model');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
var that = (module.exports = {
  createCategory: asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0)
      throw new Error('Missing input parameters');
    req.body.slug = slugify(req.body.title);
    const result = await ProductCategory.create(req.body);
    return res.json({
      success: result ? true : false,
      createdCategory: result ? result : 'Cannot create category',
    });
  }),

  getAllCategories: asyncHandler(async (req, res) => {
    const result = await ProductCategory.find().select('_id title slug icon');
    return res.json({
      success: result ? true : false,
      allCategories: result ? result : 'Cannot create category',
    });
  }),

  updateCategory: asyncHandler(async (req, res) => {
    const { pcid } = req.params;
    if (req.body.title) req.body.slug = slugify(req.body.title);
    const result = await ProductCategory.findByIdAndUpdate(pcid, req.body, {
      new: true,
    });
    return res.json({
      success: result ? true : false,
      updatedCategory: result ? result : 'Cannot update category',
    });
  }),

  deleteCategory: asyncHandler(async (req, res) => {
    const { pcid } = req.params;
    const result = await ProductCategory.findByIdAndDelete(pcid);
    return res.json({
      success: result ? true : false,
      deletedCategory: result ? result : 'Cannot delete category',
    });
  }),
});
