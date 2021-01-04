const mongoose = require("mongoose"); 
require("dotenv").config();

// Connect to database
mongoose.connect(process.env.MONGOPASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Models
const Data = require("../models/data.js");

module.exports = {
	name: 'welcome',
    description: 'Configurações do chat de boas vindas.',
    args: true,
    guildOnly: true,
    usage: ['setchannel <#canal>', 'setruleschannel <#canal>'],
    permissions: 'ADMINISTRATOR',
	async execute(message, args) {
		if (args[0] === 'setchannel') {
            if (!message.mentions.channels.size) {
                return message.reply('você precisa especificar um canal!');
            }

            var channel = message.mentions.channels.first();

            Data.findOne({
                channelName: "Boas-vindas"
            }, (err, data) => {
                if(err) console.log(err);
                if(!data) {
                    const newData = new Data({
                        channelName: "Boas-vindas",
                        channelID: channel,
                    })
                    newData.save().catch(err => console.log(err));
                    return message.channel.send(`Canal de Boas-vindas definido para <#${channel}>`);
                } else if (data.channelID != channel) {
                    data.channelID = channel.id;
                    data.save().catch(err => console.log(err));

                    return message.channel.send(`Canal de ${data.channelName} modificado para <#${data.channelID}>`);
                } else {
                    return message.channel.send(`O canal de ${data.channelName} já está como <#${data.channelID}>`);
                }
            });            
			
		} else if (args[0] === 'setruleschannel') {
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
                        channelID: channel,
                    })
                    newData.save().catch(err => console.log(err));
                    return message.channel.send(`Canal de Regras definido para <#${channel}>`);
                } else if (data.channelID != channel) {
                    data.channelID = channel.id;
                    data.save().catch(err => console.log(err));

                    return message.channel.send(`Canal de ${data.channelName} modificado para <#${data.channelID}>`);
                } else {
                    return message.channel.send(`O canal de ${data.channelName} já está como <#${data.channelID}>`);
                }
            });     
        } else if (args[0] === 'setdoubtschannel') {
            if (!message.mentions.channels.size) {
                return message.reply('você precisa especificar um canal!');
            }

            var channel = message.mentions.channels.first();

            Data.findOne({
                channelName: "Dúvidas"
            }, (err, data) => {
                if(err) console.log(err);
                if(!data) {
                    const newData = new Data({
                        channelName: "Dúvidas",
                        channelID: channel,
                    })
                    newData.save().catch(err => console.log(err));
                    return message.channel.send(`Canal de Dúvidas definido para <#${channel}>`);
                } else if (data.channelID != channel) {
                    data.channelID = channel.id;
                    data.save().catch(err => console.log(err));

                    return message.channel.send(`Canal de ${data.channelName} modificado para <#${data.channelID}>`);
                } else {
                    return message.channel.send(`O canal de ${data.channelName} já está como <#${data.channelID}>`);
                }
            });     
        } else if (args[0] === 'setgeralchannel') {
            if (!message.mentions.channels.size) {
                return message.reply('você precisa especificar um canal!');
            }

            var channel = message.mentions.channels.first();

            Data.findOne({
                channelName: "Chat Geral"
            }, (err, data) => {
                if(err) console.log(err);
                if(!data) {
                    const newData = new Data({
                        channelName: "Chat Geral",
                        channelID: channel,
                    })
                    newData.save().catch(err => console.log(err));
                    return message.channel.send(`Chat Geral definido para <#${channel}>`);
                } else if (data.channelID != channel) {
                    data.channelID = channel.id;
                    data.save().catch(err => console.log(err));

                    return message.channel.send(`${data.channelName} modificado para <#${data.channelID}>`);
                } else {
                    return message.channel.send(`O ${data.channelName} já está como <#${data.channelID}>`);
                }
            });     
        } else if (args[0] === 'setmemeschannel') {
            if (!message.mentions.channels.size) {
                return message.reply('você precisa especificar um canal!');
            }

            var channel = message.mentions.channels.first();

            Data.findOne({
                channelName: "Memes"
            }, (err, data) => {
                if(err) console.log(err);
                if(!data) {
                    const newData = new Data({
                        channelName: "Memes",
                        channelID: channel,
                    })
                    newData.save().catch(err => console.log(err));
                    return message.channel.send(`Canal de Memes definido para <#${channel}>`);
                } else if (data.channelID != channel) {
                    data.channelID = channel.id;
                    data.save().catch(err => console.log(err));

                    return message.channel.send(`Canal de ${data.channelName} modificado para <#${data.channelID}>`);
                } else {
                    return message.channel.send(`O canal de ${data.channelName} já está como <#${data.channelID}>`);
                }
            });     
        } else if (args[0] === 'setpartnershipchannel') {
            if (!message.mentions.channels.size) {
                return message.reply('você precisa especificar um canal!');
            }

            var channel = message.mentions.channels.first();

            Data.findOne({
                channelName: "Parcerias"
            }, (err, data) => {
                if(err) console.log(err);
                if(!data) {
                    const newData = new Data({
                        channelName: "Parcerias",
                        channelID: channel,
                    })
                    newData.save().catch(err => console.log(err));
                    return message.channel.send(`Canal de Parcerias definido para <#${channel}>`);
                } else if (data.channelID != channel) {
                    data.channelID = channel.id;
                    data.save().catch(err => console.log(err));

                    return message.channel.send(`Canal de ${data.channelName} modificado para <#${data.channelID}>`);
                } else {
                    return message.channel.send(`O canal de ${data.channelName} já está como <#${data.channelID}>`);
                }
            });     
        } else if (args[0] === 'setlinkchannel') {
            if (!message.mentions.channels.size) {
                return message.reply('você precisa especificar um canal!');
            }

            var channel = message.mentions.channels.first();

            Data.findOne({
                channelName: "Link"
            }, (err, data) => {
                if(err) console.log(err);
                if(!data) {
                    const newData = new Data({
                        channelName: "Link",
                        channelID: channel,
                    })
                    newData.save().catch(err => console.log(err));
                    return message.channel.send(`Canal de Link definido para <#${channel}>`);
                } else if (data.channelID != channel) {
                    data.channelID = channel.id;
                    data.save().catch(err => console.log(err));

                    return message.channel.send(`Canal de ${data.channelName} modificado para <#${data.channelID}>`);
                } else {
                    return message.channel.send(`O canal de ${data.channelName} já está como <#${data.channelID}>`);
                }
            });     
        }
	},
};