const Blog = require('../models/blog');
const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/cloudinary.config');
var that = (module.exports = {
  createBlog: asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;
    if (!title || !description || !category)
      throw new Error('Missing input !!!');
    const blog = await Blog.create(req.body);
    return res.json({
      success: blog ? true : false,
      createdBlog: blog ? blog : 'Cannot create new blog',
    });
  }),

  updateBlog: asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (Object.keys(req.body).length === 0) throw new Error('Missing input');
    const blog = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
    return res.json({
      success: blog ? true : false,
      updatedBlog: blog ? blog : 'Cannot update blog',
    });
  }),

  getBlog: asyncHandler(async (req, res) => {
    const { bid } = req.params;
    const blog = await Blog.findByIdAndUpdate(
      bid,
      { $inc: { numberViews: 1 } },
      { new: true }
    )
      .populate('usersLiked', 'firstName lastName')
      .populate('usersDisliked', 'firstName lastName');
    res.status(200).json({
      success: blog ? true : false,
      blog: blog ? blog : 'Cannot find blog',
    });
  }),

  getAllBlogs: asyncHandler(async (req, res) => {
    const blogs = await Blog.find();
    return res.json({
      success: blogs ? true : false,
      blogs: blogs ? blogs : 'Cannot get all blog',
    });
  }),

  deleteBlog: asyncHandler(async (req, res) => {
    const { bid } = req.params;
    const blog = await Blog.findByIdAndDelete(bid);
    return res.json({
      success: blog ? true : false,
      blogs: blog ? 'Delete successfuly' : 'Cannot get all blog',
    });
  }),

  likeBlog: asyncHandler(async (req, res) => {
    /*When a user like a blog:
    1. Check userLiked => pull usersLiked list
    2. Check userDisliked => pull usersDisliked list, push into usersLiked list
    3. Push usersLiked list
    */
    const { _id } = req.user;
    const { bid } = req.params;
    if (!bid) throw new Error('Missing bid');
    const blog = await Blog.findById(bid);
    const userLiked = blog.usersLiked?.find((uid) => uid.toString() === _id);
    if (userLiked) {
      const blog = await Blog.findByIdAndUpdate(
        bid,
        { $pull: { usersLiked: _id } },
        { new: true }
      );
      return res.json({
        success: blog ? true : false,
        blog: blog ? blog : 'Cannot like blog',
      });
    }
    const userDisliked = blog.usersDisliked?.find(
      (uid) => uid.toString() === _id
    );

    if (userDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        bid,
        {
          $pull: { usersDisliked: _id },
          $push: { usersLiked: _id },
        },
        {
          new: true,
        }
      );
      return res.json({
        success: blog ? true : false,
        blog: blog ? blog : 'Cannot like blog',
      });
    }

    const likedBlog = await Blog.findByIdAndUpdate(
      bid,
      { $push: { usersLiked: _id } },
      { new: true }
    );

    return res.json({
      success: likedBlog ? true : false,
      blog: likedBlog ? likedBlog : 'Cannot like blog',
    });
  }),

  dislikeBlog: asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bid } = req.params;
    if (!bid) throw new Error('Missing bid');
    const blog = await Blog.findById(bid);
    const userDisliked = blog.usersDisliked?.find(
      (uid) => uid.toString() === _id
    );

    if (userDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        bid,
        { $pull: { usersDisliked: _id } },
        { new: true }
      );
      return res.json({
        success: blog ? true : false,
        blog: blog ? blog : 'Cannot like blog',
      });
    }
    const userLiked = blog.usersLiked?.find((uid) => uid.toString() === _id);

    if (userLiked) {
      const blog = await Blog.findByIdAndUpdate(
        bid,
        {
          $pull: { usersLiked: _id },
          $push: { usersDisliked: _id },
        },
        {
          new: true,
        }
      );
      return res.json({
        success: blog ? true : false,
        blog: blog ? blog : 'Cannot like blog',
      });
    }

    const dislikedBlog = await Blog.findByIdAndUpdate(
      bid,
      { $push: { usersDisliked: _id } },
      { new: true }
    );

    return res.json({
      success: dislikedBlog ? true : false,
      blog: dislikedBlog ? dislikedBlog : 'Cannot like blog',
    });
  }),

  uploadBlogImage: asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (!req.file) throw new Error('Missing file');
    const image = await cloudinary.uploadSingle(req.file);
    const product = await Blog.findByIdAndUpdate(
      bid,
      { image: image.url },
      { new: true }
    );

    return res.status(200).json({ status: product ? true : false, product });
  }),
});
