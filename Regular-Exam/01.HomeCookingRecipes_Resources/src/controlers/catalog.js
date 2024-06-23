const { Recipe } = require("../models/model.js")
const { parseError } = require("../utils.js")

async function catalog(req, res) {
    res.locals.title=`Catalog`
    try {
        const recipe = await Recipe.find().lean()
        res.render(`catalog`, { recipe })
    } catch (err) {
        res.render(`404`, { error: parseError(err).errors })
    }
}
module.exports = { catalog }