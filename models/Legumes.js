const mongoose = require("mongoose");

const nameSchema = new mongoose.Schema({
    label: String,
    full_name: String,
});

const scoreSchema = new mongoose.Schema({
    label: String,
    value: Number,
});

const legumeScores = new mongoose.Schema({
    provisions: [scoreSchema],
    requirements: [scoreSchema],
    agroecology: [scoreSchema],
});

const legumeTypes = new mongoose.Schema({
    label: String,
    name: String,
});

const legumeSchema = new mongoose.Schema({
    label: String,
    type: String,
    scores: legumeScores,
});

module.exports = mongoose.model("Legumes", legumeSchema);
