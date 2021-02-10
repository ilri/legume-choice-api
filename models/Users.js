const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: String,
    email: String,
});

module.exports = mongoose.model("Users", UserSchema);
