const mongoose = require("mongoose"); 
require("dotenv").config();

// Connect to database
mongoose.connect(process.env.MONGOPASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Models
const Data = require("../../models/data.js");

module.exports = {
    async execute(message, channelName, channel) {
        Data.findOne({
            channelName: channelName
        }, (err, data) => {
            if(err) console.log(err);
            if(!data) {
                const newData = new Data({
                    channelName: channelName,
                    channelID: channel.id,
                })
                newData.save().catch(err => console.log(err));
                return message.channel.send(`Canal de Boas-vindas definido para ${channel}`);
            } else if (data.channelID != channel.id) {
                data.channelID = channel.id;
                data.save().catch(err => console.log(err));

                return message.channel.send(`Canal de ${data.channelName} modificado para <#${data.channelID}>`);
            } else {
                return message.channel.send(`O canal de ${data.channelName} já está como <#${data.channelID}>`);
            }
        });
    }
}