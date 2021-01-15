const mongoose = require("mongoose"); 

require("dotenv").config();

// Connect to database
mongoose.connect(process.env.MONGOPASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Models
const Data = require("./models/data.js");
const TempChannels = require("./models/tempchannels.js");

module.exports = async (client) => {
    // --> Pull botToken from Mongo
    const botToken = process.env.BOTTOKEN.toString();

    Data.findOne({
        botToken: botToken,
    }, (err, data) => {
        if(err) console.log(err);
        if(data) {
            client.allowTempChannel = data.allowTempChannel;
        }
    });

    // --> Pull all Temp Channels from Mongo
    TempChannels.find({}, (err, data) => {
        if(err) console.log(err);
        if(data) {
            for (const channel of data) {
                const tempChannelMap = channel.tempChannelMap;

                const tempChannelConstruct = {
                    categoryId: tempChannelMap.get('categoryId'),
                    voiceId: tempChannelMap.get('voiceId'),
                };
    
                client.tempChannels.set(channel.tempChannelId, tempChannelConstruct);
            }            
        }
    });


}