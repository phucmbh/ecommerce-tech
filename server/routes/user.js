const router = require('express').Router();

const userCtrl = require('../controllers/user');

router.post('/register', userCtrl.register)



module.exports = router;