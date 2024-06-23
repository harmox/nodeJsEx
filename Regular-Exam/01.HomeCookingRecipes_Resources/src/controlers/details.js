const mongoose = require("mongoose");
const { Recipe } = require("../models/model.js")
const { parseError } = require("../utils.js")

async function detailsGet(req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw new Error('Invalid recipe ID');
        }
        const recipe = await Recipe.findById(req.params.id).lean()
        res.locals.title = recipe.title
        if (recipe.owner == req.user?.id) { recipe.isOwner = true }
        if (!recipe.recommendList.find(i => i == req.user?.id)) { recipe.noRecommend = true }
        res.render(`details`, { recipe })
    } catch (err) {
        res.render(`404`, { error: parseError(err).errors })
    }
}
module.exports = { detailsGet }