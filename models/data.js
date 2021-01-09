const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    botToken: String,
    allowTempChannel: Boolean,
});

module.exports = mongoose.model("data", dataSchema);