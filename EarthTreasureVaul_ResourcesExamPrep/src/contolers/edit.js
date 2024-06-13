const { stones } = require("../models/stones.js")

async function editGet(req, res) {
    const stone = await stones.findById(req.params.id).lean()
    res.render(`edit`, { stone })
}
async function editPost(req, res) {
    let stone = await stones.findById(req.params.id)
    try {
        stone.name = req.body.name
        stone.category = req.body.category
        stone.color = req.body.color
        stone.image = req.body.image
        stone.location = req.body.location
        stone.formula = req.body.formula
        stone.description = req.body.description
        await stone.save()
        res.redirect(`/details/${req.params.id}`)
    } catch (err) {
        res.render(`edit`, { stone, error: err.message })
    }
}
module.exports = {
    editGet, editPost
}