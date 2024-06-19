const { Router } = require(`express`)

const { loginGet, loginPost, loginValidation } = require("../controlers/userService/login.js")
const { registerGet, registerPost, registrationValidation } = require("../controlers/userService/register.js")
const { logout } = require("../controlers/userService/logout.js")
const { isUser } = require("../guards/isUser.js")
const { homeGet } = require("../controlers/home.js")

const router = Router()

router.get(`/`, homeGet)

router.get(`/login`, isUser(), loginGet)
router.post(`/login`, isUser(), loginValidation, loginPost)
router.get(`/register`, isUser(), registerGet)
router.post(`/register`, isUser(), registrationValidation, registerPost)
router.get(`/logout`, logout)

router.get(`*`, (req, res) => { res.render(`404`) })
module.exports = { router }