const { Router } = require(`express`)

const { home } = require("../controlers/home.js")
const { renderError } = require("../controlers/errorHadler.js")
const { details } = require("../controlers/details.js")
const { createPage, createNewPost, createCast, createNewCast } = require("../controlers/create.js")
const { aboutFunc } = require("../controlers/about.js")
const { searchPage } = require("../controlers/search.js")
const { castAtach, castAtachNew } = require("../controlers/castAtach.js")

const rout = Router()

rout.get(`/`, home)
rout.get(`/createMovie`, createPage)
rout.get(`/details/:id`, details)
rout.get(`/about`, aboutFunc)
rout.get(`/search`, searchPage)
rout.post(`/createMovie`, createNewPost)
rout.get(`/castCreate`, createCast)
rout.post(`/castCreate`, createNewCast)
rout.get(`/castAtach/:id`, castAtach)
rout.post(`/castAtach/:id`, castAtachNew)

rout.get(`*`, renderError)

module.exports = { rout }

