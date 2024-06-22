const { validationResult } = require("express-validator");
const { animal } = require("../models/model.js");
const { parseError } = require("../utils.js");

async function editGet(req, res) {
    try {
        const values = await animal.findById(req.params.id).lean()
        if (values.owner != req.user.id) { throw new Error(`You are not owner cant do this`) }
        res.render(`edit`, { values })
    } catch (err) {
        res.render(`404`)
    }
}
async function editPost(req, res) {
    const validation = validationResult(req);
    try {
        if (validation.errors.length) { throw validation.errors }
        const ani = await animal.findById(req.params.id)
        if (ani.owner != req.user.id) { throw new Error(`You are not owner cant do this`) }
        ani.name = req.body.name
        ani.years = req.body.years
        ani.kind = req.body.kind
        ani.image = req.body.image
        ani.need = req.body.need
        ani.location = req.body.location
        ani.description = req.body.description
        await ani.save()

        res.redirect(`/details/${req.params.id}`)
    } catch (err) {
        res.render(`create`, { values: req.body, error: parseError(err).errors })
    }

}
module.exports = { editGet, editPost }