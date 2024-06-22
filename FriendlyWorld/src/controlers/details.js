const { animal } = require("../models/model.js")

async function detailsGet(req, res) {
    const model = await animal.findById(req.params.id).lean()
    if (model.owner == req.user?.id) { model.isOwner = true }
    if (!model.donation.find(i => i._id == req.user.id)) { model.notDonated = true }
    res.render(`details`, { model })
}


module.exports = { detailsGet }