/*const fs = require('fs');

const commandFiles = fs.readdirSync('./music').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./music/${file}`);
	client.commands.set(command.name, command);
}

module.exports = {
	name: 'music',
    description: 'Configurações de músicas.',
    args: true,
    guildOnly: true,
    usage: ['play [URL]', 'pause'],
	async execute(message, args) {
		if (args[0] === 'play') {
            if (args.lenght < 2) {
                return message.reply('você precisa especificar uma música (URL)!');
            }

            
		} else if (args[0] === 'pause') {

                
        }
	},
};*/