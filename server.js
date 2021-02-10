const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')


const express = require('express')
const app = express()

// Configuring environment variables
const result = dotenv.config()

if (result.error) {
    throw result.error
} 

// Define port
const port = process.env.PORT
const mongoURL = process.env.MONGO_URL


//Middleware: A function that executes when "routes are being hit".

app.use(bodyparser.json());
const postRoute = require('./routes/post')

app.use('/api/legumes', postRoute)


// Defining a get request and the response from this request
app.get('/', (req, res) => {
  res.send('<h1>Legume-choice HOME<h1>')
})

// Connect to DB

// Mongoose connection
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true  })

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', mongoURL)
})

db.on('error', err => {
  console.error('connection error:', err)
})



// Make the app listen
app.listen(port, () =>  {
console.log(`Running on port ${port}`);
})



