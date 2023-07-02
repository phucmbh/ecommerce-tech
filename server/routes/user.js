const router = require('express').Router();

const ctrls = require('../controllers/user');
const { verifyAccessToken,isAdmin } = require('../middlewares/verifyToken');

router.post('/register', ctrls.register);
router.post('/login', ctrls.login);

router.post('/refreshtoken', ctrls.refreshAccessToken);
router.get('/logout', ctrls.logout);
router.get('/forgotpassword', ctrls.forgotPassword);
router.put('/resetpassword', ctrls.resetPassword);
router.get('/',[verifyAccessToken,isAdmin], ctrls.getAllUsers);
router.delete('/',[verifyAccessToken,isAdmin], ctrls.deleteUser);
router.put('/:uid',[verifyAccessToken,isAdmin], ctrls.updateUserByAdmin);
router.get('/current', verifyAccessToken, ctrls.getUser);
router.put('/current', verifyAccessToken, ctrls.updateUser);

module.exports = router;
