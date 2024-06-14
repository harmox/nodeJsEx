const { stones } = require("../models/stones.js")

async function like(req, res) {
    let stone = await stones.findById(req.params.id)
    const liked = stone.likedList.includes(req.user.id)
    const isCreator = stone.owner == req.user.id
    try {
        if (liked) { throw new Error(`You already liked this stone!`) }
        if (isCreator) { throw new Error(`You cant like your own stones!`) }
        stone.likedList.push(req.user.id)
        stone.save()
        res.redirect(`/details/${req.params.id}`)

    } catch (err) {
        stone = await stones.findById(req.params.id).lean()
        res.render(`details`, { stone, error: err.message })
    }
}
module.exports = { like }