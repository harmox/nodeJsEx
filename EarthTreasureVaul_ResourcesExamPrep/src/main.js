const express = require(`express`)
const mongoose = require(`mongoose`)
const app = express()
const path = require(`path`)
const { handlebars } = require("./config/handlebars.js")
const { router } = require("./router.js")
const PORT = 3000

start()
async function start() {
    await mongoose.connect(`mongodb://localhost:27017/earthTreasure`)

    app.use(`/static`, express.static(path.join(__dirname, `../static`)))
    handlebars(app)
    app.use(router)
    app.listen(PORT, () => console.log(`serven listen on ${PORT}`))
}