var userController = require('../controllers/user');
var user = new userController();
var express = require('express');
var router = express.Router();


router.post('/signup', user.signUp);
router.post('/login', user.login);
router.post('/editUserProfile',  user.userEditProfile);
router.post('/changePassword',  user.change_password);
router.get('/getUserProfile', user.getDetails);
router.post('/forgotPassword', user.forgotPassword);




module.exports = router;