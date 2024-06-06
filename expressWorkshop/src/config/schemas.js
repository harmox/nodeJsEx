const mongoose = require(`mongoose`)

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        min: 1878,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        max: 5,
        min: 0,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    casts: [{
        type: mongoose.Types.ObjectId, ref: `Casts`
    }]
})
const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        max: 100,
        min: 7,
        required: true
    },
    born: {
        type: String,
        required: true
    },
    nameInMovie: {
        type: String,
        required: true
    },
    castImage: {
        type: String,
        required: true
    },
})

const Cast = mongoose.model(`Casts`, castSchema)
const Movie = mongoose.model(`Movies`, movieSchema)
module.exports = {
    Movie,
    Cast
}