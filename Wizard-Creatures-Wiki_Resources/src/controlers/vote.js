const { creatures } = require("../models/creatures.js")
const { parseError } = require("../utils.js")

async function vote(req, res) {
    try {
        const creature = await creatures.findById(req.params.id)
        if (creature.owner = req.user.id) { throw new Error(`You cant like your own creautres`) }
        if (creature.votes.includes(req.user.id)) { throw new Error(`You already liked this creature`) }
        console.log(creature.name)
        creature.votes.push(req.user.id)
        creature.save()
        res.redirect(`/details/${req.params.id}`)
    } catch (err) {
        const creature = await creatures.findById(req.params.id).populate(`owner`).lean()
        creature.isOwner = creature.owner._id == req.user.id ? true : false;
        creature.notVotedYet = !creature.votes.includes(req.user.id) ? true : false;
        res.render(`details`, { creature, error: parseError(err).errors })
    }
}
module.exports = { vote }