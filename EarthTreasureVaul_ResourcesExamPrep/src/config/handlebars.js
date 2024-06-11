const expHbs = require(`express-handlebars`)


module.exports = {
    handlebars: (app) => {
        app.engine(`handlebars`, expHbs.engine())
        app.set(`views`, `../views`)
        app.set(`view engine`, `handlebars`)
    }
}