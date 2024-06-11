const { Movie } = require("../config/schemas.js")

async function deleteGet(req, res) {
    let movie = await Movie.findById(req.params.id).lean()

    res.render(`delete`, { movie })
}
async function deletePost(req, res) {
    await Movie.findByIdAndDelete(req.params.id)
    res.redirect(`/`)
}
module.exports = {
    deleteGet, deletePost
}