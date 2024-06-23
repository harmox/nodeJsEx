const bcrypt = require(`bcrypt`)
const { validationResult } = require('express-validator');

const { userAcc } = require("../models/users.js")
const { createToken } = require("./token.js");
const { parseError } = require('../utils.js');

function registerGet(req, res) {
    res.locals.title = `Register`
    res.render(`register`)
}

async function registerPost(req, res) {
    const validation = validationResult(req);
    const { username, email, password } = req.body
    try {
        if (validation.errors.length) { throw validation.errors }
        const existEmail = await userAcc.findOne({ email })
        if (existEmail) { throw new Error(`Email already taken`) }
        const existUsername = await userAcc.findOne({ username })
        if (existUsername) { throw new Error(`Username already taken`) }
        const user = await userAcc.create({ username, email, password: await bcrypt.hash(password, 10) })
        const token = createToken(user)
        res.cookie(`token`, token, { httpOny: true })
        res.redirect(`/`)
    } catch (err) {
        res.render(`register`, { username, email, error: parseError(err).errors })
    }
}
module.exports = { registerGet, registerPost }