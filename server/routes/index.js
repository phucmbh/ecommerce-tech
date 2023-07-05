const { notFound, errHandler } = require('../middlewares/errHandle');
const userRouter = require('./user');
const productRotuer = require('./product');
const productCategoryRotuer = require('./productCategory');
const blogCategoryRotuer = require('./blogCategory');
const blogRotuer = require('./blog');
const brandRotuer = require('./brand');
const couponRotuer = require('./coupon');
const orderRotuer = require('./order');

const initRouters = (app) => {
  app.use('/api/user', userRouter);
  app.use('/api/product', productRotuer);
  app.use('/api/prodcategory', productCategoryRotuer);
  app.use('/api/blogcategory', blogCategoryRotuer);
  app.use('/api/blog', blogRotuer);
  app.use('/api/brand', brandRotuer);
  app.use('/api/coupon', couponRotuer);
  app.use('/api/order', orderRotuer);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRouters;
