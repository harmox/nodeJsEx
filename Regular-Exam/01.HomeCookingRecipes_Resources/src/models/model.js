const mongoose = require(`mongoose`)
const modelSchema = ({
    title: {
        type: String,
        require: true
    },
    ingredients: {
        type: String,
        require: true
    },
    instructions: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    recommendList: [{
        type: mongoose.Types.ObjectId,
        ref: `User`,
        default: []
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: `User`,
        require: true
    },
})

const Recipe = mongoose.model(`model`, modelSchema)

module.exports = { Recipe }