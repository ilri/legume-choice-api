const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const cors = require("cors");

router.use(cors());

// Get all users
router.route("/").get(async (req, res) => {
    //res.send('<h1>Legume-choice post<h1>')
    try {
        result = await Users.find({});
        res.send(result);
    } catch (err) {
        res.send("Error:" + err);
    }
});

// Add a single user
router.route("/").post(async (req, res) => {
    try {
        const newUser = new Users(req.body);
        newUser.save();
        res.send("User added");
    } catch (err) {
        res.send(err);
    }
});

// Add multiple single users
router.route("/insertmany").post(async (req, res) => {
    try {
        const newUsers = req.body.newUsers;
        result = await Users.insertMany(newUsers);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

// Delete a single User
router.route("/delete/:UserId").post(async (req, res) => {
    //const singleUser = await Users.findById(req.params.UserId);
    try {
        result = await Users.remove({ _id: req.params.UserId });
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

// Delete multiple Users
router.route("/deletemany").post(async (req, res) => {
    try {
        const deleteUsers = req.body.deleteUsers;
        const deleteEmails = deleteUsers.map((user) => {
            return user.email;
        });
        const deleteUsernames = deleteUsers.map((user) => {
            return user.username;
        });
        result = await Users.deleteMany({
            username: { $in: deleteUsernames },
            email: { $in: deleteEmails },
        });
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;
