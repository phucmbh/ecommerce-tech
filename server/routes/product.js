const router = require('express').Router();
const ctrls = require('../controllers/product');

const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], ctrls.createProduct);
router.get('/', ctrls.getAllProducts);
router.put('/ratings', verifyAccessToken, ctrls.ratings);
router.get('/:pid', ctrls.getProduct);
router.put('/:pid', ctrls.updateProduct);
router.delete('/:pid', ctrls.deleteProduct);

module.exports = router;
