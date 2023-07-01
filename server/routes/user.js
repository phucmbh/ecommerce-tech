const router = require('express').Router();

const userCtrl = require('../controllers/user');
const { verifyAccessToken,isAdmin } = require('../middlewares/verifyToken');

router.post('/register', userCtrl.register);
router.post('/login', userCtrl.login);

router.post('/refreshtoken', userCtrl.refreshAccessToken);
router.get('/logout', userCtrl.logout);
router.get('/forgotpassword', userCtrl.forgotPassword);
router.put('/resetpassword', userCtrl.resetPassword);
router.get('/',[verifyAccessToken,isAdmin], userCtrl.getAllUsers);
router.delete('/',[verifyAccessToken,isAdmin], userCtrl.deleteUser);
router.put('/:uid',[verifyAccessToken,isAdmin], userCtrl.updateUserByAdmin);
router.get('/current', verifyAccessToken, userCtrl.getUser);
router.put('/current', verifyAccessToken, userCtrl.updateUser);

module.exports = router;
