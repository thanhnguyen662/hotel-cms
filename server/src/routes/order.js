const express = require("express");
const router = express.Router();
const orderController = require("../app/controllers/OrderController");

router.post("/order/create", orderController.createOrder);
router.get("/orderItem/unpaid/all", orderController.allUnpaidOrderItem);
router.get("/orderItem/detail", orderController.getOrderItem);

module.exports = router;
