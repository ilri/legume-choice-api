const express = require("express");
const router = express.Router();
const Projects = require("../models/Projects");
const cors = require("cors");

// Get project data
router.route("/get-projects/").get(async (req,res) => {
	try {
	res.send("got projects")
	}catch(err){
	res.send(err)
	}
});

// Add a single project
router.route("/submit-data").post(async (req, res) => {
    try {
        const newProject = new Project(req.body);
        //newUser.save();
        //res.send("User added");
        res.send(req.body)
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;
