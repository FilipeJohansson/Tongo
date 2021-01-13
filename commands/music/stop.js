module.exports = {
	name: 'stop',
    description: 'Para de tocar música.',
    args: false,
    guildOnly: true,
	async execute(message, args) {
        const channelVoice = message.member.voice.channel;
        const serverQueue = message.client.queue.get(message.guild.id);

        if (!channelVoice) 
            return message.channel.send('Você precisa estar em um canal de voz para usar esse comando');
        
        if (!serverQueue) 
            return message.channel.send('Não há nenhuma música tocando.');

        if(serverQueue.channelVoice != channelVoice)
            return message.reply("você está em um canal de voz diferente!");
        
		serverQueue.songs = [];
        serverQueue.connection.dispatcher.end();
        
        return message.channel.send('Parando de tocar música.');
    }
}