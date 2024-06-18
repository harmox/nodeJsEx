const { model } = require("../models/model.js");

async function detailsGet(req, res) {
    const model = await model.findById(req.params.id)
}
module.exports = { detailsGet }