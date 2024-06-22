const { animal } = require("../models/model.js")
const { parseError } = require("../utils.js")

async function homeGet(req, res) {
    try {
        const friend = await animal.find().sort({ $natural: -1 }).limit(3).lean()
        if (!friend) { throw new Error(`something went wrong`) }
        res.render(`home`, { friend })
    } catch (err) {
        res.render(`home`, { error: parseError(err).errors })
    }
}

module.exports = { homeGet }