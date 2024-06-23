const express = require(`express`)
const cookieParser = require(`cookie-parser`)
const mongoose = require(`mongoose`);
const { handlebarsConfig } = require("./configs/handlebars.js")
const { router } = require("./configs/router.js");
const { session } = require("./userService/token.js");

const app = express()
const PORT = 3000
const secret = `superSECRET`
start()
async function start() {
    await mongoose.connect(`mongodb://localhost:27017/exam`)

    app.use(express.urlencoded({ extended: true }));
    handlebarsConfig(app)
    app.use(cookieParser(secret))
    app.use(session())
    app.use(`/styles`, express.static(`styles`))
    app.use(router)
    app.listen(PORT, () => { console.log(`app listen on ${PORT}`) })
}