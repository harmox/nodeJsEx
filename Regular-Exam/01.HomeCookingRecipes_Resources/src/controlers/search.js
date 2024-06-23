const { Recipe } = require("../models/model.js")

async function search(req, res) {
    res.locals.title = `Search`
    const { search } = req.query
    if (!search) {
        const recipe = await Recipe.find().lean()
        res.render(`search`, { recipe })
    } else {
        const recipe = await Recipe.find({ title: { $regex: new RegExp(search, `i`) } }).lean()
        res.render(`search`, { recipe })
    }
}
module.exports = { search }