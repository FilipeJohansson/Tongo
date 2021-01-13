const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'queue',
    description: 'Para de tocar música.',
    args: false,
    guildOnly: true,
	async execute(message, args) {
        const serverQueue = message.client.queue.get(message.guild.id);

        if (!serverQueue) 
            return message.channel.send('Não há nenhuma música tocando.');

        embed = new MessageEmbed()
            .setColor([155, 31, 196])
            .setTitle("Fila de músicas")
            .setDescription(`__Tocando agora:__
            [${serverQueue.songs[0].title}](${serverQueue.songs[0].url})\n
            __Músicas na fila:__            
            ${serverQueue.songs.map(song => `- [${song.title}](${song.url})`).join('\n')}`)
            .setFooter(`${serverQueue.songs.length} músicas na fila`, `https://media1.tenor.com/images/a51ea91ab28cef8aa211fdea29ae89d3/tenor.gif`)
            .setThumbnail("https://media1.tenor.com/images/a51ea91ab28cef8aa211fdea29ae89d3/tenor.gif");
        return message.channel.send(embed);

    }
}