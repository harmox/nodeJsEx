const { Movie, Cast } = require("../config/schemas.js")

module.exports = {
    castAtach: async (req, res) => {
        const movie = await Movie.findById(req.params.id).lean()
        const casts = await Cast.find().lean()
        res.render(`cast-attach`, { movie, casts, error: null })
    },
    castAtachNew: async (req, res) => {
        const castId = req.body.cast
        const movie = await Movie.findById(req.params.id)

        try {
            if (movie.casts.includes(castId)) {
                throw new Error(`cast already is added in movie`)
            }
            await Movie.findByIdAndUpdate(req.params.id, { $push: { casts: castId } })
            res.redirect(`/`)
        } catch (err) {
            const casts = await Cast.find().lean()
            const movie = await Movie.findById(req.params.id).lean()
            res.render(`cast-attach`, { movie, casts, error: err.message })
        }
    }

}