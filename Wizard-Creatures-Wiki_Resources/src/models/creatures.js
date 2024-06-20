const mongoose = require(`mongoose`)
//TODO check name add more props and export
const modelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    spicies: { type: String, required: true },
    skinColor: { type: String, required: true },
    eyeColor: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: `User`,
        default: []
    }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: `User`, required: true },
})

const creatures = mongoose.model(`creatures`, modelSchema)

module.exports = { creatures }