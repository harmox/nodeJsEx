const { Router } = require(`express`)

const { loginGet, loginPost } = require("../controlers/userService/login.js")
const { registerGet, registerPost } = require("../controlers/userService/register.js")
const { logout } = require("../controlers/userService/logout.js")
const { isUser } = require("../guards/isUser.js")

const router = Router()



router.get(`/login`, isUser(), loginGet)
router.post(`/login`,isUser(), loginPost)
router.get(`/register`,isUser(),registerGet)
router.post(`/register`,isUser(), registerPost)
router.get(`/logout`, logout)
module.exports = { router }