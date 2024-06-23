const { Recipe } = require("../models/model.js")
const { parseError } = require("../utils.js")

async function recommend(req, res) {
    try {
        const recepi = await Recipe.findById(req.params.id)
        if (recepi.owner == req.user?.id) { throw new Error(`Cant recommend your own recepies`) }
        if (recepi.recommendList.find(i => i._id == req.user.id)) { throw new Error(`You already recommended this!`) }
        recepi.recommendList.push(req.user.id)
        recepi.save()
        res.redirect(`/details/${req.params.id}`)
    } catch (err) {
        res.render(`404`, { error: parseError(err).errors })
    }
}
module.exports = { recommend }