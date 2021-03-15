const mongoose = require("mongoose");

const CursorSchema = mongoose.Schema({
    username: String,
},
{ capped: { size: 100000000,max: 100000000,  autoIndexId: true });

module.exports = mongoose.model("Cursor", CursorSchema);