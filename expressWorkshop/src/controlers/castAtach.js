const { Movie, Cast } = require("../config/schemas.js")

module.exports = {
    castAtach: async (req, res) => {
        const movie = await Movie.findById(req.params.id).lean()
        const casts = await Cast.find().lean()
        res.render(`cast-attach`, {movie, casts })
    },
    castAtachNew: async (req, res) => {
        const castId = req.body.cast
        const movie = await Movie.findById(req.params.id)
        movie.casts.push(castId)
        await movie.save()
        res.redirect(`/`)
    }

}