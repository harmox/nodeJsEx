const { creatures } = require("../models/creatures.js")

async function detailsGet(req, res) {
    const creature = await creatures.findById(req.params.id).populate(`owner`).lean()
    creature.isOwner = creature.owner._id == req.user.id ? true : false;
    creature.notVotedYet = !creature.votes.includes(req.user.id) ? true : false;
    res.render(`details`, { creature })
}
module.exports = { detailsGet }