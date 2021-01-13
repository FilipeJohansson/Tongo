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
    usage: ['play [YT_URL/nome da música]', 'pause', 'resume', 'next', 'stop', 'queue', 'np'],
	async execute(message, args) {
        // message.content = Tongo!music play URL
        // args = [play, URL]

        const subCommandName = args.shift().toLowerCase();
        //args = URL
        //subCommandName = play

        const subCommand = subCommands.get(subCommandName) 
        || subCommands.find(cmd => cmd.aliases && cmd.aliases.includes(subCommandName));
    
        if (!subCommand) return message.reply("este comando não existe, use o comando `help`.");

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