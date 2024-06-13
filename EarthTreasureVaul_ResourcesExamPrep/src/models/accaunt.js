const mongoose = require(`mongoose`);

const AccauntSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      match: /.+\@.+\..+/,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collation: { locale: `en`, strength: 2 },
  }
);
const Accaunt = mongoose.model(`Accaunts`, AccauntSchema);
module.exports = Accaunt;
