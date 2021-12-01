const userRouter = require('./user');

const route = (app) => {
   app.use('/api/user', userRouter);
};

module.exports = route;
