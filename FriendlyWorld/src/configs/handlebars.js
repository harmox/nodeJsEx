
const handlebars = require(`express-handlebars`)

function handlebarsConfig(app) {
    app.set(`views`, `./views`)
    app.set(`view engine`, `handlebars`)
    app.engine(`handlebars`, handlebars.engine())
}
module.exports = { handlebarsConfig }