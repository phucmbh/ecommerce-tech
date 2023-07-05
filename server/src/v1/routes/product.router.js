const router = require('express').Router();
const ctrls = require('../controllers/product.controller');
const upload = require('../configs/multer.config');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], ctrls.createProduct);
router.get('/', ctrls.getAllProducts);
router.put('/ratings', verifyAccessToken, ctrls.ratings);
router.get('/:pid', ctrls.getProduct);
router.put('/:pid', ctrls.updateProduct);
router.delete('/:pid', ctrls.deleteProduct);
router.put(
  '/uploadimage/:pid',
  [verifyAccessToken, isAdmin],
  upload.array('images', 10),
  ctrls.uploadProductImage
);

module.exports = router;
