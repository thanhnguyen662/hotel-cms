const express = require('express');
const app = express();
const route = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(
   cors({
      origin: 'http://localhost:9900',
      credentials: true,
   })
);

app.use(
   express.urlencoded({
      extended: true,
   })
);

app.use(express.json());

const PORT = process.env.PORT || 9000;

route(app);

app.listen(PORT, () => {
   console.log(`listening on http://localhost:${PORT}`);
});
