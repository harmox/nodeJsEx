const bcrypt = require(`bcrypt`)
const { userAcc } = require("../../models/users.js")
const { createToken } = require("./token.js")

function registerGet(req, res) {
    res.render(`register`)
}
async function registerPost(req, res) {
    //TODO check if email or username
    const { email, password } = req.body
    console.log(email, password)
    try {
        //TODO requirments
        if (!email || !password) { throw new Error(`All fields are required`) }
        if (password.length < 5) { throw new Error(`Password must be at least`) }
        const user = await userAcc.create({ email, password: await bcrypt.hash(password, 10) })
        const token = createToken(user)
        res.cookie(`token`, token, { httpOny: true })
        res.redirect(`/`)
    } catch (err) {
        res.render(`register`, { email, error: err.message })
    }
}
module.exports = { registerGet, registerPost }