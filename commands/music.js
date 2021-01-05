const Discord = require('discord.js');
const fs = require('fs');

const subCommandFiles = fs.readdirSync('./commands/music').filter(file => file.endsWith('.js'));

const subCommands = new Discord.Collection();

for (const file of subCommandFiles) {
    const subCommand = require(`./music/${file}`);
	subCommands.set(subCommand.name, subCommand);
}

//console.log(subCommands);

module.exports = {
	name: 'music',
    description: 'Configurações de músicas.',
    args: true,
    guildOnly: true,
    usage: ['play <URL>', 'pause'],
    permissions: 'ADMINISTRATOR',
	async execute(message, args) {
        // message.content = Tongo!music play URL
        // args = [play, URL]

        const subCommandName = args.shift().toLowerCase();
        //args = URL
        //subCommandName = play

        const subCommand = subCommands.get(subCommandName) 
        || subCommands.find(cmd => cmd.aliases && cmd.aliases.includes(subCommandName));
    
        if (!subCommand) return;

        // nem todos subCommands precisam de argumento
        
        try {
            subCommand.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('houve um erro ao tentar executar este comando!');
        }
	},
};