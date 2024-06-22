const bcrypt = require(`bcrypt`)
const {  validationResult } = require('express-validator');

const { userAcc } = require("../models/users.js")
const { createToken } = require("./token.js");
const { parseError } = require('../utils.js');

function registerGet(req, res) {
    res.render(`register`)
}

async function registerPost(req, res) {
    //TODO check if email or username
    const validation = validationResult(req);
    const { firstName, lastName, email, password } = req.body
    try {
        //TODO requirments
        if (validation.errors.length) { throw validation.errors }
        const exist = await userAcc.findOne({ email })
        if (exist) { throw new Error(`Email already taken`) }
        const user = await userAcc.create({ firstName, lastName, email, password: await bcrypt.hash(password, 10) })
        const token = createToken(user)
        res.cookie(`token`, token, { httpOny: true })
        res.redirect(`/`)
    } catch (err) {
        res.render(`register`, { firstName, lastName, email, error: parseError(err).errors })
    }
}
module.exports = { registerGet, registerPost }