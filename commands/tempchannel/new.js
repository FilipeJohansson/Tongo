const Discord = require('discord.js');
const fs = require('fs');

const subCommandFiles = fs.readdirSync('./commands/welcome').filter(file => file.endsWith('.js'));

const subCommands = new Discord.Collection();

for (const file of subCommandFiles) {
    const subCommand = require(`./welcome/${file}`);
	subCommands.set(subCommand.name, subCommand);
}

module.exports = {
	name: 'new',
    description: 'Cria um novo canal temporário.',
    args: true,
    guildOnly: true,
    usage: ["[apelido da categoria]"],
    permissions: 'ADMINISTRATOR',
	async execute(message, args) {
        
    }
}