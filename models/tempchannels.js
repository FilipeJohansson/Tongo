const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    tempChannelId: String,
});

module.exports = mongoose.model("Tempchannels", dataSchema);