const { validationResult } = require('express-validator');
const { parseError } = require('../utils.js');
const { Recipe } = require('../models/model.js');

function createGet(req, res) {
    res.locals.title = `Create recipe`
    res.render(`create`)
}

async function createPost(req, res) {
    const validation = validationResult(req);
    try {
        if (validation.errors.length) { throw validation.errors }
        const data = { ...req.body, owner: req.user.id }
        await Recipe.create(data)
        res.redirect(`/catalog`)
    } catch (err) {
        res.render(`create`, { recipe: req.body, error: parseError(err).errors })
    }

}
module.exports = { createGet, createPost }