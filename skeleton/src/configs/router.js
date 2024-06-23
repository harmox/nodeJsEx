const { Router } = require(`express`)

const { loginGet, loginPost } = require("../userService/login.js")
const { registerGet, registerPost } = require("../userService/register.js")
const { logout } = require("../userService/logout.js")
const { isUser } = require("../guards/isUser.js")
const { homeGet } = require("../controlers/home.js")
const { createGet, createPost } = require("../controlers/create.js")

const { loginValidation, registrationValidation, createEditValidation } = require("../validations.js")
const { isGuest } = require("../guards/isGuest.js")

const router = Router()

router.get(`/`, homeGet)
router.get(`/create`, isGuest(), createGet)
router.post(`/create`, isGuest(), createEditValidation, createPost)

router.get(`/login`, isUser(), loginGet)
router.post(`/login`, isUser(), loginValidation, loginPost)
router.get(`/register`, isUser(), registerGet)
router.post(`/register`, isUser(), registrationValidation, registerPost)
router.get(`/logout`, logout)

router.get(`*`, (req, res) => { res.render(`404`) })

module.exports = { router }