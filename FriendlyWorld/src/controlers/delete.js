const { animal } = require("../models/model.js")
const { parseError } = require("../utils.js")

async function deleteAnimal(req, res) {
    try {
        const model = await animal.findById(req.params.id).lean()
        if (model.owner != req.user.id) { throw new Error(`You are not owner `) }
        await animal.findByIdAndDelete(req.params.id)
        res.redirect(`/dashboard`)
    } catch (err) {
        res.render(`home`, { error: parseError(err).errors })
    }
}
module.exports = { deleteAnimal }