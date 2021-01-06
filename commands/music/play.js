const { DiscordAPIError } = require("discord.js");

const Discord = require('discord.js');
const dispatcher = Discord.StreamDispatcher;

module.exports = {
	name: 'play',
  description: 'Toca a música.',
  args: true,
  guildOnly: true,
  usage: ['<URL>'],
	async execute(message, args) {
        //Achar o canal de voz:
        const channelVoice = message.member.voice.channel;
        if(!channelVoice)
            return message.reply("Você precisa estar em um canal de voz para usar esse comando");
        //console.log(channelVoice);
        
        //Ter acesso ao canal
        const permission = channelVoice.permissionsFor(message.client.user);
        if(!permission.has("CONNECT") || !permission.has("SPEAK")) {
            return message.reply("Eu não tenho permissão para entrar e falar nesse canal");
        }

        console.log(args);

        const connection = await channelVoice.join();
        const ytdl = require('ytdl-core');
        connection.play(ytdl(`${args.toString()}`, { volume: 0.2, filter: 'audioonly' }));

        message.channel.send(`Tocando ${args}`); 
    }
}