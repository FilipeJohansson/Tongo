module.exports = {
	name: 'resume',
    description: 'Volta a tocar a música pausada.',
    args: false,
    guildOnly: true,
	async execute(message, args) {
		const channelVoice = message.member.voice;
		const serverQueue = message.client.queue.get(message.guild.id);
		
		if(serverQueue)
            if(serverQueue.channelVoice != channelVoice)
                return message.reply("você está em um canal de voz diferente!");

		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            
			return message.channel.send('Voltando a tocar a música');

		} else if (serverQueue.playing) {
			return message.channel.send('A música já está tocando.');
		}

		return message.channel.send('Não há nenhuma música tocando.');
    }
}