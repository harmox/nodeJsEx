const { createMovie } = require("../utils/movies.js")

module.exports = {
    createPage: (req, res) => {
        res.render(`create`)
    },
    createNewPagePost: async (req, res) => {
        let errors = {
            title: !req.body.title,
            genre: !req.body.genre,
            director: !req.body.director,
            year: !req.body.year,
            imageURL: !req.body.imageURL,
            rating: !req.body.rating,
            description: !req.body.description,
        }
        if (Object.values(errors).includes(true)) {
            res.render(`create`, { movie: req.body, errors })
            return
        }
        let result = await createMovie(req.body)
        res.redirect(`/details/${result.id}`)

    }

}
