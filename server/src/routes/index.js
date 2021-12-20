const roomRouter = require("./room");
const userRouter = require("./user");
const restaurantRouter = require("./restaurant");

const route = (app) => {
  app.use("/api/users", userRouter);
  app.use("/api/rooms", roomRouter);
  app.use("/api/restaurant", restaurantRouter);
};

module.exports = route;
