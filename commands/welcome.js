const Discord = require('discord.js');
const fs = require('fs');

const subCommandFiles = fs.readdirSync('./commands/welcomeSub').filter(file => file.endsWith('.js'));

const subCommands = new Discord.Collection();

for (const file of subCommandFiles) {
    const subCommand = require(`./welcomeSub/${file}`);
	subCommands.set(subCommand.name, subCommand);
}

//console.log(subCommands);

module.exports = {
	name: 'welcome',
    description: 'Configurações do chat de boas vindas.',
    args: true,
    guildOnly: true,
    usage: [
        'setchannel <#canal>', 
        'setruleschannel <#canal>', 
        'setdoubtschannel <#canal>', 
        'setgeralchannel <#canal>', 
        'setmemeschannel <#canal>', 
        'setpartnershipchannel <#canal>', 
        'setlinkchannel <#canal>'
    ],
    permissions: 'ADMINISTRATOR',
	async execute(message, args) {
        // message.content = Tongo!welcome SetChannel #👋▸boas-vindas
        // args = [SetChannel, #👋▸boas-vindas]

        const subCommandName = args.shift().toLowerCase();

        const subCommand = subCommands.get(subCommandName) 
        || subCommands.find(cmd => cmd.aliases && cmd.aliases.includes(subCommandName));
    
        if (!subCommand) return;

        if (!args.length) { 
            let reply = `Você não colocou nenhum argumento, ${message.author}!`;
    
            if (subCommand.usage) {
                reply += `\nO uso apropriado deve ser: \`${subCommand.usage.join(', ')}\``;
            }
    
            return message.channel.send(reply);
        }

        try {
            subCommand.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('houve um erro ao tentar executar este comando!');
        }
	},
};