const mongoose = require("mongoose");

const ProjectArchiveSchema = mongoose.Schema({
    rawdata: Map,
    projectSecret: String,
    projectID: String,
});

module.exports = mongoose.model("ProjectsArchive", ProjectArchiveSchema);
