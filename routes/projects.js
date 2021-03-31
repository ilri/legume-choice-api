const express = require("express");
const router = express.Router();
const Projects = require("../models/Projects");
const Cursors = require("../models/Cursor");
const ProjectsArchive = require("../models/ProjectsArchive");
const cors = require("cors");
const _ = require("lodash");
router.use(cors());

router.options("*", cors());

// // Get project data
// router.route("/get-projects").get(async (req, res) => {
//     try {
//         //res.send("got projects");
//         result = await Projects.find();
//         res.send(result);
//     } catch (err) {
//         res.send("Error: " + err);
//     }
// });

// Add a single project
router.route("/submit-data/").post(async (req, res) => {
    try {
        // Declaring the variables that will be recorded into the database
        const rawdata = req.body;
        const projectID = req.body.projectInfo.projectID;
        const projectSecret = req.body.projectSecret.secretKey;
        const date = new Date();
        const projectName = req.body.projectInfo.projectName;

        // Merging the variables into a single object
        const projectData = {
            rawdata: rawdata,
            projectID: projectID,
            projectName: projectName,
            projectSecret: projectSecret,
            date: date,
        };

        // Finding any previous project which exist with the same ID
        const previousProject = await Projects.find({
            projectID: projectID,
        })
            .lean() // Lean extracts a simple javascript object, important for comparisons
            .exec();
        const allProjects = await Projects.find({})
            .lean() // Lean extracts a simple javascript object, important for comparisons
            .exec();

        const previousNames = [];
        allProjects.map((project) => {
            previousNames.push(project.rawdata.projectInfo.projectName);
        });

        // If there is a previous project with the same ID:
        if (previousProject.length == 1) {
            // Check whether they are simply sending the same data again and again
            if (_.isEqual(previousProject[0].rawdata, rawdata)) {
                res.send("Project Identical. No Change made");
            }

            // If this submitted data is not the same as the previous data
            if (!_.isEqual(previousProject[0].rawdata, rawdata)) {
                // Make sure they have the correct secret (make sure they have the individual file)
                if (previousProject[0].projectSecret === projectSecret) {
                    //Find and update based on ID
                    const filter = { projectID: projectID };
                    Projects.findOneAndUpdate(
                        filter,
                        projectData,
                        {},
                        (err, results) => {}
                    );
                    res.send("Project Updated");

                    const newCursor = new Cursors({});
                    newCursor.save();

                    const newProjecttoArchive = new ProjectsArchive(
                        projectData
                    );
                    newProjecttoArchive.save();
                }
            }

            // If they don't have the correct secret, they must have the original file, so do not allow an upload
            if (previousProject[0].projectSecret !== projectSecret) {
                res.send("Secrets not the Same. Data from incorrect source");
            }
        }

        // This is run in the case where this is not a pre-existing project
        if (previousProject.length == 0) {
            // Make sure there is a secret, then save the project
            if (previousNames.includes(projectName)) {
                res.send(
                    "Project name already exists. Try another name and submit again"
                );
            }

            if (!previousNames.includes(projectName)) {
                if (projectSecret !== undefined) {
                    const newProject = new Projects(projectData);
                    newProject.save();
                    res.send("Project Added");

                    const newCursor = new Cursors({});
                    newCursor.save();

                    const newProjecttoArchive = new ProjectsArchive(
                        projectData
                    );
                    newProjecttoArchive.save();
                }
            }

            if (projectSecret === undefined) {
                res.send(
                    "No secret included: Data not collected with application"
                );
            }
        }
    } catch (err) {
        res.send("Error: " + err);
    }
});

module.exports = router;
