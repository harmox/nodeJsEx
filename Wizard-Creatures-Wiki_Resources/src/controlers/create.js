const { body, validationResult } = require('express-validator');
const { creatures } = require('../models/creatures.js');
const { parseError } = require('../utils.js');

function createGet(req, res) {
    res.render(`create`)
}
const createValidation = [
    body('name').isLength({ min: 2 }).withMessage('Too short name'),
    body('spicies').isLength({ min: 3 }).withMessage('Too short spicies'),
    body('eyeColor').isLength({ min: 3 }).withMessage('Too short eyeColor'),
    body('description').isLength({ min: 3, max: 500 }).withMessage('Description must fit in 500 symbols'),
    body('skinColor').isLength({ min: 5 }).withMessage('skin color must be at least 5 characters long'),]
async function createPost(req, res) {
    const validation = validationResult(req)
    try {
        if (validation.errors.length) { throw validation.errors }
        const data = { ...req.body, owner: req.user.id }
        await creatures.create(data)
        res.redirect(`/`)
    } catch (err) {
        res.render(`create`, { values: req.body, error: parseError(err).errors })
    }
}

module.exports = { createGet, createPost, createValidation }