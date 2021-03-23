const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
    rawdata: Map,
    projectSecret: String,
    projectID: String,
    date: Date,
});

module.exports = mongoose.model("Projects", ProjectSchema);
