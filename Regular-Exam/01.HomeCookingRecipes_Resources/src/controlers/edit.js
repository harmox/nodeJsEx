const { Recipe } = require("../models/model.js")
const { validationResult } = require('express-validator');
const { parseError } = require('../utils.js');
const mongoose = require(`mongoose`)

async function editGet(req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw new Error('Invalid recipe ID');
        }
        const recipe = await Recipe.findById(req.params.id).lean()
        if (recipe.owner != req.user?.id) { throw new Error(`You are not owner cant edit this`) }
        res.locals.title = `Editing ${recipe.title}`
        res.render(`edit`, { recipe })
    } catch (err) {
        res.render(`404`, { error: parseError(err).errors })
    }
}
async function editPost(req, res) {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            throw new Error('Invalid recipe ID');
        }
        const validation = validationResult(req)
        if (validation.errors.length) { throw validation.errors }
        const recipe = await Recipe.findById(req.params.id)
        if (recipe.owner != req.user?.id) { throw new Error(`You are not owner cant edit this`) }
        recipe.title = req.body.title
        recipe.description = req.body.description
        recipe.ingredients = req.body.ingredients
        recipe.instrictions = req.body.instructions
        recipe.image = req.body.image
        await recipe.save()
        console.log(recipe._id)
        res.redirect(`/details/${recipe._id}`)

    } catch (err) {
        res.render(`edit`, { recipe: req.body, error: parseError(err).errors })
    }
}
module.exports = { editGet, editPost }