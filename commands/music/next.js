module.exports = {
	name: 'next',
    description: 'Passa para a próxima música.',
    args: false,
    guildOnly: true,
	async execute(message, args) {
        const channelVoice = message.member.voice;
        if (!channelVoice) 
            return message.channel.send('Você precisa estar em um canal de voz para usar esse comando');

		const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) 
            return message.channel.send('Não há nenhuma música tocando.');

        if (!serverQueue.playing) {
            await serverQueue.connection.dispatcher.resume();
            serverQueue.connection.dispatcher.end();
        }
        
        serverQueue.connection.dispatcher.end();
        
        return message.channel.send('Música passada adiante.');
    }
}