const router = require('express').Router();

const ctrls = require('../controllers/user.controller');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/register', ctrls.register);
router.get('/verify-email/:token', ctrls.verifyEmail);
router.post('/login', ctrls.login);

router.post('/forgot-password', ctrls.forgotPassword);
router.put('/reset-password', ctrls.resetPassword);

router.post('/refreshtoken', ctrls.refreshAccessToken);
router.get('/logout', ctrls.logout);

// router.get('/', [verifyAccessToken, isAdmin], ctrls.getAllUsers);
router.get('/', ctrls.getAllUsers);
router.delete('/', [verifyAccessToken, isAdmin], ctrls.deleteUser);

router.get('/current', verifyAccessToken, ctrls.getUser);
router.put('/current', verifyAccessToken, ctrls.updateUser);

router.put('/address', verifyAccessToken, ctrls.updateUserAddress);
router.put('/cart', verifyAccessToken, ctrls.updateCart);
router.put('/:uid', [verifyAccessToken, isAdmin], ctrls.updateUserByAdmin);

router.post('/mock-user', ctrls.mockUser);

module.exports = router;
