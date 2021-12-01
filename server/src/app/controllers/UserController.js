const prisma = require('../models/prisma');

class UserController {
   getAllUser = async (req, res, next) => {
      try {
         const response = await prisma.user.findMany();
         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new UserController();
