const { creatures } = require("../models/creatures.js");
const { parseError } = require("../utils.js");

async function deleteCreature(req, res) {
    try {
        const creature = await creatures.findById(req.params.id).lean()
        if (!creature) { throw new Error(`Something went wrong`) }
        if (creature.owner != req.user.id) { throw new Error(`You cant delete this`) }
        await creatures.findByIdAndDelete(req.params.id)
        res.redirect(`/all-posts`)
    } catch (err) {
        const creature = await creatures.find().lean()
        res.render(`all-posts`, { creature, error: parseError(err).errors })
    }
}
module.exports = { deleteCreature }