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
	name: 'setruleschannel',
    description: 'Define o canal de regras.',
    args: true,
    guildOnly: true,
    usage: ['<#canal>'],
    permissions: 'ADMINISTRATOR',
	async execute(message, args) {

        if (!message.mentions.channels.size) {
            return message.reply('você precisa especificar um canal!');
        }

        var channel = message.mentions.channels.first();

        Data.findOne({
            channelName: "Regras"
        }, (err, data) => {
            if(err) console.log(err);
            if(!data) {
                const newData = new Data({
                    channelName: "Regras",
                    channelID: channel.id,
                })
                newData.save().catch(err => console.log(err));
                return message.channel.send(`Canal de Regras definido para ${channel}`);
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