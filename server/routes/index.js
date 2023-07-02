const { notFound, errHandler } = require('../middlewares/errHandle');
const userRouter = require('./user');
const productRotuer = require('./product');
const productCategoryRotuer = require('./productCategory');

const initRouters = (app) => {
  app.use('/api/user', userRouter);
  app.use('/api/product', productRotuer);
  app.use('/api/prodcategory', productCategoryRotuer);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRouters;
