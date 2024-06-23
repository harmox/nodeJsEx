const mongoose = require(`mongoose`)

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            match: /.+\@.+\..+/,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        collation: { locale: `en`, strength: 2 },
    }
)
const userAcc = mongoose.model(`User`, userSchema)
module.exports = { userAcc }