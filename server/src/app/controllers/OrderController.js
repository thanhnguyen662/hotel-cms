const prisma = require("../models/prisma");

class OrderController {
  createOrder = async (req, res, next) => {
    try {
      // const customerOrderRoom = req.body.customerOrderRoom;
      // const orderDuration = parseInt(req.body.orderDuration);
      // const totalOrderPrice = parseInt(req.body.totalOrderPrice);
      // const prepareData = req.body.prepareData;

      // const upsertPromise = customerOrderRoom.map(async (customer) => {
      //    const upsertCustomer = await prisma.customer.upsert({
      //       where: {
      //          idCard: customer.idCard,
      //       },
      //       update: {
      //          country: customer.country,
      //          dob: new Date(customer.dob),
      //          firstName: customer.firstName,
      //          lastName: customer.lastName,
      //          phoneNumber: customer.phoneNumber,
      //          idCard: customer.idCard,
      //       },
      //       create: {
      //          country: customer.country,
      //          dob: new Date(customer.dob),
      //          firstName: customer.firstName,
      //          lastName: customer.lastName,
      //          phoneNumber: customer.phoneNumber,
      //          idCard: customer.idCard,
      //       },
      //    });

      //    return upsertCustomer;
      // });

      // const upsertResult = await Promise.all(upsertPromise);

      // const calculatorPriceByRoom = roomData.reduce((array, room) => {
      //    array.push({
      //       roomId: room.number,
      //       price: (Number(room.roomDetail.price) / 24) * orderDuration,
      //    });
      //    return array;
      // }, []);

      // const prepareData = roomData.map((item) => {
      //    const findTest = customerOrderRoom.find(i => i.number === 101);
      //    console.log('findTest: ', findTest);
      // });
      // console.log('prepareData: ', prepareData);
      // const prepareData = roomData.reduce((array, room) => {

      //    return array
      // }, [])

      // const createOrderPromise = customerOrderRoom.map(async (customer) => {
      //    const createOrder = await prisma.order.create({
      //       data: {
      //          totalPrice: totalOrderPrice,
      //          orderItems: {
      //             create: {},
      //          },
      //       },
      //    });

      //    return createOrder;
      // });

      // const result = await Promise.all(createOrderPromise);

      // return res.status(200).json({ body: req.body });

      // const test = await prisma.order.create({
      //    data: {
      //       orderItems: {
      //          createMany: {
      //             data: [
      //                {
      //                   roomId: 38,
      //                   price: 100,
      //                },
      //                // {
      //                //    roomId: 39,
      //                //    price: 200,
      //                // },
      //             ],
      //          },
      //       },
      //    },
      //    include: {
      //       orderItems: true,
      //    },
      // });

      // const customerPromise = test.orderItems.map(async (item) => {
      //    const createOrder = await prisma.customerOrderItemRoom.create({
      //       data: {
      //          customerId: 7,
      //          orderItemId: item.id,
      //       },
      //    });

      //    return createOrder;
      // });

      // const result = await Promise.all(customerPromise);

      /////////////////////////////////
      const totalOrderPrice = parseInt(req.body.totalOrderPrice);
      const roomData = req.body.roomData;
      const orderDuration = parseInt(req.body.orderDuration);
      const customerOrderRoom = req.body.customerOrderRoom;
      const receptionistId = req.body.receptionistId;
      // console.log('customerOrderRoom: ', customerOrderRoom);
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
      // console.log('createOrderItemsByRoom: ', createOrderItemsByRoom);

      const createCustomerOrderItemsPromise = createOrderItemsByRoom.orderItems.map(
        async (orderItem) => {
          // console.log('orderItem: ', orderItem);
          const prepareData = customerOrderRoom.reduce((array, item) => {
            if (Number(item.roomId) !== Number(orderItem.room.number)) return array;
            array.push({
              customerId: item.customerId,
              orderItemId: orderItem.id,
            });
            return array;
          }, []);
          // console.log('prepareData: ', prepareData);

          const createCustomerOrderItem = await prisma.customerOrderItemRoom.createMany({
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
        }
      );

      const result = await Promise.all(createCustomerOrderItemsPromise);

      return res.json({ ...result, message: "create_order_success" });
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
            statusOfRooms: {
              some: {
                roomStatus: {
                  code: "OCC",
                },
              },
            },
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
}

module.exports = new OrderController();
