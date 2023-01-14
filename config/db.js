const mongoose = require("mongoose");

const connection = mongoose.connect(process.env.db);

const userSchema = mongoose.Schema(
  {
    username: String,
    email: String,
    location: String,
    password: String,
  },
  {
    versionKey: false,
  }
);

const usermodel = mongoose.model("user", userSchema);

module.exports = { connection, usermodel };
