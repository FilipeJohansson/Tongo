require("dotenv").config();

const { prefix } = require('./config.json');

const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const cooldowns = new Discord.Collection();

client.queue = new Map();
client.tempChannels = new Map();
client.allowTempChannel = true;

const welcome = require('./welcome.js');
const setup = require('./setup.js');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.on('ready', () => {
    console.log("Conectado");
    
    // Setting up bot
    setup(client);

    // Welcomer listenner 
    welcome(client);
});

client.once('reconnecting', () => {
	console.log('Reconectando');
});

client.once('disconnect', () => {
	console.log('Desconectado');
});

// --> Set all commands
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// --> On message
client.on('message', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    // message.content = Tongo!welcome SetChannel #👋▸boas-vindas
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    // args = [welcome, SetChannel, #👋▸boas-vindas]
    const commandName = args.shift().toLowerCase();
    // commandName = [welcome]
    // args = [SetChannel, #👋▸boas-vindas]

    const command = client.commands.get(commandName) 
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
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
    
});

// --> ERRORS TRACKING
client.on('shardError', error => {
    console.error('A websocket connection encountered an error:', error);
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

client.login(process.env.BOTTOKEN);