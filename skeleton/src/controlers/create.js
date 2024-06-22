const { validationResult } = require('express-validator');
const { parseError } = require('../utils.js');

function createGet(req, res) {
    res.render(`create`)
}

function createPost(req, res) {
    const validation = validationResult(req);
    try {
        if (validation.errors.length) { throw validation.errors }
        //TODO if no validation errors 

    } catch (err) {
        res.render(`create`, { values: req.body, error: parseError(err).errors })
    }

}
module.exports = { createGet, createPost }