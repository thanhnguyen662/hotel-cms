const roomRouter = require("./room");
const userRouter = require("./user");
const serviceRouter = require("./service");
const eventRouter = require("./event");

const route = (app) => {
  app.use("/api/users", userRouter);
  app.use("/api/rooms", roomRouter);
  app.use("/api/service", serviceRouter);
  app.use("/api/event", eventRouter);
};

module.exports = route;
