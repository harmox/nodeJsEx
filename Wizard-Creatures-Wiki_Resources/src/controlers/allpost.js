const { creatures } = require("../models/creatures.js")
const { parseError } = require("../utils.js")

async function allPostGet(req, res) {
    try {
        const creature = await creatures.find().lean()
        res.render(`all-posts`, { creature })
    } catch (err) {
        err.message = `something went wrong`
        res.render(`home`, { error: parseError(err).errors })
    }
}
module.exports = { allPostGet }