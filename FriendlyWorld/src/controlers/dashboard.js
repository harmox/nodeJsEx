const { animal } = require("../models/model.js")
const { parseError } = require("../utils.js")

async function dashboard(req,res) {
    try {
        const friend = await animal.find().lean()
        if (!friend) { throw new Error(`something went wrong`) }
        res.render(`dashboard`, {friend})
    } catch (err) {
        res.render(`home`, { error: parseError(err).errors })
    }
}
module.exports = { dashboard }