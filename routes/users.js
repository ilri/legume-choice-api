const express = require("express");
const router = express.Router();
const Users = require("../models/Users");

router.get("/", async (req, res) => {
    //res.send('<h1>Legume-choice post<h1>')
    try {
        const users = await Users.find().limit(5);
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});

// Add a single post
router.post("/", async (req, res) => {
    console.log(req.body);
    const users = new Users({
        username: req.body.username,
        email: req.body.email,
    });

    try {
        const savedUser = await users.save();
        res.json(savedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
