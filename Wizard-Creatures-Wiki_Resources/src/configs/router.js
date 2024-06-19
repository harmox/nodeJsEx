const { Router } = require(`express`)

const { homeGet } = require("../controlers/home.js")
const { createGet, createPost, createValidation } = require("../controlers/create.js")

const { registerGet, registerPost, registrationValidation } = require("../controlers/userService/register.js")
const { loginGet, loginPost, loginValidation } = require("../controlers/userService/login.js")
const { logout } = require("../controlers/userService/logout.js")
const { isUser } = require("../guards/isUser.js")
const { detailsGet } = require("../controlers/details.js")
const { allPostGet } = require("../controlers/allpost.js")
const { vote } = require("../controlers/vote.js")
const { isGuest } = require("../guards/isGuest.js")
const { editGet, editPost } = require("../controlers/edit.js")

const router = Router()

router.get(`/`, homeGet)
router.get(`/create`, createGet)
router.post(`/create`, isGuest(), createValidation, createPost)
router.get(`/all-posts`, allPostGet)
router.get(`/details/:id`, isGuest(), detailsGet)
router.get(`/vote/:id`, isGuest(), vote)
router.get(`/edit/:id`, isGuest(), editGet)
router.post(`/edit/:id`, isGuest(), createValidation, editPost)

router.get(`/login`, isUser(), loginGet)
router.post(`/login`, isUser(), loginValidation, loginPost)
router.get(`/register`, isUser(), registerGet)
router.post(`/register`, isUser(), registrationValidation, registerPost)
router.get(`/logout`, logout)

router.get(`*`, (req, res) => { res.render(`404`) })
module.exports = { router }