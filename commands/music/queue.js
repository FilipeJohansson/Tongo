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

        console.log(serverQueue.songs.map(song => song.title).join('\n'));

        embed = new MessageEmbed()
            .setColor([155, 31, 196])
            .setTitle("Fila de músicas:")
            .setDescription(`${serverQueue.songs.map(song => `- ${song.title}`).join('\n')}`)
            .setFooter(`
            Tocando agora: ${serverQueue.songs[0].title} - 
            (${serverQueue.songs[0].url})`, `https://media1.tenor.com/images/a51ea91ab28cef8aa211fdea29ae89d3/tenor.gif`)
            .setThumbnail("https://media1.tenor.com/images/a51ea91ab28cef8aa211fdea29ae89d3/tenor.gif");
        return message.channel.send(embed);

		//return message.channel.send(`__**Song queue:**__ ${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}**Now playing:** ${serverQueue.songs[0].title}`);
    }
}