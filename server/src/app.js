const express = require('express');
const database = require('./v1/configs/database.config');
const app = express();
const initRouters = require('./v1/routes/index.router');
const cookieParser = require('cookie-parser');



//inits database
database.initMongodb();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//router
initRouters(app);

module.exports = app;
