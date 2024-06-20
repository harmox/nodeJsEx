const bcrypt = require(`bcrypt`)
const { body, validationResult } = require('express-validator');

const { userAcc } = require("../../models/users.js")
const { createToken } = require("./token.js");
const { parseError } = require('../../utils.js');

function registerGet(req, res) {
    res.render(`register`)
}
const registrationValidation = [
    body('email').isEmail().withMessage('Email is invalid'),
    body('firstName').isLength({ min: 3 }).withMessage('Too short first name'),
    body('lastName').isLength({ min: 3 }).withMessage('Too short last name'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('repass').custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match')]
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
module.exports = { registerGet, registerPost, registrationValidation }