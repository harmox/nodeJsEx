const mongoose = require(`mongoose`)

//TODO see if email or username
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
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