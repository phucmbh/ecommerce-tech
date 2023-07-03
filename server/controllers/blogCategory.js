const BlogCategory = require('../models/blogCategory');
const asyncHandler = require('express-async-handler');

var that = (module.exports = {
  createCategory: asyncHandler(async (req, res) => {
    const result = await BlogCategory.create(req.body);
    return res.json({
      success: result ? true : false,
      createdCategory: result ? result : 'Cannot create category',
    });
  }),

  getAllCategories: asyncHandler(async (req, res) => {
    const result = await BlogCategory.find().select('_id title');
    return res.json({
      success: result ? true : false,
      allCategories: result ? result : 'Cannot create category',
    });
  }),

  updateCategory: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await BlogCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.json({
      success: result ? true : false,
      updatedCategory: result ? result : 'Cannot update category',
    });
  }),

  deleteCategory: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await BlogCategory.findByIdAndDelete(id);
    return res.json({
      success: result ? true : false,
      deletedCategory: result ? result : 'Cannot delete category',
    });
  }),
});
