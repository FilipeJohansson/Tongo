const { prefix } = require('./config.json');

const Discord = require('discord.js');

const cooldowns = new Discord.Collection();

const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

module.exports = async (message) => {
    // --> Set all commands
    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        message.client.commands.set(command.name, command);
    }

    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    // message.content = Tongo!welcome SetChannel #👋▸boas-vindas
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    // args = [welcome, SetChannel, #👋▸boas-vindas]
    const commandName = args.shift().toLowerCase();
    // commandName = [welcome]
    // args = [SetChannel, #👋▸boas-vindas]

    const command = message.client.commands.get(commandName) 
        || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    if (!command) return;

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('Eu não posso usar este comando em DMs!');
    }

    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return message.reply('Você não possui permissão para usar este comando!');
        }
    }

    if (command.args && !args.length) {        
        let reply = `Você não colocou nenhum argumento, ${message.author}!`;

        if (command.usage) {
            reply += `\nO uso apropriado deve ser: \`${command.usage.join(', ')}\``;
        }

        return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`por favor espere ${timeLeft.toFixed(1)} segundos antes de usar novamente o comando \`${command.name}\``);
        }
    }

    timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('houve um erro ao tentar executar este comando!');
    }
    
}