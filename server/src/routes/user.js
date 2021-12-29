const express = require('express');
const userController = require('../app/controllers/UserController');
const router = express.Router();

router.get('/profile/user', userController.getUserProfile);
router.get('/profile/my', userController.getMyProfile);
router.post('/profile/customer', userController.getCustomerProfile);
router.patch('/profile/edit', userController.editUserProfile);
router.get('/manage/all', userController.manageAllUser);
router.post('/delete', userController.delete);
router.patch('/reset', userController.resetPassword);
router.post('/logout', userController.logout);
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;
