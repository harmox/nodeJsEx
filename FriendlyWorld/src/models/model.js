const mongoose = require(`mongoose`)
//TODO check name add more props and export
const modelSchema = ({
    name: {
        type: String,
        require: true
    },
    years: {
        type: Number,
        require: true
    },
    kind: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    need: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    donation: [{
        type: mongoose.Types.ObjectId,
        ref: `Users`,
        default: []
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: `Users`,
        require: true
    }
})

const animal = mongoose.model(`model`, modelSchema)

module.exports = { animal }