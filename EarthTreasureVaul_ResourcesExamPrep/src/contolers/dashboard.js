const { stones } = require("../models/stones.js")

async function dashboardGet(req, res) {
    let st = await stones.find().lean()
    res.render(`dashboard`, { st })
}
module.exports = { dashboardGet }