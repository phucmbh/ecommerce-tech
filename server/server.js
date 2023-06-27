const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 2606;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res) => {
  res.send('Server Starting...');
});

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
