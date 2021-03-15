const express = require("express");
const router = express.Router();
const Projects = require("../models/Projects");
const Cursors = require("../models/Cursor");
const cors = require("cors");

router.use(cors());

router.options("*", cors());

// Get project data
router.route("/get-projects").get(async (req, res) => {
    try {
        //res.send("got projects");
        result = await Projects.find();
        res.send(result);
    } catch (err) {
        res.send("Error: " + err);
    }
});

// Add a single project
router.route("/submit-data/").post(async (req, res) => {
    try {
        const rawdata = req.body;
        const username = req.body.user.username;
        const projectID = req.body.projectInfo.projectID;
        const projectData = {
            rawdata: rawdata,
            //username: username,
            //projectID: projectID,
        };

        //const newProject = new Projects(projectData);
        //newProject.save();

        const filter = { projectID: projectID };
        Projects.findOneAndUpdate(
            filter,
            projectData,
            { upsert: true, new: true },
            (err, results) => {}
        );

        const newCursor = new Cursors({});
        newCursor.save();

        res.send("Project Added");
    } catch (err) {
        res.send("Error: " + err);
    }
});

module.exports = router;
