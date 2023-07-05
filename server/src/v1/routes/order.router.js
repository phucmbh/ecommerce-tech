const router = require('express').Router();

const ctrls = require('../controllers/order.controller');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', verifyAccessToken, ctrls.createOrder);
router.get('/', verifyAccessToken, ctrls.getUserOrder);
router.get('/all', [verifyAccessToken, isAdmin], ctrls.getAllOrders);
router.put('/status/:oid', [verifyAccessToken, isAdmin], ctrls.updateStatusOrder);

module.exports = router;
