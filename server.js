const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dotenv = require("dotenv");
const bodyparser = require("body-parser");
app.use(bodyparser.json());

// Configuring environment variables
const result = dotenv.config();

if (result.error) {
    throw result.error;
}

// Define port
const port = process.env.PORT;
const mongoURL = process.env.MONGO_URL;

//Middleware: A function that executes when "routes are being hit".
const postRoute = require("./routes/post");
const legumesRoute = require("./routes/legumes");

app.use("/api/post", postRoute);
app.use("/api/legumes", legumesRoute);

// Defining a get request and the response from this request
app.get("/", (req, res) => {
    res.send("<h1>Legume-choice HOME<h1>");
});

// Connect to DB

// Mongoose connection
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.once("open", (_) => {
    console.log("Database connected:", mongoURL);
});

db.on("error", (err) => {
    console.error("connection error:", err);
});

// Make the app listen on the correct port
app.listen(port, () => {
    console.log(`Running on port ${port}`);
});
