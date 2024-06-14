const { stones } = require("../models/stones.js")

async function detailsGet(req, res) {
    try {
        const stone = await stones.findById(req.params.id).lean()
        const isCreator = stone.owner == req.user.id
        const liked = stone.likedList.includes(req.user.id)
        res.render(`details`, { stone, isCreator, liked })
    } catch (err) {
        res.render(`home`, { error: err.message })
    }
}
module.exports = { detailsGet }