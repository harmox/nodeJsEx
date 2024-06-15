const bcrypt = require(`bcrypt`)
const { userAcc } = require("../../models/users.js")
const { createToken } = require("./token.js")


function loginGet(req, res) {
    res.render(`login`)
}
async function loginPost(req, res) {
    //TODO check if email or username
    const { email, password } = req.body
    try {
        //TODO requirments
        if (!email) { throw new Error(`All fields are required`) }
        if (!password) { throw new Error(`All fields are required`) }
        const exist = await userAcc.findOne({ email })
        if (!exist) { throw new Error(`No existing email`) }
        const token = createToken(exist);
        const match = await bcrypt.compare(password, exist.password)
        if (!match) { throw new Error(`Wrong password`)}
        res.cookie(`token`, token, { httpOny: true })
        res.redirect(`/`)
    } catch (err) {
        res.render(`login`, { email, error: err.message })
    }
}
module.exports = { loginGet, loginPost }