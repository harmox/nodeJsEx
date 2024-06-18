const mongoose = require(`mongoose`)
//TODO check name add more props and export
const modelSchema = mongoose.SchemaType({
    name: {
        type: String,
        require: true
    }
})

const model = mongoose.model(`model`, modelSchema)

module.exports = { model }