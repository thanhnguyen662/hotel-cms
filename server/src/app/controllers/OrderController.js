const prisma = require('../models/prisma');

class OrderController {
   createOrder = async (req, res, next) => {
      try {
         const totalOrderPrice = parseInt(req.body.totalOrderPrice);
         const roomData = req.body.roomData;
         const orderDuration = parseInt(req.body.orderDuration);
         const customerOrderRoom = req.body.customerOrderRoom;
         const receptionistId = req.body.receptionistId;
         const rangeOrderDate = req.body.rangeOrderDate;

         const prepareRoomData = roomData.reduce((array, item) => {
            array.push({
               roomId: Number(item.id),
               price: parseFloat((item.roomDetail.price / 24) * orderDuration),
            });
            return array;
         }, []);

         const createOrderItemsByRoom = await prisma.order.create({
            data: {
               totalPrice: parseFloat(totalOrderPrice),
               receptionistId: receptionistId,
               startDate: new Date(rangeOrderDate[0]),
               endDate: new Date(rangeOrderDate[1]),
               orderItems: {
                  createMany: {
                     data: prepareRoomData,
                  },
               },
            },
            include: {
               orderItems: {
                  include: {
                     room: true,
                  },
               },
            },
         });

         const createCustomerOrderItemsPromise =
            createOrderItemsByRoom.orderItems.map(async (orderItem) => {
               const prepareData = customerOrderRoom.reduce((array, item) => {
                  if (Number(item.roomId) !== Number(orderItem.room.number))
                     return array;
                  array.push({
                     customerId: item.customerId,
                     orderItemId: orderItem.id,
                  });
                  return array;
               }, []);

               const createCustomerOrderItem =
                  await prisma.customerOrderItemRoom.createMany({
                     data: prepareData,
                  });

               await prisma.statusOfRoom.updateMany({
                  where: {
                     AND: [
                        {
                           roomId: Number(orderItem.roomId),
                        },
                        {
                           roleId: 4,
                        },
                     ],
                  },
                  data: {
                     roomStatusId: 1,
                  },
               });

               return createCustomerOrderItem;
            });

         const result = await Promise.all(createCustomerOrderItemsPromise);

         return res.json({ ...result, message: 'create_order_success' });
      } catch (error) {
         return next(error);
      }
   };

   getOrders = async (req, res, next) => {
      try {
         const isType = () => {
            if (req.query.orderType === 'all') return undefined;
            if (req.query.orderType === 'paid') return true;
            if (req.query.orderType === 'unpaid') return false;
         };
         const response = await prisma.order.findMany({
            where: {
               isComplete: isType(),
               orderItems: {
                  some: {
                     room: {
                        number: Number(req.query.roomNumber) || undefined,
                     },
                  },
               },
            },
            include: {
               user: true,
               orderItems: {
                  include: {
                     room: {
                        include: {
                           roomDetail: true,
                        },
                     },
                     _count: {
                        select: {
                           customerOrderItemRooms: true,
                        },
                     },
                  },
               },
            },
         });

         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   getOrderById = async (req, res, next) => {
      try {
         const response = await prisma.order.findUnique({
            where: {
               id: Number(req.query.orderId),
            },
            include: {
               orderItems: {
                  include: {
                     customerOrderItemRooms: {
                        include: {
                           customer: true,
                        },
                     },
                     room: {
                        include: {
                           roomDetail: true,
                           statusOfRooms: true,
                        },
                     },
                     serviceHistories: {
                        include: {
                           service: true,
                           oderItem: true,
                        },
                     },
                  },
               },
            },
         });
         res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   allUnpaidOrderItem = async (req, res, next) => {
      try {
         const searchData = parseInt(req.query.search) || undefined;
         const getAll = await prisma.orderItem.findMany({
            where: {
               room: {
                  number: searchData,
               },
               order: {
                  isComplete: false,
               },
            },
            include: {
               //  customerOrderItemRooms: true,
               _count: {
                  select: {
                     customerOrderItemRooms: true,
                     serviceHistories: true,
                  },
               },
               serviceHistories: {
                  include: {
                     service: true,
                  },
               },
               room: {
                  include: {
                     roomDetail: true,
                  },
               },
            },
         });
         return res.json(getAll);
      } catch (error) {
         return next(error);
      }
   };

   getOrderItem = async (req, res, next) => {
      try {
         const oderItemId = parseInt(req.query.id);
         const orderItem = await prisma.orderItem.findUnique({
            where: {
               id: oderItemId,
            },
            include: {
               serviceHistories: {
                  include: {
                     service: true,
                  },
               },
               room: true,
            },
         });
         return res.json(orderItem);
      } catch (error) {
         return next(error);
      }
   };

   checkout = async (req, res, next) => {
      try {
         await prisma.order.update({
            where: {
               id: Number(req.body.orderId),
            },
            data: {
               isComplete: true,
               servicePrice: parseFloat(req.body.totalServicePrice),
               finalPrice:
                  parseFloat(req.body.totalServicePrice) +
                  parseFloat(req.body.totalRoomPrice),
            },
         });

         const updateRoomPromise = req.body.updateRoomStatus.map(async (i) => {
            const updateRoomStatus = await prisma.statusOfRoom.updateMany({
               where: {
                  AND: [
                     {
                        roleId: 4,
                     },
                     {
                        roomId: Number(i),
                     },
                  ],
               },
               data: {
                  roomStatusId: 7,
               },
            });

            return updateRoomStatus;
         });

         const result = await Promise.all(updateRoomPromise);

         return res
            .status(200)
            .json({ ...result, message: 'checkout_success' });
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new OrderController();
