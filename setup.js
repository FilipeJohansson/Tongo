const mongoose = require("mongoose"); 

require("dotenv").config();

// Connect to database
mongoose.connect(process.env.MONGOPASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Models
const AllowTempChannelsData = require("./models/data.js");
const TempChannelsData = require("./models/tempchannels.js");

module.exports = async (client) => {
    // --> Pull allow temp channel from Mongo
    const botToken = process.env.BOTTOKEN.toString();

    AllowTempChannelsData.findOne({
        botToken: botToken,
    }, (err, data) => {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);        

        if(err) console.error(`\n[${today.toUTCString()}] Allow Temp Channel Error: ` + err);
        if(data) {
            client.allowTempChannel = data.allowTempChannel;
            console.log(`\n[${today.toUTCString()}] Allow Temp Channel Defined: ` + client.allowTempChannel);
        }
    });

    // --> Pull all Temp Channels from Mongo
    TempChannelsData.find({}, (err, data) => {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);

        if(err) console.error(`\n[${today.toUTCString()}] Temp Channels Error: ` + err);
        if(data) {
            for (const channel of data) {
                const tempChannelMap = channel.tempChannelMap;

                const tempChannelConstruct = {
                    categoryId: tempChannelMap.get('categoryId'),
                    voiceId: tempChannelMap.get('voiceId'),
                };
    
                client.tempChannels.set(channel.tempChannelId, tempChannelConstruct);
            }
            
            console.log(`\n[${today.toUTCString()}] Temp Channels Defined:`);
            console.log(client.tempChannels);
            
        }
    });

}