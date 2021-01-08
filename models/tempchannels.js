const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    tempChannelId: String,
    tempChannelMap: Map,
});

module.exports = mongoose.model("TempChannel", dataSchema);