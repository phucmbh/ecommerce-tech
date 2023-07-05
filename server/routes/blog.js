const router = require('express').Router();
const ctrls = require('../controllers/blog');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const upload = require('../config/multer.config')

router.post('/', [verifyAccessToken, isAdmin], ctrls.createBlog);
router.get('/', ctrls.getAllBlogs);
router.get('/current/:bid', ctrls.getBlog);
router.put('/like/:bid', verifyAccessToken, ctrls.likeBlog);
router.put('/dislike/:bid', verifyAccessToken, ctrls.dislikeBlog);
router.put('/image/:bid', [verifyAccessToken, isAdmin],upload.single('image'), ctrls.uploadBlogImage);
router.put('/:bid', [verifyAccessToken, isAdmin], ctrls.updateBlog);
router.delete('/:bid', [verifyAccessToken, isAdmin], ctrls.deleteBlog);

module.exports = router;
