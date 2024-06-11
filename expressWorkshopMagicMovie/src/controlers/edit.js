const { Movie } = require("../config/schemas.js")

module.exports = {
    edit: async (req, res) => {
        let movie = await Movie.findById(req.params.id).lean()
        res.render(`edit`, { movie })
    },
    editPost: async (req, res) => {
        try {

            let movie = await Movie.findById(req.params.id)
            movie.title = req.body.title
            movie.genre = req.body.genre
            movie.director = req.body.director
            movie.imageURL = req.body.imageURL
            movie.rating = req.body.rating
            movie.description = req.body.description

            await movie.save()

        } catch (err) {
            console.log(err.message)
            res.redirect(`/details/${req.params.id}`)
            return
        }
        res.redirect(`/details/${req.params.id}`)
    }

}