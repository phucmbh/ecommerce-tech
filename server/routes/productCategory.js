const router = require('express').Router();
const ctrls = require('../controllers/producCategory');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], ctrls.createCategory);
router.get('/', ctrls.getAllCategories);
router.put('/:id', [verifyAccessToken, isAdmin], ctrls.updateCategory);
router.delete('/:id', [verifyAccessToken, isAdmin], ctrls.deleteCategory);

module.exports = router;
