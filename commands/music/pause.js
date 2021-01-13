module.exports = {
	name: 'pause',
    description: 'Pausa a música.',
    args: false,
    guildOnly: true,
	async execute(message, args) {
		const channelVoice = message.member.voice.channel;
		const serverQueue = message.client.queue.get(message.guild.id);
		
		if(serverQueue)
            if(serverQueue.channelVoice != channelVoice)
                return message.reply("você está em um canal de voz diferente!");

		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            
			return message.channel.send('Música pausada!');
		}
		return message.channel.send('Não há nenhuma música tocando.');
    }
}