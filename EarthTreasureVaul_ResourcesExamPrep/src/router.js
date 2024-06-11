const express = require(`express`)
const router = express.Router()
router.get(`/`, home)
router.get(`/create`, (req, res) => { res.render(`create`) })
router.get(`/dashboard`, (req, res) => { res.render(`dashboard`) })
router.get(`/details`, (req, res) => { res.render(`details`) })
router.get(`/edit`, (req, res) => { res.render(`edit`) })
router.get(`/register`, (req, res) => { res.render(`register`) })
router.get(`/login`, (req, res) => { res.render(`login`) })
router.get(`/search`, (req, res) => { res.render(`search`) })

router.get(`*`, (req, res) => { res.render(`404`) })
module.exports = { router }
function home(req, res) {
    res.render(`home`)
}