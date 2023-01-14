const express = require("express");
const jwt = require("jsonwebtoken");
const { notemodel } = require("../config/notes.model");
const noteRoute = express.Router();

noteRoute.get("/notes", async (req, res) => {
  const userID_req = req.body.userID;
  let data = await notemodel.find({ userID: userID_req });
  res.send(data);
});

noteRoute.post("/notes/create", async (req, res) => {
  let payload = req.body;
  try {
    let data = new notemodel(payload);
    await data.save();
    res.send("note added");
  } catch (error) {
    console.log(error);
    res.send("something went wrong while creating note");
  }
});

noteRoute.patch("/notes/patch/:id", async (req, res) => {
  const ID = req.params.id;
  let payload = req.body;
  const note = await notemodel.findOne({ _id: ID });
  const userID = note.userID;
  const userID_req = req.body.userID;
  try {
    if (userID == userID_req) {
      await notemodel.findByIdAndUpdate({ _id: ID }, payload);
      res.send("updated");
    } else {
      res.send("you are not authorised");
    }
  } catch (error) {
    console.log(error);
    res.send("something went wrong while updating");
  }
});

noteRoute.delete("/notes/delete/:id", async (req, res) => {
  const ID = req.params.id;
  const note = await notemodel.findOne({ "_id": ID });
  let userID = note.userID;
    let userID_req = req.body.userID;
    console.log(note)
    console.log(userID,userID_req)
    try {
        if (userID == userID_req) {
          await notemodel.findByIdAndDelete({ _id: ID });
          res.send("deleted");
        } else {
            res.send("you are not authorised")
      }
  } catch (error) {
    console.log(error);
    res.send("something went wrong while deleting");
  }
});

module.exports = { noteRoute };
