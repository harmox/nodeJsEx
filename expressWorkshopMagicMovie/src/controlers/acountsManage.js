const { register, login } = require("../utils/servicesLogReg.js")
const { createToken } = require("../utils/token.js")

module.exports = {
    logInRender: (req, res) => {
        res.render(`login`)
    },
    registerRender: (req, res) => {
        res.render(`register`)
    },
    loginPost: async (req, res) => {
        const { email, password } = req.body
        let exist = await login(email, password)
        try {
            if (!email || !password) {
                throw new Error(`All fields are Required`)
            }
            if (!exist) {
                throw new Error(`email not found`)
            }
            if (!exist.pas) {
                throw new Error(`password doesnt match`)
            }
            const token = createToken(exist)
            res.cookie(`token`, token, { httpOnly: true })
            res.redirect(`/`)
        } catch (err) {
            console.log(err.message)
            res.render(`login`, { error: err.message })
            return
        };
    },
    registerPost: async (req, res) => {
        const { email, password, repass } = req.body
        try {
            if (!email || !password) {
                throw new Error(`All fields are Required`)
            }
            if (password != repass) {
                throw new Error(`Passwords Doesnt match`)
            }
            const user = await register(email, password)
            const token = createToken(user)
            console.log(token)
            res.cookie(`token`, token, { httpOnly: true })
            res.redirect(`/`)
        } catch (err) {
            res.render(`register`, { error: err.message })
        }
    },
    logout: (req, res) => {
        res.clearCookie(`token`)
        res.redirect(`/`)
    }
}