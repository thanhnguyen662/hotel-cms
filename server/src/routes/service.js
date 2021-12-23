const express = require("express");
const router = express.Router();
const serviceController = require("../app/controllers/ServiceController");

router.post("/add", serviceController.addService);
router.get("/getAll", serviceController.getAllService);
router.delete("/delete", serviceController.deleteService);
router.patch("/edit", serviceController.editService);

module.exports = router;
