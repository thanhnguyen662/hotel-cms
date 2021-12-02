const userRouter = require('./user');

const route = (app) => {
   app.use('/api/users', userRouter);
};

module.exports = route;
