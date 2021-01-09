const Discord = require('discord.js');
const mongoose = require("mongoose"); 
const fs = require('fs');

const subCommandFiles = fs.readdirSync('./commands/tempchannel').filter(file => file.endsWith('.js'));
const subCommands = new Discord.Collection();

require("dotenv").config();

// Connect to database
mongoose.connect(process.env.MONGOPASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Models
const Data = require("../models/data.js");

for (const file of subCommandFiles) {
    const subCommand = require(`./tempchannel/${file}`);
	subCommands.set(subCommand.name, subCommand);
}

module.exports = {
	name: 'tempchannel',
    description: 'Cria um servidor.',
    aliases: ['temp'],
    args: true,
    permissions: 'ADMINISTRATOR',
	async execute(message, args) {
        if (args[0] === 'true') {
            message.client.allowTempChannel = true;

            Data.findOne({
                botToken: process.env.BOTTOKEN.toString()
            }, (err, data) => {
                if(err) console.log(err);
                if(!data) {
                    const newData = new Data({
                        botToken: process.env.BOTTOKEN.toString(),
                        allowTempChannel: message.client.allowTempChannel,
                    })
                    newData.save().catch(err => console.log(err));

                } else {
                    Data.deleteOne({
                        botToken: process.env.BOTTOKEN.toString(),
                    }, (err, data) => {
                        if(err) console.log(err);
                        if(!data) return message.channel.send(`Erro ao deletar dados.`);
                    });

                    const newData = new Data({
                        botToken: process.env.BOTTOKEN.toString(),
                        allowTempChannel: message.client.allowTempChannel,
                    })
                    newData.save().catch(err => console.log(err));
                }
            });

            return message.reply('criação de canais ativada!');
           
        } else if(args[0] === 'false') {
            message.client.allowTempChannel = false;

            Data.findOne({
                botToken: process.env.BOTTOKEN.toString(),
            }, (err, data) => {
                if(err) console.log(err);
                if(!data) {
                    const newData = new Data({
                        botToken: process.env.BOTTOKEN.toString(),
                        allowTempChannel: message.client.allowTempChannel,
                    })
                    newData.save().catch(err => console.log(err));
    
                } else {
                    Data.deleteOne({
                        botToken: process.env.BOTTOKEN.toString(),
                    }, (err, data) => {
                        if(err) console.log(err);
                        if(!data) return message.channel.send(`Erro ao deletar dados.`);
                    });

                    const newData = new Data({
                        botToken: process.env.BOTTOKEN.toString(),
                        allowTempChannel: message.client.allowTempChannel,
                    })
                    newData.save().catch(err => console.log(err));
                }
            });

            return message.reply('criação de canais desativada!');
        }

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
	},
};