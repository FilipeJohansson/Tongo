const saveDatabase = require("./saveDatabase");

module.exports = {
	name: 'setdoubtschannel',
    description: 'Define o canal de dúvidas.',
    args: true,
    guildOnly: true,
    usage: ['<#canal>'],
    permissions: 'ADMINISTRATOR',
	async execute(message, args) {

        if (!message.mentions.channels.size) {
            return message.reply('você precisa especificar um canal!');
        }

        var channel = message.mentions.channels.first();

        saveDatabase.execute(message, "Dúvidas", channel);

    }
}