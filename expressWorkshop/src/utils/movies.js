const { Movie } = require(`../config/schemas.js`)

function getAllMovies() {
    return Movie.find()
}

module.exports = {
    getAllMovies,
}