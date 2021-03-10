const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
    rawdata: Map,
    username: String,
    projectID: String,
});

module.exports = mongoose.model("Projects", ProjectSchema);
