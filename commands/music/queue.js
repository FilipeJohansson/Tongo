const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'queue',
    description: 'Mostra a fila de músicas.',
    args: false,
    guildOnly: true,
    aliases: ['fila', 'lista', 'listar', 'list'],
	async execute(message, args) {
        const serverQueue = message.client.musicsQueue.get(message.guild.id);

        if (!serverQueue) 
            return message.channel.send('Não há nenhuma música tocando.');
        
        var i = 1;

        embed = new MessageEmbed()
            .setColor([155, 31, 196])
            .setTitle("Fila de músicas")
            .setDescription(`__Tocando agora:__\n[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})\n\n__Músicas na fila:__\n${serverQueue.songs.map(song => `[${i++}] - [${song.title}](${song.url})`).join('\n')}`)
            .setThumbnail("https://media1.tenor.com/images/a51ea91ab28cef8aa211fdea29ae89d3/tenor.gif");

        var x = (i == 2) ? 'música na fila' : 'músicas na fila';

        embed.setFooter(`${serverQueue.songs.length} ${x}`, `https://media1.tenor.com/images/a51ea91ab28cef8aa211fdea29ae89d3/tenor.gif`)
        return message.channel.send(embed);

    }
}