const router = require('express').Router();
const ctrls = require('../controllers/blog');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/', [verifyAccessToken, isAdmin], ctrls.createBlog);
router.get('/', ctrls.getAllBlogs);
router.get('/current/:bid', ctrls.getBlog);
router.put('/like/:bid', verifyAccessToken, ctrls.likeBlog);
router.put('/dislike/:bid', verifyAccessToken, ctrls.dislikeBlog);
router.put('/:bid', [verifyAccessToken, isAdmin], ctrls.updateBlog);
router.delete('/:bid', [verifyAccessToken, isAdmin], ctrls.deleteBlog);

module.exports = router;
