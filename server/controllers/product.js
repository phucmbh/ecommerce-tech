const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

const createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error('Missing input');
  req.body.slug = slugify(req.body.title);
  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    message: newProduct ? newProduct : 'Can not create product',
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid);
  return res.status(200).json({
    success: product ? true : false,
    product: product ? product : 'Can not get product',
  });
});

const getAllProduct = asyncHandler(async (req, res) => {
  const products = await Product.find();
  return res.status(200).json({
    success: products ? true : false,
    products: products ? products : 'Can not get products',
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;

  if (Object.keys(req.body).length === 0) throw new Error('No data to update');
  if (req.body.title) req.body.slug = slugify(req.body.title);

  const product = await Product.findByIdAndUpdate(pid, req.body, { new: true });
  return res.status(200).json({
    success: product ? true : false,
    product: product ? product : 'Can not update product',
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;

  const deletedProduct = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: deletedProduct ? true : false,
    product: deletedProduct ? 'Delete successfuly' : 'Cannot delete product',
  });
});

module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};
