module.exports = {
	name: 'kick',
	description: 'Expulsa um usuário do servidor.',
	guildOnly: true,
	permissions: 'KICK_MEMBERS',
	execute(message, args) {
		if (!message.mentions.users.size) {
			return message.reply('você precisa especificar quem você gostaria de expulsar!');
		}

		const taggedUser = message.mentions.users.first();

		message.channel.send(`Você gostaria de expulsar: ${taggedUser.username}`);
	},
};