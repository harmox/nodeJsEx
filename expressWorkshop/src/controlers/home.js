const { Movie, Accaunt } = require("../config/schemas.js")

module.exports = {
    home: async (req, res) => {
        let data = await Movie.find().lean()
        for (const m of data) {
            if (req.user?._id == m.authorId) {
                m.author = true
            }
        }
        res.render(`home`, { data })
    }
}
