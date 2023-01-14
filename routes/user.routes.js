const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
userRoute = express.Router();
const { connection, usermodel } = require("../config/db");
userRoute.get("/", async (req, res) => {
  let data = await usermodel.find();
  res.send(data);
});

userRoute.post("/user/register", async (req, res) => {
  try {
    let { username, email, location, password } = req.body;
    bcrypt.hash(password, 8, async (err, hash) => {
      try {
        let data = new usermodel({
          username,
          email,
          location,
          password: hash,
        });
        await data.save();
        res.send("registered");
      } catch (error) {
        console.log(error);
        res.send("something went wrong while bcrypt");
      }
    });
  } catch (error) {
    console.log(error);
    res.send("something went wrong while registering");
  }
});

userRoute.post("/user/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let data = await usermodel.find({ email });
    console.log(data);
    if (data.length > 0) {
      bcrypt.compare(password, data[0].password, function (err, result) {
        if (result) {
          const token = jwt.sign({ userID: data[0]._id }, process.env.key);
          res.send({ msg: "login successful", token: token });
        } else {
          res.status(400);
          res.send("wrong password");
        }
      });
    } else {
      res.send("wrong credentials");
    }
  } catch (error) {
    console.log(error);
    res.send("something went wrong while login");
  }
});

module.exports = { userRoute };
