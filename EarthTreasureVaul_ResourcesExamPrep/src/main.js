const express = require(`express`);
const mongoose = require(`mongoose`);
const app = express();
const path = require(`path`);

const cookieParser = require(`cookie-parser`);
const { handlebars } = require("./config/handlebars.js");
const { router } = require("./config/router.js");
const { session } = require("./service/cookie.js");

const PORT = 3000;
const secret = `pass`;
start();
async function start() {
  await mongoose.connect(`mongodb://localhost:27017/earthTreasure`);

  app.set('views', path.join(__dirname, '../views'));
  app.use(express.urlencoded({ extended: true }));
  app.use(`/static`, express.static(path.join(__dirname, `../static`)));
  app.use(cookieParser(secret));
  app.use(session());
  handlebars(app);
  app.use(router);

  app.listen(PORT, () => console.log(`serven listen on ${PORT}`));
}
