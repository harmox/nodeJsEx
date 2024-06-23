const { Recipe } = require("../models/model.js")
const { parseError } = require("../utils.js")

async function deleteRecepi(req, res) {
    try {
        
        const recepi = await Recipe.findById(req.params.id).lean()
        if (recepi.owner != req.user?.id) { throw new Error(`Only owner can delete this recipe`) }
        await Recipe.findByIdAndDelete(req.params.id)
        res.redirect(`/catalog`)
    } catch (err) {
        res.render(`404`, { error: parseError(err).errors })
    }

}
module.exports = { deleteRecepi }