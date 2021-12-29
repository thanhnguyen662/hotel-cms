const prisma = require("../models/prisma");

class ServiceController {
  addService = async (req, res, next) => {
    try {
      const newService = await prisma.service.create({
        data: {
          name: req.body.name,
          type: req.body.type,
          price: parseInt(req.body.price),
          image:
            "https://yt3.ggpht.com/ytc/AKedOLRqKEWKVfmL7BFyuVQ_-60biQlXnOaYkX467CMO=s900-c-k-c0x00ffffff-no-rj",
        },
      });
      return res.json(newService);
    } catch (error) {
      return next(error);
    }
  };

  getAllService = async (req, res, next) => {
    const name = req.query.name || undefined;
    const type = req.query.type === "all" ? undefined : req.query.type;
    try {
      const serviceList = await prisma.service.findMany({
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
      return res.json(serviceList);
    } catch (error) {
      return next(error);
    }
  };

  editService = async (req, res, next) => {
    try {
      const service = await prisma.service.update({
        where: { id: req.body.id },
        data: {
          name: req.body.name,
          type: req.body.type,
          price: parseInt(req.body.price),
          image: req.body.image,
        },
      });
      return res.json(service);
    } catch (error) {
      return next(error);
    }
  };

  deleteService = async (req, res, next) => {
    try {
      await prisma.service.deleteMany({
        where: { id: req.body.id },
      });
      return res.json({ message: "OK" });
    } catch (error) {
      return next(error);
    }
  };

  orderService = async (req, res, next) => {
    try {
      const orderId = parseInt(req.params.orderId);
      const { name, tickets, start } = req.body;
      console.log("orderId", orderId);
      console.log(typeof orderId);
      console.log(name);
      console.log(tickets);
      console.log(start);
      return res.json({ message: "connect successfully" });
    } catch (error) {
      return next(error);
    }
  };

  deleteOrderService = async (req, res, next) => {
    try {
      const oderServiceId = parseInt(req.query.oderServiceId);
      console.log(oderServiceId);
      console.log(typeof oderServiceId);
      return res.json({ message: "Connect successfully" });
    } catch (error) {
      return next(error);
    }
  };

  editOrderServiceService = async (req, res, next) => {
    try {
      const { test } = req.body;
      console.log(test);
      return res.json({ message: "Connect successfully" });
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new ServiceController();
