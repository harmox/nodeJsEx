const { creatures } = require("../models/creatures.js");

async function profile(req, res) {
    const posts = await creatures.find({ owner: req.user.id }).populate(`owner`).lean();
    console.log(posts)
    res.render(`my-posts`, { posts })
}
module.exports = { profile }