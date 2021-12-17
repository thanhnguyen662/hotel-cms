const roomRouter = require('./room');
const userRouter = require('./user');

const route = (app) => {
   app.use('/api/users', userRouter);
   app.use('/api/rooms', roomRouter);
};

module.exports = route;
