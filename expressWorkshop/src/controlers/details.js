const { Movie } = require("../config/schemas.js");

module.exports = {
    details: async (req, res) => {
        const movie = await Movie.findById(req.params.id).lean()
        console.log(movie);
        let starRating = `&#x2605; `.repeat(movie.rating)
        res.render(`details`, { movie, starRating })
    }
}