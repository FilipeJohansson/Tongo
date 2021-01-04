const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    channelName: String,
    channelID: String,
});

module.exports = mongoose.model("Data", dataSchema);