module.exports = {
	name: 'next',
    description: 'Passa para a próxima música da lista.',
    args: false,
    guildOnly: true,
    aliases: ['prox', 'proxima', 'proximo', 'skip'],
	async execute(message, args) {
        const channelVoice = message.member.voice.channel;
        const serverQueue = message.client.queue.get(message.guild.id);

        if (!channelVoice) 
            return message.channel.send('Você precisa estar em um canal de voz para usar esse comando');
		
        if (!serverQueue) 
            return message.channel.send('Não há nenhuma música tocando.');
        
        if(serverQueue.channelVoice != channelVoice)
            return message.reply("você está em um canal de voz diferente!");

        if (!serverQueue.playing) {
            await serverQueue.connection.dispatcher.resume();
            serverQueue.connection.dispatcher.end();
        }
        
        serverQueue.connection.dispatcher.end();
        
        return message.channel.send('Música passada adiante.');
    }
}