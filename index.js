const express = require("express");
require("dotenv").config()
var cors = require("cors");
const { connection } = require("./config/db");
const { userRoute } = require("./routes/user.routes");
const { noteRoute } = require("./routes/note.routes");
const { authentication } = require("./middleware/authentication.middleware");
const app = express();
app.use(cors())
app.use(express.json());
app.use(userRoute);
app.use(authentication);
app.use(noteRoute);
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
  console.log("server started");
});
