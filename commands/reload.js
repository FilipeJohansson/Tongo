module.exports = {
	name: 'reload',
	description: 'Recarrega um comando',
	guildOnly: true,
	execute(message, args) {
		if (!args.length) return message.channel.send(`Você não especificou qual o comando para dar reload, ${message.author}!`);
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return message.channel.send(`Não existe comandos de nome ou alias \`${commandName}\`, ${message.author}!`);

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`O comando \`${command.name}\` foi recarregado!`);
		} catch (error) {
			console.error(error);
			message.channel.send(`Houve um erro ao recarregar o comando \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};