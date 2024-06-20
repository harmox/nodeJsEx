const { creatures } = require("../models/creatures.js")

async function detailsGet(req, res) {
    const creature = await creatures.findById(req.params.id).populate(`owner`).populate(`votes`).lean()
    creature.isOwner = creature.owner._id == req.user.id ? true : false;
    creature.notVotedYet = !creature.votes.find(v => req.user.id == v._id) ? true : false
    console.log(creature.votes)
    res.render(`details`, { creature })
}
module.exports = { detailsGet }