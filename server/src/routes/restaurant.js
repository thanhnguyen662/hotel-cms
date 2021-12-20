const express = require("express");
const router = express.Router();
const restaurantController = require("../app/controllers/RestaurantController");

router.post("/addFood", restaurantController.addFood);
router.get("/getAll", restaurantController.getAllFood);
router.delete("/delete", restaurantController.delete);
router.patch("/edit", restaurantController.editFood);

module.exports = router;
