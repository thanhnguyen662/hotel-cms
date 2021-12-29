const express = require("express");
const router = express.Router();
const serviceController = require("../app/controllers/ServiceController");

router.post("/add", serviceController.addService);
router.get("/getAll", serviceController.getAllService);
router.delete("/delete", serviceController.deleteService);
router.patch("/edit", serviceController.editService);
router.post("/oder/:orderId", serviceController.orderService);
router.delete("/deleteService", serviceController.deleteOrderService);
router.patch("/editOrderService", serviceController.editOrderServiceService);

module.exports = router;
