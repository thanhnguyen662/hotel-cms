const express = require("express");
const router = express.Router();
const orderController = require("../app/controllers/OrderController");


router.get("/orderItem/unpaid/all", orderController.allUnpaidOrderItem);
router.get("/orderItem/detail", orderController.getOrderItem);
router.post('/order/create', orderController.createOrder);
router.get('/order', orderController.getOrderById);
router.get('/', orderController.getOrders);


module.exports = router;
