const mongoose = require("mongoose");

const CursorSchema = mongoose.Schema(
    {},
    {
        capped: { size: 100000000, max: 10000000, autoIndexId: true },
    }
);

module.exports = mongoose.model("Cursors", CursorSchema);
