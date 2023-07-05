const router = require('express').Router();
const ctrls = require('../controllers/blog.category.controller');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], ctrls.createCategory);
router.get('/', ctrls.getAllCategories);
router.put('/:bcid', [verifyAccessToken, isAdmin], ctrls.updateCategory);
router.delete('/:bcid', [verifyAccessToken, isAdmin], ctrls.deleteCategory);

module.exports = router;
