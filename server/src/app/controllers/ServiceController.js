const prisma = require('../models/prisma');

class ServiceController {
   addService = async (req, res, next) => {
      try {
         const newService = await prisma.service.create({
            data: {
               name: req.body.name,
               type: req.body.type,
               price: parseInt(req.body.price),
               image: 'https://unblast.com/wp-content/uploads/2020/05/Delivery-Service-Illustration-1.jpg',
            },
         });
         return res.json(newService);
      } catch (error) {
         return next(error);
      }
   };

   getAllService = async (req, res, next) => {
      const name = req.query.name || undefined;
      const type = req.query.type === 'all' ? undefined : req.query.type;
      try {
         const serviceList = await prisma.service.findMany({
            where: {
               AND: [
                  {
                     name: {
                        contains: name,
                        mode: 'insensitive',
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
         return res.json({ message: 'OK' });
      } catch (error) {
         return next(error);
      }
   };

   orderService = async (req, res, next) => {
      try {
         const orderItemId = parseInt(req.params.orderId);
         const serviceId = parseInt(req.body.name);
         const tickets = parseInt(req.body.tickets);
         const { start } = req.body;
         const newServiceHistory = await prisma.serviceHistory.create({
            data: {
               oderItemId: orderItemId,
               serviceId: serviceId,
               tickets: tickets,
               servedAt: Array.isArray(start) ? start[0] : start,
            },
         });
         const servicerHistory = await prisma.serviceHistory.findUnique({
            where: { id: newServiceHistory.id },
            include: {
               service: true,
            },
         });
         return res.json(servicerHistory);
      } catch (error) {
         return next(error);
      }
   };

   deleteOrderService = async (req, res, next) => {
      try {
         const orderId = parseInt(req.query.orderId);
         const deleteOrderItem = await prisma.serviceHistory.delete({
            where: { id: orderId },
         });
         return res.json(deleteOrderItem);
      } catch (error) {
         return next(error);
      }
   };

   editOrderServiceService = async (req, res, next) => {
      try {
         const { id, oderItemId, serviceId, start, tickets } = req.body;
         const editOrderServiceItem = await prisma.serviceHistory.update({
            where: { id: id },
            data: {
               oderItemId: oderItemId,
               serviceId: serviceId,
               servedAt: Array.isArray(start) ? start[0] : start,
               tickets: parseInt(tickets),
            },
            include: {
               service: true,
            },
         });
         return res.json(editOrderServiceItem);
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new ServiceController();
