const { animal } = require("../models/model.js")

async function donation(req, res) {
    try {
        const ani = await animal.findById(req.params.id)
        if (ani.donation.find(i => i._id == req.user.id)) { throw new Error(`You already donated`) }
        if (ani.owner == req.params.id) { throw new Error(`You cant donate u are owner`) }
        ani.donation.push(req.user.id)
        await ani.save()
        res.redirect(`/details/${req.params.id}`)
    } catch (err) {
        res.redirect(`/details/${req.params.id}`)
    }

}
module.exports = { donation }