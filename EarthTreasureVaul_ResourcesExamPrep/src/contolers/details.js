const { stones } = require("../models/stones.js")

async function detailsGet(req, res) {
    try {
        const stone = await stones.findById(req.params.id).lean()
        const isCreator = stone.owner == req.user.id
        res.render(`details`, { stone, isCreator })
    } catch (err) {
        res.redirect(`/`)
    }
}
module.exports = { detailsGet }