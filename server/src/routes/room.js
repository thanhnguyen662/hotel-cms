const express = require('express');
const router = express.Router();
const roomController = require('../app/controllers/RoomController');

router.post('/room/create', roomController.createRoom);
router.get('/room', roomController.getRoomById);
router.get('/', roomController.getRooms);

module.exports = router;
