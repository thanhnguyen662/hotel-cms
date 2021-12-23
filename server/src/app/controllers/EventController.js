const prisma = require("../models/prisma");

class EventController {
  addEvent = async (req, res, next) => {
    try {
      //get current user
      const currentUserId = req.user.id;
      const { name, detail, start, end } = req.body;
      const newEvent = await prisma.event.create({
        data: {
          name: name,
          detail: detail,
          start: start,
          end: end,
          createdBy: currentUserId,
        },
      });
      return res.json(newEvent);
    } catch (error) {
      return next(error);
    }
  };

  getAllEvent = async (req, res, next) => {
    try {
      const allEvent = await prisma.event.findMany();
      return res.json(allEvent);
    } catch (error) {
      return next(error);
    }
  };

  deleteEvent = async (req, res, next) => {
    try {
      const { id } = req.body;
      console.log(id);
      const deleteItem = await prisma.event.delete({
        where: { id: id },
      });
      return res.json(deleteItem);
    } catch (error) {
      return next(error);
    }
  };

  editEvent = async (req, res, next) => {
    try {
      const { id, name, start, end, detail } = req.body;
      const updateEvent = await prisma.event.update({
        where: { id: id },
        data: {
          name: name,
          start: start,
          end: end,
          detail: detail,
        },
      });
      return res.json(updateEvent);
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = new EventController();
