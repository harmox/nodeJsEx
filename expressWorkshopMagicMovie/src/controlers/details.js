const { Movie } = require("../config/schemas.js");

module.exports = {
    details: async (req, res) => {
        const movie = await Movie.findById(req.params.id).populate(`casts`).lean()
        if (req.user?._id == movie.authorId) {
            movie.author = true
        }
        let starRating = `&#x2605; `.repeat(movie.rating)
        res.render(`details`, { movie, starRating })
    }
}