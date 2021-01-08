const saveDatabase = require("./saveDatabase");

module.exports = {
	name: 'setmemeschannel',
    description: 'Define o canal de memes.',
    args: true,
    guildOnly: true,
    usage: ['<#canal>'],
    permissions: 'ADMINISTRATOR',
	async execute(message, args) {

        if (!message.mentions.channels.size) {
            return message.reply('você precisa especificar um canal!');
        }

        var channel = message.mentions.channels.first();

        saveDatabase.execute(message, "Memes", channel);

    }
}