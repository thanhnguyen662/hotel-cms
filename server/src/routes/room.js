const express = require('express');
const router = express.Router();
const roomController = require('../app/controllers/RoomController');

router.patch(
   '/room/housekeeper/update',
   roomController.housekeeperUpdateStatusRoom
);
router.get('/room/housekeeper/manage', roomController.housekeeperManageRoom);
router.post('/room/create', roomController.createRoom);
router.get('/room', roomController.getRoomById);
router.get('/', roomController.getRooms);

module.exports = router;
