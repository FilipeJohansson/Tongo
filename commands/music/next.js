module.exports = {
	name: 'next',
    description: 'Passa para a próxima música.',
    args: false,
    guildOnly: true,
    permissions: 'ADMINISTRATOR',
	execute(message, args) {
        const channelVoice = message.member.voice;
        if (!channelVoice) 
            return message.channel.send('Você precisa estar em um canal de voz para usar esse comando');

		const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) 
            return message.channel.send('Não tem nenhuma música tocando.');

        if (!serverQueue.playing)            
			return message.channel.send('Você não pode passar uma música pausada.');
        
        serverQueue.connection.dispatcher.end();
        
        return message.channel.send('Música passada adiante.');
    }
}