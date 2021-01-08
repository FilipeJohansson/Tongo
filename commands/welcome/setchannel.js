const saveDatabase = require("./saveDatabase.js");

module.exports = {
	name: 'setchannel',
    description: 'Define o canal de boas-vindas.',
    args: true,
    guildOnly: true,
    usage: ['<#canal>'],
    permissions: 'ADMINISTRATOR',
	async execute(message, args) {

        if (!message.mentions.channels.size) {
            return message.reply('Você precisa especificar um canal!');
        }

        var channel = message.mentions.channels.first();

        saveDatabase.execute(message, "Boas-vindas", channel);

    }
}