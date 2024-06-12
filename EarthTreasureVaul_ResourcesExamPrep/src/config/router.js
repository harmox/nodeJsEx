const express = require(`express`)

const { registerGet, registerPost } = require("../service/register.js")
const { logInGet, logInPost } = require("../service/login.js")
const { isUser, isGuest, middle } = require("../middlewere/isUser.js")
const { logout } = require("../service/logout.js")
const { createStoneGet, createStonePost } = require("../contolers/createStone.js")
const { home } = require("../contolers/home.js")
const { dashboardGet } = require("../contolers/dashboard.js")
const { detailsGet } = require("../contolers/details.js")

const router = express.Router()

router.get(`/`, middle(), home)
router.get(`/create`, isUser(), createStoneGet)
router.post(`/create`, isUser(), createStonePost)
router.get(`/dashboard`, middle(), dashboardGet)
router.get(`/details/:id`, detailsGet)
router.get(`/edit`, isUser(), (req, res) => { res.render(`edit`) })

router.get(`/register`, isGuest(), registerGet)
router.post(`/register`, isGuest(), registerPost)
router.get(`/login`, isGuest(), logInGet)
router.post(`/login`, isGuest(), logInPost)
router.get(`/logout`, logout)

router.get(`/search`, isUser(), (req, res) => { res.render(`search`) })

router.get(`*`, (req, res) => { res.render(`404`) })
module.exports = { router }
