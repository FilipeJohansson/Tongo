module.exports = {
	name: 'remove',
    description: 'Remove uma música da lista.',
    args: true,
    guildOnly: true,
    usage: ['[número da música na lista]'],
    aliases: ['remover'],
	async execute(message, args) {
        const channelVoice = message.member.voice.channel;
        const serverQueue = message.client.queue.get(message.guild.id);

        if (!channelVoice) 
            return message.channel.send('Você precisa estar em um canal de voz para usar esse comando');
		
        if (!serverQueue) 
            return message.channel.send('Não há nenhuma música tocando.');
        
        if(serverQueue.channelVoice != channelVoice)
            return message.reply("você está em um canal de voz diferente!");

        if (!args.length)
            return message.channel.send(`Você não colocou nenhum argumento, ${message.author}!`);

        const musicToRemove = parseFloat(args[0]);

        if(musicToRemove < 1)
            return message.reply("você digitou um número fora da lista!");

        if((musicToRemove % 1) != 0)
            return message.reply("você digitou um número fora da lista!");
        
        if(musicToRemove > (serverQueue.songs.length))
            return message.reply("você digitou um número fora da lista!");

        const index = parseInt(musicToRemove);

        if(!Number.isInteger(index))
            return message.reply("você precisa digitar um número!");

        try {
            if(index == 1) {
                if (!serverQueue.playing) {
                    await serverQueue.connection.dispatcher.resume();
                    serverQueue.connection.dispatcher.end();
                }
                
                serverQueue.connection.dispatcher.end();
            } else {
                serverQueue.songs.splice(index-1, 1);
            }

            return message.reply("música removida da lista.");
        } catch (err) {
            console.log(err);
            return message.reply("houve um erro ao excluir a música da lista.");
        }
            
    }
}