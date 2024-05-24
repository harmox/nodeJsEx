const { getMoviesById } = require("../utils/movies.js")

module.exports = {
    details: async (req, res) => {
        const movie = await getMoviesById(req.params.id)

        console.log(movie.rating)

        movie.starRating = `&#x2605; `.repeat(movie.rating)
        res.render(`details`, movie)
    }
}