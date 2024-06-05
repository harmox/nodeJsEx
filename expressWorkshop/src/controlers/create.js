const { createMovie } = require("../utils/movies.js")
const { Movie } = require(`../config/schemas.js`)
module.exports = {
    createPage: (req, res) => {
        res.render(`create`)
    },
    createNewPagePost: async (req, res) => {
        await Movie.create(req.body)
   
        res.redirect(`/`)
    }

}
