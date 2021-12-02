const express = require('express');
const userController = require('../app/controllers/UserController');
const router = express.Router();

router.post('/logout', userController.logout);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/my', userController.getProfile);

module.exports = router;
