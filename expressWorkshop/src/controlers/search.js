const url = require(`url`)
const { getAllMovies } = require("../utils/movies.js")

module.exports = {
    searchPage: async (req, res) => {
        let urlToParse = url.parse(req.url, true).query
        let { title, genre, year } = urlToParse
        console.log(title)
        let data = await getAllMovies()
        if (title) {
            data = data.filter(i => i.title.toLowerCase().includes(title.toLocaleLowerCase()))
            console.log(data.id)
        }
        if (genre) {
            data = data.filter(i => i.genre.toLowerCase().includes(genre.toLocaleLowerCase()))
        }
        if (year) {
            data = data.filter(i => i.year == year)
        }
        res.render(`search`, { data })
    }
}