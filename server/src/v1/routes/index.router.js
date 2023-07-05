const { notFound, errHandler } = require('../middlewares/errHandle');
const userRouter = require('./user.router');
const productRotuer = require('./product.router');
const productCategoryRotuer = require('./product.category.router');
const blogCategoryRotuer = require('./blog.category.router');
const blogRotuer = require('./blog.router');
const brandRotuer = require('./brand.router');
const couponRotuer = require('./coupon.router');
const orderRotuer = require('./order.router');

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
