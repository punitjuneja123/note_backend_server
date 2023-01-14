const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    titile: String,
    note: String,
    category: String,
    userID: String,
  },
  {
    versionKey: false,
  }
);

const notemodel = mongoose.model("note", noteSchema);

module.exports = { notemodel };
