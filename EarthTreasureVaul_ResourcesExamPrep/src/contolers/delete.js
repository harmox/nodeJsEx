const { stones } = require("../models/stones.js")

async function deleteStone(req, res) {
    try {
        let stone = await stones.findById(req.params.id).lean()
        if (!stone) { throw new Error(`Stone not found!`) }
        if (req.user.id != stone.owner) { throw new Error(`You cant delete this stone!`) }
        await stones.findByIdAndDelete(req.params.id)
        res.redirect(`/`)
    } catch (err) {
        const st = await stones.find().lean()
        res.render(`home`, { st, error: err.message })
    }
}
module.exports = {
    deleteStone
}