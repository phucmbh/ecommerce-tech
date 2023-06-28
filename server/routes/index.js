const { notFound, errHandler } = require('../middlewares/errHandle');
const userRouter = require('./user');




const initRouters = (app) => {
  app.use('/api/user', userRouter);





  app.use(notFound)
  app.use(errHandler)
};

module.exports = initRouters;
