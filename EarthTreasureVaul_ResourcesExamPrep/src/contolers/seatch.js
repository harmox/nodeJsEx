const { stones } = require("../models/stones.js");

async function searchGet(req, res) {
  let filteredStones = await stones.find().lean();
  res.render(`search`, { filteredStones });
}
async function searchPost(req, res) {
  let { searchParam } = req.body;
  try {
    if (!searchParam) { throw new Error(`Please enter search params`); }

    let dirtyStones = await stones.find().lean();
    let filteredStones = [];

    dirtyStones.map((stone) => {
      for (key in stone) {
        if (typeof stone[key] == `string` && stone[key].includes(searchParam)) {
          filteredStones.push(stone);
          return true;
        }
      }
    });
    res.render(`search`, { filteredStones });
  } catch (err) {
    render(`search`, { error: err.message });
  }
}
module.exports = { searchGet, searchPost };
