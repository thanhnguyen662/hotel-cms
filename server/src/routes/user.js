const express = require('express');
const userController = require('../app/controllers/UserController');
const router = express.Router();

router.get('/get/all', userController.getAllUser);

module.exports = router;
