const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dotenv = require("dotenv");
const bodyparser = require("body-parser");
app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));

// Configuring environment variables
const result = dotenv.config();

if (result.error) {
    throw result.error;
}

// Define port
const port = process.env.PORT;
const mongoURL = process.env.MONGO_URL;

//Middleware: A function that executes when "routes are being hit".

const legumesRoute = require("./routes/legumes");
const usersRoute = require("./routes/users");
const projectsRoute = require("./routes/projects");

app.use("/api/legumes", legumesRoute);
app.use("/api/users", usersRoute);
app.use("/api/projects", projectsRoute);

// Defining a get request and the response from this request
app.get("/", (req, res) => {
    res.send("<h1>Legume-choice HOME<h1>");
});

app.get("/other", (req, res) => {
    res.send("<h1>other<h1>");
});

// Connect to DB

// Mongoose connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

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
