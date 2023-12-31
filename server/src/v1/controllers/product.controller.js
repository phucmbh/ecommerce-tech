const Product = require('../models/product.model');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const cloudinary = require('../configs/cloudinary.config');

var that = (module.exports = {
  createProduct: asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error('Missing input');
    req.body.slug = slugify(req.body.title);
    const newProduct = await Product.create(req.body);
    return res.status(200).json({
      success: newProduct ? true : false,
      message: newProduct ? newProduct : 'Can not create product',
    });
  }),

  updateProduct: asyncHandler(async (req, res) => {
    const { pid } = req.params;

    if (Object.keys(req.body).length === 0)
      throw new Error('No data to update');
    if (req.body.title) req.body.slug = slugify(req.body.title);

    const product = await Product.findByIdAndUpdate(pid, req.body, {
      new: true,
    });
    return res.status(200).json({
      success: product ? true : false,
      product: product ? product : 'Can not update product',
    });
  }),

  deleteProduct: asyncHandler(async (req, res) => {
    const { pid } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(pid);
    return res.status(200).json({
      success: deletedProduct ? true : false,
      product: deletedProduct ? 'Delete successfuly' : 'Cannot delete product',
    });
  }),

  getProduct: asyncHandler(async (req, res) => {
    const { pid } = req.params;
    const product = await Product.findById(pid).populate({
      path: 'ratings.postedBy',
      select: 'avatar firstName lastName',
    });
    return res.status(200).json({
      success: product ? true : false,
      product: product ? product : 'Can not get product',
    });
  }),

  //Filtering, sorting and pagination
  getAllProducts: asyncHandler(async (req, res) => {
    try {
      const queries = { ...req.query };

      //Delete special fields from query
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach((el) => delete queries[el]);

      //Reformat the query for the correct moongse syntax
      let queryString = JSON.stringify(queries);
      queryString = queryString.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      let queryFormated = JSON.parse(queryString);

      //Filtering
      let queryColor = {};
      if (queries?.color) {
        delete queryFormated.color;
        const query = queries.color
          ?.split(',')
          .map((el) => ({ color: { $regex: el, $options: 'i' } }));
        queryColor = { $or: query };
      }

      if (queries?.title)
        queryFormated.title = { $regex: queries.title, $options: 'i' };
      if (queries?.category)
        queryFormated.category = { $regex: queries.category, $options: 'i' };

      let query = Product.find({ ...queryColor, ...queryFormated });

      //sorting  a, b -> [a,b] -> a b
      if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
      }

      //Fields limiting
      if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields);
      }

      //Pagination
      const page = +req.query.page || 1;
      const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
      const skip = (page - 1) * limit;
      query.skip(skip).limit(limit);

      //EXECUTE QUERY
      const products = await query;

      res.status(200).json({
        success: true,
        results: products.length,
        products,
      });
    } catch (error) {
      return res.status(200).json({
        success: 'fail',
        products: error,
      });
    }
  }),

  ratings: asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { pid, star, comment } = req.body;
    if (!star || !pid) throw new Error('Missing input!');
    const product = await Product.findById(pid);
    const alreadyRating = product?.ratings?.find(
      (r) => r.postedBy.toString() === _id
    );

    if (alreadyRating) {
      //update star and comment
      await Product.updateOne(
        { ratings: { $elemMatch: alreadyRating } },
        {
          $set: {
            'ratings.$.star': star,
            'ratings.$.comment': comment,
            'ratings.$.updatedAt': Date.now(),
          },
        },
        { new: true }
      );
    } else {
      //add star and comment
      await Product.findByIdAndUpdate(
        pid,
        {
          $push: {
            ratings: { postedBy: _id, star, comment, updatedAt: Date.now() },
          },
        },
        {
          new: true,
        }
      );
    }

    //sum ratings
    const updatedProduct = await Product.findById(pid).populate({
      path: 'ratings.postedBy',
      select: 'firstName lastName avatar',
    });
    const ratingCount = updatedProduct.ratings.length;
    const ratingSum = updatedProduct.ratings.reduce(
      (sum, r) => sum + +r.star,
      0
    );
    updatedProduct.totalRatings =
      Math.round((ratingSum * 10) / ratingCount) / 10;
    await updatedProduct.save();

    return res.status(200).json({
      success: true,
      product: updatedProduct,
    });
  }),

  uploadProductImage: asyncHandler(async (req, res) => {
    const { pid } = req.params;
    if (!req.files) throw new Error('Missing files');
    const arrImage = await cloudinary.uploadMultiple(req.files);
    const product = await Product.findByIdAndUpdate(pid, {
      $push: { images: { $each: arrImage.map((i) => i.url) } },
    });

    return res.status(200).json({ status: product ? true : false, product });
  }),
});
