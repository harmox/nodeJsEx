const { Recipe } = require("../models/model.js")
const { parseError } = require("../utils.js")

async function homeGet(req, res) {
    try {
        res.locals.title = `Home Page`
        const recipe = await Recipe.find().sort({ $natural: -1 }).limit(3).lean()
        res.render(`home`, { recipe })
    } catch (err) {
        res.render(`404`, { error: parseError(err).errors })
    }
}

module.exports = { homeGet }