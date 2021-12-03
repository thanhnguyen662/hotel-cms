const express = require('express');
const userController = require('../app/controllers/UserController');
const router = express.Router();

router.get('/profile/user', userController.getUserProfile);
router.get('/profile/my', userController.getMyProfile);
router.get('/manage/all', userController.manageAllUser);
router.post('/logout', userController.logout);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
