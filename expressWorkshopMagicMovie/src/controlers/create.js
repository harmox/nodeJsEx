const { createMovie } = require("../utils/movies.js")
const { Movie, Cast } = require(`../config/schemas.js`)
module.exports = {
    createPage: (req, res) => {
        res.render(`create`)
    },
    createNewPost: async (req, res) => {
        const movieData = {
            ...req.body,
            authorId: req.user._id
        };
        try {
            await Movie.create(movieData)
            res.redirect(`/`)
        } catch (err) {
            res.render(`404`)
        }
    },
    createCast: async (req, res) => {
        res.render(`cast-create`)
    },
    createNewCast: async (req, res) => {
        await Cast.create(req.body)
        console.log(`Works`);
        res.render(`cast-create`)
    }
}
