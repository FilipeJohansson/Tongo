require("dotenv").config();

const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

client.queue = new Map();
client.tempChannels = new Map();
client.allowTempChannel = true;

const welcome = require('./welcome');
const setup = require('./setup');
const commandHandler = require('./commands');

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

// --> On message
client.on('message', commandHandler);

//client.on('guildMemberAdd', guildMemberAddHandler);

// --> ERRORS TRACKING
client.on('shardError', error => {
    console.error('A websocket connection encountered an error:', error);
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

client.login(process.env.BOTTOKEN);