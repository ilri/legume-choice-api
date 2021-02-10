const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    label: String,
    name: String,
    value: Number
})

const legumeScores = mongoose.Schema({
    provisions: [categorySchema],
    requirements: [categorySchema],
    agroecology: [categorySchema]
})

const legumeSchema = mongoose.Schema({
    name: String
    scores: legumeScores
    
})

module.exports  = mongoose.model("Legumes", legumeSchema)
