const mongoose = require(`mongoose`)

//TODO see if email or username
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        }, lastName: {
            type: String,
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