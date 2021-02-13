module.exports = {
	name: 'pause',
    description: 'Pausa a música que está tocando.',
    args: false,
	guildOnly: true,
	aliases: ['pausar', 'pausa'],
	async execute(message, args) {
		const channelVoice = message.member.voice.channel;
		const serverQueue = message.client.musicsQueue.get(message.guild.id);
		
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