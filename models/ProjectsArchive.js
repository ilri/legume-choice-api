const mongoose = require("mongoose");

const ProjectArchiveSchema = mongoose.Schema({
    rawdata: Map,
    projectSecret: String,
    projectID: String,
    date: Date,
});

module.exports = mongoose.model("ProjectsArchive", ProjectArchiveSchema);
