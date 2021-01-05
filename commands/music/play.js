const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
	name: 'play',
    description: 'Toca a música.',
    args: true,
    guildOnly: true,
    usage: ['<URL>'],
    permissions: 'ADMINISTRATOR',
	async execute(message, args) {
        console.log("Play alcançado");

        //Achar o canal de voz:
        var channelVoice = message.member.voice.channel;
        if(!channelVoice)
            return message.reply("Você precisa estar em um canal de voz para usar esse comando");
        console.log(channelVoice);
        
        //Ter acesso ao canal
        var permission = channelVoice.permissionsFor(message.client.user);
        if(!permission.has("CONNECT") || !this.permissions.has("SPEAK")) {
            return message.channel.reply("Eu não tenho permissão para entrar e falar nesse canal");
        }

        
        // Only try to join the sender's voice channel if they are in one themselves
        /** 
        if (message.member.voice.channel) {
          const connection = await message.member.voice.channel.join();
          message.reply("playzin");
        } else {
          message.reply('You need to join a voice channel primeiro!');
        }
      */
    }
}