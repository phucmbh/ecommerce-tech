const router = require('express').Router();
const productCtrl = require('../controllers/product');

const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], productCtrl.createProduct);
router.get('/', productCtrl.getAllProducts);
router.put('/ratings', verifyAccessToken, productCtrl.ratings);
router.get('/:pid', productCtrl.getProduct);
router.put('/:pid', productCtrl.updateProduct);
router.delete('/:pid', productCtrl.deleteProduct);

module.exports = router;
