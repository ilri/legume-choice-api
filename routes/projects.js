const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const cors = require("cors");

// Add a single project
router.route("/submit-data").post(async (req, res) => {
    try {
        //const newUser = new Users(req.body);
        //newUser.save();
        //res.send("User added");
        console.log("Request Made to Projects");
    } catch (err) {
        res.send(err);
    }
});
