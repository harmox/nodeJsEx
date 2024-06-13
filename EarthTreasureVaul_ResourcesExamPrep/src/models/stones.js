const mongoose = require(`mongoose`);

const stoneSchema = {
  name: { type: String, required: true },
  category: { type: String, required: true },
  color: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  formula: { type: String, required: true },
  description: { type: String, required: true },
  likedList: [{ type: mongoose.Types.ObjectId, ref: `accaunts` }],
  owner: { type: mongoose.Types.ObjectId, ref: `accaunts` },
};
const stones = mongoose.model(`Stones`, stoneSchema);
module.exports = { stones };
