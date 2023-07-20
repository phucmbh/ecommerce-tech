const database = require('../v1/configs/database.config');
const fs = require('fs');
const Product = require('../v1/models/product.model');
const User = require('../v1/models/user.model');
const ProductCategory = require('../v1/models/product.category.model');

const userData = require('./user-data');

database.initMongodb();
