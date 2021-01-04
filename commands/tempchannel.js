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
                        const category = await message.guild.channels.cache.find(c => c.name == "Canais Temporários" && c.type == "category");
                        const categoryId = category.id;

                        const newData = new Data({
                            channelName: "TempCategory",
                            channelID: categoryId,
                        })
                        newData.save().catch(err => console.log(err));
        
                        message.guild.channels.create("➕ Criar novo canal", {
                            type: 'voice',
                        }).then(async (channel) => {
                            channel.setParent(categoryId);
                            
                            const voice = await message.guild.channels.cache.find(c => c.name == "➕ Criar novo canal" && c.type == "voice");
                            const voiceId = voice.id;

                            const newData = new Data({
                                channelName: "TempVoice",
                                channelID: voiceId,
                            })
                            newData.save().catch(err => console.log(err));

                            
                        });
        
                    /*message.guild.channels.create("New Category", {
                        type: 'category',
                    }).then(async (channel) => {
                        const category = await message.guild.channels.cache.find(c => c.name == "New Category" && c.type == "category");
                        const categoryId = category.id;
        
                        message.guild.channels.create("New Text Channel", {
                            type: 'text',
                        }).then((channel) => {
                            channel.setParent(categoryId);
                        });
        
                        message.guild.channels.create("New Voice Channel", {
                            type: 'voice',
                        }).then((channel) => {
                            channel.setParent(categoryId);
                        });*/
                    });
                } else {
                    return message.channel.send(`Os canais temporários já estão ativados.`);
                }
            });

           
        } else if(args[0] === 'false') {
            message.channel.send("False");
        } else {
            message.channel.send("Você não digitou um argumento válido.");
        }
	},
};