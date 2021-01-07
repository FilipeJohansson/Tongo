module.exports = {
	name: 'pause',
    description: 'Pausa a música.',
    args: false,
    guildOnly: true,
	async execute(message, args) {
        const serverQueue = message.client.queue.get(message.guild.id);

		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            
			return message.channel.send('Música pausada!');
		}
		return message.channel.send('Não há nenhuma música tocando.');
    }
}