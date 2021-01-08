const Discord = require('discord.js');
const fs = require('fs');

const subCommandFiles = fs.readdirSync('./commands/tempchannel').filter(file => file.endsWith('.js'));

const subCommands = new Discord.Collection();

for (const file of subCommandFiles) {
    const subCommand = require(`./tempchannel/${file}`);
	subCommands.set(subCommand.name, subCommand);
}

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
    aliases: ['temp'],
    args: true,
	async execute(message, args) {
        const subCommandName = args.shift().toLowerCase();
        //args = URL
        //subCommandName = play

        const subCommand = subCommands.get(subCommandName) 
        || subCommands.find(cmd => cmd.aliases && cmd.aliases.includes(subCommandName));
    
        if (!subCommand) return message.reply(`O uso apropriado deve ser: \`${subCommand.usage.join(', ')}\``);;

        // nem todos subCommands precisam de argumento
        if(subCommand.args){
            if (!args.length) {        
                let reply = `Você não colocou nenhum argumento, ${message.author}!`;
        
                if (subCommand.usage) {
                    reply += `\nO uso apropriado deve ser: \`${subCommand.usage.join(', ')}\``;
                }
        
                return message.channel.send(reply);
            }
        }
        
        try {
            subCommand.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('houve um erro ao tentar executar este comando!');
        }



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

                        return message.channel.send(`Os canais temporários foram ativados.`); 
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

                    return message.channel.send(`Os canais temporários foram desativados.`);
                }
            });
        } else {
            return message.channel.send("Você não digitou um argumento válido.");
        }
	},
};