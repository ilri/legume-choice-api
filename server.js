const mongoose = require('mongoose')

const express = require('express')
const app = express()



// Define the port
const port = 5000

//Middleware: A function that executes when "routes are being hit".

//app.use('/form', () => {
//   console.log("middleware running on the form components")
//})


// Defining a get request and the response from this request
app.get('/', (req, res) => {
  res.send('<h1>Legume-choice HOME<h1>')
})


app.get('/form', (req,res) => {
  res.send('<h1>Legume-choice forms<h1>') 
})

// Make the app listen
app.listen(port, () =>  {
console.log(`Running on port ${port}`);
})



