const { stones } = require("../models/stones.js")

async function home(req, res) {
    let st = await stones.find().lean()
    st = st.slice(-3)
    res.render(`home`, { st });
}
module.exports = { home }