const express = require("express");
const router = express.Router();
const eventController = require("../app/controllers/EventController");

router.post("/add", eventController.addEvent);
router.get("/getAll", eventController.getAllEvent);
router.delete("/delete", eventController.deleteEvent);
router.put("/edit", eventController.editEvent);

module.exports = router;
