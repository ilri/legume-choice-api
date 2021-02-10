const express = require("express");
const router = express.Router();
const Legumes = require("../models/Legumes");

router.get("/", async (req, res) => {
    try {
        const legumes = Legumes.find();
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
