const express = require("express");
const app = express();
const route = require("./routes");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

app.use(
  cors({
    origin: "http://localhost:9900",
    credentials: true,
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    store: new pgSession({
      tableName: "Sessions",
    }),
    secret: "secretcode",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

const PORT = process.env.PORT || 9000;
route(app);

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
