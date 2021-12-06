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
               hashPassword: await bcrypt.hash(password, 10),
               roleId: 2,
               profile: {
                  create: {
                     firstName: firstName,
                     lastName: lastName,
                  },
               },
            },
         });
         delete createNewUser.hashPassword;

         res.status(200).json(createNewUser);
      } catch (error) {
         return next(error);
      }
   };

   login = async (req, res, next) => {
      passport.authenticate('local', (err, user) => {
         if (err) throw err;
         if (!user) res.json({ message: 'user_not_exist' });
         req.logIn(user, function (err) {
            if (err) return next(err);
            return res.json(req.user);
         });
      })(req, res, next);
   };

   logout = async (req, res, next) => {
      try {
         req.logout();
         res.json({ message: 'logout_success' });
      } catch (error) {
         return next(error);
      }
   };

   delete = async (req, res, next) => {
      try {
         const response = await prisma.user.update({
            where: {
               id: Number(req.body.userId),
            },
            data: {
               isDelete: true,
            },
         });

         return res
            .status(200)
            .json({ ...response, message: 'delete_account_success' });
      } catch (error) {
         return next(error);
      }
   };

   getMyProfile = async (req, res, next) => {
      try {
         return res.status(200).json({
            ...req.user,
            loginStatus: req.isAuthenticated(),
         });
      } catch (error) {
         return next(error);
      }
   };

   getUserProfile = async (req, res, next) => {
      try {
         const response = await prisma.user.findUnique({
            where: {
               id: Number(req.query.userId),
            },
            include: {
               profile: true,
               role: true,
            },
         });
         delete response.hashPassword;
         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   manageAllUser = async (req, res, next) => {
      const username = req.query.username || undefined;
      const role = req.query.role === 'all' ? undefined : req.query.role;
      try {
         const response = await prisma.user.findMany({
            where: {
               AND: [
                  {
                     username: {
                        contains: username,
                        mode: 'insensitive',
                     },
                  },
                  {
                     role: {
                        name: role,
                     },
                  },
                  {
                     isDelete: false,
                  },
               ],
            },
            include: {
               profile: true,
               role: true,
            },
         });

         return res.status(200).json(response);
      } catch (error) {
         return next(error);
      }
   };

   editUserProfile = async (req, res, next) => {
      const { id, firstName, lastName, role } = req.body;
      try {
         const isRole = await prisma.role.findMany();
         const roleId = isRole.find((i) => i.name === String(role)).id;
         const response = await prisma.user.update({
            where: {
               id: Number(id),
            },
            data: {
               roleId: Number(roleId),
               profile: {
                  update: {
                     firstName: firstName,
                     lastName: lastName,
                  },
               },
            },
            include: {
               profile: true,
               role: true,
            },
         });

         return res
            .status(200)
            .json({ ...response, message: 'edit_account_success' });
      } catch (error) {
         return next(error);
      }
   };

   resetPassword = async (req, res, next) => {
      try {
         const { userId } = req.body;
         const defaultPassword = 'Abc@123';
         const newHasPassword = await bcrypt.hash(defaultPassword, 10);

         const response = await prisma.user.update({
            where: {
               id: Number(userId),
            },
            data: {
               hashPassword: newHasPassword,
            },
         });

         if (response)
            return res
               .status(200)
               .json({ ...response, message: 'reset_password_success' });
      } catch (error) {
         return next(error);
      }
   };
}

module.exports = new UserController();
