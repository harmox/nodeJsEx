const { getAllMovies } = require("../utils/movies.js")

module.exports = {
    home: async (req, res) => {
        let data = await getAllMovies().lean()
        res.render(`home`, { data })
    }
}