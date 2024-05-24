const { Router } = require(`express`)

const { home } = require("../controlers/home.js")
const { renderError } = require("../controlers/errorHadler.js")
const { details } = require("../controlers/details.js")
const { createPage, createNewPagePost } = require("../controlers/create.js")
const { aboutFunc } = require("../controlers/about.js")
const { searchPage } = require("../controlers/search.js")

const rout = Router()

rout.get(`/`, home)
rout.get(`/create`, createPage)
rout.get(`/details/:id`, details)
rout.get(`/about`, aboutFunc)
rout.get(`/search`, searchPage)
rout.post(`/create`, createNewPagePost)

rout.get(`*`, renderError)

module.exports = { rout }

