const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'Lista todos os comandos ou informações sobre um comando específico.',
	aliases: ['comandos'],
	usage: ['[nome do comando]'],
	execute(message, args) {
		const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Aqui está a lista de todos os meus comandos:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nVocê pode enviar \`${prefix}help [nome do comando]\` para ter informações específicas sobre este comando!`);

            return message.channel.send(data, { split: true });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
        
        if (!command) {
            return message.reply('este não é um comando válido');
        }
        
        data.push(`**Nome: ** ${command.name}`);
        
        if (command.aliases) data.push(`**Aliases: ** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Descrição: ** ${command.description}`);
        if (command.usage) data.push(`**Uso: ** ${command.usage.join(', ')}`);
        if (command.cooldown) data.push(`**Cooldown: ** ${command.cooldown || 3} segundo(s)`);
        
        message.channel.send(data, { split: true });
	},
};