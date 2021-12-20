const prisma = require("../models/prisma");

class RestaurantController {
  addFood = async (req, res, next) => {
    try {
      const newFood = await prisma.food.create({
        data: {
          name: req.body.name,
          type: req.body.type,
          price: parseInt(req.body.price),
          image:
            "https://yt3.ggpht.com/ytc/AKedOLRqKEWKVfmL7BFyuVQ_-60biQlXnOaYkX467CMO=s900-c-k-c0x00ffffff-no-rj",
        },
      });
      return res.json(newFood);
    } catch (error) {
      return next(error);
    }
  };

  getAllFood = async (req, res, next) => {
    const name = req.query.name || undefined;
    const type = req.query.type === "all" ? undefined : req.query.type;
    try {
      const foodList = await prisma.food.findMany({
        where: {
          AND: [
            {
              name: {
                contains: name,
                mode: "insensitive",
              },
            },
            {
              type: type,
            },
          ],
        },
      });
      return res.json(foodList);
    } catch (error) {
      return next(error);
    }
  };

  editFood = async (req, res, next) => {
    try {
      const food = await prisma.food.update({
        where: { id: req.body.id },
        data: {
          name: req.body.name,
          type: req.body.type,
          price: parseInt(req.body.price),
          image: req.body.image,
        },
      });
      return res.json(food);
    } catch (error) {
      return next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      await prisma.food.deleteMany({
        where: { id: req.body.id },
      });
      return res.json({ message: "OK" });
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new RestaurantController();
