
const handlebars = require(`express-handlebars`)

function handlebarsConfig(app) {
    app.set(`view`, `../view`)
    app.set(`view engine`, `handlebars`)
    app.engine(`view engine`, handlebars.engine())
}
module.exports = { handlebarsConfig }