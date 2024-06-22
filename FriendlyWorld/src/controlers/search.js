const { animal } = require("../models/model.js")

async function searchGet(req, res) {
    const { query } = req.query
    console.log(query)
    try {
        if (!query) {
            const friend = await animal.find().sort({ $natural: -1 }).limit(3).lean()
            if (!friend) { throw new Error(`something went wrong`) }
            res.render(`search`, { friend })
        } else if (query) {
            const friend = await animal.find({ location: { $regex: new RegExp(query, 'i') } }).lean()
            res.render(`search`, { friend })
        }
    } catch (err) {
        res.render(`search`, { friend, error: parseError(err).errors })
    }
}

module.exports = { searchGet,  }