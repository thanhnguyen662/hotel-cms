const prisma = require('../models/prisma');
const faker = require('faker');

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
               roomDetail: true,
               statusOfRooms: {
                  include: {
                     roomStatus: true,
                  },
               },
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
               statusOfRooms: {
                  include: {
                     roomStatus: true,
                  },
               },
            },
         });

         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   createRoom = async (req, res, next) => {
      const { roomNumber, floor, roomType, bedroom, price } = req.body;
      const imageURL = `${faker.image.business()}?random=${Math.round(
         Math.random() * 1000
      )}`;

      try {
         const response = await prisma.room.create({
            data: {
               number: Number(roomNumber),
               floor: Number(floor),

               roomDetail: {
                  create: {
                     bedroom: bedroom,
                     price: Number(price),
                     type: roomType,
                     img: [imageURL, imageURL],
                  },
               },

               statusOfRooms: {
                  createMany: {
                     data: [
                        {
                           roomStatusId: 2,
                           roleId: 4,
                        },
                        {
                           roomStatusId: 2,
                           roleId: 3,
                        },
                     ],
                  },
               },
            },
         });

         return res
            .status(200)
            .json({ ...response, message: 'room_created_successfully' });
      } catch (error) {
         return next(error);
      }
   };

   housekeeperManageRoom = async (req, res, next) => {
      try {
         const response = await prisma.room.findMany({
            where: {
               AND: [
                  {
                     number: Number(req.query.roomNumber) || undefined,
                  },
                  {
                     statusOfRooms: {
                        some: {
                           roomStatus: {
                              code: req.query.roomStatus || undefined,
                           },
                        },
                     },
                  },
               ],
            },
            include: {
               statusOfRooms: {
                  include: {
                     roomStatus: true,
                  },
               },
            },
            orderBy: {
               updateStatusdAt: 'asc',
            },
         });

         const newResponse = response?.reduce((array, item) => {
            const select = item.statusOfRooms.filter(
               (status) => status.roleId === 3
            );
            item.statusOfRooms = [...select];
            array.push(item);
            return array;
         }, []);

         return res.status(200).json(newResponse || response);
      } catch (error) {
         return next(error);
      }
   };

   housekeeperUpdateStatusRoom = async (req, res, next) => {
      try {
         const findStatusCodeById = await prisma.roomStatus.findMany({
            where: {
               code: req.body.statusCode,
            },
         });

         const response = await prisma.statusOfRoom.update({
            where: {
               id: Number(req.body.statusOfRoomId),
            },
            data: {
               roomStatusId: Number(findStatusCodeById[0].id),
            },
            include: {
               room: true,
               roomStatus: true,
            },
         });

         return res
            .status(200)
            .json({ ...response, message: 'updated_roomStatus_success' });
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new RoomController();
