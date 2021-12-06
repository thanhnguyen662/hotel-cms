const passport = require('passport');
const passportLocal = require('passport-local');
const prisma = require('../../models/prisma');
const bcrypt = require('bcrypt');
const LocalStrategy = passportLocal.Strategy;

const initPassportLocal = () => {
   passport.use(
      new LocalStrategy(
         {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
         },
         async (req, username, password, done) => {
            try {
               const user = await prisma.user.findFirst({
                  where: {
                     AND: [{ username: username }, { isDelete: false }],
                  },
                  include: { profile: true, role: true },
               });

               if (!user) return done(null, false);

               const checkPassword = bcrypt.compareSync(
                  password,
                  user.hashPassword
               );

               if (!checkPassword) return done(null, false);

               return done(null, user);
            } catch (error) {
               console.log(error);
               return done(null, false);
            }
         }
      )
   );
};

passport.serializeUser(function (user, done) {
   if (user) return done(null, user);
});

passport.deserializeUser(function (user, done) {
   done(null, user);
});

module.exports = initPassportLocal;
