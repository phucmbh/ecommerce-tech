const Product = require('../models/product');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

exports.createProduct = asyncHandler(async (req, res) => {
  if (Object.keys(req.body).length === 0) throw new Error('Missing input');
  req.body.slug = slugify(req.body.title);
  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    message: newProduct ? newProduct : 'Can not create product',
  });
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;

  if (Object.keys(req.body).length === 0) throw new Error('No data to update');
  if (req.body.title) req.body.slug = slugify(req.body.title);

  const product = await Product.findByIdAndUpdate(pid, req.body, { new: true });
  return res.status(200).json({
    success: product ? true : false,
    product: product ? product : 'Can not update product',
  });
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;

  const deletedProduct = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: deletedProduct ? true : false,
    product: deletedProduct ? 'Delete successfuly' : 'Cannot delete product',
  });
});

exports.getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid);
  return res.status(200).json({
    success: product ? true : false,
    product: product ? product : 'Can not get product',
  });
});

//Filtering, sorting and pagination
exports.getAllProducts = asyncHandler(async (req, res) => {
  try {
    const queryObj = { ...req.query };

    //Delete special fields from query
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //Reformat the query for the correct moongse syntax
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    let queryFormated = JSON.parse(queryString);
    if (queryObj?.title)
      queryFormated.title = { $regex: queryObj.title, $options: 'i' };
    let query = Product.find(queryFormated);

    //sorting  a, b -> [a,b] -> a b
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    }

    //Fields limiting
    if(req.query.fields){
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    }

    //Pagination
    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
    const skip = (page - 1) * limit;
    query.skip(skip).limit(limit);

    //EXECUTE QUERY
    const products = await query;

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products,
      },
    });
  } catch (error) {
    return res.status(200).json({
      success: 'fail',
      products: error,
    });
  }
});

