const { Movie, Cast } = require("../config/schemas.js")

module.exports = {
    castAtach: async (req, res) => {
        const movie = await Movie.findById(req.params.id).lean()
        const casts = await Cast.find().lean()
        res.render(`cast-attach`, { movie, casts })
    },
    castAtachNew: async (req, res) => {
        const castId = req.body.cast
        await Movie.findByIdAndUpdate(req.params.id, { $push: { casts: castId } })
        res.redirect(`/`)
    }

}