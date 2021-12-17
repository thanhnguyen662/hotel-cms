const prisma = require('../models/prisma');

class RoomController {
   getRooms = async (req, res, next) => {
      try {
         const floor = req.query.floor || undefined;
         const roomType =
            req.query.roomType === 'all' ? undefined : req.query.roomType;

         const response = await prisma.room.findMany({
            where: {
               AND: [
                  {
                     floor: Number(floor),
                  },
                  {
                     roomDetail: {
                        type: roomType,
                     },
                  },
               ],
            },
            include: {
               roomStatus: true,
               roomDetail: true,
            },
         });

         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   getRoomById = async (req, res, next) => {
      try {
         const response = await prisma.room.findFirst({
            where: {
               number: Number(req.query.roomNumber),
            },
            include: {
               roomDetail: true,
               roomStatus: true,
            },
         });

         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new RoomController();
