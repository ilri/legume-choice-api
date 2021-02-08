const express = require('express')
const app = express()

// Define the port
const port = 5000

// Defining a get request and the response from this request

app.get('/', (req, res) => {
  res.send('<h1>Legume-choice<h1>')
})


app.listen(port, () =>  {
console.log(`Running on port ${port}`);
})
