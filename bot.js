require("dotenv").config();

const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.musicsQueue = new Discord.Collection();
client.tempChannels = new Discord.Collection();

client.allowTempChannel = true;

const welcome = require('./welcome');
const setup = require('./setup');
const commandHandler = require('./commands');

client.on('ready', () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    console.log(`[${today.toUTCString()}] Conectado`);
    
    // Setting up bot
    setup(client);

    // Welcomer listenner 
    welcome(client);
});

client.once('reconnecting', () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
	console.log(`[${today.toUTCString()}] Reconectando`);
});

client.once('disconnect', () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
	console.log(`[${today.toUTCString()}] Desconectado`);
});

// --> On message
client.on('message', commandHandler);

//client.on('guildMemberAdd', guildMemberAddHandler);

// --> ERRORS TRACKING
client.on('shardError', error => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    console.error(`[${today.toUTCString()}] A websocket connection encountered an error: `, error);
});

process.on('unhandledRejection', error => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
	console.error(`[${today.toUTCString()}] Unhandled promise rejection: `, error);
});

// --> PASSING BOT TOKEN
client.login(process.env.BOTTOKEN);