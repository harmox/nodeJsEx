const { validationResult } = require('express-validator');
const { parseError } = require('../utils.js');
const { animal } = require('../models/model.js');

function createGet(req, res) {
    res.render(`create`)
}

async function createPost(req, res) {
    const validation = validationResult(req);
    try {
        if (validation.errors.length) { throw validation.errors }
        const data = { ...req.body, owner: req.user.id }
        await animal.create(data)
        res.redirect(`/`)
    } catch (err) {
        res.render(`create`, { values: req.body, error: parseError(err).errors })
    }

}
module.exports = { createGet, createPost }