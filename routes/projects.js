const express = require("express");
const router = express.Router();
const Projects = require("../models/Projects");
const cors = require("cors");

router.use(cors());

// Get project data
router.route("/get-projects/").get(async (req, res) => {
    try {
        //res.send("got projects");
        result = await Projects.find();
        res.send(result);
    } catch (err) {
        res.send("Error: " + err);
    }
});

// Add a single project
router.route("/submit-data").post(async (req, res) => {
    try {
        const rawdata = req.body;
        const username = req.body.user.username;
        const projectID = req.body.projectInfo.projectID;
        const projectData = {
            rawdata: rawdata,
            username: username,
            projectID: projectID,
        };
        //const newProject = new Projects(req.body);
        const newProject = new Projects(projectData);
        newProject.save();
        //newUser.save();
        //res.send("User added");
        res.send("Project Added");
    } catch (err) {
        res.send("Error: " + err);
    }
});

module.exports = router;
