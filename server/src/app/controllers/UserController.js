const prisma = require('../models/prisma');
const bcrypt = require('bcrypt');
const initPassportLocal = require('../controllers/auth/passportLocal');
const passport = require('passport');

initPassportLocal();
class UserController {
   register = async (req, res, next) => {
      try {
         const { firstName, lastName, username, password } = req.body;

         const isUsernameExist = await prisma.user.findUnique({
            where: {
               username: username,
            },
         });

         if (isUsernameExist)
            return res.status(200).json({ message: 'username_exist' });

         const createNewUser = await prisma.user.create({
            data: {
               username: username,
               firstName: firstName,
               lastName: lastName,
               hashPassword: await bcrypt.hash(password, 10),
            },
         });
         delete createNewUser.hashPassword;

         res.status(200).json(createNewUser);
      } catch (error) {
         return next(error);
      }
   };

   login = async (req, res, next) => {
      passport.authenticate('local', (err, user, info) => {
         if (err) throw err;
         if (!user) res.send('No User Exists');
         req.logIn(user, function (err) {
            if (err) {
               return next(err);
            }
            return res.json(req.user);
         });
      })(req, res, next);
   };

   getProfile = async (req, res, next) => {
      try {
         const response = await prisma.user.findUnique({
            where: {
               id: Number(req.user.id),
            },
         });
         delete response.hashPassword;

         return res.status(200).json({
            ...req.user,
            loginStatus: req.isAuthenticated(),
         });
      } catch (error) {
         return next(error);
      }
   };

   logout = async (req, res, next) => {
      try {
         const response = await prisma.sessions.delete({
            where: { sid: req.sessionID },
         });
         req.logout();
         res.json({ response });
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new UserController();
