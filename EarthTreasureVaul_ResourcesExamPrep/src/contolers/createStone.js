const { stones } = require("../models/stones.js")

function createStoneGet(req, res) {

    res.render(`create`, { title: `create`, })
}
async function createStonePost(req, res) {
    console.log(req.body, req.user.id)
    try {
        const movieD = {
            ...req.body,
            owner: req.user.id

        }
        await stones.create(movieD)
        res.redirect(`/`)
    } catch (err) {
        const error = new Error('Input validation error');
        error.errors = Object.fromEntries(Object.values(err.errors).map(e => [e.path, e.message]));
        res.render(`create`, { title: `create`, error: error.errors, values: req.body })
    }
}
module.exports = { createStoneGet, createStonePost };