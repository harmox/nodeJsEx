const express = require(`express`);
const mongoose = require(`mongoose`);
const app = express();

const cookieParser = require(`cookie-parser`);
const { handlebars } = require("./config/handlebars.js");
const { router } = require("./config/router.js");
const { session } = require("./service/cookie.js");

const PORT = 3000;
const secret = `pass`;
start();
async function start() {
  await mongoose.connect(`mongodb://localhost:27017/earthTreasure`);

  
  app.use(express.urlencoded({ extended: true }));
  app.use(`/static`, express.static(`static`));
  app.use(cookieParser(secret));
  app.use(session());
  app.use(router);
  handlebars(app);

  app.listen(PORT, () => console.log(`serven listen on ${PORT}`));
}
 