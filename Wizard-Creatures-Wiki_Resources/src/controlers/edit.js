const { creatures } = require("../models/creatures.js")
const { validationResult } = require('express-validator');
const { parseError } = require("../utils.js")

async function editGet(req, res) {
    try {
        const creature = await creatures.findById(req.params.id).lean()
        if (creature.owner != req.user.id) { throw new Error(`You cant edit this`) }
        res.render(`edit`, { creature })
    } catch (err) {
        res.render(`home`, { error: parseError(err).errors })
    }
}
async function editPost(req, res) {
    const validation = validationResult(req)
    try {
        if (validation.errors.length) { throw validation.errors }
        let creature = await creatures.findById(req.params.id)
        if (creature.owner != req.user.id) { throw new Error(`You cant edit this`) }
        creature.name = req.body.name
        creature.spicies = req.body.spicies
        creature.skinColor = req.body.skinColor
        creature.eyeColor = req.body.eyeColor
        creature.image = req.body.image
        creature.description = req.body.description
        await creature.save()
        res.redirect(`/details/${req.params.id}`)
    } catch (err) {
        res.render(`edit`, { creature: req.body, error: parseError(err).errors })
    }

}
module.exports = { editGet, editPost }