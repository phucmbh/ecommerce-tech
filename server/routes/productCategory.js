const router = require('express').Router();
const ctrls = require('../controllers/producCategory');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], ctrls.createCategory);
router.get('/', ctrls.getAllCategories);
router.put('/:pcid', [verifyAccessToken, isAdmin], ctrls.updateCategory);
router.delete('/:pcid', [verifyAccessToken, isAdmin], ctrls.deleteCategory);

module.exports = router;
