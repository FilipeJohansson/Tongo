const mongoose = require("mongoose"); 

require("dotenv").config();

// Connect to database
mongoose.connect(process.env.MONGOPASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Models
const Data = require("./models/data.js");

module.exports = async (client) => {
    const botToken = process.env.BOTTOKEN.toString();

    Data.findOne({
        botToken: botToken,
    }, (err, data) => {
        if(err) console.log(err);
        if(data) {
            client.allowTempChannel = data.allowTempChannel;
        }
    });
    
}