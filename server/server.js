const express = require('express');
require('dotenv').config();
const dbConect = require('./config/dbconnect');
const initRouters = require('./routes');



const app = express();
const port = process.env.PORT || 2606;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConect();

initRouters(app)
app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
