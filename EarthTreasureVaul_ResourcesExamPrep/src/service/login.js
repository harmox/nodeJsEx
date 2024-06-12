const Accaunt = require("../models/accaunt.js")
const { createToken } = require("./cookie.js")
const { comparePassword } = require("./saltPass.js")

function logInGet(req, res) {
    res.render(`login`)
}
async function logInPost(req, res) {
    const { email, password } = req.body
    try {
        if (!email) { throw new Error(`All fields are required`) }
        if (!password) { throw new Error(`All fields are required`) }
        const exist = await Accaunt.findOne({ email })
        if (!exist) { throw new Error(`No existing email`) }
        const token = createToken(exist);

        const match = await comparePassword(exist, password)
        if (!match) { throw new Error(`Wrong password`) }
        res.cookie(`token`, token, { httpOnly: true })
        res.redirect(`/`)

    } catch (err) {
        console.log(err.message)
        res.render(`login`, { email, error: err.message })
    }

}

module.exports = {
    logInGet, logInPost
}