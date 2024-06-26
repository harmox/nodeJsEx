const express = require(`express`)
const cookieParser = require(`cookie-parser`)
const mongoose = require(`mongoose`);
const { handlebarsConfig } = require("./configs/handlebars.js")
const { router } = require("./configs/router.js");
const { session } = require("./controlers/userService/token.js");

const app = express()
const PORT = 3000
const secret = `superSECRET`
start()
async function start() {
    await mongoose.connect(`mongodb://localhost:27017/harry-potter`)
    //TODO add name to the database

    app.use(express.urlencoded({ extended: true }));
    handlebarsConfig(app)
    app.use(cookieParser(secret))
    app.use(session())
    app.use(`/static`, express.static(`static`))
    app.use(router)
    app.listen(PORT, () => { console.log(`app listen on ${PORT}`) })
}