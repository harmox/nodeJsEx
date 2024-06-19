const bcrypt = require(`bcrypt`)
const { body, validationResult } = require('express-validator');

const { userAcc } = require("../../models/users.js")
const { createToken } = require("./token.js");
const { parseError } = require('../../utils.js');


function loginGet(req, res) {
    res.render(`login`)
}
const loginValidation = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').notEmpty().withMessage('Password is required')
];
async function loginPost(req, res) {
    //TODO check if email or username
    const { email, password } = req.body
    const validation = validationResult(req);
    try {
        //TODO requirments
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
module.exports = { loginGet, loginPost, loginValidation }