const express = require('express');
const database = require('./v1/configs/database.config');
const app = express();
const initRouters = require('./v1/routes/index.router');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//inits database
database.initMongodb();

//middlewares
app.use(
  cors({
    origin: process.env.URL_CLIENT,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//router
initRouters(app);

module.exports = app;
