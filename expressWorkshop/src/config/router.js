const { Router } = require(`express`)

const { home } = require("../controlers/home.js")
const { renderError } = require("../controlers/errorHadler.js")
const { details } = require("../controlers/details.js")
const { createPage, createNewPost, createCast, createNewCast } = require("../controlers/create.js")
const { aboutFunc } = require("../controlers/about.js")
const { searchPage } = require("../controlers/search.js")
const { castAtach, castAtachNew } = require("../controlers/castAtach.js")
const { logInRender, registerRender, loginPost, registerPost, logout } = require("../controlers/acountsManage.js")
const { isUser, isGuest, middle } = require("../utils/isUser!.js")
const { edit, editPost } = require("../controlers/edit.js")
const { deleteGet, deletePost } = require("../controlers/deletee.js")

const rout = Router()

rout.get(`/`, middle(), home)
rout.get(`/about`, middle(), aboutFunc)
rout.get(`/search`, middle(), searchPage)

rout.get(`/createMovie`, isUser(), createPage)
rout.post(`/createMovie`, isUser(), createNewPost)
rout.get(`/castCreate`, isUser(), createCast)
rout.post(`/castCreate`, isUser(), createNewCast)
rout.get(`/details/:id`, isUser(), details)
rout.get(`/castAtach/:id`, isUser(), castAtach)
rout.post(`/castAtach/:id`, isUser(), castAtachNew)
rout.get(`/edit/:id`, isUser(), edit)
rout.post(`/edit/:id`, isUser(), editPost)
rout.get(`/delete/:id`, isUser(), deleteGet)
rout.post(`/delete/:id`, isUser(), deletePost)

rout.get(`/login`, isGuest(), logInRender)
rout.get(`/register`, isGuest(), registerRender)
rout.post(`/login`, loginPost)
rout.post(`/register`, registerPost)
rout.get(`/logout`, logout)

rout.get(`*`, renderError)

module.exports = { rout }

