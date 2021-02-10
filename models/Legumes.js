const mongoose = require('mongoose')

const nameSchema = mongoose.Schema({
    label: String,
    full_name: String,
})

const scoreSchema = mongoose.Schema({
    label: String, 
    value: Number,

})

const legumeScores = mongoose.Schema({
    provisions: [scoreSchema],
    requirements: [scoreSchema],
    agroecology: [scoreSchema]
})

const legumeTypes = mongoose.Schema({
    label: String;
})

const legumeSchema = mongoose.Schema({
    label: String,
    type: String,
    scores: legumeScores
    
})

module.exports  = mongoose.model("Legumes", legumeSchema)
