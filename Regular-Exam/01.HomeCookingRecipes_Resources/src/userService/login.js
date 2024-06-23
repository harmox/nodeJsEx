const bcrypt = require(`bcrypt`)
const { validationResult } = require('express-validator');

const { userAcc } = require("../models/users.js")
const { createToken } = require("./token.js");
const { parseError } = require('../utils.js');


function loginGet(req, res) {
    res.locals.title=`Login`
    res.render(`login`)
}

async function loginPost(req, res) {
    const { email, password } = req.body
    const validation = validationResult(req);
    try {
        if (validation.errors.length) { throw validation.errors }
        const exist = await userAcc.findOne({ email })
        if (!exist) { throw new Error(`No existing email`) }
        const match = await bcrypt.compare(password, exist.password)
        if (!match) { throw new Error(`Wrong password`) }
        const token = createToken(exist);
        res.cookie(`token`, token, { httpOny: true })
        res.redirect(`/`)
    } catch (err) {
        res.render(`login`, { email, error: parseError(err).errors })
    }
}
module.exports = { loginGet, loginPost }