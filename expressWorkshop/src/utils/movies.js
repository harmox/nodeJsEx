const fs = require(`fs/promises`)

const filePath = `../data.json`

async function getAllMovies() {
    const data = await fs.readFile(filePath)
    return JSON.parse(data.toString())

}

async function getMoviesById(id) {
    let data = await getAllMovies()
    return data.find(i => i.id == id)
}

async function createMovie(movieData) {

    const data = await getAllMovies()
    let id = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
    id = id.toString()
    const movie = {
        id,
        title: movieData.title,
        genre: movieData.genre,
        director: movieData.director,
        year: Number(movieData.year),
        imageURL: movieData.imageURL,
        rating: Number(movieData.rating),
        description: movieData.description
    };
    
    data.push(movie)
    await fs.writeFile(filePath, JSON.stringify(data))
    return movie
}


module.exports = {
    getAllMovies,
    getMoviesById,
    createMovie
}