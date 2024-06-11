const mongoose = require(`mongoose`)
const express = require(`express`)
const { rout } = require('./config/router');
const { configHbs } = require(`./config/handlebars`)
const path = require('path');
const app = express()
const cookieParser = require(`cookie-parser`);
const { session } = require('./utils/token.js');
start()
const secret = `stich`

async function start() {
    await mongoose.connect(`mongodb://localhost:27017/magic-movies`)

    app.set('views', path.join(__dirname, '../views'));
    app.use(express.urlencoded({ extended: true }))
    app.use(`/static`, express.static(path.join(__dirname, '../static')))
    app.use(cookieParser(secret))
    app.use(session())
    configHbs(app)
    app.use(rout)

    app.listen(3000)
}