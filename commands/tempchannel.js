const mongoose = require("mongoose"); 
require("dotenv").config();

// Connect to database
mongoose.connect(process.env.MONGOPASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Models
const Data = require("../models/tempchannels.js");

module.exports = {
	name: 'tempchannel',
    description: 'Cria um servidor.',
    alias: 'temp',
    args: true,
	async execute(message, args) {
        if (args[0] === 'true') {
            Data.findOne({
                channelName: "TempCategory"
            }, (err, data) => {
                if(err) console.log(err);
                if(!data) {

                    message.guild.channels.create("Canais Temporários", {
                        type: 'category',
                    }).then(async (channel) => {
                        const categoryId = channel.id;

                        const newData = new Data({
                            channelName: "TempCategory",
                            channelID: categoryId,
                        })
                        newData.save().catch(err => console.log(err));
        
                        message.guild.channels.create("➕ Criar novo canal", {
                            type: 'voice',
                        }).then(async (channel) => {
                            channel.setParent(categoryId);
                            
                            const voiceId = channel.id;

                            const newData = new Data({
                                channelName: "TempVoice",
                                channelID: voiceId,
                            })
                            newData.save().catch(err => console.log(err));

                            
                        });
                    });
                } else {
                    return message.channel.send(`Os canais temporários já estão ativados.`);
                }
            });

           
        } else if(args[0] === 'false') {
            Data.findOne({
                channelName: "TempCategory"
            }, async (err, data) => {
                if(err) console.log(err);
                if(!data) {
                    return message.channel.send(`Os canais temporários não estão ativados.`);
                } else {
                    const channelToDelete = message.guild.channels.cache.get(data.channelID);

                    await Data.findOne({
                        channelName: "TempVoice"
                    }, (err, data) => {
                        if(err) console.log(err);
                        if(data) {
                            const voiceChannelToDelete = message.guild.channels.cache.get(data.channelID);
                            
                            if(voiceChannelToDelete.delete()) {
                                Data.deleteMany({
                                    channelName: "TempVoice"
                                }, (err, data) => {
                                    if(err) console.log(err);
                                });
                            }
                        }
                    });

                    if(channelToDelete.delete()) {
                        Data.deleteMany({
                            channelName: "TempCategory"
                        }, (err, data) => {
                            if(err) console.log(err);
                        });
                    }

                    message.channel.send(`Os canais temporários foram desativados.`);
                }
            });
        } else {
            message.channel.send("Você não digitou um argumento válido.");
        }
	},
};