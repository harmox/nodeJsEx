const Accaunt = require("../models/accaunt.js")
const { createToken } = require("./cookie.js")
const { hashPassword } = require("./saltPass.js")

function registerGet(req, res) {
    res.render(`register`)
}
async function registerPost(req, res) {
    let { email, password, repass } = req.body
    try {
        if (!email || !password || !repass) {
            throw new Error(`All fields are required`)
        }
        if (password != repass) {
            throw new Error(`Passwords doesn't match`)
        }
        password = await hashPassword(password)
        const user = await Accaunt.create({ email, password })
        const token = createToken(user)
        res.cookie(`token`, token, { httpOnly: true })
        res.redirect(`/`)
    } catch (err) {
        console.log(err)
        res.render(`register`, { email, error: err.message })
    }
}
module.exports = {
    registerGet, registerPost
}